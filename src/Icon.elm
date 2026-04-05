module Icon exposing (..)

import Colors exposing (..)
import Html
import Maybe.Extra
import Svg exposing (Svg)
import Svg.Attributes as SA
import Svg.Events


type Size
    = XSmall
    | Small
    | Medium
    | Large
    | XLarge


sizeToString : Size -> String
sizeToString size_ =
    case size_ of
        XSmall ->
            "10"

        Small ->
            "15"

        Medium ->
            "20"

        Large ->
            "24"

        XLarge ->
            "50"


assessment : String -> Size -> Svg msg
assessment stroke size =
    Svg.svg
        [ SA.fill <|
            if stroke == "" then
                "currentColor"

            else
                tailwindColorToColor stroke
        , SA.width <| sizeToString size ++ "px"
        , SA.height <| sizeToString size ++ "px"
        , SA.viewBox "0 0 24 24"
        ]
        [ Svg.path
            [ SA.d "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"
            ]
            []
        ]


notStarted : Svg msg
notStarted =
    Svg.svg
        [ SA.width "20", SA.height "20", SA.viewBox "0 0 24 24", SA.fill "none", SA.stroke "currentColor", SA.strokeWidth "2", SA.strokeLinecap "round", SA.strokeLinejoin "round" ]
        [ Svg.circle
            [ SA.cx "12", SA.cy "12", SA.r "10" ]
            []
        , Svg.polyline
            [ SA.points "12 6 12 12 16 14" ]
            []
        ]


pending : Svg msg
pending =
    Svg.svg
        [ SA.width "20"
        , SA.height "20"
        , SA.viewBox "0 0 24 24"
        , SA.fill "none"
        , SA.stroke "currentColor"
        , SA.strokeWidth "2"
        , SA.strokeLinecap "round"
        , SA.strokeLinejoin "round"
        ]
        [ Svg.circle
            [ SA.cx "12", SA.cy "12", SA.r "10" ]
            []
        , Svg.path
            [ SA.d "M12 6v6l4 2" ]
            []
        ]


inProgress : Svg msg
inProgress =
    Svg.svg
        [ SA.fill "currentColor"
        , SA.width "24px"
        , SA.height "24px"
        , SA.viewBox "0 0 1920 1920"
        ]
        [ Svg.path
            [ SA.d "M320.006 960.032c0 352.866 287.052 639.974 640.026 639.974 173.767 0 334.093-69.757 451.938-188.072l-211.928-211.912h480.019v479.981l-155.046-155.114C1377.649 1672.883 1177.24 1760 960.032 1760 518.814 1760 160 1401.134 160 960.032ZM959.968 160C1401.186 160 1760 518.866 1760 959.968h-160.006c0-352.866-287.052-639.974-640.026-639.974-173.767 0-334.093 69.757-451.938 188.072l211.928 211.912H239.94V239.997L394.985 395.03C542.351 247.117 742.76 160 959.968 160Z"
            , SA.fillRule "evenodd"
            ]
            []
        ]


underReview : Svg msg
underReview =
    Svg.svg
        [ SA.width "20"
        , SA.height "20"
        , SA.viewBox "0 0 24 24"
        , SA.fill "none"
        , SA.stroke "currentColor"
        , SA.strokeWidth "2"
        , SA.strokeLinecap "round"
        , SA.strokeLinejoin "round"
        ]
        [ Svg.path
            [ SA.d "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" ]
            []
        , Svg.circle
            [ SA.cx "12", SA.cy "12", SA.r "3" ]
            []
        ]


awaitingAction : Svg msg
awaitingAction =
    Svg.svg
        [ SA.width "20"
        , SA.height "20"
        , SA.viewBox "0 0 24 24"
        , SA.fill "none"
        , SA.stroke "currentColor"
        , SA.strokeWidth "2"
        , SA.strokeLinecap "round"
        , SA.strokeLinejoin "round"
        ]
        [ Svg.path
            [ SA.d "M10.29 3.86L1.82 18a1 1 0 0 0 .86 1.5h18.64a1 1 0 0 0 .86-1.5L13.71 3.86a1 1 0 0 0-1.72 0z" ]
            []
        , Svg.line
            [ SA.x1 "12", SA.y1 "9", SA.x2 "12", SA.y2 "13" ]
            []
        , Svg.line
            [ SA.x1 "12", SA.y1 "17", SA.x2 "12.01", SA.y2 "17" ]
            []
        ]


completed : Svg msg
completed =
    Svg.svg
        [ SA.width "20"
        , SA.height "20"
        , SA.viewBox "0 0 24 24"
        , SA.fill "none"
        , SA.stroke "currentColor"
        , SA.strokeWidth "2"
        , SA.strokeLinecap "round"
        , SA.strokeLinejoin "round"
        ]
        [ Svg.path
            [ SA.d "M20 6L9 17l-5-5" ]
            []
        ]


overdue : Svg msg
overdue =
    Svg.svg
        [ SA.width "20"
        , SA.height "20"
        , SA.viewBox "0 0 24 24"
        , SA.fill "none"
        , SA.stroke "currentColor"
        , SA.strokeWidth "2"
        , SA.strokeLinecap "round"
        , SA.strokeLinejoin "round"
        ]
        [ Svg.circle
            [ SA.cx "12", SA.cy "12", SA.r "10" ]
            []
        , Svg.line
            [ SA.x1 "12", SA.y1 "8", SA.x2 "12", SA.y2 "12" ]
            []
        , Svg.line
            [ SA.x1 "12", SA.y1 "16", SA.x2 "12.01", SA.y2 "16" ]
            []
        ]


notApplicable : Svg msg
notApplicable =
    Svg.svg
        [ SA.width "20"
        , SA.height "20"
        , SA.viewBox "0 0 24 24"
        , SA.fill "none"
        , SA.stroke "currentColor"
        , SA.strokeWidth "2"
        , SA.strokeLinecap "round"
        , SA.strokeLinejoin "round"
        ]
        [ Svg.line
            [ SA.x1 "18", SA.y1 "6", SA.x2 "6", SA.y2 "18" ]
            []
        , Svg.line
            [ SA.x1 "6", SA.y1 "6", SA.x2 "18", SA.y2 "18" ]
            []
        ]


warning : String -> Size -> Html.Html msg
warning stroke size =
    Svg.svg
        [ SA.viewBox "0 0 24 24"
        , SA.fill "none"
        , SA.width <| sizeToString size ++ "px"
        ]
        [ Svg.path
            [ SA.d "M12 17.0001H12.01M12 10.0001V14.0001M6.41209 21.0001H17.588C19.3696 21.0001 20.2604 21.0001 20.783 20.6254C21.2389 20.2985 21.5365 19.7951 21.6033 19.238C21.6798 18.5996 21.2505 17.819 20.3918 16.2579L14.8039 6.09805C13.8897 4.4359 13.4326 3.60482 12.8286 3.32987C12.3022 3.09024 11.6978 3.09024 11.1714 3.32987C10.5674 3.60482 10.1103 4.4359 9.19614 6.09805L3.6082 16.2579C2.74959 17.819 2.32028 18.5996 2.39677 19.238C2.46351 19.7951 2.76116 20.2985 3.21709 20.6254C3.7396 21.0001 4.63043 21.0001 6.41209 21.0001Z"
            , SA.stroke <|
                if stroke == "" then
                    "currentColor"

                else
                    tailwindColorToColor stroke
            , SA.strokeWidth "2"
            , SA.strokeLinecap "round"
            , SA.strokeLinejoin "round"
            ]
            []
        ]


location : String -> Html.Html msg
location stroke =
    Svg.svg
        [ SA.width "24px"
        , SA.height "24px"
        , SA.viewBox "0 0 24 24"
        , SA.fill "none"
        ]
        [ Svg.path
            [ SA.d "M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
            , SA.stroke <|
                if stroke == "" then
                    "currentColor"

                else
                    tailwindColorToColor stroke
            , SA.strokeWidth "2"
            , SA.strokeLinecap "round"
            , SA.strokeLinejoin "round"
            ]
            []
        , Svg.path
            [ SA.d "M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
            , SA.stroke <|
                if stroke == "" then
                    "currentColor"

                else
                    tailwindColorToColor stroke
            , SA.strokeWidth "2"
            , SA.strokeLinecap "round"
            , SA.strokeLinejoin "round"
            ]
            []
        ]


world : String -> Html.Html msg
world stroke =
    Svg.svg
        [ SA.width "24px"
        , SA.height "24px"
        , SA.viewBox "0 0 24 24"
        , SA.fill "none"
        ]
        [ Svg.path
            [ SA.fillRule "evenodd"
            , SA.clipRule "evenodd"
            , SA.d "M6.15407 7.30116C7.52877 5.59304 9.63674 4.5 12 4.5C12.365 4.5 12.7238 4.52607 13.0748 4.57644L13.7126 5.85192L11.2716 8.2929L8.6466 8.6679L7.36009 9.95441L6.15407 7.30116ZM5.2011 8.82954C4.75126 9.79256 4.5 10.8669 4.5 12C4.5 15.6945 7.17133 18.7651 10.6878 19.3856L11.0989 18.7195L8.8147 15.547L10.3741 13.5256L9.63268 13.1549L6.94027 13.6036L6.41366 11.4972L5.2011 8.82954ZM7.95559 11.4802L8.05962 11.8964L9.86722 11.5951L11.3726 12.3478L14.0824 11.9714L18.9544 14.8135C19.3063 13.9447 19.5 12.995 19.5 12C19.5 8.93729 17.6642 6.30336 15.033 5.13856L15.5377 6.1481L11.9787 9.70711L9.35371 10.0821L7.95559 11.4802ZM18.2539 16.1414C16.9774 18.0652 14.8369 19.366 12.3859 19.4902L12.9011 18.6555L10.6853 15.578L12.0853 13.7632L13.7748 13.5286L18.2539 16.1414ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z"
            , SA.fill <|
                if stroke == "" then
                    "currentColor"

                else
                    tailwindColorToColor stroke
            ]
            []
        ]


business : String -> Size -> Html.Html msg
business stroke size =
    Svg.svg
        [ SA.width <| sizeToString size ++ "px"
        , SA.height <| sizeToString size ++ "px"
        , SA.viewBox "0 0 1024 1024"
        ]
        [ Svg.path
            [ SA.fill <|
                if stroke == "" then
                    "currentColor"

                else
                    tailwindColorToColor stroke
            , SA.d "M128 384h768v-64a64 64 0 0 0-64-64H192a64 64 0 0 0-64 64v64zm0 64v320a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64V448H128zm64-256h640a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H192A128 128 0 0 1 64 768V320a128 128 0 0 1 128-128z"
            ]
            []
        , Svg.path
            [ SA.fill <|
                if stroke == "" then
                    "currentColor"

                else
                    tailwindColorToColor stroke
            , SA.d "M384 128v64h256v-64H384zm0-64h256a64 64 0 0 1 64 64v64a64 64 0 0 1-64 64H384a64 64 0 0 1-64-64v-64a64 64 0 0 1 64-64z"
            ]
            []
        ]


chat : String -> Size -> Html.Html msg
chat stroke size =
    Svg.svg
        [ SA.width <| sizeToString size ++ "px"
        , SA.height <| sizeToString size ++ "px"
        , SA.viewBox "0 0 24 24"
        ]
        [ Svg.defs
            []
            [ Svg.style []
                [ Html.text <|
                    ".cls-1{fill:none;stroke:"
                        ++ (if stroke == "" then
                                "currentColor"

                            else
                                tailwindColorToColor stroke
                           )
                        ++ ";stroke-miterlimit:10;stroke-width:1.91px;}"
                ]
            ]
        , Svg.path
            [ SA.class "cls-1"
            , SA.d "M18.68,8.16V15.8a2.86,2.86,0,0,1-2.86,2.86H13.91v2.86L8.18,18.66H4.36A2.86,2.86,0,0,1,1.5,15.8V8.16A2.86,2.86,0,0,1,4.36,5.3H15.82A2.86,2.86,0,0,1,18.68,8.16Z"
            ]
            []
        , Svg.path
            [ SA.class "cls-1"
            , SA.d "M18.68,14.84h1A2.86,2.86,0,0,0,22.5,12V4.34a2.86,2.86,0,0,0-2.86-2.86H8.18A2.86,2.86,0,0,0,5.32,4.34v1"
            ]
            []
        , Svg.line
            [ SA.class "cls-1"
            , SA.x1 "5.32"
            , SA.y1 "11.98"
            , SA.x2 "7.23"
            , SA.y2 "11.98"
            ]
            []
        , Svg.line
            [ SA.class "cls-1"
            , SA.x1 "9.14"
            , SA.y1 "11.98"
            , SA.x2 "11.05"
            , SA.y2 "11.98"
            ]
            []
        , Svg.line
            [ SA.class "cls-1"
            , SA.x1 "12.95"
            , SA.y1 "11.98"
            , SA.x2 "14.86"
            , SA.y2 "11.98"
            ]
            []
        ]


infoCircle : String -> Size -> Html.Html msg
infoCircle stroke size =
    Svg.svg
        [ SA.width <| sizeToString size ++ "px"
        , SA.height <| sizeToString size ++ "px"
        , SA.viewBox "0 0 24 24"
        , SA.fill "none"
        ]
        [ Svg.path
            [ SA.d "M12 7C12.5523 7 13 7.44772 13 8V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V8C11 7.44772 11.4477 7 12 7Z"
            , SA.fill <|
                if stroke == "" then
                    "currentColor"

                else
                    tailwindColorToColor stroke
            ]
            []
        , Svg.path
            [ SA.d "M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z"
            , SA.fill <|
                if stroke == "" then
                    "currentColor"

                else
                    tailwindColorToColor stroke
            ]
            []
        , Svg.path
            [ SA.fillRule "evenodd"
            , SA.clipRule "evenodd"
            , SA.d "M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z"
            , SA.fill <|
                if stroke == "" then
                    "currentColor"

                else
                    tailwindColorToColor stroke
            ]
            []
        ]


arrowDown : Html.Html msg
arrowDown =
    Svg.svg
        [ SA.viewBox "0 -4.5 20 20"
        , SA.width "15px"
        , SA.height "15px"
        ]
        [ Svg.g
            [ SA.stroke "none", SA.strokeWidth "1", SA.fill "currentColor", SA.fillRule "evenodd" ]
            [ Svg.g
                [ SA.transform "translate(-180.000000, -6684.000000)", SA.fill "currentColor" ]
                [ Svg.g
                    [ SA.transform "translate(56.000000, 160.000000)" ]
                    [ Svg.path
                        [ SA.d "M144,6525.39 L142.594,6524 L133.987,6532.261 L133.069,6531.38 L133.074,6531.385 L125.427,6524.045 L124,6525.414 C126.113,6527.443 132.014,6533.107 133.987,6535 C135.453,6533.594 134.024,6534.965 144,6525.39" ]
                        []
                    ]
                ]
            ]
        ]


arrowUp : Html.Html msg
arrowUp =
    Svg.svg
        [ SA.viewBox "0 -4.5 20 20"
        , SA.width "15px"
        , SA.height "15px"
        ]
        [ Svg.g
            [ SA.stroke "none", SA.strokeWidth "1", SA.fill "currentColor", SA.fillRule "evenodd" ]
            [ Svg.g
                [ SA.transform "translate(-180.000000, -6684.000000)", SA.fill "currentColor" ]
                [ Svg.g
                    [ SA.transform "translate(56.000000, 160.000000)" ]
                    [ Svg.path
                        [ SA.d "M144,6535 L142.594,6536.39 L133.987,6528.129 L133.069,6529.01 L133.074,6529.005 L125.427,6536.345 L124,6534.976 C126.113,6532.947 132.014,6527.283 133.987,6525.39 C135.453,6526.796 134.024,6525.425 144,6535" ]
                        []
                    ]
                ]
            ]
        ]


arrowLeft : Html.Html msg
arrowLeft =
    Svg.svg
        [ SA.viewBox "0 -4.5 20 20"
        , SA.width "15px"
        , SA.height "15px"
        , SA.transform "rotate(-90 0 0)"
        ]
        [ Svg.g
            [ SA.stroke "none", SA.strokeWidth "1", SA.fill "currentColor", SA.fillRule "evenodd" ]
            [ Svg.g
                [ SA.transform "translate(-180.000000, -6684.000000)", SA.fill "currentColor" ]
                [ Svg.g
                    [ SA.transform "translate(56.000000, 160.000000)" ]
                    [ Svg.path
                        [ SA.d "M144,6535 L142.594,6536.39 L133.987,6528.129 L133.069,6529.01 L133.074,6529.005 L125.427,6536.345 L124,6534.976 C126.113,6532.947 132.014,6527.283 133.987,6525.39 C135.453,6526.796 134.024,6525.425 144,6535" ]
                        []
                    ]
                ]
            ]
        ]


arrowBack : Html.Html msg
arrowBack =
    Svg.svg
        [ SA.width "40px"
        , SA.height "auto"
        , SA.viewBox "0 0 25 25"
        , SA.fill "none"
        ]
        [ Svg.path
            [ SA.d "M5 12H19M5 12L11 6M5 12L11 18"
            , SA.stroke "currentColor"
            , SA.fill "currentColor"
            , SA.strokeWidth "2"
            , SA.strokeLinecap "round"
            , SA.strokeLinejoin "round"
            ]
            []
        ]


search : String -> Size -> Html.Html msg
search fill size =
    Svg.svg
        [ SA.width <| sizeToString size ++ "px"
        , SA.height <| sizeToString size ++ "px"
        , SA.viewBox "0 -0.5 25 25"
        , SA.fill "none"
        ]
        [ Svg.path
            [ SA.fillRule "evenodd"
            , SA.clipRule "evenodd"
            , SA.d "M5.5 10.7655C5.50003 8.01511 7.44296 5.64777 10.1405 5.1113C12.8381 4.57483 15.539 6.01866 16.5913 8.55977C17.6437 11.1009 16.7544 14.0315 14.4674 15.5593C12.1804 17.0871 9.13257 16.7866 7.188 14.8415C6.10716 13.7604 5.49998 12.2942 5.5 10.7655Z"
            , SA.stroke <|
                if fill == "" then
                    "currentColor"

                else
                    tailwindColorToColor fill
            , SA.strokeWidth "1.5"
            , SA.strokeLinecap "round"
            , SA.strokeLinejoin "round"
            ]
            []
        , Svg.path
            [ SA.d "M17.029 16.5295L19.5 19.0005"
            , SA.stroke <|
                if fill == "" then
                    "currentColor"

                else
                    tailwindColorToColor fill
            , SA.strokeWidth "1.5"
            , SA.strokeLinecap "round"
            , SA.strokeLinejoin "round"
            ]
            []
        ]


calendar : String -> Svg msg
calendar fill =
    Svg.svg
        [ SA.width "24px"
        , SA.height "24px"
        , SA.viewBox "0 0 24 24"
        , SA.fill "none"
        ]
        [ Svg.path
            [ SA.d "M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M8 3V7M16 3V7"
            , SA.stroke <|
                if fill == "" then
                    "currentColor"

                else
                    tailwindColorToColor fill
            , SA.strokeWidth "2"
            , SA.strokeLinecap "round"
            ]
            []
        , Svg.rect
            [ SA.x "6"
            , SA.y "12"
            , SA.width "3"
            , SA.height "3"
            , SA.rx "0.5"
            , SA.fill <|
                if fill == "" then
                    "currentColor"

                else
                    tailwindColorToColor fill
            ]
            []
        , Svg.rect
            [ SA.x "10.5"
            , SA.y "12"
            , SA.width "3"
            , SA.height "3"
            , SA.rx "0.5"
            , SA.fill <|
                if fill == "" then
                    "currentColor"

                else
                    tailwindColorToColor fill
            ]
            []
        , Svg.rect
            [ SA.x "15"
            , SA.y "12"
            , SA.width "3"
            , SA.height "3"
            , SA.rx "0.5"
            , SA.fill <|
                if fill == "" then
                    "currentColor"

                else
                    tailwindColorToColor fill
            ]
            []
        ]


arrowRight : String -> Size -> Html.Html msg
arrowRight fill size =
    Svg.svg
        [ SA.viewBox "0 -4.5 20 20"
        , SA.width <| sizeToString size ++ "px"
        , SA.height <| sizeToString size ++ "px"
        , SA.transform "rotate(90 0 0)"
        ]
        [ Svg.g
            [ SA.stroke "none", SA.strokeWidth "1", SA.fill "currentColor", SA.fillRule "evenodd" ]
            [ Svg.g
                [ SA.transform "translate(-180.000000, -6684.000000)"
                , SA.fill <|
                    if fill == "" then
                        "currentColor"

                    else
                        tailwindColorToColor fill
                ]
                [ Svg.g
                    [ SA.transform "translate(56.000000, 160.000000)" ]
                    [ Svg.path
                        [ SA.d "M144,6535 L142.594,6536.39 L133.987,6528.129 L133.069,6529.01 L133.074,6529.005 L125.427,6536.345 L124,6534.976 C126.113,6532.947 132.014,6527.283 133.987,6525.39 C135.453,6526.796 134.024,6525.425 144,6535" ]
                        []
                    ]
                ]
            ]
        ]


eye : String -> Html.Html msg
eye overrideColor =
    Svg.svg
        [ SA.width "24px"
        , SA.fill <|
            if overrideColor == "" then
                "currentColor"

            else
                tailwindColorToColor overrideColor
        , SA.viewBox "0 0 442.04 442.04"
        , SA.xmlSpace "preserve"
        ]
        [ Svg.g
            []
            [ Svg.g []
                [ Svg.path [ SA.d "M221.02,341.304c-49.708,0-103.206-19.44-154.71-56.22C27.808,257.59,4.044,230.351,3.051,229.203\n\t\t\tc-4.068-4.697-4.068-11.669,0-16.367c0.993-1.146,24.756-28.387,63.259-55.881c51.505-36.777,105.003-56.219,154.71-56.219\n\t\t\tc49.708,0,103.207,19.441,154.71,56.219c38.502,27.494,62.266,54.734,63.259,55.881c4.068,4.697,4.068,11.669,0,16.367\n\t\t\tc-0.993,1.146-24.756,28.387-63.259,55.881C324.227,321.863,270.729,341.304,221.02,341.304z M29.638,221.021\n\t\t\tc9.61,9.799,27.747,27.03,51.694,44.071c32.83,23.361,83.714,51.212,139.688,51.212s106.859-27.851,139.688-51.212\n\t\t\tc23.944-17.038,42.082-34.271,51.694-44.071c-9.609-9.799-27.747-27.03-51.694-44.071\n\t\t\tc-32.829-23.362-83.714-51.212-139.688-51.212s-106.858,27.85-139.688,51.212C57.388,193.988,39.25,211.219,29.638,221.021z" ] []
                ]
            , Svg.g []
                [ Svg.path [ SA.d "M221.02,298.521c-42.734,0-77.5-34.767-77.5-77.5c0-42.733,34.766-77.5,77.5-77.5c18.794,0,36.924,6.814,51.048,19.188\n\t\t\tc5.193,4.549,5.715,12.446,1.166,17.639c-4.549,5.193-12.447,5.714-17.639,1.166c-9.564-8.379-21.844-12.993-34.576-12.993\n\t\t\tc-28.949,0-52.5,23.552-52.5,52.5s23.551,52.5,52.5,52.5c28.95,0,52.5-23.552,52.5-52.5c0-6.903,5.597-12.5,12.5-12.5\n\t\t\ts12.5,5.597,12.5,12.5C298.521,263.754,263.754,298.521,221.02,298.521z" ]
                    []
                , Svg.g []
                    [ Svg.path [ SA.d "M221.02,246.021c-13.785,0-25-11.215-25-25s11.215-25,25-25c13.786,0,25,11.215,25,25S234.806,246.021,221.02,246.021z" ] []
                    ]
                ]
            ]
        ]


upload : String -> Html.Html msg
upload overrideColor =
    Svg.svg
        [ SA.viewBox "0 0 24 24"
        , SA.width "24px"
        , SA.height "24px"
        , SA.fill <|
            if overrideColor == "" then
                "currentColor"

            else
                tailwindColorToColor overrideColor
        ]
        [ Svg.path
            [ SA.d "M12.5535 2.49392C12.4114 2.33852 12.2106 2.25 12 2.25C11.7894 2.25 11.5886 2.33852 11.4465 2.49392L7.44648 6.86892C7.16698 7.17462 7.18822 7.64902 7.49392 7.92852C7.79963 8.20802 8.27402 8.18678 8.55352 7.88108L11.25 4.9318V16C11.25 16.4142 11.5858 16.75 12 16.75C12.4142 16.75 12.75 16.4142 12.75 16V4.9318L15.4465 7.88108C15.726 8.18678 16.2004 8.20802 16.5061 7.92852C16.8118 7.64902 16.833 7.17462 16.5535 6.86892L12.5535 2.49392Z"
            , SA.fill <|
                if overrideColor == "" then
                    "currentColor"

                else
                    tailwindColorToColor overrideColor
            ]
            []
        , Svg.path
            [ SA.d "M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z"
            , SA.fill <|
                if overrideColor == "" then
                    "currentColor"

                else
                    tailwindColorToColor overrideColor
            ]
            []
        ]


download : String -> Size -> Html.Html msg
download overrideColor size =
    Svg.svg
        [ SA.width <| sizeToString size ++ "px"
        , SA.height <| sizeToString size ++ "px"
        , SA.viewBox "0 0 24 24"
        , SA.fill "none"
        ]
        [ Svg.path
            [ SA.d "M12.5535 16.5061C12.4114 16.6615 12.2106 16.75 12 16.75C11.7894 16.75 11.5886 16.6615 11.4465 16.5061L7.44648 12.1311C7.16698 11.8254 7.18822 11.351 7.49392 11.0715C7.79963 10.792 8.27402 10.8132 8.55352 11.1189L11.25 14.0682V3C11.25 2.58579 11.5858 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V14.0682L15.4465 11.1189C15.726 10.8132 16.2004 10.792 16.5061 11.0715C16.8118 11.351 16.833 11.8254 16.5535 12.1311L12.5535 16.5061Z"
            , SA.fill <|
                if overrideColor == "" then
                    "currentColor"

                else
                    tailwindColorToColor overrideColor
            ]
            []
        , Svg.path
            [ SA.d "M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z"
            , SA.fill <|
                if overrideColor == "" then
                    "currentColor"

                else
                    tailwindColorToColor overrideColor
            ]
            []
        ]


attach : String -> Size -> Html.Html msg
attach overrideColor size =
    Svg.svg
        [ SA.width <| sizeToString size ++ "px"
        , SA.height <| sizeToString size ++ "px"
        , SA.viewBox "0 0 24 24"
        , SA.fill "none"
        ]
        [ Svg.g
            [ SA.id "style=stroke"
            ]
            [ Svg.g
                [ SA.id "attach"
                ]
                [ Svg.path
                    [ SA.id "vector (Stroke)"
                    , SA.fillRule "evenodd"
                    , SA.clipRule "evenodd"
                    , SA.d "M17.3656 4.70536C16.2916 3.63142 14.5504 3.63142 13.4765 4.70536L5.34477 12.8371C3.68504 14.4968 3.68504 17.1878 5.34477 18.8475C7.0045 20.5072 9.69545 20.5072 11.3552 18.8475L20.1172 10.0855C20.41 9.79263 20.8849 9.79263 21.1778 10.0855C21.4707 10.3784 21.4707 10.8533 21.1778 11.1462L12.4158 19.9082C10.1703 22.1537 6.52963 22.1537 4.28411 19.9082C2.0386 17.6626 2.0386 14.0219 4.28411 11.7764L12.4158 3.6447C14.0756 1.98497 16.7665 1.98497 18.4262 3.6447C20.086 5.30443 20.086 7.99538 18.4262 9.65511L10.6327 17.4487C9.55876 18.5226 7.81756 18.5226 6.74361 17.4487C5.66967 16.3747 5.66967 14.6335 6.74361 13.5596L13.9377 6.36552C14.2305 6.07263 14.7054 6.07263 14.9983 6.36552C15.2912 6.65842 15.2912 7.13329 14.9983 7.42618L7.80427 14.6202C7.31612 15.1084 7.31612 15.8998 7.80427 16.388C8.29243 16.8761 9.08389 16.8761 9.57204 16.388L17.3656 8.59445C18.4395 7.5205 18.4395 5.7793 17.3656 4.70536Z"
                    , SA.fill <|
                        if overrideColor == "" then
                            "currentColor"

                        else
                            tailwindColorToColor overrideColor
                    ]
                    []
                ]
            ]
        ]


defaultUser : Html.Html msg
defaultUser =
    Svg.svg
        [ SA.viewBox "0 0 24 24"
        , SA.width "24px"
        , SA.height "24px"
        , SA.fill "currentColor"
        ]
        [ Svg.path
            [ SA.d "M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
            , SA.stroke "currentColor"
            , SA.strokeWidth "2"
            , SA.strokeLinecap "round"
            , SA.strokeLinejoin "round"
            ]
            []
        , Svg.path
            [ SA.d "M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
            , SA.stroke "currentColor"
            , SA.strokeWidth "2"
            , SA.strokeLinecap "round"
            , SA.strokeLinejoin "round"
            ]
            []
        ]


mail : String -> Svg msg
mail stroke =
    Svg.svg
        [ SA.width "24px"
        , SA.height "24px"
        , SA.viewBox "0 0 24 24"
        , SA.fill "none"
        ]
        [ Svg.path
            [ SA.d "M21 8L17.4392 9.97822C15.454 11.0811 14.4614 11.6326 13.4102 11.8488C12.4798 12.0401 11.5202 12.0401 10.5898 11.8488C9.53864 11.6326 8.54603 11.0811 6.5608 9.97822L3 8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z"
            , SA.stroke <|
                if stroke == "" then
                    "currentColor"

                else
                    tailwindColorToColor stroke
            , SA.strokeWidth "2"
            , SA.strokeLinecap "round"
            , SA.strokeLinejoin "round"
            ]
            []
        ]


phone : String -> Svg msg
phone stroke =
    Svg.svg
        [ SA.width "24px"
        , SA.height "24px"
        , SA.viewBox "0 0 24 24"
        , SA.fill "none"
        ]
        [ Svg.path
            [ SA.d "M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z"
            , SA.stroke <|
                if stroke == "" then
                    "currentColor"

                else
                    tailwindColorToColor stroke
            , SA.strokeWidth "2"
            , SA.strokeLinecap "round"
            , SA.strokeLinejoin "round"
            ]
            []
        ]


check : String -> Size -> Svg msg
check stroke size =
    Svg.svg
        [ SA.fill <|
            if stroke == "" then
                "currentColor"

            else
                tailwindColorToColor stroke
        , SA.width <| sizeToString size ++ "px"
        , SA.height <| sizeToString size ++ "px"
        , SA.viewBox "0 0 305.002 305.002"
        ]
        [ Svg.g
            [ SA.strokeWidth "0"
            ]
            []
        , Svg.g
            [ SA.strokeLinecap "round"
            , SA.strokeLinejoin "round"
            ]
            []
        , Svg.g
            []
            [ Svg.g
                []
                [ Svg.g []
                    [ Svg.path
                        [ SA.d "M152.502,0.001C68.412,0.001,0,68.412,0,152.501s68.412,152.5,152.502,152.5c84.089,0,152.5-68.411,152.5-152.5 S236.591,0.001,152.502,0.001z M152.502,280.001C82.197,280.001,25,222.806,25,152.501c0-70.304,57.197-127.5,127.502-127.5 c70.304,0,127.5,57.196,127.5,127.5C280.002,222.806,222.806,280.001,152.502,280.001z"
                        , SA.fill <|
                            if stroke == "" then
                                "currentColor"

                            else
                                tailwindColorToColor stroke
                        ]
                        []
                    , Svg.path
                        [ SA.d "M218.473,93.97l-90.546,90.547l-41.398-41.398c-4.882-4.881-12.796-4.881-17.678,0c-4.881,4.882-4.881,12.796,0,17.678 l50.237,50.237c2.441,2.44,5.64,3.661,8.839,3.661c3.199,0,6.398-1.221,8.839-3.661l99.385-99.385 c4.881-4.882,4.881-12.796,0-17.678C231.269,89.089,223.354,89.089,218.473,93.97z"
                        , SA.fill <|
                            if stroke == "" then
                                "currentColor"

                            else
                                tailwindColorToColor stroke
                        ]
                        []
                    ]
                ]
            ]
        ]


switch : String -> Size -> Svg msg
switch stroke size =
    Svg.svg
        [ SA.width <| sizeToString size ++ "px"
        , SA.height <| sizeToString size ++ "px"
        , SA.viewBox "0 0 24 24"
        , SA.fill "none"
        ]
        [ Svg.path
            [ SA.d "M18.7153 1.71609C18.3241 1.32351 18.3241 0.687013 18.7153 0.294434C19.1066 -0.0981448 19.7409 -0.0981448 20.1321 0.294434L22.4038 2.57397L22.417 2.58733C23.1935 3.37241 23.1917 4.64056 22.4116 5.42342L20.1371 7.70575C19.7461 8.09808 19.1122 8.09808 18.7213 7.70575C18.3303 7.31342 18.3303 6.67733 18.7213 6.285L20.0018 5L4.99998 5C4.4477 5 3.99998 5.44772 3.99998 6V13C3.99998 13.5523 3.55227 14 2.99998 14C2.4477 14 1.99998 13.5523 1.99998 13V6C1.99998 4.34315 3.34313 3 4.99998 3H19.9948L18.7153 1.71609Z"
            , SA.fill <|
                if stroke == "" then
                    "currentColor"

                else
                    tailwindColorToColor stroke
            ]
            []
        , Svg.path
            [ SA.d "M22 11C22 10.4477 21.5523 10 21 10C20.4477 10 20 10.4477 20 11V18C20 18.5523 19.5523 19 19 19L4.00264 19L5.28213 17.7161C5.67335 17.3235 5.67335 16.687 5.28212 16.2944C4.8909 15.9019 4.2566 15.9019 3.86537 16.2944L1.59369 18.574L1.58051 18.5873C0.803938 19.3724 0.805727 20.6406 1.58588 21.4234L3.86035 23.7058C4.25133 24.0981 4.88523 24.0981 5.2762 23.7058C5.66718 23.3134 5.66718 22.6773 5.2762 22.285L3.99563 21L19 21C20.6568 21 22 19.6569 22 18L22 11Z"
            , SA.fill <|
                if stroke == "" then
                    "currentColor"

                else
                    tailwindColorToColor stroke
            ]
            []
        ]


pencilOnPaper : String -> Size -> Svg msg
pencilOnPaper stroke size =
    Svg.svg
        [ SA.fill <|
            if stroke == "" then
                "currentColor"

            else
                tailwindColorToColor stroke
        , SA.version "1.1"
        , SA.id "Capa_1"
        , SA.width <| sizeToString size ++ "px"
        , SA.height <| sizeToString size ++ "px"

        -- , SA.height "30px"
        , SA.viewBox "0 0 399.67 399.67"
        , SA.xmlSpace "preserve"
        ]
        [ Svg.g []
            [ Svg.path
                [ SA.d "M393.674,131.298l-29.509-29.51c-0.004-0.004-0.006-0.008-0.01-0.011s-0.008-0.006-0.011-0.009l-29.51-29.511\n\t\tc-2.343-2.344-5.522-3.661-8.839-3.661s-6.495,1.317-8.839,3.661l-14.59,14.59V12.5c0-6.903-5.598-12.5-12.5-12.5H14.835\n\t\tc-6.903,0-12.5,5.597-12.5,12.5v374.67c0,6.903,5.597,12.5,12.5,12.5h275.032c6.902,0,12.5-5.597,12.5-12.5V240.279l91.307-91.304\n\t\tC398.556,144.094,398.556,136.18,393.674,131.298z M277.367,374.67H27.335V25h250.032v86.847L174.073,215.139\n\t\tc-1.726,1.728-2.908,3.922-3.402,6.312l-15.359,74.4c-0.851,4.121,0.429,8.393,3.403,11.366c2.368,2.368,5.558,3.661,8.839,3.661\n\t\tc0.841,0,1.688-0.085,2.527-0.258l74.396-15.362c2.393-0.493,4.586-1.677,6.312-3.403l26.577-26.576V374.67z M190.468,249.21\n\t\tl26.252,26.253l-33.082,6.831L190.468,249.21z M241.951,265.339l-41.36-41.36L325.796,98.774l11.842,11.843l-76.36,76.362\n\t\tc-4.883,4.882-4.883,12.796,0,17.678c2.439,2.439,5.64,3.661,8.839,3.661s6.397-1.222,8.839-3.661l76.361-76.361l11.842,11.842\n\t\tL241.951,265.339z"
                ]
                []
            ]
        ]


settings : String -> Svg msg
settings stroke =
    Svg.svg
        [ SA.viewBox "0 0 192 192"
        , SA.width "30"
        , SA.height "30"
        , SA.fill <|
            if stroke == "" then
                "currentColor"

            else
                tailwindColorToColor stroke
        ]
        [ Svg.g
            [ SA.strokeWidth "0"
            ]
            []
        , Svg.g
            [ SA.id "SVGRepo_tracerCarrier"
            , SA.strokeLinecap "round"
            , SA.strokeLinejoin "round"
            ]
            []
        , Svg.g
            [ SA.id "SVGRepo_iconCarrier"
            ]
            [ Svg.path
                [ SA.fill <|
                    if stroke == "" then
                        "currentColor"

                    else
                        tailwindColorToColor stroke
                , SA.d "m80.16 29.054-5.958-.709 5.958.71Zm31.68 0-5.958.71 5.958-.71Zm34.217 19.756-2.365-5.515 2.365 5.514Zm10.081 3.352 5.196-3-5.196 3Zm7.896 13.676 5.196-3-5.196 3Zm-2.137 10.407-3.594-4.805 3.594 4.805Zm0 39.51 3.593-4.805-3.593 4.805Zm2.137 10.407 5.196 3-5.196-3Zm-7.896 13.676-5.196-3 5.196 3Zm-10.081 3.353 2.364-5.515-2.364 5.515Zm-34.217 19.755 5.958.709-5.958-.709Zm-31.68 0-5.958.709 5.958-.709Zm-34.217-19.755-2.364-5.515 2.364 5.515Zm-10.08-3.353-5.197 3 5.196-3Zm-7.897-13.676 5.196-3-5.196 3Zm2.137-10.407 3.594 4.805-3.594-4.805Zm0-39.51L26.51 81.05l3.593-4.805Zm-2.137-10.407 5.196 3-5.196-3Zm7.896-13.676-5.196-3 5.196 3Zm10.081-3.352-2.364 5.514 2.364-5.514Zm7.85 3.365-2.365 5.515 2.364-5.515Zm0 87.65 2.364 5.514-2.365-5.514ZM36.235 111.17l-3.594-4.805 3.594 4.805Zm76.823 41.535 5.958.71-5.958-.71Zm39.854-69.742-3.593-4.805 3.593 4.805Zm-16.369-30.074 2.364 5.514-2.364-5.514Zm-23.485-13.594-5.958.709 5.958-.71ZM88.104 16a14 14 0 0 0-13.902 12.345l11.916 1.419A2 2 0 0 1 88.104 28V16Zm15.792 0H88.104v12h15.792V16Zm13.902 12.345A14 14 0 0 0 103.896 16v12a2 2 0 0 1 1.986 1.764l11.916-1.419Zm1.219 10.24-1.219-10.24-11.916 1.419 1.219 10.24 11.916-1.419Zm24.675 4.71-9.513 4.08 4.729 11.028 9.513-4.08-4.729-11.028Zm17.642 5.867a14 14 0 0 0-17.642-5.867l4.729 11.029a2 2 0 0 1 2.521.838l10.392-6Zm7.896 13.676-7.896-13.676-10.392 6 7.896 13.676 10.392-6Zm-3.74 18.212a14 14 0 0 0 3.74-18.212l-10.392 6a2 2 0 0 1-.535 2.602l7.187 9.61Zm-8.984 6.718 8.984-6.718-7.187-9.61-8.983 6.718 7.186 9.61Zm8.984 23.182-8.984-6.718-7.186 9.61 8.983 6.718 7.187-9.61Zm3.74 18.212a14 14 0 0 0-3.74-18.212l-7.187 9.61a2 2 0 0 1 .535 2.602l10.392 6Zm-7.896 13.676 7.896-13.676-10.392-6-7.896 13.676 10.392 6Zm-17.642 5.867a14 14 0 0 0 17.642-5.867l-10.392-6a2.001 2.001 0 0 1-2.521.838l-4.729 11.029Zm-9.513-4.08 9.513 4.08 4.729-11.029-9.512-4.079-4.73 11.028Zm-16.381 19.03 1.219-10.24-11.916-1.419-1.219 10.24 11.916 1.419ZM103.896 176a14 14 0 0 0 13.902-12.345l-11.916-1.419a2 2 0 0 1-1.986 1.764v12Zm-15.792 0h15.792v-12H88.104v12Zm-13.902-12.345A14 14 0 0 0 88.104 176v-12a2 2 0 0 1-1.986-1.764l-11.916 1.419Zm-1.012-8.504 1.012 8.504 11.916-1.419-1.012-8.504-11.916 1.419ZM51.428 134.31l-7.85 3.366 4.73 11.029 7.849-3.366-4.73-11.029Zm-7.85 3.366a2 2 0 0 1-2.52-.838l-10.392 6a14 14 0 0 0 17.642 5.867l-4.73-11.029Zm-2.52-.838-7.896-13.676-10.392 6 7.896 13.676 10.392-6Zm-7.896-13.676a2 2 0 0 1 .535-2.602l-7.187-9.61a14 14 0 0 0-3.74 18.212l10.392-6Zm.535-2.602 6.132-4.585-7.187-9.61-6.132 4.585 7.187 9.61ZM26.51 81.05l6.132 4.586 7.187-9.61-6.132-4.586-7.187 9.61Zm-3.74-18.212a14 14 0 0 0 3.74 18.212l7.187-9.61a2 2 0 0 1-.535-2.602l-10.392-6Zm7.896-13.676L22.77 62.838l10.392 6 7.896-13.676-10.392-6Zm17.642-5.867a14 14 0 0 0-17.642 5.867l10.392 6a2 2 0 0 1 2.52-.838l4.73-11.029Zm7.849 3.366-7.85-3.366-4.729 11.029 7.85 3.366 4.729-11.029Zm18.045-18.316-1.012 8.504 11.916 1.419 1.012-8.504-11.916-1.419Zm-1.754 27.552c6.078-3.426 11.69-9.502 12.658-17.63L73.19 36.85c-.382 3.209-2.769 6.415-6.635 8.595l5.893 10.453Zm-21.02 1.793c7.284 3.124 15.055 1.57 21.02-1.793l-5.893-10.453c-3.704 2.088-7.481 2.468-10.398 1.217l-4.73 11.029ZM49 96c0-7.1-2.548-15.022-9.171-19.975l-7.187 9.61C35.36 87.668 37 91.438 37 96h12Zm23.448 40.103c-5.965-3.363-13.736-4.917-21.02-1.793l4.729 11.029c2.917-1.251 6.694-.871 10.398 1.218l5.893-10.454Zm-32.62-20.128C46.452 111.022 49 103.1 49 96H37c0 4.563-1.64 8.333-4.358 10.365l7.187 9.61Zm78.679 19.575c-5.536 3.298-10.517 8.982-11.406 16.446l11.916 1.419c.329-2.765 2.318-5.582 5.632-7.557l-6.142-10.308Zm20.402-1.953c-7.094-3.042-14.669-1.463-20.402 1.953l6.142 10.308c3.382-2.015 6.872-2.372 9.53-1.233l4.73-11.028Zm-53.803 20.135c-.968-8.127-6.58-14.202-12.658-17.629l-5.893 10.454c3.866 2.179 6.253 5.385 6.635 8.594l11.916-1.419ZM141 96c0 6.389 2.398 13.414 8.32 17.842l7.186-9.61C154.374 102.638 153 99.668 153 96h-12Zm8.32-17.842C143.398 82.586 141 89.61 141 96h12c0-3.668 1.374-6.638 3.506-8.232l-7.186-9.61ZM118.507 56.45c5.733 3.416 13.308 4.995 20.401 1.953l-4.729-11.029c-2.658 1.14-6.148.782-9.53-1.233l-6.142 10.31Zm-11.406-16.446c.889 7.464 5.87 13.148 11.406 16.446l6.142-10.309c-3.314-1.974-5.303-4.79-5.632-7.556l-11.916 1.419Z"
                ]
                []
            , Svg.path
                [ SA.stroke <|
                    if stroke == "" then
                        "currentColor"

                    else
                        tailwindColorToColor stroke
                , SA.strokeLinecap "round"
                , SA.strokeLinejoin "round"
                , SA.strokeWidth "12"
                , SA.d "M96 120c13.255 0 24-10.745 24-24s-10.745-24-24-24-24 10.745-24 24 10.745 24 24 24Z"
                ]
                []
            ]
        ]


close : String -> Size -> Svg msg
close fill size =
    Svg.svg
        [ SA.width <| sizeToString size ++ "px"
        , SA.height <| sizeToString size ++ "px"
        , SA.viewBox "0 0 1024 1024"
        , SA.fill <|
            if fill == "" then
                "currentColor"

            else
                tailwindColorToColor fill
        ]
        [ Svg.path
            [ SA.d "M176.662 817.173c-8.19 8.471-7.96 21.977 0.51 30.165 8.472 8.19 21.978 7.96 30.166-0.51l618.667-640c8.189-8.472 7.96-21.978-0.511-30.166-8.471-8.19-21.977-7.96-30.166 0.51l-618.666 640z"
            , SA.fill ""
            ]
            []
        , Svg.path
            [ SA.d "M795.328 846.827c8.19 8.471 21.695 8.7 30.166 0.511 8.471-8.188 8.7-21.694 0.511-30.165l-618.667-640c-8.188-8.471-21.694-8.7-30.165-0.511-8.471 8.188-8.7 21.694-0.511 30.165l618.666 640z"
            , SA.fill ""
            ]
            []
        ]


filter : String -> Svg msg
filter fill =
    Svg.svg
        [ SA.width "25px"
        , SA.viewBox "0 0 24 24"
        , SA.fill "none"
        ]
        [ Svg.path
            [ SA.d "M4 5L10 5M10 5C10 6.10457 10.8954 7 12 7C13.1046 7 14 6.10457 14 5M10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5M14 5L20 5M4 12L16 12M16 12C16 13.1046 16.8954 14 18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12ZM8 19L20 19M8 19C8 17.8954 7.10457 17 6 17C4.89543 17 4 17.8954 4 19C4 20.1046 4.89543 21 6 21C7.10457 21 8 20.1046 8 19Z"
            , SA.stroke <|
                if fill == "" then
                    "currentColor"

                else
                    tailwindColorToColor fill
            , SA.strokeWidth "1.5"
            , SA.strokeLinecap "round"
            ]
            []
        ]


menuOnLeft : String -> Svg msg
menuOnLeft fill =
    Svg.svg
        [ SA.width "24px"
        , SA.height "24px"
        , SA.fill <|
            if fill == "" then
                "currentColor"

            else
                tailwindColorToColor fill
        ]
        [ Svg.path
            [ SA.d "M21 19V5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2zm-11 0V5h9l.002 14H10z"
            ]
            []
        ]


menuOnTop : String -> Svg msg
menuOnTop fill =
    Svg.svg
        [ SA.width "24px"
        , SA.height "24px"
        , SA.fill <|
            if fill == "" then
                "currentColor"

            else
                tailwindColorToColor fill
        ]
        [ Svg.path
            [ SA.d "M3 5v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2zm2 14v-9h14.001l.001 9H5z"
            ]
            []
        ]


minimize : String -> Svg msg
minimize fill =
    Svg.svg
        [ SA.width "24px"
        , SA.height "24px"
        , SA.viewBox "0 0 24 24"
        , SA.fill "none"
        ]
        [ Svg.path
            [ SA.d "M3 12L21 12"
            , SA.stroke <|
                if fill == "" then
                    "currentColor"

                else
                    tailwindColorToColor fill
            , SA.strokeWidth "2"
            , SA.strokeLinecap "round"
            , SA.strokeLinejoin "round"
            ]
            []
        ]


columns : String -> Svg msg
columns fill =
    Svg.svg
        [ SA.width "25px"
        , SA.height "25px"
        , SA.viewBox "0 0 24 24"
        , SA.fill "none"
        ]
        [ Svg.path
            [ SA.d "M9 5V19M15 5V19M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z"
            , SA.stroke <|
                if fill == "" then
                    "currentColor"

                else
                    tailwindColorToColor fill
            , SA.strokeWidth "2"
            , SA.strokeLinecap "round"
            , SA.strokeLinejoin "round"
            ]
            []
        ]


export : String -> Svg msg
export fill =
    Svg.svg
        [ SA.fill <|
            if fill == "" then
                "currentColor"

            else
                tailwindColorToColor fill
        , SA.width "24"
        , SA.height "24"
        , SA.viewBox "0 0 1920 1920"
        ]
        [ Svg.path
            [ SA.d "m0 1016.081 409.186 409.073 79.85-79.736-272.867-272.979h1136.415V959.611H216.169l272.866-272.866-79.85-79.85L0 1016.082ZM1465.592 305.32l315.445 315.445h-315.445V305.32Zm402.184 242.372-329.224-329.11C1507.042 187.07 1463.334 169 1418.835 169h-743.83v677.647h112.94V281.941h564.706v451.765h451.765v903.53H787.946V1185.47H675.003v564.705h1242.353V667.522c0-44.498-18.07-88.207-49.581-119.83Z"
            , SA.fillRule "evenodd"
            ]
            []
        ]


reset : String -> Svg msg
reset fill =
    Svg.svg
        [ SA.width "25px"
        , SA.height "25px"
        , SA.viewBox "0 0 25 25"
        , SA.fill "none"
        ]
        [ Svg.path
            [ SA.d "M4.56189 13.5L4.14285 13.9294L4.5724 14.3486L4.99144 13.9189L4.56189 13.5ZM9.92427 15.9243L15.9243 9.92427L15.0757 9.07574L9.07574 15.0757L9.92427 15.9243ZM9.07574 9.92426L15.0757 15.9243L15.9243 15.0757L9.92426 9.07574L9.07574 9.92426ZM19.9 12.5C19.9 16.5869 16.5869 19.9 12.5 19.9V21.1C17.2496 21.1 21.1 17.2496 21.1 12.5H19.9ZM5.1 12.5C5.1 8.41309 8.41309 5.1 12.5 5.1V3.9C7.75035 3.9 3.9 7.75035 3.9 12.5H5.1ZM12.5 5.1C16.5869 5.1 19.9 8.41309 19.9 12.5H21.1C21.1 7.75035 17.2496 3.9 12.5 3.9V5.1ZM5.15728 13.4258C5.1195 13.1227 5.1 12.8138 5.1 12.5H3.9C3.9 12.8635 3.92259 13.2221 3.9665 13.5742L5.15728 13.4258ZM12.5 19.9C9.9571 19.9 7.71347 18.6179 6.38048 16.6621L5.38888 17.3379C6.93584 19.6076 9.54355 21.1 12.5 21.1V19.9ZM4.99144 13.9189L7.42955 11.4189L6.57045 10.5811L4.13235 13.0811L4.99144 13.9189ZM4.98094 13.0706L2.41905 10.5706L1.58095 11.4294L4.14285 13.9294L4.98094 13.0706Z"
            , SA.fill <|
                if fill == "" then
                    "currentColor"

                else
                    tailwindColorToColor fill
            ]
            []
        ]


expand : String -> Svg msg
expand fill =
    Svg.svg
        [ SA.width "25px"
        , SA.height "25px"
        , SA.viewBox "0 0 24 24"
        , SA.fill "none"
        ]
        [ Svg.path
            [ SA.d "M4 9V5.6C4 5.03995 4 4.75992 4.10899 4.54601C4.20487 4.35785 4.35785 4.20487 4.54601 4.109C4.75992 4 5.03995 4 5.6 4L9 4M4 15V18.4C4 18.9601 4 19.2401 4.10899 19.454C4.20487 19.6422 4.35785 19.7951 4.54601 19.891C4.75992 20 5.03995 20 5.6 20L9 20M15 4H18.4C18.9601 4 19.2401 4 19.454 4.10899C19.6422 4.20487 19.7951 4.35785 19.891 4.54601C20 4.75992 20 5.03995 20 5.6V9M20 15V18.4C20 18.9601 20 19.2401 19.891 19.454C19.7951 19.6422 19.6422 19.7951 19.454 19.891C19.2401 20 18.9601 20 18.4 20H15"
            , SA.stroke <|
                if fill == "" then
                    "currentColor"

                else
                    tailwindColorToColor fill
            , SA.strokeWidth "2"
            , SA.strokeLinecap "round"
            , SA.strokeLinejoin "round"
            ]
            []
        ]


home : String -> Size -> Svg msg
home fill size =
    Svg.svg
        [ SA.width <| sizeToString size ++ "px"
        , SA.height <| sizeToString size ++ "px"
        , SA.viewBox "0 0 24 24"
        , SA.fill "none"
        ]
        [ Svg.path
            [ SA.d "M5 9.77746V16.2C5 17.8802 5 18.7203 5.32698 19.362C5.6146 19.9265 6.07354 20.3854 6.63803 20.673C7.27976 21 8.11984 21 9.8 21H14.2C15.8802 21 16.7202 21 17.362 20.673C17.9265 20.3854 18.3854 19.9265 18.673 19.362C19 18.7203 19 17.8802 19 16.2V5.00002M21 12L15.5668 5.96399C14.3311 4.59122 13.7133 3.90484 12.9856 3.65144C12.3466 3.42888 11.651 3.42893 11.0119 3.65159C10.2843 3.90509 9.66661 4.59157 8.43114 5.96452L3 12M14 21V15H10V21"
            , SA.stroke <|
                if fill == "" then
                    "currentColor"

                else
                    tailwindColorToColor fill
            , SA.strokeWidth "2"
            , SA.strokeLinecap "round"
            , SA.strokeLinejoin "round"
            ]
            []
        ]


trash : String -> Size -> Svg msg
trash fill size =
    Svg.svg
        [ SA.width <| sizeToString size ++ "px"
        , SA.height <| sizeToString size ++ "px"
        , SA.viewBox "0 0 24 24"
        , SA.fill "none"
        ]
        [ Svg.path
            [ SA.d "M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17"
            , SA.stroke <|
                if fill == "" then
                    "currentColor"

                else
                    tailwindColorToColor fill
            , SA.strokeWidth "1"
            , SA.strokeLinecap "round"
            , SA.strokeLinejoin "round"
            ]
            []
        ]


reload : String -> Svg msg
reload fill =
    Svg.svg
        [ SA.fill <|
            if fill == "" then
                "currentColor"

            else
                tailwindColorToColor fill
        , SA.width "24px"
        , SA.height "24px"
        , SA.viewBox "0 0 24 24"
        ]
        [ Svg.path
            [ SA.d "M23,12A11,11,0,1,1,12,1a10.9,10.9,0,0,1,5.882,1.7l1.411-1.411A1,1,0,0,1,21,2V6a1,1,0,0,1-1,1H16a1,1,0,0,1-.707-1.707L16.42,4.166A8.9,8.9,0,0,0,12,3a9,9,0,1,0,9,9,1,1,0,0,1,2,0Z"
            ]
            []
        ]


pin : String -> Svg msg
pin fill =
    Svg.svg
        [ SA.width "24px"
        , SA.height "24px"
        , SA.viewBox "0 0 24 24"
        , SA.fill "none"
        ]
        [ Svg.path
            [ SA.fillRule "evenodd"
            , SA.clipRule "evenodd"
            , SA.d "M17.1218 1.87023C15.7573 0.505682 13.4779 0.76575 12.4558 2.40261L9.61062 6.95916C9.61033 6.95965 9.60913 6.96167 9.6038 6.96549C9.59728 6.97016 9.58336 6.97822 9.56001 6.9848C9.50899 6.99916 9.44234 6.99805 9.38281 6.97599C8.41173 6.61599 6.74483 6.22052 5.01389 6.87251C4.08132 7.22378 3.61596 8.03222 3.56525 8.85243C3.51687 9.63502 3.83293 10.4395 4.41425 11.0208L7.94975 14.5563L1.26973 21.2363C0.879206 21.6269 0.879206 22.26 1.26973 22.6506C1.66025 23.0411 2.29342 23.0411 2.68394 22.6506L9.36397 15.9705L12.8995 19.5061C13.4808 20.0874 14.2853 20.4035 15.0679 20.3551C15.8881 20.3044 16.6966 19.839 17.0478 18.9065C17.6998 17.1755 17.3043 15.5086 16.9444 14.5375C16.9223 14.478 16.9212 14.4114 16.9355 14.3603C16.9421 14.337 16.9502 14.3231 16.9549 14.3165C16.9587 14.3112 16.9606 14.31 16.9611 14.3098L21.5177 11.4645C23.1546 10.4424 23.4147 8.16307 22.0501 6.79853L17.1218 1.87023ZM14.1523 3.46191C14.493 2.91629 15.2528 2.8296 15.7076 3.28445L20.6359 8.21274C21.0907 8.66759 21.0041 9.42737 20.4584 9.76806L15.9019 12.6133C14.9572 13.2032 14.7469 14.3637 15.0691 15.2327C15.3549 16.0037 15.5829 17.1217 15.1762 18.2015C15.1484 18.2752 15.1175 18.3018 15.0985 18.3149C15.0743 18.3316 15.0266 18.3538 14.9445 18.3589C14.767 18.3699 14.5135 18.2916 14.3137 18.0919L5.82846 9.6066C5.62872 9.40686 5.55046 9.15333 5.56144 8.97583C5.56651 8.8937 5.58877 8.84605 5.60548 8.82181C5.61855 8.80285 5.64516 8.7719 5.71886 8.74414C6.79869 8.33741 7.91661 8.56545 8.68762 8.85128C9.55668 9.17345 10.7171 8.96318 11.3071 8.01845L14.1523 3.46191Z"
            , SA.fill <|
                if fill == "" then
                    "currentColor"

                else
                    tailwindColorToColor fill
            ]
            []
        ]


lightbulb : String -> Size -> Svg msg
lightbulb fill size =
    Svg.svg
        [ SA.height <| sizeToString size ++ "px"
        , SA.width <| sizeToString size ++ "px"
        , SA.version "1.1"
        , SA.id "_x32_"
        , SA.viewBox "0 0 512 512"
        , SA.fill <|
            if fill == "" then
                "currentColor"

            else
                tailwindColorToColor fill
        ]
        [ Svg.g []
            [ Svg.path
                [ SA.d "M428.215,172.215c0.008-47.522-19.292-90.648-50.445-121.777C346.649,19.293,303.515-0.007,256,0   c-47.514-0.007-90.648,19.293-121.769,50.446c-31.153,31.121-50.454,74.247-50.446,121.769   c-0.008,31.786,8.673,61.634,23.754,87.181h-0.008c0.016,0.032,0.048,0.064,0.064,0.096c0.04,0.064,0.065,0.128,0.104,0.192   l0.016-0.007c10.98,19.436,26.7,34.724,38.945,48.835c6.167,7.056,11.452,13.751,15,20.014c3.572,6.295,5.382,11.908,5.502,17.53   v95.421c0.008,29.44,23.858,53.296,53.305,53.304h7.64C233.312,504.96,243.787,512,256,512c12.213,0,22.688-7.04,27.894-17.218   h7.64c29.447-0.008,53.296-23.865,53.304-53.304v-95.414v-0.008c0.12-5.622,1.93-11.236,5.502-17.53   c5.302-9.419,14.592-19.709,24.762-30.914c10.074-11.179,20.982-23.352,29.191-37.936l0.008,0.007   c0.032-0.048,0.056-0.111,0.088-0.16c0.024-0.048,0.056-0.08,0.08-0.128h-0.008C419.542,233.849,428.223,204.001,428.215,172.215z    M311.828,461.771c-5.23,5.214-12.325,8.401-20.294,8.409h-71.068c-7.969-0.008-15.064-3.195-20.294-8.409   c-5.213-5.23-8.401-12.333-8.409-20.294v-5.326l120.128,25.54C311.868,461.715,311.852,461.747,311.828,461.771z M320.237,441.477   c0,1.754-0.216,3.452-0.513,5.11l-127.96-27.205v-33.524l128.473,27.316V441.477z M320.237,396.397L191.764,369.08V358.1h128.473   V396.397z M383.143,247.142l-0.104,0.169l-0.064,0.112c-8.505,15.408-22.92,29.848-36.159,44.904   c-6.607,7.576-12.918,15.361-17.867,24.034c-3.003,5.286-5.39,11.036-6.935,17.13H189.986c-1.546-6.102-3.932-11.844-6.944-17.13   c-7.432-12.982-17.867-24.081-27.893-35.246c-10.059-11.1-19.733-22.159-26.124-33.692l-0.08-0.128l-0.089-0.152   c-13.005-21.959-20.462-47.514-20.47-74.928c0.008-40.803,16.506-77.626,43.238-104.374C178.374,41.1,215.197,24.61,256,24.602   C296.804,24.61,333.627,41.1,360.375,67.84c26.732,26.748,43.23,63.571,43.238,104.374   C403.605,199.628,396.149,225.183,383.143,247.142z"
                ]
                []
            ]
        ]


connect : String -> Size -> Svg msg
connect fill size =
    Svg.svg
        [ SA.width <| sizeToString size ++ "px"
        , SA.height <| sizeToString size ++ "px"
        , SA.viewBox "0 0 24 24"
        , SA.fill <|
            if fill == "" then
                "currentColor"

            else
                tailwindColorToColor fill
        ]
        [ Svg.path
            [ SA.d "M14 10C14 9.44771 13.5523 9 13 9H12.5C9.46243 9 7 11.4624 7 14.5C7 17.5376 9.46243 20 12.5 20H17.5C20.5376 20 23 17.5376 23 14.5C23 12.0091 21.3441 9.90488 19.073 9.22823C18.5098 9.06042 18 9.52887 18 10.1166V10.1683C18 10.6659 18.3745 11.0735 18.8345 11.2634C20.1055 11.788 21 13.0395 21 14.5C21 16.433 19.433 18 17.5 18H12.5C10.567 18 9 16.433 9 14.5C9 12.567 10.567 11 12.5 11H13C13.5523 11 14 10.5523 14 10Z"
            ]
            []
        , Svg.path
            [ SA.d "M11.5 4C14.5376 4 17 6.46243 17 9.5C17 12.5376 14.5376 15 11.5 15H11C10.4477 15 10 14.5523 10 14C10 13.4477 10.4477 13 11 13H11.5C13.433 13 15 11.433 15 9.5C15 7.567 13.433 6 11.5 6H6.5C4.567 6 3 7.567 3 9.5C3 10.9605 3.89451 12.212 5.16553 12.7366C5.62548 12.9264 6 13.3341 6 13.8317V13.8834C6 14.4711 5.49024 14.9396 4.92699 14.7718C2.65592 14.0951 1 11.9909 1 9.5C1 6.46243 3.46243 4 6.5 4H11.5Z"
            ]
            []
        ]
