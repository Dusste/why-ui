module ErrorUI exposing
    ( ErrorResponse
    , buildErrorMessage
    , byFieldName
    , hasError
    , withStandaloneField
    )

import Dict exposing (Dict)
import Html exposing (Html)
import Html.Attributes as HA
import Http
import InputField exposing (inputFieldError)
import Json.Decode
import Json.Decode.Pipeline


type alias ErrorResponse =
    { type_ : String
    , reference : String
    , description : String
    }


type CustomError
    = Concrete ErrorResponse
    | Naive Http.Error


customErrorDecoder : Json.Decode.Decoder CustomError
customErrorDecoder =
    Json.Decode.succeed ErrorResponse
        |> Json.Decode.Pipeline.required "type" Json.Decode.string
        |> Json.Decode.Pipeline.required "reference" Json.Decode.string
        |> Json.Decode.Pipeline.required "description" Json.Decode.string
        |> Json.Decode.map (\errResponse -> Concrete errResponse)


httpBadStatus : String -> Result CustomError value
httpBadStatus jsonStringifyResponse =
    let
        customError =
            Json.Decode.decodeString customErrorDecoder jsonStringifyResponse
    in
    case customError of
        Ok (Concrete customErrorRec) ->
            Err <| Concrete customErrorRec

        Ok (Naive _) ->
            Err <| Naive (Http.BadBody "Something went wrong")

        Err decodeError ->
            Err <| Naive (Http.BadBody (Json.Decode.errorToString decodeError))


buildCustomErrorMsg : a -> Http.Response String -> Result CustomError a
buildCustomErrorMsg customResponse response =
    case response of
        Http.BadUrl_ url ->
            Err <| Naive (Http.BadUrl url)

        Http.Timeout_ ->
            Err <| Naive Http.Timeout

        Http.BadStatus_ metadata jsonStringifyResponse ->
            httpBadStatus jsonStringifyResponse

        Http.NetworkError_ ->
            Err <| Naive Http.NetworkError

        Http.GoodStatus_ _ _ ->
            Ok customResponse


buildErrorMessage : Http.Error -> String
buildErrorMessage httpError =
    case httpError of
        Http.BadUrl message ->
            -- TODO shouldn't display full message as it might reveal sensitive information
            message

        Http.Timeout ->
            "Server is taking too long to respond. Please try again later."

        Http.NetworkError ->
            "Unable to reach server."

        Http.BadStatus statusCode ->
            "Request failed with status code: " ++ String.fromInt statusCode

        Http.BadBody message ->
            -- TODO shouldn't display full message as it might reveal sensitive information
            message


byFieldName : String -> Dict String (List String) -> List String
byFieldName field errors =
    errors
        |> Dict.get field
        |> Maybe.withDefault []


{-| Returns True if has error by given field
-}
hasError : String -> Dict String (List String) -> Bool
hasError field errors =
    byFieldName field errors
        |> List.length
        |> (/=) 0


{-| For form fields that are not InputField element,
but we want it to have same errors UI
-}
withStandaloneField : List String -> Html msg
withStandaloneField lst =
    if List.isEmpty lst then
        Html.text ""

    else
        Html.div [ HA.class "mt-1" ]
            (List.map
                inputFieldError
                lst
            )



-- {-| This is usefull with larger non-standard Error notification
-- -}
-- toHtml : String -> Dict String (List String) -> Html msg
-- toHtml field errors =
--     let
--         errors_ : List String
--         errors_ =
--             errors
--                 |> Dict.get field
--                 |> Maybe.withDefault []
--     in
--     Html.div []
--         (List.map
--             (\error ->
--                 Element.notification (Element.Error error)
--             )
--             errors_
--         )
