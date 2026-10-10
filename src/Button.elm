{-
   All credit for the ‘phantom builder pattern’ term goes to
   Jeroen Engels, who first shared it on an Incremental Elm livestream.
-}


module Button exposing
    ( Size(..)
    , buttonLinkStyle
    , toHtml
    , view
    , viewTabs
    , withDisabled
    , withIcon
    , withLinkStyle
    , withMsg
    , withNegativeStyle
    , withPrimaryStyle
    , withSecondaryStyle
    , withSize
    , withTargetBlank
    , withText
    , withUrl
    )

import Dict exposing (Dict)
import ErrorUI
import Html exposing (Html)
import Html.Attributes as HA
import Html.Attributes.Extra as HAE
import Html.Events as HE
import Html.Events.Extra as HEE
import Icon
import String.Extra
import Svg



{-
   * Button Example:
      Components.Button.view
         |> Components.Button.withText "I am button"
         |> Components.Button.withMsg MyMsg `or` Components.withUrl "some/url"
         |> Components.Button.withDisabled False
         |> Components.Button.withPrimaryStyle `or` Components.withSecondaryStyle
         |> Components.Button.withIcon Icon.close
         |> Components.Button.withSize Button.Size.Small
         |> Components.Button.toHtml

-}


type Action msg
    = Url String
    | Msg msg


type Button constraints msg
    = Button
        { label : String
        , action : Action msg
        , styles : Maybe Size -> String
        , disabled : Bool
        , icon : List (Icon.Size -> Svg.Svg msg)
        , size : Size
        , targetBlank : Bool
        }


type Size
    = Small
    | Medium
    | Large
    | Hero


view : Button { needsText : () } msg
view =
    Button
        { label = ""
        , action = Url "/"
        , styles = buttonPrimaryStyle
        , disabled = False
        , icon = []
        , size = Large
        , targetBlank = False
        }


withText :
    String
    -> Button { constraints | needsText : () } msg
    -> Button { constraints | hasText : (), needsInteractivity : () } msg
withText str (Button constraints) =
    Button { constraints | label = str }


withMsg :
    msg
    -> Button { constraints | hasText : (), needsInteractivity : () } msg
    -> Button { constraints | hasText : (), hasInteractivity : (), needsDisableState : () } msg
withMsg message (Button constraints) =
    Button { constraints | action = Msg message }


withUrl :
    String
    -> Button { constraints | hasText : (), needsInteractivity : () } msg
    -> Button { constraints | hasText : (), hasInteractivity : (), needsDisableState : () } msg
withUrl url (Button constraints) =
    Button { constraints | action = Url url }


withDisabled :
    Bool
    -> Button { constraints | hasText : (), hasInteractivity : (), needsDisableState : () } msg
    -> Button { constraints | hasInteractivity : (), hasText : (), hasDisableState : (), needsStyle : () } msg
withDisabled bool (Button constraints) =
    Button { constraints | disabled = bool }


withPrimaryStyle :
    Button { constraints | hasInteractivity : (), hasText : (), hasDisableState : (), needsStyle : () } msg
    -> Button { constraints | hasInteractivity : (), hasText : (), hasDisableState : (), hasStyle : (), needsClosure : () } msg
withPrimaryStyle (Button constraints) =
    Button { constraints | styles = buttonPrimaryStyle }


withSecondaryStyle :
    Button { constraints | hasInteractivity : (), hasText : (), hasDisableState : (), needsStyle : () } msg
    -> Button { constraints | hasInteractivity : (), hasText : (), hasDisableState : (), hasStyle : (), needsClosure : () } msg
withSecondaryStyle (Button constraints) =
    Button { constraints | styles = buttonSecondaryStyle }


withLinkStyle :
    Button { constraints | hasInteractivity : (), hasText : (), hasDisableState : (), needsStyle : () } msg
    -> Button { constraints | hasInteractivity : (), hasText : (), hasDisableState : (), hasStyle : (), needsClosure : () } msg
withLinkStyle (Button constraints) =
    Button { constraints | styles = buttonLinkStyle }


withNegativeStyle :
    Button { constraints | hasInteractivity : (), hasText : (), hasDisableState : (), needsStyle : () } msg
    -> Button { constraints | hasInteractivity : (), hasText : (), hasDisableState : (), hasStyle : (), needsClosure : () } msg
withNegativeStyle (Button constraints) =
    Button { constraints | styles = buttonNegativeStyle }


withIcon :
    List (Svg.Svg msg)
    ->
        Button
            { constraints | hasInteractivity : (), hasText : (), hasDisableState : (), hasStyle : () }
            msg
    -> Button { constraints | hasInteractivity : (), hasText : (), hasDisableState : (), hasStyle : (), needsClosure : () } msg
withIcon iconLst (Button constraints) =
    Button { constraints | icon = iconLst |> List.map (\i -> \_ -> i) }


withTargetBlank :
    Bool
    ->
        Button
            { constraints | hasInteractivity : (), hasText : (), hasDisableState : (), hasStyle : () }
            msg
    -> Button { constraints | hasInteractivity : (), hasText : (), hasDisableState : (), hasStyle : (), needsClosure : () } msg
withTargetBlank targetBlank (Button constraints) =
    Button { constraints | targetBlank = targetBlank }


withSize :
    Size
    ->
        Button
            { constraints | hasInteractivity : (), hasText : (), hasDisableState : (), hasStyle : () }
            msg
    -> Button { constraints | hasInteractivity : (), hasText : (), hasDisableState : (), hasStyle : (), needsClosure : () } msg
withSize size (Button constraints) =
    Button { constraints | size = size }


toHtml :
    Button { constraints | needsClosure : () } msg
    -> Html msg
toHtml (Button constraints) =
    let
        { label, action, styles, disabled, icon, size, targetBlank } =
            constraints

        commonLstHtml : List (Html msg)
        commonLstHtml =
            [ case icon of
                [ icon_ ] ->
                    Html.div
                        [ HA.class "flex gap-x-1 items-center" ]
                        [ Html.div
                            [ HA.class "" ]
                            [ icon_ Icon.XSmall ]
                        , Html.text label
                        ]

                [ icon_, icon_2 ] ->
                    Html.div
                        [ HA.class "flex items-center" ]
                        [ Html.div
                            [ HA.class "" ]
                            [ icon_ Icon.XSmall
                            ]
                        , Html.div
                            [ HA.class "" ]
                            [ icon_2 Icon.XSmall
                            ]
                        , Html.text label
                        ]

                _ ->
                    Html.text label
            ]
    in
    case action of
        Url url ->
            Html.a
                [ HA.href url
                , HA.class <| styles (Just size)
                , HAE.attributeIf targetBlank (HA.target "_blank")
                ]
                commonLstHtml

        Msg msg ->
            Html.button
                [ HAE.attributeIf (not disabled) (HE.onClick msg)
                , HA.class <|
                    if disabled then
                        buttonDisabledStyle (Just size)

                    else
                        styles (Just size) ++ " cursor-pointer"
                , HA.disabled disabled
                ]
                commonLstHtml


sizeToStyle : Maybe Size -> String
sizeToStyle size =
    case size of
        Just size_ ->
            case size_ of
                Large ->
                    " px-4 py-2 text-md"

                Medium ->
                    " px-3 py-[6px]"

                Small ->
                    " px-[4px] text-xs h-[28px]"

                Hero ->
                    " min-w-[230px] px-4 py-4 text-xl"

        Nothing ->
            ""


buttonPrimaryStyle : Maybe Size -> String
buttonPrimaryStyle size =
    "justify-self-start whitespace-nowrap w-fit flex-start bg-brand-400 border rounded border-brand-400 text-white transition-all hover:bg-brand-600 hover:border-brand-600"
        ++ sizeToStyle size


buttonSecondaryStyle : Maybe Size -> String
buttonSecondaryStyle size =
    "justify-self-start whitespace-nowrap w-fit flex-start bg-white border border-gray-200 rounded text-brand-500 transition-all hover:bg-gray-50"
        ++ sizeToStyle size


buttonNegativeStyle : Maybe Size -> String
buttonNegativeStyle size =
    "w-fit whitespace-nowrap flex-start bg-white border rounded border-red-300 text-red-500 transition-all hover:bg-red-100"
        ++ sizeToStyle size


buttonDisabledStyle : Maybe Size -> String
buttonDisabledStyle size =
    "w-fit whitespace-nowrap flex-start bg-gray-200 border rounded border-gray-300 text-gray-300 transition-all hover:bg-gray-100"
        ++ sizeToStyle size


buttonLinkStyle : Maybe Size -> String
buttonLinkStyle size =
    "w-fit whitespace-nowrap text-brand-300 dark:text-white transition-all hover:text-brand-600 dark:hover:text-gray-300"
        ++ " cursor-pointer"


{-| Should be used for 2-3-4 buttons
-}
viewTabs : String -> (String -> msg) -> List String -> Maybe String -> Dict String (List String) -> Html msg
viewTabs field toMsg lstOfTabs selectedTab errors =
    let
        hasError : Bool
        hasError =
            ErrorUI.hasError field errors

        -- ANNUAL -> Annual review
        humanizedSelectedTab : Maybe String
        humanizedSelectedTab =
            Maybe.map String.Extra.humanize selectedTab
    in
    Html.div []
        [ lstOfTabs
            |> List.indexedMap
                (\index tab ->
                    let
                        selectedTab_ : Maybe String
                        selectedTab_ =
                            Maybe.map String.toLower humanizedSelectedTab

                        tab_ : String
                        tab_ =
                            String.toLower tab

                        overrideStyle : Int -> String
                        overrideStyle i =
                            if i == 0 then
                                " rounded-l"

                            else if i == List.length lstOfTabs - 1 then
                                " rounded-r"

                            else
                                ""
                    in
                    Html.button
                        [ HA.class <|
                            "text-sm text-gray-500 py-2 px-3 text-sm text-gray-500 "
                                ++ overrideStyle index
                                ++ (if hasError then
                                        " border border-red-500 bg-red-100 text-red-500"

                                    else
                                        " border border-transparent"
                                   )
                        , HEE.onClickPreventDefault (toMsg (String.Extra.classify tab_))
                        , HA.classList [ ( "bg-brand-400 text-white hover:bg-brand-600 hover:text-white", selectedTab_ == Just tab_ ) ]
                        , HA.classList [ ( "bg-gray-200", selectedTab_ /= Just tab_ ) ]
                        ]
                        [ Html.text tab ]
                )
            |> Html.div [ HA.class "flex gap-x-[2px]" ]
        , ErrorUI.byFieldName field errors
            |> ErrorUI.withStandaloneField
        ]
