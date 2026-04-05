module Colors exposing (tailwindColorToColor)


tailwindColorToColor : String -> String
tailwindColorToColor color =
    case color of
        "bg-green-400" ->
            "rgb(74 222 128)"

        "bg-gray-100" ->
            "rgb(243 244 246)"

        "bg-gray-200" ->
            "rgb(229 231 235)"

        "bg-gray-300" ->
            "rgb(209 213 219)"

        "bg-gray-400" ->
            "rgb(156 163 175)"

        "bg-gray-500" ->
            "rgb(64 64 64)"

        "bg-gray-600" ->
            "rgb(38 38 38)"

        "bg-orange-400" ->
            "rgb(251 146 60)"

        "bg-red-400" ->
            "rgb(248 113 113)"

        "bg-sky-200" ->
            "rgb(14 165 233)"

        "bg-sky-100" ->
            "rgb(209 213 219)"

        "bg-sky-500" ->
            "rgb(14 165 233)"

        "bg-sky-400" ->
            "rgb(14 165 233)"

        "bg-white" ->
            "rgb(255 255 255)"

        "bg-black" ->
            "rgb(0 0 0)"

        "bg-yellow-400" ->
            "rgb(250 204 21)"

        "bg-amber-400" ->
            "rgb(255 165 0)"

        "bg-amber-500" ->
            "rgb(255 165 0)"

        "bg-amber-600" ->
            "rgb(255 165 0)"

        "bg-amber-700" ->
            "rgb(255 165 0)"

        "bg-amber-800" ->
            "rgb(255 165 0)"

        "bg-amber-900" ->
            "rgb(255 165 0)"

        _ ->
            color
