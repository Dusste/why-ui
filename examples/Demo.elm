module Demo exposing (main)

import Browser
import Button
import Dict exposing (Dict)
import Element
import ErrorUI
import Html exposing (Html)
import Html.Attributes as HA
import Html.Events as HE
import Icon
import InputField
import Task
import Time
import Validation


type alias User =
    { email : String
    , role : String
    , name : String
    }


type alias DemoMultiselectItem =
    { id : String
    , label : String
    , disabled : Bool
    }



-- MODEL


type alias Model =
    { zone : Time.Zone
    , now : Time.Posix
    , normalInputFieldValue : String
    , formErrors : Dict String (List String)
    , decimalInputFieldValue : String
    , password : String
    , showPassword : ( String, Bool )
    , cardNumber : String
    , cardExpiration : String
    , cvc : String
    , users : List User
    , userAutocompleteValue : String
    , hasChoosenUser : Bool
    , userAutocompletePhase : Element.AutocompletePhase
    , demoTabSelection : Maybe String
    , lastButtonDemoClick : Maybe String
    , preselectedMultiselectItems : List String
    , multiselectSelections : List String
    , singleselectStatus : Maybe String
    , singleselectSize : Maybe String
    , styleshCheckboxChecked : Bool
    , demoTextareaValue : String
    , demoElementCheckbox : Bool
    , demoThemeSwitchDark : Bool
    , demoPaginationPage : Int
    , demoPaginationPageSize : Int
    , demoDropdownOpen : Bool
    , demoDropdownSelected : Maybe String
    , demoDropdownErrOpen : Bool
    , demoDropdownErrSelected : Maybe String
    , demoModalOpen : Bool
    , demoAccordionOpen : Bool
    , demoAccordion2Open : Bool
    }


initialModel : Model
initialModel =
    { zone = Time.utc
    , now = Time.millisToPosix 0
    , normalInputFieldValue = ""
    , formErrors = Dict.fromList [ ( "normalInputFieldValueError", [ "Field is empty" ] ) ]
    , decimalInputFieldValue = ""
    , password = ""
    , showPassword = ( "password", False )
    , cardNumber = ""
    , cardExpiration = ""
    , cvc = ""
    , users =
        [ { email = "john.doe@example.com"
          , role = "Admin"
          , name = "John Doe"
          }
        , { email = "jane.doe@example.com"
          , role = "User"
          , name = "Jane Doe"
          }
        , { email = "jim.beam@example.com"
          , role = "Admin"
          , name = "Jim Beam"
          }
        ]
    , userAutocompleteValue = ""
    , hasChoosenUser = False
    , userAutocompletePhase = Element.AutocompleteClosed
    , demoTabSelection = Just "AnnualReview"
    , lastButtonDemoClick = Nothing
    , preselectedMultiselectItems = [ "Elm", "Rust", "Haskell" ]
    , multiselectSelections = [ "1" ]
    , singleselectStatus = Nothing
    , singleselectSize = Nothing
    , styleshCheckboxChecked = False
    , demoTextareaValue = "Short note…"
    , demoElementCheckbox = True
    , demoThemeSwitchDark = False
    , demoPaginationPage = 1
    , demoPaginationPageSize = 10
    , demoDropdownOpen = False
    , demoDropdownSelected = Nothing
    , demoDropdownErrOpen = False
    , demoDropdownErrSelected = Nothing
    , demoModalOpen = False
    , demoAccordionOpen = True
    , demoAccordion2Open = False
    }



-- MESSAGES


type Msg
    = Tick Time.Posix
    | GotClock ( Time.Zone, Time.Posix )
    | SetNormalInputFieldValue String
    | SetDecimalInputFieldValue String
    | SetPassword String
    | ShowPassword String Bool
    | SetCardNumberValue String
    | SetCardExpirationValue String
    | SetCvcValue String
    | SetUserAutocompleteValue String
    | SetUserAutocompletePhase Element.AutocompletePhase
    | ChooseUser String
    | SetDemoTab String
    | ButtonDemoClick String
    | SetPreselectedMultiselect (List String)
    | SetElementMultiselect (List String)
    | SetElementSingleselectStatus (Result String String)
    | SetElementSingleselectSize (Result String String)
    | SetStyleshCheckbox Bool
    | SetDemoTextarea String
    | SetDemoElementCheckbox Bool
    | SetDemoThemeSwitch Bool
    | DemoPaginationPage Int
    | DemoPaginationPageSize Int
    | ToggleDemoDropdown
    | SetDemoDropdown String
    | ToggleDemoDropdownErr
    | SetDemoDropdownErr String
    | OpenDemoModal
    | CloseDemoModal
    | ToggleDemoAccordion
    | ToggleDemoAccordion2



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GotClock ( zone, posix ) ->
            ( { model | zone = zone, now = posix }, Cmd.none )

        Tick posix ->
            ( { model | now = posix }, Cmd.none )

        SetNormalInputFieldValue value ->
            let
                resetErrorsPerField : Dict String (List String)
                resetErrorsPerField =
                    Validation.resetErrorsPerField "normalInputFieldValue" model.formErrors
            in
            ( { model | normalInputFieldValue = value, formErrors = resetErrorsPerField }, Cmd.none )

        SetDecimalInputFieldValue value ->
            let
                resetErrorsPerField : Dict String (List String)
                resetErrorsPerField =
                    Validation.resetErrorsPerField "decimalInputFieldValue" model.formErrors
            in
            ( { model | decimalInputFieldValue = value, formErrors = resetErrorsPerField }, Cmd.none )

        SetPassword value ->
            let
                resetErrorsPerField : Dict String (List String)
                resetErrorsPerField =
                    Validation.resetErrorsPerField "password" model.formErrors
            in
            ( { model | password = value, formErrors = resetErrorsPerField }, Cmd.none )

        ShowPassword name showPassword ->
            let
                resetErrorsPerField : Dict String (List String)
                resetErrorsPerField =
                    Validation.resetErrorsPerField "password" model.formErrors
            in
            ( { model | showPassword = ( name, showPassword ), formErrors = resetErrorsPerField }, Cmd.none )

        SetCardExpirationValue value ->
            let
                resetErrorsPerField : Dict String (List String)
                resetErrorsPerField =
                    Validation.resetErrorsPerField "cardExpiration" model.formErrors
            in
            ( { model | cardExpiration = value, formErrors = resetErrorsPerField }, Cmd.none )

        SetCardNumberValue value ->
            let
                resetErrorsPerField : Dict String (List String)
                resetErrorsPerField =
                    Validation.resetErrorsPerField "cardNumber" model.formErrors
            in
            ( { model | cardNumber = value, formErrors = resetErrorsPerField }, Cmd.none )

        SetCvcValue value ->
            let
                resetErrorsPerField : Dict String (List String)
                resetErrorsPerField =
                    Validation.resetErrorsPerField "cvc" model.formErrors
            in
            ( { model | cvc = value, formErrors = resetErrorsPerField }, Cmd.none )

        SetUserAutocompleteValue value ->
            let
                resetErrorsPerField : Dict String (List String)
                resetErrorsPerField =
                    Validation.resetErrorsPerField "userAutocomplete" model.formErrors
            in
            ( { model | userAutocompleteValue = value, formErrors = resetErrorsPerField, hasChoosenUser = False, userAutocompletePhase = Element.AutocompleteFilter }, Cmd.none )

        SetUserAutocompletePhase phase ->
            ( { model | userAutocompletePhase = phase }, Cmd.none )

        ChooseUser user ->
            let
                resetErrorsPerField : Dict String (List String)
                resetErrorsPerField =
                    Validation.resetErrorsPerField "userAutocomplete" model.formErrors
            in
            ( { model
                | userAutocompleteValue = user
                , hasChoosenUser = True
                , userAutocompletePhase = Element.AutocompleteClosed
                , formErrors = resetErrorsPerField
              }
            , Cmd.none
            )

        SetDemoTab tab ->
            ( { model | demoTabSelection = Just tab }, Cmd.none )

        ButtonDemoClick label ->
            ( { model | lastButtonDemoClick = Just label }, Cmd.none )

        SetPreselectedMultiselect selections ->
            ( { model | preselectedMultiselectItems = selections }, Cmd.none )

        SetElementMultiselect selections ->
            ( { model | multiselectSelections = selections }, Cmd.none )

        SetElementSingleselectStatus result ->
            ( { model | singleselectStatus = Result.toMaybe result }, Cmd.none )

        SetElementSingleselectSize result ->
            ( { model | singleselectSize = Result.toMaybe result }, Cmd.none )

        SetStyleshCheckbox checked ->
            ( { model | styleshCheckboxChecked = checked }, Cmd.none )

        SetDemoTextarea value ->
            ( { model | demoTextareaValue = value }, Cmd.none )

        SetDemoElementCheckbox checked ->
            ( { model | demoElementCheckbox = checked }, Cmd.none )

        SetDemoThemeSwitch isDark ->
            ( { model | demoThemeSwitchDark = isDark }, Cmd.none )

        DemoPaginationPage page ->
            ( { model | demoPaginationPage = page }, Cmd.none )

        DemoPaginationPageSize size ->
            ( { model | demoPaginationPage = 1, demoPaginationPageSize = size }, Cmd.none )

        ToggleDemoDropdown ->
            ( { model | demoDropdownOpen = not model.demoDropdownOpen }, Cmd.none )

        SetDemoDropdown value ->
            ( { model | demoDropdownSelected = Just value, demoDropdownOpen = False }, Cmd.none )

        ToggleDemoDropdownErr ->
            ( { model | demoDropdownErrOpen = not model.demoDropdownErrOpen }, Cmd.none )

        SetDemoDropdownErr value ->
            ( { model | demoDropdownErrSelected = Just value, demoDropdownErrOpen = False }, Cmd.none )

        OpenDemoModal ->
            ( { model | demoModalOpen = True }, Cmd.none )

        CloseDemoModal ->
            ( { model | demoModalOpen = False }, Cmd.none )

        ToggleDemoAccordion ->
            ( { model | demoAccordionOpen = not model.demoAccordionOpen }, Cmd.none )

        ToggleDemoAccordion2 ->
            ( { model | demoAccordion2Open = not model.demoAccordion2Open }, Cmd.none )



-- VIEW


demoClickCaption : Maybe String -> Html Msg
demoClickCaption mLabel =
    Html.p
        [ HA.class "text-sm text-gray-600 min-h-[1.25rem]" ]
        [ Html.text <|
            case mLabel of
                Nothing ->
                    "Click a message button to see feedback here."

                Just label ->
                    "Last action: " ++ label
        ]


buttonWithSizeLabel : String -> Html Msg -> Html Msg
buttonWithSizeLabel sizeLabel buttonHtml =
    Html.div
        [ HA.class "flex flex-col gap-1 items-start" ]
        [ Html.span
            [ HA.class "text-xs font-mono text-gray-500" ]
            [ Html.text sizeLabel ]
        , buttonHtml
        ]


demoPaginationTotal : Int
demoPaginationTotal =
    47


demoPaginationLastPage : Int -> Int -> Int
demoPaginationLastPage total pageSize =
    max 1 (ceiling (toFloat total / toFloat pageSize))


msPerDay : Int
msPerDay =
    24 * 60 * 60 * 1000


posixWithDayOffset : Time.Posix -> Int -> Time.Posix
posixWithDayOffset posix days =
    Time.millisToPosix (Time.posixToMillis posix + days * msPerDay)


multiselectDemoItems : List DemoMultiselectItem
multiselectDemoItems =
    [ { id = "1", label = "Alpha", disabled = False }
    , { id = "2", label = "Beta (disabled)", disabled = True }
    , { id = "3", label = "Gamma", disabled = False }
    ]


iconTile : String -> Html Msg -> Html Msg
iconTile name iconHtml =
    Html.div
        [ HA.class "flex flex-col items-center justify-between gap-2 p-3 border border-gray-200 rounded-lg bg-white min-h-[108px] w-[132px]" ]
        [ Html.div
            [ HA.class "flex flex-1 items-center justify-center text-gray-800" ]
            [ iconHtml ]
        , Html.span
            [ HA.class "text-[10px] font-mono text-gray-500 text-center leading-tight break-all w-full" ]
            [ Html.text name ]
        ]


iconGridSection : String -> List ( String, Html Msg ) -> Html Msg
iconGridSection title items =
    Html.div
        [ HA.class "flex flex-col gap-3" ]
        [ Html.h3
            [ HA.class "text-lg" ]
            [ Html.text title ]
        , Html.div
            [ HA.class "flex flex-wrap gap-3" ]
            (List.map (\( name, node ) -> iconTile name node) items)
        ]


iconSizeReference : Html Msg
iconSizeReference =
    Html.div
        [ HA.class "flex flex-col gap-2" ]
        [ Html.h3
            [ HA.class "text-lg" ]
            [ Html.text "Icon.Size and sizeToString" ]
        , Html.p
            [ HA.class "text-xs font-mono text-gray-600 break-all" ]
            [ Html.text <|
                String.join " · "
                    [ "XSmall → " ++ Icon.sizeToString Icon.XSmall
                    , "Small → " ++ Icon.sizeToString Icon.Small
                    , "Medium → " ++ Icon.sizeToString Icon.Medium
                    , "Large → " ++ Icon.sizeToString Icon.Large
                    , "XLarge → " ++ Icon.sizeToString Icon.XLarge
                    ]
            ]
        ]



view : Model -> Html Msg
view model =
    Html.div
        [ HA.class "flex flex-col items-center my-10 h-screen gap-6" ]
        [ Html.h1
            [ HA.class "text-2xl font-bold" ]
            [ Html.text "Why UI" ]
        , Html.div
            [ HA.class "flex flex-col items-center gap-8 mt-10" ]
            [ Html.h2
                [ HA.class "text-lg font-bold" ]
                [ Html.text "Input Fields" ]
            , Html.div
                [ HA.class "w-full flex gap-10" ]
                [ Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Normal Input Field text - with both label and placeholder" ]
                    , InputField.view
                        |> InputField.withValue model.normalInputFieldValue
                        |> InputField.withMsg SetNormalInputFieldValue
                        |> InputField.withType InputField.Text
                        |> InputField.withDisable False
                        |> InputField.withError (ErrorUI.byFieldName "normalInputFieldValue" model.formErrors)
                        |> InputField.withExtraText (InputField.Both "Name" "Normal input field")
                        |> InputField.toHtml
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Input Field text - disabled" ]
                    , InputField.view
                        |> InputField.withValue model.normalInputFieldValue
                        |> InputField.withMsg SetNormalInputFieldValue
                        |> InputField.withType InputField.Text
                        |> InputField.withDisable True
                        |> InputField.withError (ErrorUI.byFieldName "normalInputFieldValue" model.formErrors)
                        |> InputField.withExtraText (InputField.Both "Name" "Disabled input field")
                        |> InputField.toHtml
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Input Field text - with error" ]
                    , InputField.view
                        |> InputField.withValue model.normalInputFieldValue
                        |> InputField.withMsg SetNormalInputFieldValue
                        |> InputField.withType InputField.Text
                        |> InputField.withDisable False
                        |> InputField.withError (ErrorUI.byFieldName "normalInputFieldValueError" model.formErrors)
                        |> InputField.withExtraText (InputField.Both "Name" "Error input field")
                        |> InputField.toHtml
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Input Field numeric " ]
                    , InputField.view
                        |> InputField.withValue model.decimalInputFieldValue
                        |> InputField.withMsg SetDecimalInputFieldValue
                        |> InputField.withType InputField.Decimal
                        |> InputField.withDisable False
                        |> InputField.withError (ErrorUI.byFieldName "decimalInputFieldValue" model.formErrors)
                        |> InputField.withExtraText (InputField.Both "Name" "Decimal input field")
                        |> InputField.toHtml
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Input Field text - password " ]
                    , InputField.view
                        |> InputField.withValue model.password
                        |> InputField.withMsg SetPassword
                        |> InputField.withType
                            (InputField.Password
                                ( "password"
                                , model.showPassword |> Tuple.second
                                , ShowPassword
                                )
                            )
                        |> InputField.withDisable False
                        |> InputField.withError (ErrorUI.byFieldName "password" model.formErrors)
                        |> InputField.withExtraText (InputField.Both "Password" "Password input field")
                        |> InputField.toHtml
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Input Field text - Card expiration " ]
                    , InputField.view
                        |> InputField.withValue model.cardNumber
                        |> InputField.withMsg SetCardNumberValue
                        |> InputField.withType InputField.Text
                        |> InputField.withDisable False
                        |> InputField.withError (ErrorUI.byFieldName "card" model.formErrors)
                        |> InputField.withExtraText (InputField.Both "Card Number" "1234 5678 9012 3456")
                        |> InputField.toHtml
                    , Html.div
                        [ HA.class "flex aling-items gap-4" ]
                        [ InputField.view
                            |> InputField.withValue model.cardExpiration
                            |> InputField.withMsg SetCardExpirationValue
                            |> InputField.withType InputField.Text
                            |> InputField.withDisable False
                            |> InputField.withError (ErrorUI.byFieldName "expiration" model.formErrors)
                            |> InputField.withExtraText (InputField.Both "Expiration (MM/YY)" "12/25")
                            |> InputField.toHtml
                        , InputField.view
                            |> InputField.withValue model.cvc
                            |> InputField.withMsg SetCvcValue
                            |> InputField.withType InputField.Text
                            |> InputField.withDisable False
                            |> InputField.withError (ErrorUI.byFieldName "cvc" model.formErrors)
                            |> InputField.withExtraText (InputField.Both "CVC" "123")
                            |> InputField.toHtml
                        ]
                    ]
                ]
            ]
        , Html.div
            [ HA.class "flex flex-col items-center gap-8 mt-10 w-full max-w-5xl px-4" ]
            [ Html.h2
                [ HA.class "text-lg font-bold" ]
                [ Html.text "Element" ]
            , Html.div
                [ HA.class "w-full flex flex-col gap-10" ]
                [ Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Autocomplete" ]
                    , Element.autocomplete
                        { id = "userAutocomplete"
                        , value = model.userAutocompleteValue
                        , toMsg = SetUserAutocompleteValue
                        , isDisabled = False
                        , options = model.users
                        , errors = ErrorUI.byFieldName "userAutocomplete" model.formErrors
                        , placeholder = InputField.Both "User" "User's name"
                        , phase = model.userAutocompletePhase
                        , onFocus = SetUserAutocompletePhase Element.AutocompleteBrowse
                        , onBlur = SetUserAutocompletePhase Element.AutocompleteClosed
                        , filterListCondition =
                            \u ->
                                String.contains (String.toLower model.userAutocompleteValue) (String.toLower u.name)
                                    || String.contains (String.toLower model.userAutocompleteValue) (String.toLower u.email)
                        , onClick = ChooseUser
                        , itemLabel = .name
                        }
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Preselected multiselect" ]
                    , Html.p
                        [ HA.class "text-sm text-gray-600" ]
                        [ Html.text "Pills reflect the current selection; clicking removes an item from the list." ]
                    , Element.preselectedMultiselect
                        { selections = model.preselectedMultiselectItems
                        , onSelection = SetPreselectedMultiselect
                        , errors = []
                        }
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Multiselect" ]
                    , Element.multiselect
                        { selections = model.multiselectSelections
                        , onSelection = SetElementMultiselect
                        , options = multiselectDemoItems
                        , disabled = False
                        , extraAttrs = []
                        , hint = Nothing
                        , id = "demoMultiselect"
                        , itemLabel = .label
                        , itemId = .id
                        , itemDisabled = .disabled
                        , errors = []
                        }
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Multiselect with errors" ]
                    , Element.multiselect
                        { selections = model.multiselectSelections
                        , onSelection = SetElementMultiselect
                        , options = multiselectDemoItems
                        , disabled = False
                        , extraAttrs = []
                        , hint = Nothing
                        , id = "demoMultiselectErr"
                        , itemLabel = .label
                        , itemId = .id
                        , itemDisabled = .disabled
                        , errors = [ "Select at least one option" ]
                        }
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Singleselect" ]
                    , Element.singleselect
                        { lst = [ "draft", "published", "archived" ]
                        , onSelection = SetElementSingleselectStatus
                        , selected = model.singleselectStatus
                        , errors = []
                        }
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Singleselect with errors" ]
                    , Element.singleselect
                        { lst = [ "small", "medium", "large" ]
                        , onSelection = SetElementSingleselectSize
                        , selected = model.singleselectSize
                        , errors = [ "Choose a size" ]
                        }
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Checkbox and styleshCheckbox" ]
                    , Html.div
                        [ HA.class "flex flex-col gap-3" ]
                        [ Element.checkbox "Agree to terms" SetDemoElementCheckbox model.demoElementCheckbox
                        , Html.div
                            [ HA.class "flex items-center gap-2" ]
                            [ Element.styleshCheckbox SetStyleshCheckbox model.styleshCheckboxChecked
                            , Html.span
                                [ HA.class "text-sm text-gray-600" ]
                                [ Html.text "styleshCheckbox (compact)" ]
                            ]
                        ]
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Textarea" ]
                    , Element.textarea
                        { id = "demoTextarea"
                        , label = Element.LabelAndPlaceholderA "Notes" "Type here…"
                        , value = model.demoTextareaValue
                        , limit = 120
                        , toMsg = SetDemoTextarea
                        , isDisabled = False
                        , error = []
                        }
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Textarea — disabled with error" ]
                    , Element.textarea
                        { id = "demoTextareaErr"
                        , label = Element.PlaceholderLabel "Disabled"
                        , value = "Locked content"
                        , limit = 50
                        , toMsg = always (SetDemoTextarea model.demoTextareaValue)
                        , isDisabled = True
                        , error = [ "Cannot edit this field" ]
                        }
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "viewErrorRow" ]
                    , Html.ul
                        [ HA.class "flex flex-col gap-[2px] max-w-md" ]
                        [ Element.viewErrorRow "First validation message"
                        , Element.viewErrorRow "Second validation message"
                        ]
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Form layout" ]
                    , Element.formLayout "Sign in"
                        [ InputField.view
                            |> InputField.withValue model.normalInputFieldValue
                            |> InputField.withMsg SetNormalInputFieldValue
                            |> InputField.withType InputField.Text
                            |> InputField.withDisable False
                            |> InputField.withError []
                            |> InputField.withExtraText (InputField.Both "Email" "you@example.com")
                            |> InputField.toHtml
                        , buttonWithSizeLabel "Button.Large"
                            (Button.view
                                |> Button.withText "Submit"
                                |> Button.withMsg (ButtonDemoClick "Form layout submit")
                                |> Button.withDisabled False
                                |> Button.withPrimaryStyle
                                |> Button.toHtml
                            )
                        ]
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-2 items-start" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Loading" ]
                    , Element.loadingElement
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-3" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Notification" ]
                    , Html.div
                        [ HA.class "relative h-14 w-full max-w-xl" ]
                        [ Element.notification "0" (Element.Info "Info message") Element.Left
                        ]
                    , Html.div
                        [ HA.class "relative h-14 w-full max-w-xl" ]
                        [ Element.notification "0" (Element.Warning "Warning message") Element.Center
                        ]
                    , Html.div
                        [ HA.class "relative h-14 w-full max-w-xl" ]
                        [ Element.notification "0" (Element.Error "Error message") Element.Right
                        ]
                    , Html.div
                        [ HA.class "relative h-14 w-full max-w-xl" ]
                        [ Element.notification "0" (Element.Success "Success message") Element.Left
                        ]
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "notificationToIcon" ]
                    , Html.div
                        [ HA.class "flex flex-wrap gap-4 items-center text-sm text-gray-600" ]
                        [ Element.notificationToIcon (Element.Info "") "sky"
                        , Element.notificationToIcon (Element.Warning "") "yellow"
                        , Element.notificationToIcon (Element.Error "") "red"
                        , Element.notificationToIcon (Element.Success "") "green"
                        ]
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Notification style helpers (class strings)" ]
                    , Html.p
                        [ HA.class "text-xs font-mono text-gray-500 break-all" ]
                        [ Html.text (Element.notificationAlignToClass Element.Center) ]
                    , Html.p
                        [ HA.class "text-xs font-mono text-gray-500 break-all" ]
                        [ Html.text (Element.notificationIconStyle "sky") ]
                    , Html.p
                        [ HA.class "text-xs font-mono text-gray-500 break-all" ]
                        [ Html.text (Element.notificationWrapperStyle "yellow") ]
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Theme switch" ]
                    , Element.switch SetDemoThemeSwitch model.demoThemeSwitchDark
                    , Html.p
                        [ HA.class "text-sm text-gray-600" ]
                        [ Html.text <|
                            "Dark mode: "
                                ++ (if model.demoThemeSwitchDark then
                                        "on"

                                    else
                                        "off"
                                   )
                        ]
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Pagination" ]
                    , Element.pagination
                        { currentPage = model.demoPaginationPage
                        , pageSize = model.demoPaginationPageSize
                        , isFirstPage = model.demoPaginationPage <= 1
                        , total = demoPaginationTotal
                        , lastPage = demoPaginationLastPage demoPaginationTotal model.demoPaginationPageSize
                        , isLastPage = model.demoPaginationPage >= demoPaginationLastPage demoPaginationTotal model.demoPaginationPageSize
                        , onPageChange = DemoPaginationPage
                        , onPageSizeInput = DemoPaginationPageSize
                        }
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Dropdown" ]
                    , Element.dropdown
                        { label = "Choose role"
                        , field = "demoDropdown"
                        , toggleMsg = ToggleDemoDropdown
                        , lst = [ "Admin", "Editor", "Viewer" ]
                        , isOpened = model.demoDropdownOpen
                        , toMsg = SetDemoDropdown
                        , selected = model.demoDropdownSelected
                        , errors = []
                        }
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Dropdown with errors" ]
                    , Element.dropdown
                        { label = "Status"
                        , field = "demoDropdownErr"
                        , toggleMsg = ToggleDemoDropdownErr
                        , lst = [ "Active", "Paused" ]
                        , isOpened = model.demoDropdownErrOpen
                        , toMsg = SetDemoDropdownErr
                        , selected = model.demoDropdownErrSelected
                        , errors = [ "Required" ]
                        }
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-2 overflow-x-auto" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Basic table" ]
                    , Element.basicTable
                        { th = [ "Name", "Role", "Email" ]
                        , td =
                            [ [ Html.text "John Doe", Html.text "Admin", Html.text "john@example.com" ]
                            , [ Html.text "Jane Doe", Html.text "User", Html.text "jane@example.com" ]
                            ]
                        }
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Date expiry indicator" ]
                    , Html.div
                        [ HA.class "flex flex-wrap gap-4" ]
                        [ Element.dateExpiryIndicatorWidget
                            { nextAudit = posixWithDayOffset model.now 200
                            , timezone = model.zone
                            , currentTime = model.now
                            , event = "review"
                            , referTo = "review"
                            }
                        , Element.dateExpiryIndicatorWidget
                            { nextAudit = posixWithDayOffset model.now 55
                            , timezone = model.zone
                            , currentTime = model.now
                            , event = "review"
                            , referTo = "review"
                            }
                        , Element.dateExpiryIndicatorWidget
                            { nextAudit = posixWithDayOffset model.now -10
                            , timezone = model.zone
                            , currentTime = model.now
                            , event = "review"
                            , referTo = "review"
                            }
                        ]
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Level UI and stringToLevel" ]
                    , Html.div
                        [ HA.class "flex flex-wrap items-end gap-6" ]
                        [ Html.div [ HA.class "flex flex-col gap-1" ]
                            [ Html.span [ HA.class "text-xs text-gray-500" ] [ Html.text "Low" ]
                            , Element.levelUI Element.Low
                            ]
                        , Html.div [ HA.class "flex flex-col gap-1" ]
                            [ Html.span [ HA.class "text-xs text-gray-500" ] [ Html.text "Medium" ]
                            , Element.levelUI Element.Medium
                            ]
                        , Html.div [ HA.class "flex flex-col gap-1" ]
                            [ Html.span [ HA.class "text-xs text-gray-500" ] [ Html.text "High" ]
                            , Element.levelUI Element.High
                            ]
                        ]
                    , Html.p
                        [ HA.class "text-sm text-gray-600" ]
                        [ Html.text <|
                            "stringToLevel \"HIGH\" → "
                                ++ (case Element.stringToLevel "HIGH" of
                                        Just Element.High ->
                                            "Just High"

                                        _ ->
                                            "unexpected"
                                   )
                        ]
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Modal" ]
                    , Button.view
                        |> Button.withText "Open modal"
                        |> Button.withMsg OpenDemoModal
                        |> Button.withDisabled False
                        |> Button.withSecondaryStyle
                        |> Button.withSize Button.Medium
                        |> Button.toHtml
                    , if model.demoModalOpen then
                        Element.viewModal
                            { size = Element.MD
                            , title = Just "Demo modal"
                            , children =
                                Html.div
                                    [ HA.class "flex flex-col gap-4" ]
                                    [ Html.p
                                        [ HA.class "text-gray-600" ]
                                        [ Html.text "Content passed as ModalArgs.children." ]
                                    , Button.view
                                        |> Button.withText "Close"
                                        |> Button.withMsg CloseDemoModal
                                        |> Button.withDisabled False
                                        |> Button.withPrimaryStyle
                                        |> Button.toHtml
                                    ]
                            , onClose = Just CloseDemoModal
                            }

                      else
                        Html.text ""
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Circular progress" ]
                    , Html.div
                        [ HA.class "flex flex-wrap items-end gap-8" ]
                        [ Html.div [ HA.class "flex flex-col gap-1 items-center" ]
                            [ Html.span [ HA.class "text-xs font-mono text-gray-500" ] [ Html.text "Element.S · Percentage" ]
                            , Element.circularProgressBar { sum = 100, count = 72, size = Element.S, shownData = Element.Percentage }
                            ]
                        , Html.div [ HA.class "flex flex-col gap-1 items-center" ]
                            [ Html.span [ HA.class "text-xs font-mono text-gray-500" ] [ Html.text "Element.M · PercentageAndCount" ]
                            , Element.circularProgressBar { sum = 50, count = 20, size = Element.M, shownData = Element.PercentageAndCount }
                            ]
                        , Html.div [ HA.class "flex flex-col gap-1 items-center" ]
                            [ Html.span [ HA.class "text-xs font-mono text-gray-500" ] [ Html.text "Element.L · Count" ]
                            , Element.circularProgressBar { sum = 10, count = 7, size = Element.L, shownData = Element.Count }
                            ]
                        ]
                    ]
                ]
            ]
        , Html.div
            [ HA.class "flex flex-col items-center gap-8 mt-10 w-full max-w-5xl px-4" ]
            [ Html.h2
                [ HA.class "text-lg font-bold" ]
                [ Html.text "Buttons" ]
            , Html.div
                [ HA.class "w-full flex flex-col gap-10" ]
                [ Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Variants and sizes" ]
                    , Html.div
                        [ HA.class "flex flex-wrap items-start gap-3" ]
                        [ buttonWithSizeLabel "Button.Large"
                            (Button.view
                                |> Button.withText "Primary"
                                |> Button.withMsg (ButtonDemoClick "Primary")
                                |> Button.withDisabled False
                                |> Button.withPrimaryStyle
                                |> Button.withSize Button.Large
                                |> Button.toHtml
                            )
                        , buttonWithSizeLabel "Button.Medium"
                            (Button.view
                                |> Button.withText "Secondary"
                                |> Button.withMsg (ButtonDemoClick "Secondary")
                                |> Button.withDisabled False
                                |> Button.withSecondaryStyle
                                |> Button.withSize Button.Medium
                                |> Button.toHtml
                            )
                        , buttonWithSizeLabel "Button.Small"
                            (Button.view
                                |> Button.withText "Negative"
                                |> Button.withMsg (ButtonDemoClick "Negative")
                                |> Button.withDisabled False
                                |> Button.withNegativeStyle
                                |> Button.withSize Button.Small
                                |> Button.toHtml
                            )
                        , buttonWithSizeLabel "Button.Medium"
                            (Button.view
                                |> Button.withText "Link style"
                                |> Button.withMsg (ButtonDemoClick "Link")
                                |> Button.withDisabled False
                                |> Button.withLinkStyle
                                |> Button.withSize Button.Medium
                                |> Button.toHtml
                            )
                        , buttonWithSizeLabel "Button.Large"
                            (Button.view
                                |> Button.withText "Disabled"
                                |> Button.withMsg (ButtonDemoClick "Disabled")
                                |> Button.withDisabled True
                                |> Button.withPrimaryStyle
                                |> Button.toHtml
                            )
                        , buttonWithSizeLabel "Button.Large"
                            (Button.view
                                |> Button.withText "External link"
                                |> Button.withUrl "https://elm-lang.org"
                                |> Button.withDisabled False
                                |> Button.withSecondaryStyle
                                |> Button.withTargetBlank True
                                |> Button.toHtml
                            )
                        , buttonWithSizeLabel "Button.Large"
                            (Button.view
                                |> Button.withText "Save"
                                |> Button.withMsg (ButtonDemoClick "Save with icon")
                                |> Button.withDisabled False
                                |> Button.withPrimaryStyle
                                |> Button.withIcon [ Icon.check "" Icon.Small ]
                                |> Button.toHtml
                            )
                        ]
                    , demoClickCaption model.lastButtonDemoClick
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Hero size" ]
                    , buttonWithSizeLabel "Button.Hero"
                        (Button.view
                            |> Button.withText "Continue"
                            |> Button.withMsg (ButtonDemoClick "Hero")
                            |> Button.withDisabled False
                            |> Button.withPrimaryStyle
                            |> Button.withSize Button.Hero
                            |> Button.toHtml
                        )
                    ]
                , Html.div
                    [ HA.class "flex flex-col gap-2" ]
                    [ Html.h3
                        [ HA.class "text-lg" ]
                        [ Html.text "Tab group (Button.viewTabs)" ]
                    , Button.viewTabs
                        "demoTabs"
                        SetDemoTab
                        [ "Annual review", "Quarterly", "Monthly" ]
                        model.demoTabSelection
                        Dict.empty
                    , Html.p
                        [ HA.class "text-sm text-gray-600" ]
                        [ Html.text <|
                            "Selected: "
                                ++ Maybe.withDefault "(none)" model.demoTabSelection
                        ]
                    ]
                ]
            ]
        , Html.div
            [ HA.class "flex flex-col items-center gap-8 mt-10 w-full max-w-5xl px-4 pb-32" ]
            [ Html.h2
                [ HA.class "text-lg font-bold" ]
                [ Html.text "Icons" ]
            , Html.div
                [ HA.class "w-full flex flex-col gap-10" ]
                [ iconSizeReference
                , iconGridSection "Svg · status (fixed size)"
                    [ ( "Icon.notStarted", Icon.notStarted )
                    , ( "Icon.pending", Icon.pending )
                    , ( "Icon.inProgress", Icon.inProgress )
                    , ( "Icon.underReview", Icon.underReview )
                    , ( "Icon.awaitingAction", Icon.awaitingAction )
                    , ( "Icon.completed", Icon.completed )
                    , ( "Icon.overdue", Icon.overdue )
                    , ( "Icon.notApplicable", Icon.notApplicable )
                    ]
                , iconGridSection "Html · stroke / size"
                    [ ( "Icon.warning", Icon.warning "" Icon.Medium )
                    , ( "Icon.business", Icon.business "" Icon.Medium )
                    , ( "Icon.chat", Icon.chat "" Icon.Medium )
                    , ( "Icon.infoCircle", Icon.infoCircle "" Icon.Medium )
                    , ( "Icon.search", Icon.search "" Icon.Medium )
                    , ( "Icon.arrowRight", Icon.arrowRight "" Icon.Medium )
                    , ( "Icon.download", Icon.download "" Icon.Medium )
                    , ( "Icon.attach", Icon.attach "" Icon.Medium )
                    ]
                , iconGridSection "Html · stroke only"
                    [ ( "Icon.location", Icon.location "" )
                    , ( "Icon.world", Icon.world "" )
                    , ( "Icon.eye", Icon.eye "" )
                    , ( "Icon.upload", Icon.upload "" )
                    ]
                , iconGridSection "Html · no args"
                    [ ( "Icon.arrowDown", Icon.arrowDown )
                    , ( "Icon.arrowUp", Icon.arrowUp )
                    , ( "Icon.arrowLeft", Icon.arrowLeft )
                    , ( "Icon.arrowBack", Icon.arrowBack )
                    , ( "Icon.defaultUser", Icon.defaultUser )
                    ]
                , iconGridSection "Svg · fill string"
                    [ ( "Icon.calendar", Icon.calendar "" )
                    , ( "Icon.mail", Icon.mail "" )
                    , ( "Icon.phone", Icon.phone "" )
                    , ( "Icon.settings", Icon.settings "" )
                    , ( "Icon.filter", Icon.filter "" )
                    , ( "Icon.menuOnLeft", Icon.menuOnLeft "" )
                    , ( "Icon.menuOnTop", Icon.menuOnTop "" )
                    , ( "Icon.minimize", Icon.minimize "" )
                    , ( "Icon.columns", Icon.columns "" )
                    , ( "Icon.export", Icon.export "" )
                    , ( "Icon.reset", Icon.reset "" )
                    , ( "Icon.expand", Icon.expand "" )
                    , ( "Icon.reload", Icon.reload "" )
                    , ( "Icon.pin", Icon.pin "" )
                    , ( "Icon.bell", Icon.bell "" Icon.Medium )
                    , ( "Icon.at", Icon.at "" Icon.Medium )
                    , ( "Icon.file", Icon.file "" Icon.Medium )
                    ]
                , iconGridSection "Svg · fill (or stroke) and size"
                    [ ( "Icon.assessment", Icon.assessment "" Icon.Medium )
                    , ( "Icon.check", Icon.check "" Icon.Medium )
                    , ( "Icon.switch", Icon.switch "" Icon.Medium )
                    , ( "Icon.pencilOnPaper", Icon.pencilOnPaper "" Icon.Medium )
                    , ( "Icon.close", Icon.close "" Icon.Medium )
                    , ( "Icon.home", Icon.home "" Icon.Medium )
                    , ( "Icon.trash", Icon.trash "" Icon.Medium )
                    , ( "Icon.lightbulb", Icon.lightbulb "" Icon.Medium )
                    , ( "Icon.connect", Icon.connect "" Icon.Medium )
                    ]
                ]
            ]
        ]



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Time.every 60000 Tick



-- MAIN


main : Program () Model Msg
main =
    Browser.element
        { init =
            \_ ->
                ( initialModel
                , Task.perform GotClock (Task.map2 Tuple.pair Time.here Time.now)
                )
        , update = update
        , view = view
        , subscriptions = subscriptions
        }
