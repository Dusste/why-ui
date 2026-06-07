module Element exposing (..)

import Button
import Colors
import Html exposing (Html)
import Html.Attributes as HA
import Html.Events as HE
import Html.Extra
import Icon
import InputField
import Json.Encode
import String.Extra
import Svg exposing (Svg)
import Svg.Attributes as SA
import Time
import Time.Extra


{-| Preselected multiselect
items will come already selected, there is an option to deselect it by clicking.
-}
type alias PreselectArgs msg =
    { selections : List String
    , onSelection : List String -> msg
    , errors : List String
    }


preselectedMultiselect : PreselectArgs msg -> Html msg
preselectedMultiselect args =
    let
        toggleSelection : String -> msg
        toggleSelection id =
            let
                newSelections : List String
                newSelections =
                    if List.member id args.selections then
                        List.filter ((/=) id) args.selections

                    else
                        id :: args.selections
            in
            args.onSelection newSelections

        viewOption : String -> Html msg
        viewOption str =
            Html.div
                [ HA.class "text-sm px-3 py-1 rounded cursor-pointer border transition-all duration-150 bg-sky-500 text-white border-sky-500"
                , HE.onClick (toggleSelection str)
                ]
                [ Html.text str
                , Html.Extra.viewIf (List.member str args.selections)
                    (Html.span
                        [ HA.class "ml-1 text-white font-bold" ]
                        [ Html.text "×" ]
                    )
                ]
    in
    Html.div
        [ HA.class "flex flex-col " ]
        [ -- Options shown horizontally
          Html.div
            [ HA.class "flex flex-row flex-wrap gap-1" ]
            (List.map viewOption args.selections)
        ]


type alias MultiselectArgs item msg =
    { selections : List String
    , onSelection : List String -> msg
    , options : List item
    , disabled : Bool
    , extraAttrs : List (Html.Attribute msg)
    , hint : Maybe { id : String, element : Html msg }
    , id : String
    , itemLabel : item -> String
    , itemId : item -> String
    , itemDisabled : item -> Bool
    , errors : List String
    }


multiselect : MultiselectArgs item msg -> Html msg
multiselect args =
    let
        isSelected : String -> Bool
        isSelected id =
            List.member id args.selections

        toggleSelection : String -> msg
        toggleSelection id =
            let
                newSelections : List String
                newSelections =
                    if List.member id args.selections then
                        List.filter ((/=) id) args.selections

                    else
                        id :: args.selections
            in
            args.onSelection newSelections

        viewOption : List String -> item -> Html msg
        viewOption selections item =
            let
                id =
                    args.itemId item

                label =
                    args.itemLabel item

                selected =
                    isSelected id

                disabled =
                    args.itemDisabled item

                baseClasses =
                    "text-sm px-3 py-1 rounded cursor-pointer border transition-all duration-150 "
                        ++ (if selected then
                                "bg-sky-500 text-white border-sky-500"

                            else
                                "bg-gray-100 text-gray-500 hover:bg-sky-100 border-gray-300"
                           )
            in
            Html.div
                [ HA.class baseClasses
                , HE.onClick (toggleSelection id) -- TODO if disabled it should be clickable
                , HA.classList [ ( "border border-red-500 bg-red-100 text-red-500 hover:bg-red-100", not (List.isEmpty args.errors) ) ]
                , HA.attribute "aria-disabled"
                    (if disabled then
                        "true"

                     else
                        "false"
                    )
                , HA.classList
                    [ ( "opacity-50 cursor-not-allowed", disabled ) ]
                ]
                [ Html.text label
                , Html.Extra.viewIf (List.member id selections)
                    (Html.span
                        [ HA.class "ml-1 text-white font-bold" ]
                        [ Html.text "×" ]
                    )
                ]
    in
    Html.div
        ((HA.class <|
            "flex flex-col "
                ++ (if List.isEmpty args.selections then
                        ""

                    else
                        "gap-2"
                   )
         )
            :: args.extraAttrs
        )
        [ -- Options shown horizontally
          Html.div
            [ HA.class "flex flex-row flex-wrap gap-1" ]
            (List.map (viewOption args.selections) args.options)

        -- Optional hint
        , case args.hint of
            Just hint ->
                hint.element

            Nothing ->
                Html.text ""
        , Html.Extra.viewIf (not (List.isEmpty args.errors))
            (Html.ul
                [ HA.class "flex flex-col gap-[2px]" ]
                (args.errors
                    |> List.map viewErrorRow
                )
            )
        ]


type alias SingleselectArgs msg =
    { lst : List String
    , onSelection : Result String String -> msg
    , selected : Maybe String
    , errors : List String
    }



{- Only one field can be chosen from the list -}


singleselect : SingleselectArgs msg -> Html msg
singleselect args =
    let
        isSelected : String -> Bool
        isSelected id =
            Just id == args.selected

        sanitizedItem : String -> Result String String
        sanitizedItem item =
            if List.member item args.lst then
                Ok item

            else
                Err "Error: Unknown"

        viewOption : String -> Html msg
        viewOption item =
            let
                selected =
                    isSelected item

                baseClasses =
                    "text-sm px-3 py-1 rounded cursor-pointer border transition-all duration-150 "
                        ++ (if selected then
                                "bg-sky-500 text-white border-sky-500"

                            else
                                "bg-gray-100 text-gray-500 hover:bg-sky-100 border-gray-300"
                           )
            in
            Html.div
                [ HA.class baseClasses
                , HE.onClick (args.onSelection (sanitizedItem item))
                , HA.classList [ ( "border border-red-500 bg-red-100 text-red-500 hover:bg-red-100", not (List.isEmpty args.errors) ) ]
                ]
                [ Html.text (Result.toMaybe (sanitizedItem item) |> Maybe.withDefault "")
                ]
    in
    Html.div
        [ HA.class "flex flex-col " ]
        [ -- Options shown horizontally
          Html.div
            [ HA.class "flex flex-row flex-wrap gap-1" ]
            (List.map viewOption args.lst)
        , Html.Extra.viewIf (not (List.isEmpty args.errors))
            (Html.ul
                [ HA.class "flex flex-col gap-[2px]" ]
                (args.errors
                    |> List.map viewErrorRow
                )
            )
        ]


styleshCheckbox : (Bool -> msg) -> Bool -> Html msg
styleshCheckbox toMsg checked =
    Html.div
        [ HA.class "flex items-center"
        ]
        [ Html.input
            [ HA.class "appearance-none w-4 h-4 border-2 border-gray-200 bg-white checked:bg-sky-100 checked:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:ring-offset-2 cursor-pointer transition-all duration-200 hover:border-gray-200"
            , HA.type_ "checkbox"
            , HE.onCheck toMsg
            , HA.checked checked
            ]
            []
        , Html.div
            [ HA.class "absolute inset-0 flex items-center justify-center pointer-events-none"
            ]
            [ Html.div
                [ HA.class "w-2 h-2 bg-white rounded-sm opacity-0 checked:opacity-100"
                ]
                []
            ]
        ]


type alias TextareaArgs msg =
    { id : String
    , label : PlaceholderLabel
    , value : String
    , limit : Int
    , toMsg : String -> msg
    , isDisabled : Bool
    , error : List String
    }


type PlaceholderLabel
    = PlaceholderLabel String
    | Placeholder String
    | LabelAndPlaceholderA String String


textarea : TextareaArgs msg -> Html msg
textarea { id, label, value, limit, toMsg, isDisabled, error } =
    let
        sanitizeValue : String
        sanitizeValue =
            value
                |> String.replace "\n" " "
                |> String.replace "\u{000D}" " "
                |> String.replace "\t" " "
                |> String.replace "\n" " "
                |> String.trim

        viewLimitIndicator : Html msg
        viewLimitIndicator =
            Html.div
                [ HA.class "absolute bottom-[-15px] right-[5px] text-xs" ]
                [ Html.div
                    [ HA.class "flex items-center gap-1" ]
                    [ Html.span
                        [ HA.class <|
                            ""
                                ++ (if String.length sanitizeValue > limit then
                                        " text-red-500"

                                    else if String.length sanitizeValue + 10 >= limit && String.length sanitizeValue <= limit then
                                        " text-orange-400"

                                    else
                                        "text-sky-500"
                                   )
                        ]
                        [ Html.text <|
                            if String.length sanitizeValue > limit then
                                String.fromInt (limit - String.length sanitizeValue)

                            else
                                String.fromInt (String.length sanitizeValue)
                        ]
                    , Html.span
                        []
                        [ Html.text " / " ]
                    , Html.span
                        []
                        [ Html.text (String.fromInt limit) ]
                    ]
                ]
    in
    Html.div
        [ HA.class "relative text-sm flex flex-col" ]
        [ Html.label
            [ HA.for id
            , HA.class "text-sm text-gray-500 select-none"
            ]
            [ case label of
                PlaceholderLabel label_ ->
                    Html.text label_

                LabelAndPlaceholderA label_ _ ->
                    Html.text label_

                _ ->
                    Html.text ""
            ]
        , Html.div
            []
            [ Html.textarea
                [ HA.class <|
                    "w-full p-2 rounded focus:outline-none focus:ring-0 focus:border-gray-400 min-h-[100px] "
                        ++ (if not (List.isEmpty error) then
                                "border border-red-500 bg-red-100 text-red-500"

                            else if isDisabled then
                                "border border-gray-200 bg-gray-100 text-gray-500"

                            else
                                "border border-gray-300 bg-white text-gray-500"
                           )
                , HA.placeholder
                    (case label of
                        Placeholder placeholder_ ->
                            placeholder_

                        LabelAndPlaceholderA _ placeholder_ ->
                            placeholder_

                        _ ->
                            ""
                    )
                , HA.value value
                , HA.id id
                , HE.onInput toMsg
                , HA.disabled isDisabled
                ]
                []
            , Html.Extra.viewIf (not (String.isEmpty value))
                viewLimitIndicator
            , Html.Extra.viewIf (not (List.isEmpty error))
                (Html.ul
                    [ HA.class "flex flex-col gap-[2px] mt-[-5px]" ]
                    (List.map
                        viewErrorRow
                        error
                    )
                )
            ]
        ]


viewErrorRow : String -> Html msg
viewErrorRow error =
    Html.li
        [ HA.class "bg-red-500 text-white flex gap-1 p-1 text-xs items-center mt-[2px]" ]
        [ Icon.warning "#ffffff" Icon.Small
        , Html.span
            []
            [ Html.text error ]
        ]


checkbox : String -> (Bool -> msg) -> Bool -> Html msg
checkbox label toMsg checked =
    Html.div
        [ HA.class "flex items-center gap-2" ]
        [ Html.div
            [ HA.class "relative flex items-center" ]
            [ Html.input
                [ HA.class "appearance-none w-4 h-4 border-2 border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-200 focus:ring-offset-1 cursor-pointer transition-all duration-200 hover:border-gray-400 rounded-sm"
                , HA.type_ "checkbox"
                , HE.onCheck toMsg
                , HA.checked checked
                , HA.id <| "checkbox-" ++ String.replace " " "-" label
                ]
                []
            , Html.div
                [ HA.class "absolute left-[7px] top-0.5 flex items-center justify-center pointer-events-none"
                ]
                [ Html.div
                    [ HA.class <|
                        "w-2 h-2 text-sky-500 flex items-center justify-center transition-opacity duration-200 text-[20px] "
                            ++ (if checked then
                                    "opacity-100"

                                else
                                    "opacity-0"
                               )
                    ]
                    [ Html.text "✔" ]
                ]
            ]
        , Html.label
            [ HA.for <| "checkbox-" ++ String.replace " " "-" label
            , HA.class "text-sm text-gray-700 cursor-pointer select-none"
            ]
            [ Html.text label ]
        ]


type alias AutocompleteArgs msg item =
    { id : String
    , value : String
    , toMsg : String -> msg
    , isDisabled : Bool
    , options : List item
    , errors : List String
    , placeholder : InputField.PlaceholderLabel
    , showList : Bool -- show/hide autocomplete list
    , filterListCondition :
        item
        -> Bool -- filter list items by some other conditional logic (e.g. filter by name or email)
    , onClick : item -> msg
    , itemLabel : item -> String
    }


autocomplete : AutocompleteArgs msg item -> Html msg
autocomplete args =
    let
        hasOptionsAfterFilter : Bool
        hasOptionsAfterFilter =
            args.options
                |> List.filter
                    (\item -> args.filterListCondition item)
                |> List.isEmpty
                |> not
    in
    Html.div
        [ HA.class "relative flex flex-col"
        , HA.id args.id
        ]
        [ Html.div
            [ HA.class <|
                "absolute left-[5px] "
                    ++ (case args.placeholder of
                            InputField.Placeholder _ ->
                                "top-[8px] z-[1]"

                            _ ->
                                "top-[31px] z-[1]"
                       )
            ]
            [ Icon.search "bg-sky-400" Icon.Large ]
        , InputField.view
            |> InputField.withValue args.value
            |> InputField.withMsg args.toMsg
            |> InputField.withType InputField.Autocomplete
            |> InputField.withDisable args.isDisabled
            |> InputField.withError args.errors
            |> InputField.withExtraText args.placeholder
            |> InputField.toHtml
        , Html.Extra.viewIf hasOptionsAfterFilter <|
            Html.ul
                [ HA.class <|
                    "flex flex-col gap-2 text-gray-500 rounded-b gap-y-[1px] absolute left-0 w-full bg-gray-100 border border-gray-100 z-[2] overflow-hidden "
                        ++ (case args.placeholder of
                                InputField.Placeholder _ ->
                                    "top-[38px]"

                                _ ->
                                    "top-[62px]"
                           )
                , HA.style "display"
                    (if args.showList && List.isEmpty args.errors then
                        "flex"

                     else
                        "none"
                    )
                ]
                (args.options
                    |> List.filter
                        (\item -> args.filterListCondition item)
                    |> List.map
                        (\item ->
                            Html.li
                                [ HA.class "cursor-pointer bg-white text-sm py-1 px-2 cursor-pointer hover:bg-gray-100"
                                , HE.onClick (args.onClick item)
                                ]
                                [ Html.text (args.itemLabel item) ]
                        )
                )
        ]



-- TODO elements
-- radio, modal


formLayout : String -> List (Html msg) -> Html msg
formLayout head children =
    Html.div
        [ HA.class "flex justify-center mt-32" ]
        [ Html.div
            [ HA.class "flex flex-col w-[380px] py-[2px] rounded items-center bg-gradient-to-l from-sky-200" ]
            [ Html.div
                [ HA.class "flex flex-col w-[376px] rounded gap-y-4 bg-white dark:bg-black py-10 px-8" ]
                [ Html.h2
                    [ HA.class "text-gray-950 dark:text-white" ]
                    [ Html.text head ]
                , Html.form
                    [ HA.class "flex flex-col gap-y-4" ]
                    children
                ]
            ]
        ]


loadingElement : Html msg
loadingElement =
    Html.div
        [ HA.class "flex justify-center items-center w-full" ]
        [ Html.div
            [ HA.class "relative h-[20px] w-[20px] flex"
            ]
            [ Html.span
                [ HA.class "animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"
                ]
                []
            , Html.span
                [ HA.class "relative inline-flex rounded-full h-[20px] w-[20px] bg-sky-500" ]
                []
            ]
        ]


type Notification
    = Info String
    | Warning String
    | Error String
    | Success String


type Align
    = Left
    | Center
    | Right


notification : String -> Notification -> Align -> Html msg
notification top notification_ align =
    -- TODO add schema for different types of icons, maybe
    let
        { color, txtValue } =
            case notification_ of
                Info infoTxt ->
                    { color = "sky"
                    , txtValue = infoTxt
                    }

                Warning warnTxt ->
                    { color = "yellow"
                    , txtValue = warnTxt
                    }

                Error errDescription ->
                    { color = "red"
                    , txtValue = errDescription
                    }

                Success succTxt ->
                    { color = "green"
                    , txtValue = succTxt
                    }
    in
    Html.div
        [ HA.class <| notificationWrapperStyle color ++ " " ++ notificationAlignToClass align
        , HA.style "top" top
        ]
        [ notificationToIcon notification_ color
        , Html.p
            [ HA.class "text-inherit" ]
            [ Html.text txtValue ]
        ]


notificationToIcon : Notification -> String -> Html msg
notificationToIcon notification_ color =
    case notification_ of
        Info _ ->
            Html.span
                [ HA.class <| notificationIconStyle color ]
                [ Html.text "!" ]

        Warning _ ->
            Html.span
                [ HA.class <| notificationIconStyle color ]
                [ Html.text "!" ]

        Error _ ->
            Html.span
                [ HA.class <| notificationIconStyle color ]
                [ Html.text "!" ]

        Success _ ->
            Html.div
                [ HA.class "flex gap-2" ]
                [ Icon.check "" Icon.Medium ]


notificationAlignToClass : Align -> String
notificationAlignToClass align =
    case align of
        Left ->
            "left-0 translate-x-0 animate-move-left rounded-r-md"

        Center ->
            "left-[50%] translate-x-[-50%] animate-fade-out rounded-md "

        Right ->
            "right-0 translate-x-0 animate-move-right rounded-l-md"


notificationIconStyle : String -> String
notificationIconStyle color =
    "font-bold min-w-[25px] h-[25px] flex justify-center items-center border-2 rounded-full border-" ++ color ++ "-500"


notificationWrapperStyle : String -> String
notificationWrapperStyle color =
    "absolute z-[5] gap-1 flex whitespace-nowrap border text-lg items-center px-3 py-2 items-center border-" ++ color ++ "-300 bg-" ++ color ++ "-200 text-" ++ color ++ "-500"


switch : (Bool -> msg) -> Bool -> Html msg
switch onMsg isDark =
    Html.label
        [ HA.class <|
            "mx-4 px-2 h-[38px] rounded border before:transition-all transition-all before:duration-50 before:absolute items-center flex cursor-pointer relative before:w-[calc(50%-6px)] before:[''] before:h-[28px] before:rounded before:bg-gray-950 "
                ++ (if not isDark then
                        "before:left-[5px] text-gray-950 bg-gray-100"

                    else
                        "bg-gray-950 text-white before:bg-white before:left-[calc(50%+2px)]"
                   )
        ]
        [ Html.text "Light Dark"
        , Html.input
            [ HA.class "h-[0] absolute invisible"
            , HA.type_ "checkbox"
            , HE.onCheck onMsg
            ]
            []
        ]


type alias PaginationConfig msg =
    { currentPage : Int
    , pageSize : Int
    , isFirstPage : Bool
    , total : Int
    , lastPage : Int
    , isLastPage : Bool
    , onPageChange : Int -> msg
    , onPageSizeInput : Int -> msg
    }


pagination : PaginationConfig msg -> Html msg
pagination config =
    Html.div
        [ HA.class "flex content-center w-full my-2 text-gray-500 text-sm"
        ]
        [ Html.div
            [ HA.class "flex content-center gap-2"
            ]
            [ Button.view
                |> Button.withText ""
                |> Button.withMsg (config.onPageChange 1)
                |> Button.withDisabled config.isFirstPage
                |> Button.withSecondaryStyle
                |> Button.withIcon [ Icon.arrowLeft, Icon.arrowLeft ]
                |> Button.withSize Button.Small
                |> Button.toHtml
            , Button.view
                |> Button.withText ""
                |> Button.withMsg (config.onPageChange (config.currentPage - 1))
                |> Button.withDisabled config.isFirstPage
                |> Button.withSecondaryStyle
                |> Button.withIcon [ Icon.arrowLeft ]
                |> Button.withSize Button.Small
                |> Button.toHtml
            , Html.div
                [ HA.class "p-2"
                ]
                [ Html.text (String.fromInt ((config.currentPage - 1) * config.pageSize + 1))
                , Html.text " - "
                , Html.text
                    (min
                        config.total
                        (config.currentPage * config.pageSize)
                        |> String.fromInt
                    )
                , Html.text " / "
                , Html.text (String.fromInt config.total)
                ]
            , Button.view
                |> Button.withText ""
                |> Button.withMsg (config.onPageChange (config.currentPage + 1))
                |> Button.withDisabled config.isLastPage
                |> Button.withSecondaryStyle
                |> Button.withIcon [ Icon.arrowRight "" Icon.Medium ]
                |> Button.withSize Button.Small
                |> Button.toHtml
            , Button.view
                |> Button.withText ""
                |> Button.withMsg (config.onPageChange config.lastPage)
                |> Button.withDisabled config.isLastPage
                |> Button.withSecondaryStyle
                |> Button.withIcon [ Icon.arrowRight "" Icon.Medium, Icon.arrowRight "" Icon.Medium ]
                |> Button.withSize Button.Small
                |> Button.toHtml
            ]
        , Html.div
            [ HA.class "flex align-center" ]
            [ Html.select
                [ HA.class "cursor-pointer h-[28px] border border-gray-200 text-sky-500 rounded ml-2"
                , HE.onInput <|
                    String.toInt
                        >> Maybe.withDefault config.pageSize
                        >> config.onPageSizeInput
                , HA.value <| String.fromInt config.pageSize
                ]
                [ Html.option [] [ Html.text "10" ]
                , Html.option [] [ Html.text "20" ]
                , Html.option [] [ Html.text "30" ]
                , Html.option [] [ Html.text "50" ]
                , Html.option [] [ Html.text "100" ]
                ]
            ]
        ]


type alias DropdownArgs msg =
    { label : String
    , field : String
    , toggleMsg : msg
    , lst : List String
    , isOpened : Bool
    , toMsg : String -> msg
    , selected : Maybe String
    , errors : List String
    }


dropdown : DropdownArgs msg -> Html msg
dropdown { label, field, toggleMsg, lst, isOpened, toMsg, selected, errors } =
    let
        style : Int -> String
        style i =
            if i == 0 then
                "text-sm py-1 px-2 cursor-pointer hover:bg-gray-100"

            else if i == List.length lst - 1 then
                "text-sm py-1 px-2 cursor-pointer rounded-b hover:bg-gray-100"

            else
                "text-sm py-1 px-2 cursor-pointer hover:bg-gray-100"
    in
    Html.div
        [ HA.class "relative flex flex-col rounded min-w-[150px]"
        , HE.onClick toggleMsg
        ]
        [ Html.div
            [ HA.class <|
                "flex w-full justify-between text-sm p-2 cursor-pointer items-center gap-1 "
                    ++ (if isOpened then
                            "rounded-t"

                        else
                            "rounded"
                       )
                    ++ (if not (List.isEmpty errors) then
                            " border border-red-500 bg-red-100 text-red-500 hover:bg-red-100"

                        else
                            " border border-sky-400 text-sky-400 bg-sky-400/5"
                       )

            -- ++ (if selected /= Nothing then
            --         " font-bold"
            --     else
            --         ""
            --    )
            -- ++ (if hasError then
            --         " border border-red-500 bg-red-100 text-red-500"
            --     else
            --         " border border-sky-400 text-sky-400 bg-sky-400/5"
            --    )
            ]
            [ Html.span
                []
                [ Html.text <|
                    case selected of
                        Just s ->
                            s |> String.Extra.humanize

                        Nothing ->
                            label
                ]
            , if isOpened then
                Icon.arrowUp

              else
                Icon.arrowDown
            ]
        , lst
            |> List.indexedMap
                (\index item ->
                    let
                        strToCamelCase : String
                        strToCamelCase =
                            item
                                |> String.replace " " "-"
                                |> String.Extra.camelize
                                |> String.Extra.decapitalize

                        selectedToCamelCase : String
                        selectedToCamelCase =
                            selected
                                |> Maybe.withDefault ""
                                |> String.replace " " "-"
                                |> String.Extra.camelize
                                |> String.Extra.decapitalize
                    in
                    Html.li
                        [ HA.class <|
                            style index
                                ++ (if selectedToCamelCase == strToCamelCase then
                                        " bg-sky-400 text-white hover:text-white hover:bg-sky-400"

                                    else
                                        " bg-white"
                                   )
                        , HE.onClick <| toMsg <| String.Extra.humanize strToCamelCase
                        ]
                        [ Html.text item
                        ]
                )
            |> Html.ul
                [ HA.class "flex flex-col gap-2 text-gray-500 rounded-b gap-y-[1px] absolute top-[38px] left-0 w-full bg-gray-100 border border-gray-100 z-[2]"
                , HA.style "display"
                    (if isOpened then
                        "flex"

                     else
                        "none"
                    )
                ]
        , Html.Extra.viewIf (not (List.isEmpty errors))
            (Html.ul
                [ HA.class "flex flex-col gap-[2px]" ]
                (errors
                    |> List.map viewErrorRow
                )
            )
        ]


type alias TableArgs msg =
    { th : List String
    , td : List (List (Html msg))
    }


basicTable : TableArgs msg -> Html msg
basicTable { th, td } =
    -- if List.length th /= (td |> List.head |> Maybe.withDefault [] |> List.length) then
    --     Html.text <| "You have more TH:" ++ (th |> List.length |> String.fromInt) ++ " then TD: " ++ (td |> List.head |> Maybe.withDefault [] |> List.length |> String.fromInt)
    -- else
    let
        ( viewTh, viewTd ) =
            ( Html.thead
                [ HA.class "px-2 py-1 border" ]
                [ Html.tr
                    [ HA.style "text-align" "left" ]
                    (List.map
                        (\th_ ->
                            Html.th
                                [ HA.class "bg-gray-100 py-[6px] px-[8px] whitespace-nowrap" ]
                                [ Html.text th_ ]
                        )
                        th
                    )
                ]
            , List.map
                (\row ->
                    Html.tr
                        [ HA.class "border border-b-1 border-gray-100" ]
                        (List.map
                            (\td_ ->
                                Html.td
                                    [ HA.class "relative py-4 whitespace-nowrap py-[6px] px-[8px]" ]
                                    [ td_ ]
                            )
                            row
                        )
                )
                td
            )
    in
    Html.table
        [ HA.class "text-left text-sm"
        , HA.style "border-spacing" "0"
        ]
        [ viewTh
        , Html.tbody
            [ HA.class "bg-white" ]
            viewTd
        ]


type alias DateExiryIndicator =
    { nextAudit : Time.Posix
    , timezone : Time.Zone
    , currentTime : Time.Posix
    , event : String
    , referTo : String
    }


dateExpiryIndicatorWidget : DateExiryIndicator -> Html msg
dateExpiryIndicatorWidget { nextAudit, currentTime, timezone, event, referTo } =
    let
        {-
           due is between 4 months and one month + 1 day -> orange
           due is less then a month or passed due - red
           due is in more then 4 months - green
        -}
        oneYearInMonths : Int
        oneYearInMonths =
            12

        monthsToNextAudit : Int
        monthsToNextAudit =
            Time.Extra.diff Time.Extra.Month timezone currentTime nextAudit

        daysToNextAudit : Int
        daysToNextAudit =
            Time.Extra.diff Time.Extra.Day timezone currentTime nextAudit

        percentageToNextAudit : Int
        percentageToNextAudit =
            if monthsToNextAudit > 12 then
                0

            else
                toFloat monthsToNextAudit
                    / toFloat oneYearInMonths
                    * 100
                    |> round

        isOrange : Bool
        isOrange =
            monthsToNextAudit <= 4 && daysToNextAudit > 31

        isRed : Bool
        isRed =
            monthsToNextAudit <= 1 && daysToNextAudit <= 31

        isGreen : Bool
        isGreen =
            monthsToNextAudit > 4
    in
    Html.div
        [ HA.class "flex flex-col bg-white rounded p-2 max-w-[173px] w-full" ]
        [ Html.div
            [ HA.class "flex gap-2 items-center mb-1" ]
            [ Html.div
                [ HA.class "relative flex w-[130px] h-[5px] bg-gray-200 rounded" ]
                [ Html.div
                    [ HA.class <|
                        "absolute top-0 left-0 h-full rounded-l "
                            ++ (if isGreen then
                                    "bg-green-400"

                                else if isOrange then
                                    "bg-orange-400"

                                else
                                    "bg-red-400"
                               )
                    , HA.style "width"
                        (String.fromInt
                            (if 100 - percentageToNextAudit > 100 then
                                100

                             else
                                100 - percentageToNextAudit
                            )
                            ++ "%"
                        )
                    ]
                    []
                ]
            , if isGreen then
                Icon.check "bg-green-400" Icon.Large

              else if isOrange then
                Icon.warning "bg-orange-400" Icon.Large

              else
                Icon.warning "bg-red-400" Icon.Large
            ]
        , Html.span
            [ HA.class "text-gray-500 text-sm" ]
            [ Html.text <|
                if monthsToNextAudit >= 1 && monthsToNextAudit <= 12 then
                    "~" ++ String.concat [ String.fromInt monthsToNextAudit, " months until " ++ event ]

                else if monthsToNextAudit > 12 then
                    "Due is next year"

                else if monthsToNextAudit == 1 then
                    "Your " ++ referTo ++ " is next month !"

                else if daysToNextAudit > 0 && daysToNextAudit < 31 then
                    "Your " ++ referTo ++ " is in " ++ String.fromInt daysToNextAudit ++ " days"

                else if daysToNextAudit < 0 then
                    "Your " ++ referTo ++ " passed " ++ String.fromInt (abs daysToNextAudit) ++ " days ago"

                else
                    ""
            ]
        ]


type Level
    = Medium
    | High
    | Low


stringToLevel : String -> Maybe Level
stringToLevel level =
    case String.toUpper level of
        "MEDIUM" ->
            Just Medium

        "HIGH" ->
            Just High

        "LOW" ->
            Just Low

        _ ->
            Nothing


levelUI : Level -> Html msg
levelUI level =
    Html.div
        [ HA.class "h-[10px] flex items-end gap-[1px]" ]
        [ Html.div
            [ HA.id "level-low" ]
            [ Html.div
                [ HA.class <|
                    "w-[9px] h-[7px] border border-white "
                        ++ (if level == Low then
                                "bg-green-400"

                            else
                                "bg-gray-200"
                           )
                ]
                []
            ]
        , Html.div
            [ HA.id "level-medium" ]
            [ Html.div
                [ HA.class <|
                    "w-[9px] h-[10px] border border-white "
                        ++ (if level == Medium then
                                "bg-yellow-400"

                            else
                                "bg-gray-200"
                           )
                ]
                []
            ]
        , Html.div
            [ HA.id "level-high" ]
            [ Html.div
                [ HA.class <|
                    "w-[9px] h-[15px] border border-white "
                        ++ (if level == High then
                                "bg-red-400"

                            else
                                "bg-gray-200"
                           )
                ]
                []
            ]
        ]


type ModalSize
    = SM
    | MD
    | LG
    | XL


type alias ModalArgs msg =
    { size : ModalSize
    , title : Maybe String
    , children : Html msg
    , onClose : Maybe msg
    }


viewModal : ModalArgs msg -> Html msg
viewModal { size, title, children, onClose } =
    Html.div
        [ HA.class "flex items-center justify-center max-h-[100%] max-w-[100%] h-[100%] w-[100%] fixed top-[0] left-[0] z-[2] before:content-[''] before:fixed before:inset-0 before:w-full before:h-full before:bg-black/50 before:backdrop-blur-[2px] before:transition-all before:duration-500 before:z-[1]"
        ]
        [ Html.div
            [ HA.id "modal"
            , HA.class <|
                "flex flex-col bg-white z-[2] relative z-[100] rounded-lg shadow-lg"
                    ++ (case size of
                            SM ->
                                " px-8 py-6 min-w-[300px] min-h-[150px] w-[350px] max-h-[800px]"

                            MD ->
                                " px-6 py-6 min-w-[300px] min-h-[300px] w-[600px] max-h-[800px]"

                            LG ->
                                " p-6 min-w-[300px] min-h-[300px] w-[1150px] max-h-[95vh]"

                            XL ->
                                " px-8 py-6 w-[calc(100vw-20px)] min-h-[300px] h-[calc(100vh-20px)] max-h-[calc(100vh-20px)] overflow-auto"
                       )
            ]
            [ case onClose of
                Just msg ->
                    Html.span
                        [ HA.class "absolute text-black right-[10px] top-[10px] cursor-pointer"
                        , HE.onClick msg
                        ]
                        [ Icon.close "#000000" Icon.Large ]

                Nothing ->
                    Html.text ""
            , Html.div
                []
                [ case title of
                    Just title_ ->
                        Html.h3
                            [ HA.class "text-2xl mb-4 font-semibold" ]
                            [ Html.text title_ ]

                    Nothing ->
                        Html.text ""
                ]
            , Html.div
                [ HA.class <|
                    "overflow-y-auto max-h-[80vh] "
                        ++ (case size of
                                XL ->
                                    "min-h-[800px]"

                                _ ->
                                    "min-h-[200px]"
                           )
                ]
                [ children ]
            ]
        ]


rawHtml : List (Html.Attribute msg) -> String -> Html msg
rawHtml attributes html =
    Html.node "html-view" ((HA.property "html" <| Json.Encode.string html) :: attributes) []


type CircleSize
    = S -- w-20
    | M -- w-40
    | L -- w-60


type alias CircularProgressBarArgs =
    { sum : Int
    , count : Int
    , size : CircleSize
    , shownData : CircularProgressBarShownData
    }


type CircularProgressBarShownData
    = Percentage
    | PercentageAndCount
    | Count


circularProgressBar : CircularProgressBarArgs -> Html msg
circularProgressBar { sum, count, size, shownData } =
    let
        progressBarColor : String
        progressBarColor =
            if toFloat count < (0.3 * toFloat sum) then
                -- Less than 30% of answers with gaps
                "bg-yellow-400"

            else if toFloat count < (0.7 * toFloat sum) then
                -- Less than 70% of answers with gaps
                "bg-orange-400"

            else
                -- More than 70% of answers with gaps
                "bg-red-400"

        usedPercentage : Int
        usedPercentage =
            if sum > 0 then
                (toFloat count / toFloat sum * 100) |> round

            else
                0

        generalSize : CircleSize -> String
        generalSize size_ =
            case size_ of
                S ->
                    "40px"

                M ->
                    "100px"

                L ->
                    "200px"

        sizeToStrokeWidth : CircleSize -> Int
        sizeToStrokeWidth size_ =
            case size_ of
                S ->
                    8

                M ->
                    10

                L ->
                    14

        -- We use 100 as our internal coordinate system
        viewBoxSize =
            100

        center =
            viewBoxSize / 2

        -- Calculate radius to fit the stroke perfectly within the viewBox
        -- We subtract a tiny bit extra (0.5) just to be safe from sub-pixel rounding
        radius =
            (viewBoxSize - toFloat (sizeToStrokeWidth size)) / 2 - 0.5

        strokeWidthStr =
            String.fromInt (sizeToStrokeWidth size)

        radiusStr =
            String.fromFloat radius

        centerStr =
            String.fromFloat center
    in
    Html.div
        [ HA.class "relative"
        , HA.style "width" (generalSize size)
        , HA.style "height" (generalSize size)
        ]
        [ Svg.svg
            [ SA.viewBox "0 0 100 100"
            , SA.width <| generalSize size
            , SA.height <| generalSize size
            ]
            [ Svg.circle
                [ SA.cx centerStr
                , SA.cy centerStr
                , SA.r radiusStr
                , SA.fill "transparent"
                , SA.stroke "#f0f0f0"
                , SA.strokeWidth strokeWidthStr
                ]
                []
            , Svg.circle
                [ SA.cx centerStr
                , SA.cy centerStr
                , SA.r radiusStr
                , SA.fill "transparent"
                , SA.stroke (Colors.tailwindColorToColor progressBarColor)
                , SA.strokeWidth strokeWidthStr
                , SA.pathLength "100"
                , SA.strokeDasharray <| String.fromInt usedPercentage ++ " " ++ String.fromInt (100 - usedPercentage)
                , SA.strokeDashoffset "-75"

                -- , SA.strokeLinecap "round"
                , SA.style "transition: all 700ms linear"
                ]
                []
            ]
        , Html.div
            [ HA.class "absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" ]
            [ case shownData of
                Percentage ->
                    Html.span
                        [ HA.class <|
                            "font-bold text-gray-500 "
                                ++ (case size of
                                        S ->
                                            "text-sm"

                                        M ->
                                            "text-2xl"

                                        L ->
                                            "text-3xl"
                                   )
                        ]
                        [ Html.text <| String.fromInt usedPercentage ++ "%" ]

                PercentageAndCount ->
                    Html.div
                        [ HA.class "flex flex-col leading-[0.9] " ]
                        [ Html.span
                            [ HA.class "text-gray-500 font-bold text-center" ]
                            [ Html.text <| String.fromInt count ++ "/" ++ String.fromInt sum ]
                        , Html.span
                            [ HA.class <|
                                "font-bold text-center "
                                    ++ (case size of
                                            S ->
                                                "text-sm"

                                            M ->
                                                "text-2xl"

                                            L ->
                                                "text-3xl"
                                       )
                            ]
                            [ Html.text <| String.fromInt usedPercentage ++ "%" ]
                        ]

                Count ->
                    Html.span
                        [ HA.class <|
                            "text-gray-500 "
                                ++ (case size of
                                        S ->
                                            "text-sm"

                                        M ->
                                            "text-2xl"

                                        L ->
                                            "text-3xl"
                                   )
                        ]
                        [ Html.text <| String.fromInt count ]
            ]
        ]


type alias AccordionArgs msg =
    { title : String
    , content : Html msg
    , isOpen : Bool
    , onToggle : msg
    }


accordion : AccordionArgs msg -> Html msg
accordion args =
    Html.div
        [ HA.class "flex flex-col gap-2" ]
        [ Html.div
            [ HA.class "flex justify-between items-center gap-2" ]
            [ Html.h5
                [ HA.class "text-lg font-semibold"
                , HE.onClick args.onToggle
                ]
                [ Html.text args.title ]
            , if args.isOpen then
                Icon.arrowUp

              else
                Icon.arrowDown
            ]
        , Html.div
            [ HA.class "flex flex-col gap-2" ]
            [ args.content ]
        ]
