{-
   All credit for the ‘phantom builder pattern’ term goes to
   Jeroen Engels, who first shared it on an Incremental Elm livestream.
-}


module InputField exposing
    ( InputFieldType(..)
    , PlaceholderLabel(..)
    , inputFieldError
    , toHtml
    , view
    , withDisable
    , withError
    , withExtraText
    , withMsg
    , withType
    , withValue
    )

import Html exposing (Html)
import Html.Attributes as HA
import Html.Events as HE
import Icon



{-
   * InputField Example:
      Components.InputField.view
        |> Components.InputField.withValue model.storeEmail
        |> Components.InputField.withMsg StoreEmail
        |> Components.InputField.withType Components.InputField.Text
        |> Components.InputField.withDisable (model.formState == Loading)
        |> Components.InputField.withError (Components.Error.byFieldName "email" model.errors)
        |> Components.InputField.withExtraText (Components.InputField.Label "Email")
        |> Components.InputField.toHtml
-}


type InputFieldType msg
    = Text
    | Decimal
    | Integer
    | Password ( String, Bool, String -> Bool -> msg )
    | CardExpiration
    | Autocomplete


type PlaceholderLabel
    = Label String
    | Placeholder String
    | Both String String


type InputField constraints msg
    = InputField
        { label : PlaceholderLabel
        , showPassword : Bool
        , value : String
        , toMsg : Maybe (String -> msg)
        , type_ : InputFieldType msg
        , isDisabled : Bool
        , error : List String
        }


view : InputField { needsValue : () } msg
view =
    InputField
        { label = Label ""
        , showPassword = False
        , value = ""
        , toMsg = Nothing
        , type_ = Text
        , isDisabled = False
        , error = []
        }


withValue :
    String
    -> InputField { constraints | needsValue : () } msg
    -> InputField { constraints | hasValue : (), needsMsg : () } msg
withValue value (InputField constraints) =
    InputField { constraints | value = value }


withMsg :
    (String -> msg)
    -> InputField { constraints | hasValue : (), needsMsg : () } msg
    -> InputField { constraints | hasMsg : (), needsType : () } msg
withMsg toMsg (InputField constraints) =
    InputField { constraints | toMsg = Just toMsg }


withType :
    InputFieldType msg
    -> InputField { constraints | hasMsg : (), needsType : () } msg
    -> InputField { constraints | hasType : (), needsDisableState : () } msg
withType type_ (InputField constraints) =
    InputField { constraints | type_ = type_ }


withDisable :
    Bool
    -> InputField { constraints | hasType : (), needsDisableState : () } msg
    -> InputField { constraints | hasDisableState : (), needsError : () } msg
withDisable isDisabled (InputField constraints) =
    InputField { constraints | isDisabled = isDisabled }


withError :
    List String
    -> InputField { constraints | hasDisableState : (), needsError : () } msg
    -> InputField { constraints | hasError : (), needsLabel : () } msg
withError lstErrors (InputField constraints) =
    InputField { constraints | error = lstErrors }


withExtraText :
    PlaceholderLabel
    -> InputField { constraints | hasError : (), needsLabel : () } msg
    ->
        InputField
            { hasDisableState : ()
            , hasError : ()
            , hasType : ()
            , hasMsg : ()
            , hasValue : ()
            , hasLabel : ()
            }
            msg
withExtraText label (InputField constraints) =
    InputField { constraints | label = label }


toHtml :
    InputField
        { hasDisableState : ()
        , hasError : ()
        , hasType : ()
        , hasMsg : ()
        , hasValue : ()
        , hasLabel : ()
        }
        msg
    -> Html msg
toHtml (InputField constraints) =
    let
        { label, value, toMsg, type_, isDisabled, error } =
            constraints

        extendedInput : List (Html msg)
        extendedInput =
            if isDisabled then
                [ inputHtml
                    [ HA.class <|
                        inputTextDisabledStyle
                            ++ (if isPlaceholder label then
                                    ""

                                else
                                    " mt-1"
                               )
                    , HA.classList [ ( "pl-[28px]", type_ == Autocomplete ) ]
                    ]
                ]

            else if List.isEmpty error then
                [ inputHtml
                    [ HA.class <|
                        inputTextStyle
                            ++ (if isPlaceholder label then
                                    ""

                                else
                                    " mt-1"
                               )
                    , HA.classList [ ( "pl-[28px]", type_ == Autocomplete ) ]
                    , HA.classList
                        [ ( "pr-[30px]"
                          , case type_ of
                                Password ( _, _, _ ) ->
                                    True

                                _ ->
                                    False
                          )
                        ]
                    ]
                ]

            else
                [ [ inputHtml
                        [ HA.class <|
                            inputTextNegativeStyle
                                ++ (if isPlaceholder label then
                                        ""

                                    else
                                        " mt-1"
                                   )
                        , HA.classList [ ( "pl-[28px]", type_ == Autocomplete ) ]
                        ]
                  ]
                , error
                    |> List.map inputFieldError
                ]
                    |> List.concat

        inputHtml : List (Html.Attribute msg) -> Html msg
        inputHtml attributes =
            case type_ of
                CardExpiration ->
                    -- WIP
                    Html.div
                        [ HA.class <|
                            inputTextStyle
                                ++ (if isPlaceholder label then
                                        ""

                                    else
                                        " mt-1"
                                   )
                                ++ " flex gap-2"
                        ]
                        [ Html.input
                            [ HA.type_ "number", HA.class "w-[202px] bg-transparent focus:border-none focus:outline-none" ]
                            []
                        , Html.span [ HA.class "gap-2" ] [ Html.text "/" ]
                        , Html.input
                            [ HA.type_ "number", HA.class "w-[20px] bg-transparent focus:border-none focus:outline-none" ]
                            []
                        ]

                _ ->
                    Html.input
                        (List.concat
                            [ [ case type_ of
                                    Text ->
                                        HA.type_ "text"

                                    Decimal ->
                                        HA.type_ "number"

                                    Integer ->
                                        HA.type_ "number"

                                    Password ( _, shouldShow, _ ) ->
                                        if shouldShow then
                                            HA.type_ "text"

                                        else
                                            HA.type_ "password"

                                    CardExpiration ->
                                        HA.type_ "number"

                                    Autocomplete ->
                                        HA.type_ "text"
                              , HA.disabled isDisabled
                              , HA.value value
                              ]
                            , case toMsg of
                                Just toMsg_ ->
                                    [ HE.onInput toMsg_ ]

                                Nothing ->
                                    []
                            , case label of
                                Placeholder placeholder ->
                                    [ HA.placeholder placeholder ]

                                Both _ placeholder ->
                                    [ HA.placeholder placeholder ]

                                _ ->
                                    []
                            , attributes
                            ]
                        )
                        []
    in
    case label of
        Label label_ ->
            Html.label
                [ HA.class "block relative text-sm font-medium text-gray-500" ]
                (List.concat
                    [ [ Html.text label_ ]
                    , extendedInput
                    , case type_ of
                        Password ( id, shouldShow, toMsg_ ) ->
                            [ labelShowPassword toMsg_ id shouldShow ]

                        _ ->
                            []
                    ]
                )

        Placeholder _ ->
            Html.label [] extendedInput

        Both label_ placeholder ->
            Html.label
                [ HA.class "block relative text-sm font-medium text-gray-500" ]
                (List.concat
                    [ [ Html.text label_ ]
                    , extendedInput
                    , case type_ of
                        Password ( id, shouldShow, toMsg_ ) ->
                            [ labelShowPassword toMsg_ id shouldShow ]

                        _ ->
                            []
                    ]
                )


labelShowPassword : (String -> Bool -> msg) -> String -> Bool -> Html msg
labelShowPassword toMsg id shouldShow =
    Html.label
        [ HA.for id ]
        [ Html.input
            [ HA.type_ "checkbox"
            , HA.id id
            , HE.onCheck <| toMsg id
            , HA.class "h-[0] absolute invisible"
            ]
            []
        , Html.span
            [ HA.class <|
                eyeClosedWrapperStyle
                    ++ (if shouldShow then
                            ""

                        else
                            eyeClosedStyle
                       )
            ]
            [ Icon.eye "#d1d5db" ]
        ]


isPlaceholder : PlaceholderLabel -> Bool
isPlaceholder label =
    case label of
        Placeholder _ ->
            True

        _ ->
            False


eyeClosedStyle : String
eyeClosedStyle =
    " before:content-[''] before:block before:absolute before:w-[25px] before:h-[1px] before:bg-brand-300 before:rotate-[45deg] before:top-[12px] before:cursor-pointer"


eyeClosedWrapperStyle : String
eyeClosedWrapperStyle =
    "absolute right-[5px] w-[25px] right-[5px] top-[32px] cursor-pointer z-index"


inputFieldError : String -> Html msg
inputFieldError txt =
    Html.div
        [ HA.class "bg-red-500 text-white flex gap-1 p-1 text-xs items-center mt-[2px]"
        ]
        [ Icon.warning "#ffffff" Icon.Small
        , Html.span
            []
            [ Html.text txt ]
        ]


inputTextStyle : String
inputTextStyle =
    "py-2 px-2 text-gray-500 block w-full rounded bg-white dark:bg-slate-700 text-sm border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-400 placeholder:text-gray-300"


inputTextNegativeStyle : String
inputTextNegativeStyle =
    "py-2 px-2 border border-red-500 rounded bg-red-100 block w-full text-sm text-red-500 focus:outline-none focus:ring-0 focus:border-gray-400"


inputTextDisabledStyle : String
inputTextDisabledStyle =
    "py-2 px-2 cursor-disabled rounded bg-slate-100 border border-slate-100 dark:text-white dark:bg-slate-700 block w-full text-sm text-gray-500 focus:border-gray-300 focus:border-gray-300 focus:ring-gray-500"
