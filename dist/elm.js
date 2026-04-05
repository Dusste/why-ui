(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File !== 'undefined' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[36m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return !isNaN(word)
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? $elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? $elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? $elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return $elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? $elm$core$Result$Ok(value)
		: (value instanceof String)
			? $elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (Object.prototype.hasOwnProperty.call(value, key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	var unwrapped = _Json_unwrap(value);
	if (!(key === 'toJSON' && typeof unwrapped === 'function'))
	{
		object[key] = unwrapped;
	}
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	var initPair = init(result.a);
	var model = initPair.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		var pair = A2(update, msg, model);
		stepper(model = pair.a, viewMetadata);
		_Platform_enqueueEffects(managers, pair.b, subscriptions(model));
	}

	_Platform_enqueueEffects(managers, initPair.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS
//
// Effects must be queued!
//
// Say your init contains a synchronous command, like Time.now or Time.here
//
//   - This will produce a batch of effects (FX_1)
//   - The synchronous task triggers the subsequent `update` call
//   - This will produce a batch of effects (FX_2)
//
// If we just start dispatching FX_2, subscriptions from FX_2 can be processed
// before subscriptions from FX_1. No good! Earlier versions of this code had
// this problem, leading to these reports:
//
//   https://github.com/elm/core/issues/980
//   https://github.com/elm/core/pull/981
//   https://github.com/elm/compiler/issues/1776
//
// The queue is necessary to avoid ordering issues for synchronous commands.


// Why use true/false here? Why not just check the length of the queue?
// The goal is to detect "are we currently dispatching effects?" If we
// are, we need to bail and let the ongoing while loop handle things.
//
// Now say the queue has 1 element. When we dequeue the final element,
// the queue will be empty, but we are still actively dispatching effects.
// So you could get queue jumping in a really tricky category of cases.
//
var _Platform_effectsQueue = [];
var _Platform_effectsActive = false;


function _Platform_enqueueEffects(managers, cmdBag, subBag)
{
	_Platform_effectsQueue.push({ p: managers, q: cmdBag, r: subBag });

	if (_Platform_effectsActive) return;

	_Platform_effectsActive = true;
	for (var fx; fx = _Platform_effectsQueue.shift(); )
	{
		_Platform_dispatchEffects(fx.p, fx.q, fx.r);
	}
	_Platform_effectsActive = false;
}


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				s: bag.n,
				t: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.t)
		{
			x = temp.s(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		u: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		u: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].u;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'outerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (
		(typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		||
		(Array.isArray(_Json_unwrap(value)) && _VirtualDom_RE_js_html.test(String(_Json_unwrap(value))))
	)
		? _Json_wrap(
			/**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2($elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = $elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = $elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.multiline) { flags += 'm'; }
	if (options.caseInsensitive) { flags += 'i'; }

	try
	{
		return $elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return $elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		out.push(A4($elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		return replacer(A4($elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$GT = {$: 'GT'};
var $author$project$Demo$GotClock = function (a) {
	return {$: 'GotClock', a: a};
};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$element = _Browser_element;
var $elm$time$Time$Name = function (a) {
	return {$: 'Name', a: a};
};
var $elm$time$Time$Offset = function (a) {
	return {$: 'Offset', a: a};
};
var $elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 'Zone', a: a, b: b};
	});
var $elm$time$Time$customZone = $elm$time$Time$Zone;
var $elm$time$Time$here = _Time_here(_Utils_Tuple0);
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$time$Time$Posix = function (a) {
	return {$: 'Posix', a: a};
};
var $elm$time$Time$millisToPosix = $elm$time$Time$Posix;
var $elm$time$Time$utc = A2($elm$time$Time$Zone, 0, _List_Nil);
var $author$project$Demo$initialModel = {
	cardExpiration: '',
	cardNumber: '',
	cvc: '',
	decimalInputFieldValue: '',
	demoAccordion2Open: false,
	demoAccordionOpen: true,
	demoDropdownErrOpen: false,
	demoDropdownErrSelected: $elm$core$Maybe$Nothing,
	demoDropdownOpen: false,
	demoDropdownSelected: $elm$core$Maybe$Nothing,
	demoElementCheckbox: true,
	demoModalOpen: false,
	demoPaginationPage: 1,
	demoPaginationPageSize: 10,
	demoTabSelection: $elm$core$Maybe$Just('AnnualReview'),
	demoTextareaValue: 'Short note…',
	demoThemeSwitchDark: false,
	formErrors: $elm$core$Dict$fromList(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'normalInputFieldValueError',
				_List_fromArray(
					['Field is empty']))
			])),
	hasChoosenUser: false,
	lastButtonDemoClick: $elm$core$Maybe$Nothing,
	multiselectSelections: _List_fromArray(
		['1']),
	normalInputFieldValue: '',
	now: $elm$time$Time$millisToPosix(0),
	password: '',
	preselectedMultiselectItems: _List_fromArray(
		['Elm', 'Rust', 'Haskell']),
	showPassword: _Utils_Tuple2('password', false),
	singleselectSize: $elm$core$Maybe$Nothing,
	singleselectStatus: $elm$core$Maybe$Nothing,
	styleshCheckboxChecked: false,
	userAutocompleteValue: '',
	users: _List_fromArray(
		[
			{email: 'john.doe@example.com', name: 'John Doe', role: 'Admin'},
			{email: 'jane.doe@example.com', name: 'Jane Doe', role: 'User'},
			{email: 'jim.beam@example.com', name: 'Jim Beam', role: 'Admin'}
		]),
	zone: $elm$time$Time$utc
};
var $elm$time$Time$now = _Time_now($elm$time$Time$millisToPosix);
var $elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var $author$project$Demo$Tick = function (a) {
	return {$: 'Tick', a: a};
};
var $elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 'Every', a: a, b: b};
	});
var $elm$time$Time$State = F2(
	function (taggers, processes) {
		return {processes: processes, taggers: taggers};
	});
var $elm$time$Time$init = $elm$core$Task$succeed(
	A2($elm$time$Time$State, $elm$core$Dict$empty, $elm$core$Dict$empty));
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $elm$time$Time$addMySub = F2(
	function (_v0, state) {
		var interval = _v0.a;
		var tagger = _v0.b;
		var _v1 = A2($elm$core$Dict$get, interval, state);
		if (_v1.$ === 'Nothing') {
			return A3(
				$elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _v1.a;
			return A3(
				$elm$core$Dict$insert,
				interval,
				A2($elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var $elm$core$Process$kill = _Scheduler_kill;
var $elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var $elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _v0) {
				stepState:
				while (true) {
					var list = _v0.a;
					var result = _v0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _v2 = list.a;
						var lKey = _v2.a;
						var lValue = _v2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_v0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_v0 = $temp$_v0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _v3 = A3(
			$elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				$elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _v3.a;
		var intermediateResult = _v3.b;
		return A3(
			$elm$core$List$foldl,
			F2(
				function (_v4, result) {
					var k = _v4.a;
					var v = _v4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var $elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var $elm$time$Time$setInterval = _Time_setInterval;
var $elm$core$Process$spawn = _Scheduler_spawn;
var $elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return $elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = $elm$core$Process$spawn(
				A2(
					$elm$time$Time$setInterval,
					interval,
					A2($elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					$elm$time$Time$spawnHelp,
					router,
					rest,
					A3($elm$core$Dict$insert, interval, id, processes));
			};
			return A2($elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var $elm$time$Time$onEffects = F3(
	function (router, subs, _v0) {
		var processes = _v0.processes;
		var rightStep = F3(
			function (_v6, id, _v7) {
				var spawns = _v7.a;
				var existing = _v7.b;
				var kills = _v7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						$elm$core$Task$andThen,
						function (_v5) {
							return kills;
						},
						$elm$core$Process$kill(id)));
			});
		var newTaggers = A3($elm$core$List$foldl, $elm$time$Time$addMySub, $elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _v4) {
				var spawns = _v4.a;
				var existing = _v4.b;
				var kills = _v4.c;
				return _Utils_Tuple3(
					A2($elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _v3) {
				var spawns = _v3.a;
				var existing = _v3.b;
				var kills = _v3.c;
				return _Utils_Tuple3(
					spawns,
					A3($elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _v1 = A6(
			$elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				$elm$core$Dict$empty,
				$elm$core$Task$succeed(_Utils_Tuple0)));
		var spawnList = _v1.a;
		var existingDict = _v1.b;
		var killTask = _v1.c;
		return A2(
			$elm$core$Task$andThen,
			function (newProcesses) {
				return $elm$core$Task$succeed(
					A2($elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				$elm$core$Task$andThen,
				function (_v2) {
					return A3($elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var $elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _v0 = A2($elm$core$Dict$get, interval, state.taggers);
		if (_v0.$ === 'Nothing') {
			return $elm$core$Task$succeed(state);
		} else {
			var taggers = _v0.a;
			var tellTaggers = function (time) {
				return $elm$core$Task$sequence(
					A2(
						$elm$core$List$map,
						function (tagger) {
							return A2(
								$elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				$elm$core$Task$andThen,
				function (_v1) {
					return $elm$core$Task$succeed(state);
				},
				A2($elm$core$Task$andThen, tellTaggers, $elm$time$Time$now));
		}
	});
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $elm$time$Time$subMap = F2(
	function (f, _v0) {
		var interval = _v0.a;
		var tagger = _v0.b;
		return A2(
			$elm$time$Time$Every,
			interval,
			A2($elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager($elm$time$Time$init, $elm$time$Time$onEffects, $elm$time$Time$onSelfMsg, 0, $elm$time$Time$subMap);
var $elm$time$Time$subscription = _Platform_leaf('Time');
var $elm$time$Time$every = F2(
	function (interval, tagger) {
		return $elm$time$Time$subscription(
			A2($elm$time$Time$Every, interval, tagger));
	});
var $author$project$Demo$subscriptions = function (_v0) {
	return A2($elm$time$Time$every, 60000, $author$project$Demo$Tick);
};
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$core$Basics$not = _Basics_not;
var $elm$core$Dict$filter = F2(
	function (isGood, dict) {
		return A3(
			$elm$core$Dict$foldl,
			F3(
				function (k, v, d) {
					return A2(isGood, k, v) ? A3($elm$core$Dict$insert, k, v, d) : d;
				}),
			$elm$core$Dict$empty,
			dict);
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $author$project$Validation$resetErrorsPerField = F2(
	function (key, errors) {
		return A2(
			$elm$core$Dict$filter,
			F2(
				function (k, _v0) {
					return !_Utils_eq(k, key);
				}),
			errors);
	});
var $elm$core$Result$toMaybe = function (result) {
	if (result.$ === 'Ok') {
		var v = result.a;
		return $elm$core$Maybe$Just(v);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Demo$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'GotClock':
				var _v1 = msg.a;
				var zone = _v1.a;
				var posix = _v1.b;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{now: posix, zone: zone}),
					$elm$core$Platform$Cmd$none);
			case 'Tick':
				var posix = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{now: posix}),
					$elm$core$Platform$Cmd$none);
			case 'SetNormalInputFieldValue':
				var value = msg.a;
				var resetErrorsPerField = A2($author$project$Validation$resetErrorsPerField, 'normalInputFieldValue', model.formErrors);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{formErrors: resetErrorsPerField, normalInputFieldValue: value}),
					$elm$core$Platform$Cmd$none);
			case 'SetDecimalInputFieldValue':
				var value = msg.a;
				var resetErrorsPerField = A2($author$project$Validation$resetErrorsPerField, 'decimalInputFieldValue', model.formErrors);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{decimalInputFieldValue: value, formErrors: resetErrorsPerField}),
					$elm$core$Platform$Cmd$none);
			case 'SetPassword':
				var value = msg.a;
				var resetErrorsPerField = A2($author$project$Validation$resetErrorsPerField, 'password', model.formErrors);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{formErrors: resetErrorsPerField, password: value}),
					$elm$core$Platform$Cmd$none);
			case 'ShowPassword':
				var name = msg.a;
				var showPassword = msg.b;
				var resetErrorsPerField = A2($author$project$Validation$resetErrorsPerField, 'password', model.formErrors);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							formErrors: resetErrorsPerField,
							showPassword: _Utils_Tuple2(name, showPassword)
						}),
					$elm$core$Platform$Cmd$none);
			case 'SetCardExpirationValue':
				var value = msg.a;
				var resetErrorsPerField = A2($author$project$Validation$resetErrorsPerField, 'cardExpiration', model.formErrors);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{cardExpiration: value, formErrors: resetErrorsPerField}),
					$elm$core$Platform$Cmd$none);
			case 'SetCardNumberValue':
				var value = msg.a;
				var resetErrorsPerField = A2($author$project$Validation$resetErrorsPerField, 'cardNumber', model.formErrors);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{cardNumber: value, formErrors: resetErrorsPerField}),
					$elm$core$Platform$Cmd$none);
			case 'SetCvcValue':
				var value = msg.a;
				var resetErrorsPerField = A2($author$project$Validation$resetErrorsPerField, 'cvc', model.formErrors);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{cvc: value, formErrors: resetErrorsPerField}),
					$elm$core$Platform$Cmd$none);
			case 'SetUserAutocompleteValue':
				var value = msg.a;
				var resetErrorsPerField = A2($author$project$Validation$resetErrorsPerField, 'userAutocomplete', model.formErrors);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{formErrors: resetErrorsPerField, hasChoosenUser: false, userAutocompleteValue: value}),
					$elm$core$Platform$Cmd$none);
			case 'ChooseUser':
				var user = msg.a;
				var resetErrorsPerField = A2($author$project$Validation$resetErrorsPerField, 'userAutocomplete', model.formErrors);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{formErrors: resetErrorsPerField, hasChoosenUser: true, userAutocompleteValue: user}),
					$elm$core$Platform$Cmd$none);
			case 'SetDemoTab':
				var tab = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							demoTabSelection: $elm$core$Maybe$Just(tab)
						}),
					$elm$core$Platform$Cmd$none);
			case 'ButtonDemoClick':
				var label = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							lastButtonDemoClick: $elm$core$Maybe$Just(label)
						}),
					$elm$core$Platform$Cmd$none);
			case 'SetPreselectedMultiselect':
				var selections = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{preselectedMultiselectItems: selections}),
					$elm$core$Platform$Cmd$none);
			case 'SetElementMultiselect':
				var selections = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{multiselectSelections: selections}),
					$elm$core$Platform$Cmd$none);
			case 'SetElementSingleselectStatus':
				var result = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							singleselectStatus: $elm$core$Result$toMaybe(result)
						}),
					$elm$core$Platform$Cmd$none);
			case 'SetElementSingleselectSize':
				var result = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							singleselectSize: $elm$core$Result$toMaybe(result)
						}),
					$elm$core$Platform$Cmd$none);
			case 'SetStyleshCheckbox':
				var checked = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{styleshCheckboxChecked: checked}),
					$elm$core$Platform$Cmd$none);
			case 'SetDemoTextarea':
				var value = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{demoTextareaValue: value}),
					$elm$core$Platform$Cmd$none);
			case 'SetDemoElementCheckbox':
				var checked = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{demoElementCheckbox: checked}),
					$elm$core$Platform$Cmd$none);
			case 'SetDemoThemeSwitch':
				var isDark = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{demoThemeSwitchDark: isDark}),
					$elm$core$Platform$Cmd$none);
			case 'DemoPaginationPage':
				var page = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{demoPaginationPage: page}),
					$elm$core$Platform$Cmd$none);
			case 'DemoPaginationPageSize':
				var size = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{demoPaginationPage: 1, demoPaginationPageSize: size}),
					$elm$core$Platform$Cmd$none);
			case 'ToggleDemoDropdown':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{demoDropdownOpen: !model.demoDropdownOpen}),
					$elm$core$Platform$Cmd$none);
			case 'SetDemoDropdown':
				var value = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							demoDropdownOpen: false,
							demoDropdownSelected: $elm$core$Maybe$Just(value)
						}),
					$elm$core$Platform$Cmd$none);
			case 'ToggleDemoDropdownErr':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{demoDropdownErrOpen: !model.demoDropdownErrOpen}),
					$elm$core$Platform$Cmd$none);
			case 'SetDemoDropdownErr':
				var value = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							demoDropdownErrOpen: false,
							demoDropdownErrSelected: $elm$core$Maybe$Just(value)
						}),
					$elm$core$Platform$Cmd$none);
			case 'OpenDemoModal':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{demoModalOpen: true}),
					$elm$core$Platform$Cmd$none);
			case 'CloseDemoModal':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{demoModalOpen: false}),
					$elm$core$Platform$Cmd$none);
			case 'ToggleDemoAccordion':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{demoAccordionOpen: !model.demoAccordionOpen}),
					$elm$core$Platform$Cmd$none);
			default:
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{demoAccordion2Open: !model.demoAccordion2Open}),
					$elm$core$Platform$Cmd$none);
		}
	});
var $author$project$InputField$Both = F2(
	function (a, b) {
		return {$: 'Both', a: a, b: b};
	});
var $author$project$Demo$ButtonDemoClick = function (a) {
	return {$: 'ButtonDemoClick', a: a};
};
var $author$project$Element$Center = {$: 'Center'};
var $author$project$Demo$ChooseUser = function (a) {
	return {$: 'ChooseUser', a: a};
};
var $author$project$Demo$CloseDemoModal = {$: 'CloseDemoModal'};
var $author$project$Element$Count = {$: 'Count'};
var $author$project$InputField$Decimal = {$: 'Decimal'};
var $author$project$Demo$DemoPaginationPage = function (a) {
	return {$: 'DemoPaginationPage', a: a};
};
var $author$project$Demo$DemoPaginationPageSize = function (a) {
	return {$: 'DemoPaginationPageSize', a: a};
};
var $author$project$Element$Error = function (a) {
	return {$: 'Error', a: a};
};
var $author$project$Button$Hero = {$: 'Hero'};
var $author$project$Element$High = {$: 'High'};
var $author$project$Element$Info = function (a) {
	return {$: 'Info', a: a};
};
var $author$project$Element$L = {$: 'L'};
var $author$project$Element$LabelAndPlaceholderA = F2(
	function (a, b) {
		return {$: 'LabelAndPlaceholderA', a: a, b: b};
	});
var $author$project$Button$Large = {$: 'Large'};
var $author$project$Element$Left = {$: 'Left'};
var $author$project$Element$Low = {$: 'Low'};
var $author$project$Element$M = {$: 'M'};
var $author$project$Element$MD = {$: 'MD'};
var $author$project$Button$Medium = {$: 'Medium'};
var $author$project$Element$Medium = {$: 'Medium'};
var $author$project$Icon$Medium = {$: 'Medium'};
var $author$project$Demo$OpenDemoModal = {$: 'OpenDemoModal'};
var $author$project$InputField$Password = function (a) {
	return {$: 'Password', a: a};
};
var $author$project$Element$Percentage = {$: 'Percentage'};
var $author$project$Element$PercentageAndCount = {$: 'PercentageAndCount'};
var $author$project$Element$PlaceholderLabel = function (a) {
	return {$: 'PlaceholderLabel', a: a};
};
var $author$project$Element$Right = {$: 'Right'};
var $author$project$Element$S = {$: 'S'};
var $author$project$Demo$SetCardExpirationValue = function (a) {
	return {$: 'SetCardExpirationValue', a: a};
};
var $author$project$Demo$SetCardNumberValue = function (a) {
	return {$: 'SetCardNumberValue', a: a};
};
var $author$project$Demo$SetCvcValue = function (a) {
	return {$: 'SetCvcValue', a: a};
};
var $author$project$Demo$SetDecimalInputFieldValue = function (a) {
	return {$: 'SetDecimalInputFieldValue', a: a};
};
var $author$project$Demo$SetDemoDropdown = function (a) {
	return {$: 'SetDemoDropdown', a: a};
};
var $author$project$Demo$SetDemoDropdownErr = function (a) {
	return {$: 'SetDemoDropdownErr', a: a};
};
var $author$project$Demo$SetDemoElementCheckbox = function (a) {
	return {$: 'SetDemoElementCheckbox', a: a};
};
var $author$project$Demo$SetDemoTab = function (a) {
	return {$: 'SetDemoTab', a: a};
};
var $author$project$Demo$SetDemoTextarea = function (a) {
	return {$: 'SetDemoTextarea', a: a};
};
var $author$project$Demo$SetDemoThemeSwitch = function (a) {
	return {$: 'SetDemoThemeSwitch', a: a};
};
var $author$project$Demo$SetElementMultiselect = function (a) {
	return {$: 'SetElementMultiselect', a: a};
};
var $author$project$Demo$SetElementSingleselectSize = function (a) {
	return {$: 'SetElementSingleselectSize', a: a};
};
var $author$project$Demo$SetElementSingleselectStatus = function (a) {
	return {$: 'SetElementSingleselectStatus', a: a};
};
var $author$project$Demo$SetNormalInputFieldValue = function (a) {
	return {$: 'SetNormalInputFieldValue', a: a};
};
var $author$project$Demo$SetPassword = function (a) {
	return {$: 'SetPassword', a: a};
};
var $author$project$Demo$SetPreselectedMultiselect = function (a) {
	return {$: 'SetPreselectedMultiselect', a: a};
};
var $author$project$Demo$SetStyleshCheckbox = function (a) {
	return {$: 'SetStyleshCheckbox', a: a};
};
var $author$project$Demo$SetUserAutocompleteValue = function (a) {
	return {$: 'SetUserAutocompleteValue', a: a};
};
var $author$project$Demo$ShowPassword = F2(
	function (a, b) {
		return {$: 'ShowPassword', a: a, b: b};
	});
var $author$project$Button$Small = {$: 'Small'};
var $author$project$Icon$Small = {$: 'Small'};
var $author$project$Element$Success = function (a) {
	return {$: 'Success', a: a};
};
var $author$project$InputField$Text = {$: 'Text'};
var $author$project$Demo$ToggleDemoDropdown = {$: 'ToggleDemoDropdown'};
var $author$project$Demo$ToggleDemoDropdownErr = {$: 'ToggleDemoDropdownErr'};
var $author$project$Element$Warning = function (a) {
	return {$: 'Warning', a: a};
};
var $elm$core$Basics$always = F2(
	function (a, _v0) {
		return a;
	});
var $elm$svg$Svg$Attributes$d = _VirtualDom_attribute('d');
var $elm$svg$Svg$Attributes$fill = _VirtualDom_attribute('fill');
var $elm$svg$Svg$Attributes$height = _VirtualDom_attribute('height');
var $elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var $elm$svg$Svg$path = $elm$svg$Svg$trustedNode('path');
var $elm$svg$Svg$Attributes$stroke = _VirtualDom_attribute('stroke');
var $elm$svg$Svg$Attributes$strokeLinecap = _VirtualDom_attribute('stroke-linecap');
var $elm$svg$Svg$Attributes$strokeLinejoin = _VirtualDom_attribute('stroke-linejoin');
var $elm$svg$Svg$Attributes$strokeWidth = _VirtualDom_attribute('stroke-width');
var $elm$svg$Svg$svg = $elm$svg$Svg$trustedNode('svg');
var $elm$svg$Svg$Attributes$viewBox = _VirtualDom_attribute('viewBox');
var $elm$svg$Svg$Attributes$width = _VirtualDom_attribute('width');
var $author$project$Icon$arrowBack = A2(
	$elm$svg$Svg$svg,
	_List_fromArray(
		[
			$elm$svg$Svg$Attributes$width('40px'),
			$elm$svg$Svg$Attributes$height('auto'),
			$elm$svg$Svg$Attributes$viewBox('0 0 25 25'),
			$elm$svg$Svg$Attributes$fill('none')
		]),
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d('M5 12H19M5 12L11 6M5 12L11 18'),
					$elm$svg$Svg$Attributes$stroke('currentColor'),
					$elm$svg$Svg$Attributes$fill('currentColor'),
					$elm$svg$Svg$Attributes$strokeWidth('2'),
					$elm$svg$Svg$Attributes$strokeLinecap('round'),
					$elm$svg$Svg$Attributes$strokeLinejoin('round')
				]),
			_List_Nil)
		]));
var $elm$svg$Svg$Attributes$fillRule = _VirtualDom_attribute('fill-rule');
var $elm$svg$Svg$g = $elm$svg$Svg$trustedNode('g');
var $elm$svg$Svg$Attributes$transform = _VirtualDom_attribute('transform');
var $author$project$Icon$arrowDown = A2(
	$elm$svg$Svg$svg,
	_List_fromArray(
		[
			$elm$svg$Svg$Attributes$viewBox('0 -4.5 20 20'),
			$elm$svg$Svg$Attributes$width('15px'),
			$elm$svg$Svg$Attributes$height('15px')
		]),
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$g,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$stroke('none'),
					$elm$svg$Svg$Attributes$strokeWidth('1'),
					$elm$svg$Svg$Attributes$fill('currentColor'),
					$elm$svg$Svg$Attributes$fillRule('evenodd')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$transform('translate(-180.000000, -6684.000000)'),
							$elm$svg$Svg$Attributes$fill('currentColor')
						]),
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$g,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$transform('translate(56.000000, 160.000000)')
								]),
							_List_fromArray(
								[
									A2(
									$elm$svg$Svg$path,
									_List_fromArray(
										[
											$elm$svg$Svg$Attributes$d('M144,6525.39 L142.594,6524 L133.987,6532.261 L133.069,6531.38 L133.074,6531.385 L125.427,6524.045 L124,6525.414 C126.113,6527.443 132.014,6533.107 133.987,6535 C135.453,6533.594 134.024,6534.965 144,6525.39')
										]),
									_List_Nil)
								]))
						]))
				]))
		]));
var $author$project$Icon$arrowLeft = A2(
	$elm$svg$Svg$svg,
	_List_fromArray(
		[
			$elm$svg$Svg$Attributes$viewBox('0 -4.5 20 20'),
			$elm$svg$Svg$Attributes$width('15px'),
			$elm$svg$Svg$Attributes$height('15px'),
			$elm$svg$Svg$Attributes$transform('rotate(-90 0 0)')
		]),
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$g,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$stroke('none'),
					$elm$svg$Svg$Attributes$strokeWidth('1'),
					$elm$svg$Svg$Attributes$fill('currentColor'),
					$elm$svg$Svg$Attributes$fillRule('evenodd')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$transform('translate(-180.000000, -6684.000000)'),
							$elm$svg$Svg$Attributes$fill('currentColor')
						]),
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$g,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$transform('translate(56.000000, 160.000000)')
								]),
							_List_fromArray(
								[
									A2(
									$elm$svg$Svg$path,
									_List_fromArray(
										[
											$elm$svg$Svg$Attributes$d('M144,6535 L142.594,6536.39 L133.987,6528.129 L133.069,6529.01 L133.074,6529.005 L125.427,6536.345 L124,6534.976 C126.113,6532.947 132.014,6527.283 133.987,6525.39 C135.453,6526.796 134.024,6525.425 144,6535')
										]),
									_List_Nil)
								]))
						]))
				]))
		]));
var $author$project$Icon$sizeToString = function (size_) {
	switch (size_.$) {
		case 'XSmall':
			return '10';
		case 'Small':
			return '15';
		case 'Medium':
			return '20';
		case 'Large':
			return '24';
		default:
			return '50';
	}
};
var $author$project$Colors$tailwindColorToColor = function (color) {
	switch (color) {
		case 'bg-green-400':
			return 'rgb(74 222 128)';
		case 'bg-gray-100':
			return 'rgb(243 244 246)';
		case 'bg-gray-200':
			return 'rgb(229 231 235)';
		case 'bg-gray-300':
			return 'rgb(209 213 219)';
		case 'bg-gray-400':
			return 'rgb(156 163 175)';
		case 'bg-gray-500':
			return 'rgb(64 64 64)';
		case 'bg-gray-600':
			return 'rgb(38 38 38)';
		case 'bg-orange-400':
			return 'rgb(251 146 60)';
		case 'bg-red-400':
			return 'rgb(248 113 113)';
		case 'bg-sky-200':
			return 'rgb(14 165 233)';
		case 'bg-sky-100':
			return 'rgb(209 213 219)';
		case 'bg-sky-500':
			return 'rgb(14 165 233)';
		case 'bg-sky-400':
			return 'rgb(14 165 233)';
		case 'bg-white':
			return 'rgb(255 255 255)';
		case 'bg-black':
			return 'rgb(0 0 0)';
		case 'bg-yellow-400':
			return 'rgb(250 204 21)';
		case 'bg-amber-400':
			return 'rgb(255 165 0)';
		case 'bg-amber-500':
			return 'rgb(255 165 0)';
		case 'bg-amber-600':
			return 'rgb(255 165 0)';
		case 'bg-amber-700':
			return 'rgb(255 165 0)';
		case 'bg-amber-800':
			return 'rgb(255 165 0)';
		case 'bg-amber-900':
			return 'rgb(255 165 0)';
		default:
			return color;
	}
};
var $author$project$Icon$arrowRight = F2(
	function (fill, size) {
		return A2(
			$elm$svg$Svg$svg,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$viewBox('0 -4.5 20 20'),
					$elm$svg$Svg$Attributes$width(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$height(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$transform('rotate(90 0 0)')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$stroke('none'),
							$elm$svg$Svg$Attributes$strokeWidth('1'),
							$elm$svg$Svg$Attributes$fill('currentColor'),
							$elm$svg$Svg$Attributes$fillRule('evenodd')
						]),
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$g,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$transform('translate(-180.000000, -6684.000000)'),
									$elm$svg$Svg$Attributes$fill(
									(fill === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(fill))
								]),
							_List_fromArray(
								[
									A2(
									$elm$svg$Svg$g,
									_List_fromArray(
										[
											$elm$svg$Svg$Attributes$transform('translate(56.000000, 160.000000)')
										]),
									_List_fromArray(
										[
											A2(
											$elm$svg$Svg$path,
											_List_fromArray(
												[
													$elm$svg$Svg$Attributes$d('M144,6535 L142.594,6536.39 L133.987,6528.129 L133.069,6529.01 L133.074,6529.005 L125.427,6536.345 L124,6534.976 C126.113,6532.947 132.014,6527.283 133.987,6525.39 C135.453,6526.796 134.024,6525.425 144,6535')
												]),
											_List_Nil)
										]))
								]))
						]))
				]));
	});
var $author$project$Icon$arrowUp = A2(
	$elm$svg$Svg$svg,
	_List_fromArray(
		[
			$elm$svg$Svg$Attributes$viewBox('0 -4.5 20 20'),
			$elm$svg$Svg$Attributes$width('15px'),
			$elm$svg$Svg$Attributes$height('15px')
		]),
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$g,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$stroke('none'),
					$elm$svg$Svg$Attributes$strokeWidth('1'),
					$elm$svg$Svg$Attributes$fill('currentColor'),
					$elm$svg$Svg$Attributes$fillRule('evenodd')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$transform('translate(-180.000000, -6684.000000)'),
							$elm$svg$Svg$Attributes$fill('currentColor')
						]),
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$g,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$transform('translate(56.000000, 160.000000)')
								]),
							_List_fromArray(
								[
									A2(
									$elm$svg$Svg$path,
									_List_fromArray(
										[
											$elm$svg$Svg$Attributes$d('M144,6535 L142.594,6536.39 L133.987,6528.129 L133.069,6529.01 L133.074,6529.005 L125.427,6536.345 L124,6534.976 C126.113,6532.947 132.014,6527.283 133.987,6525.39 C135.453,6526.796 134.024,6525.425 144,6535')
										]),
									_List_Nil)
								]))
						]))
				]))
		]));
var $author$project$Icon$assessment = F2(
	function (stroke, size) {
		return A2(
			$elm$svg$Svg$svg,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$fill(
					(stroke === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(stroke)),
					$elm$svg$Svg$Attributes$width(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$height(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$viewBox('0 0 24 24')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$d('M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z')
						]),
					_List_Nil)
				]));
	});
var $elm$svg$Svg$Attributes$clipRule = _VirtualDom_attribute('clip-rule');
var $elm$svg$Svg$Attributes$id = _VirtualDom_attribute('id');
var $author$project$Icon$attach = F2(
	function (overrideColor, size) {
		return A2(
			$elm$svg$Svg$svg,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$width(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$height(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
					$elm$svg$Svg$Attributes$fill('none')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$id('style=stroke')
						]),
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$g,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$id('attach')
								]),
							_List_fromArray(
								[
									A2(
									$elm$svg$Svg$path,
									_List_fromArray(
										[
											$elm$svg$Svg$Attributes$id('vector (Stroke)'),
											$elm$svg$Svg$Attributes$fillRule('evenodd'),
											$elm$svg$Svg$Attributes$clipRule('evenodd'),
											$elm$svg$Svg$Attributes$d('M17.3656 4.70536C16.2916 3.63142 14.5504 3.63142 13.4765 4.70536L5.34477 12.8371C3.68504 14.4968 3.68504 17.1878 5.34477 18.8475C7.0045 20.5072 9.69545 20.5072 11.3552 18.8475L20.1172 10.0855C20.41 9.79263 20.8849 9.79263 21.1778 10.0855C21.4707 10.3784 21.4707 10.8533 21.1778 11.1462L12.4158 19.9082C10.1703 22.1537 6.52963 22.1537 4.28411 19.9082C2.0386 17.6626 2.0386 14.0219 4.28411 11.7764L12.4158 3.6447C14.0756 1.98497 16.7665 1.98497 18.4262 3.6447C20.086 5.30443 20.086 7.99538 18.4262 9.65511L10.6327 17.4487C9.55876 18.5226 7.81756 18.5226 6.74361 17.4487C5.66967 16.3747 5.66967 14.6335 6.74361 13.5596L13.9377 6.36552C14.2305 6.07263 14.7054 6.07263 14.9983 6.36552C15.2912 6.65842 15.2912 7.13329 14.9983 7.42618L7.80427 14.6202C7.31612 15.1084 7.31612 15.8998 7.80427 16.388C8.29243 16.8761 9.08389 16.8761 9.57204 16.388L17.3656 8.59445C18.4395 7.5205 18.4395 5.7793 17.3656 4.70536Z'),
											$elm$svg$Svg$Attributes$fill(
											(overrideColor === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(overrideColor))
										]),
									_List_Nil)
								]))
						]))
				]));
	});
var $author$project$InputField$Autocomplete = {$: 'Autocomplete'};
var $author$project$Icon$Large = {$: 'Large'};
var $elm$json$Json$Encode$string = _Json_wrap;
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2($elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var $elm$html$Html$Attributes$id = $elm$html$Html$Attributes$stringProperty('id');
var $elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var $elm$html$Html$li = _VirtualDom_node('li');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $author$project$Icon$search = F2(
	function (fill, size) {
		return A2(
			$elm$svg$Svg$svg,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$width(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$height(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$viewBox('0 -0.5 25 25'),
					$elm$svg$Svg$Attributes$fill('none')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$fillRule('evenodd'),
							$elm$svg$Svg$Attributes$clipRule('evenodd'),
							$elm$svg$Svg$Attributes$d('M5.5 10.7655C5.50003 8.01511 7.44296 5.64777 10.1405 5.1113C12.8381 4.57483 15.539 6.01866 16.5913 8.55977C17.6437 11.1009 16.7544 14.0315 14.4674 15.5593C12.1804 17.0871 9.13257 16.7866 7.188 14.8415C6.10716 13.7604 5.49998 12.2942 5.5 10.7655Z'),
							$elm$svg$Svg$Attributes$stroke(
							(fill === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(fill)),
							$elm$svg$Svg$Attributes$strokeWidth('1.5'),
							$elm$svg$Svg$Attributes$strokeLinecap('round'),
							$elm$svg$Svg$Attributes$strokeLinejoin('round')
						]),
					_List_Nil),
					A2(
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$d('M17.029 16.5295L19.5 19.0005'),
							$elm$svg$Svg$Attributes$stroke(
							(fill === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(fill)),
							$elm$svg$Svg$Attributes$strokeWidth('1.5'),
							$elm$svg$Svg$Attributes$strokeLinecap('round'),
							$elm$svg$Svg$Attributes$strokeLinejoin('round')
						]),
					_List_Nil)
				]));
	});
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $elm$core$Tuple$second = function (_v0) {
	var y = _v0.b;
	return y;
};
var $elm$html$Html$Attributes$classList = function (classes) {
	return $elm$html$Html$Attributes$class(
		A2(
			$elm$core$String$join,
			' ',
			A2(
				$elm$core$List$map,
				$elm$core$Tuple$first,
				A2($elm$core$List$filter, $elm$core$Tuple$second, classes))));
};
var $elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3($elm$core$List$foldr, $elm$core$List$cons, ys, xs);
		}
	});
var $elm$core$List$concat = function (lists) {
	return A3($elm$core$List$foldr, $elm$core$List$append, _List_Nil, lists);
};
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$html$Html$span = _VirtualDom_node('span');
var $author$project$Icon$warning = F2(
	function (stroke, size) {
		return A2(
			$elm$svg$Svg$svg,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
					$elm$svg$Svg$Attributes$fill('none'),
					$elm$svg$Svg$Attributes$width(
					$author$project$Icon$sizeToString(size) + 'px')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$d('M12 17.0001H12.01M12 10.0001V14.0001M6.41209 21.0001H17.588C19.3696 21.0001 20.2604 21.0001 20.783 20.6254C21.2389 20.2985 21.5365 19.7951 21.6033 19.238C21.6798 18.5996 21.2505 17.819 20.3918 16.2579L14.8039 6.09805C13.8897 4.4359 13.4326 3.60482 12.8286 3.32987C12.3022 3.09024 11.6978 3.09024 11.1714 3.32987C10.5674 3.60482 10.1103 4.4359 9.19614 6.09805L3.6082 16.2579C2.74959 17.819 2.32028 18.5996 2.39677 19.238C2.46351 19.7951 2.76116 20.2985 3.21709 20.6254C3.7396 21.0001 4.63043 21.0001 6.41209 21.0001Z'),
							$elm$svg$Svg$Attributes$stroke(
							$author$project$Colors$tailwindColorToColor(stroke)),
							$elm$svg$Svg$Attributes$strokeWidth('2'),
							$elm$svg$Svg$Attributes$strokeLinecap('round'),
							$elm$svg$Svg$Attributes$strokeLinejoin('round')
						]),
					_List_Nil)
				]));
	});
var $author$project$InputField$inputFieldError = function (txt) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('bg-red-500 text-white flex gap-1 p-1 text-xs items-center mt-[2px]')
			]),
		_List_fromArray(
			[
				A2($author$project$Icon$warning, '#ffffff', $author$project$Icon$Small),
				A2(
				$elm$html$Html$span,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(txt)
					]))
			]));
};
var $author$project$InputField$inputTextDisabledStyle = 'py-2 px-3 cursor-disabled rounded bg-slate-100 border border-slate-100 dark:text-white dark:bg-slate-700 block w-full text-sm text-gray-500 focus:border-gray-300 focus:border-gray-300 focus:ring-gray-500';
var $author$project$InputField$inputTextNegativeStyle = 'py-2 px-3 border border-red-500 rounded bg-red-100 block w-full text-sm text-red-500 focus:outline-none focus:ring-0 focus:border-gray-400';
var $author$project$InputField$inputTextStyle = 'py-2 px-2 text-gray-500 block w-full rounded bg-white dark:bg-slate-700 text-sm border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-400 placeholder:text-gray-400';
var $author$project$InputField$isPlaceholder = function (label) {
	if (label.$ === 'Placeholder') {
		return true;
	} else {
		return false;
	}
};
var $elm$html$Html$label = _VirtualDom_node('label');
var $elm$svg$Svg$Attributes$xmlSpace = A2(_VirtualDom_attributeNS, 'http://www.w3.org/XML/1998/namespace', 'xml:space');
var $author$project$Icon$eye = function (overrideColor) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$width('24px'),
				$elm$svg$Svg$Attributes$fill(
				(overrideColor === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(overrideColor)),
				$elm$svg$Svg$Attributes$viewBox('0 0 442.04 442.04'),
				$elm$svg$Svg$Attributes$xmlSpace('preserve')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$g,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$g,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$path,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$d('M221.02,341.304c-49.708,0-103.206-19.44-154.71-56.22C27.808,257.59,4.044,230.351,3.051,229.203\n\t\t\tc-4.068-4.697-4.068-11.669,0-16.367c0.993-1.146,24.756-28.387,63.259-55.881c51.505-36.777,105.003-56.219,154.71-56.219\n\t\t\tc49.708,0,103.207,19.441,154.71,56.219c38.502,27.494,62.266,54.734,63.259,55.881c4.068,4.697,4.068,11.669,0,16.367\n\t\t\tc-0.993,1.146-24.756,28.387-63.259,55.881C324.227,321.863,270.729,341.304,221.02,341.304z M29.638,221.021\n\t\t\tc9.61,9.799,27.747,27.03,51.694,44.071c32.83,23.361,83.714,51.212,139.688,51.212s106.859-27.851,139.688-51.212\n\t\t\tc23.944-17.038,42.082-34.271,51.694-44.071c-9.609-9.799-27.747-27.03-51.694-44.071\n\t\t\tc-32.829-23.362-83.714-51.212-139.688-51.212s-106.858,27.85-139.688,51.212C57.388,193.988,39.25,211.219,29.638,221.021z')
									]),
								_List_Nil)
							])),
						A2(
						$elm$svg$Svg$g,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								$elm$svg$Svg$path,
								_List_fromArray(
									[
										$elm$svg$Svg$Attributes$d('M221.02,298.521c-42.734,0-77.5-34.767-77.5-77.5c0-42.733,34.766-77.5,77.5-77.5c18.794,0,36.924,6.814,51.048,19.188\n\t\t\tc5.193,4.549,5.715,12.446,1.166,17.639c-4.549,5.193-12.447,5.714-17.639,1.166c-9.564-8.379-21.844-12.993-34.576-12.993\n\t\t\tc-28.949,0-52.5,23.552-52.5,52.5s23.551,52.5,52.5,52.5c28.95,0,52.5-23.552,52.5-52.5c0-6.903,5.597-12.5,12.5-12.5\n\t\t\ts12.5,5.597,12.5,12.5C298.521,263.754,263.754,298.521,221.02,298.521z')
									]),
								_List_Nil),
								A2(
								$elm$svg$Svg$g,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										$elm$svg$Svg$path,
										_List_fromArray(
											[
												$elm$svg$Svg$Attributes$d('M221.02,246.021c-13.785,0-25-11.215-25-25s11.215-25,25-25c13.786,0,25,11.215,25,25S234.806,246.021,221.02,246.021z')
											]),
										_List_Nil)
									]))
							]))
					]))
			]));
};
var $author$project$InputField$eyeClosedStyle = ' before:content-[\'\'] before:block before:absolute before:w-[25px] before:h-[1px] before:bg-sky-300 before:rotate-[45deg] before:top-[12px] before:cursor-pointer';
var $author$project$InputField$eyeClosedWrapperStyle = 'absolute right-[5px] w-[25px] right-[5px] top-[32px] cursor-pointer z-index';
var $elm$html$Html$Attributes$for = $elm$html$Html$Attributes$stringProperty('htmlFor');
var $elm$json$Json$Decode$field = _Json_decodeField;
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$html$Html$Events$targetChecked = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'checked']),
	$elm$json$Json$Decode$bool);
var $elm$html$Html$Events$onCheck = function (tagger) {
	return A2(
		$elm$html$Html$Events$on,
		'change',
		A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetChecked));
};
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $author$project$InputField$labelShowPassword = F3(
	function (toMsg, id, shouldShow) {
		return A2(
			$elm$html$Html$label,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$for(id)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$input,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$type_('checkbox'),
							$elm$html$Html$Attributes$id(id),
							$elm$html$Html$Events$onCheck(
							toMsg(id)),
							$elm$html$Html$Attributes$class('h-[0] absolute invisible')
						]),
					_List_Nil),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							_Utils_ap(
								$author$project$InputField$eyeClosedWrapperStyle,
								shouldShow ? '' : $author$project$InputField$eyeClosedStyle))
						]),
					_List_fromArray(
						[
							$author$project$Icon$eye('#d1d5db')
						]))
				]));
	});
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$string = _Json_decodeString;
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$Attributes$placeholder = $elm$html$Html$Attributes$stringProperty('placeholder');
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$InputField$toHtml = function (_v0) {
	var constraints = _v0.a;
	var _v1 = constraints;
	var label = _v1.label;
	var value = _v1.value;
	var toMsg = _v1.toMsg;
	var type_ = _v1.type_;
	var isDisabled = _v1.isDisabled;
	var error = _v1.error;
	var inputHtml = function (attributes) {
		if (type_.$ === 'CardExpiration') {
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class(
						$author$project$InputField$inputTextStyle + (($author$project$InputField$isPlaceholder(label) ? '' : ' mt-1') + ' flex gap-2'))
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$input,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('number'),
								$elm$html$Html$Attributes$class('w-[202px] bg-transparent focus:border-none focus:outline-none')
							]),
						_List_Nil),
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('gap-2')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('/')
							])),
						A2(
						$elm$html$Html$input,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$type_('number'),
								$elm$html$Html$Attributes$class('w-[20px] bg-transparent focus:border-none focus:outline-none')
							]),
						_List_Nil)
					]));
		} else {
			return A2(
				$elm$html$Html$input,
				$elm$core$List$concat(
					_List_fromArray(
						[
							_List_fromArray(
							[
								function () {
								switch (type_.$) {
									case 'Text':
										return $elm$html$Html$Attributes$type_('text');
									case 'Decimal':
										return $elm$html$Html$Attributes$type_('number');
									case 'Integer':
										return $elm$html$Html$Attributes$type_('number');
									case 'Password':
										var _v11 = type_.a;
										var shouldShow = _v11.b;
										return shouldShow ? $elm$html$Html$Attributes$type_('text') : $elm$html$Html$Attributes$type_('password');
									case 'CardExpiration':
										return $elm$html$Html$Attributes$type_('number');
									default:
										return $elm$html$Html$Attributes$type_('text');
								}
							}(),
								$elm$html$Html$Attributes$disabled(isDisabled),
								$elm$html$Html$Attributes$value(value)
							]),
							function () {
							if (toMsg.$ === 'Just') {
								var toMsg_ = toMsg.a;
								return _List_fromArray(
									[
										$elm$html$Html$Events$onInput(toMsg_)
									]);
							} else {
								return _List_Nil;
							}
						}(),
							function () {
							switch (label.$) {
								case 'Placeholder':
									var placeholder = label.a;
									return _List_fromArray(
										[
											$elm$html$Html$Attributes$placeholder(placeholder)
										]);
								case 'Both':
									var placeholder = label.b;
									return _List_fromArray(
										[
											$elm$html$Html$Attributes$placeholder(placeholder)
										]);
								default:
									return _List_Nil;
							}
						}(),
							attributes
						])),
				_List_Nil);
		}
	};
	var extendedInput = isDisabled ? _List_fromArray(
		[
			inputHtml(
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(
					_Utils_ap(
						$author$project$InputField$inputTextDisabledStyle,
						$author$project$InputField$isPlaceholder(label) ? '' : ' mt-1')),
					$elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'pl-[28px]',
							_Utils_eq(type_, $author$project$InputField$Autocomplete))
						]))
				]))
		]) : ($elm$core$List$isEmpty(error) ? _List_fromArray(
		[
			inputHtml(
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(
					_Utils_ap(
						$author$project$InputField$inputTextStyle,
						$author$project$InputField$isPlaceholder(label) ? '' : ' mt-1')),
					$elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'pl-[28px]',
							_Utils_eq(type_, $author$project$InputField$Autocomplete))
						])),
					$elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'pr-[30px]',
							function () {
								if (type_.$ === 'Password') {
									var _v8 = type_.a;
									return true;
								} else {
									return false;
								}
							}())
						]))
				]))
		]) : $elm$core$List$concat(
		_List_fromArray(
			[
				_List_fromArray(
				[
					inputHtml(
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							_Utils_ap(
								$author$project$InputField$inputTextNegativeStyle,
								$author$project$InputField$isPlaceholder(label) ? '' : ' mt-1')),
							$elm$html$Html$Attributes$classList(
							_List_fromArray(
								[
									_Utils_Tuple2(
									'pl-[28px]',
									_Utils_eq(type_, $author$project$InputField$Autocomplete))
								]))
						]))
				]),
				A2($elm$core$List$map, $author$project$InputField$inputFieldError, error)
			])));
	switch (label.$) {
		case 'Label':
			var label_ = label.a;
			return A2(
				$elm$html$Html$label,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('block relative text-sm font-medium text-gray-500')
					]),
				$elm$core$List$concat(
					_List_fromArray(
						[
							_List_fromArray(
							[
								$elm$html$Html$text(label_)
							]),
							extendedInput,
							function () {
							if (type_.$ === 'Password') {
								var _v4 = type_.a;
								var id = _v4.a;
								var shouldShow = _v4.b;
								var toMsg_ = _v4.c;
								return _List_fromArray(
									[
										A3($author$project$InputField$labelShowPassword, toMsg_, id, shouldShow)
									]);
							} else {
								return _List_Nil;
							}
						}()
						])));
		case 'Placeholder':
			return A2($elm$html$Html$label, _List_Nil, extendedInput);
		default:
			var label_ = label.a;
			var placeholder = label.b;
			return A2(
				$elm$html$Html$label,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('block relative text-sm font-medium text-gray-500')
					]),
				$elm$core$List$concat(
					_List_fromArray(
						[
							_List_fromArray(
							[
								$elm$html$Html$text(label_)
							]),
							extendedInput,
							function () {
							if (type_.$ === 'Password') {
								var _v6 = type_.a;
								var id = _v6.a;
								var shouldShow = _v6.b;
								var toMsg_ = _v6.c;
								return _List_fromArray(
									[
										A3($author$project$InputField$labelShowPassword, toMsg_, id, shouldShow)
									]);
							} else {
								return _List_Nil;
							}
						}()
						])));
	}
};
var $elm$html$Html$ul = _VirtualDom_node('ul');
var $author$project$InputField$InputField = function (a) {
	return {$: 'InputField', a: a};
};
var $author$project$InputField$Label = function (a) {
	return {$: 'Label', a: a};
};
var $author$project$InputField$view = $author$project$InputField$InputField(
	{
		error: _List_Nil,
		isDisabled: false,
		label: $author$project$InputField$Label(''),
		showPassword: false,
		toMsg: $elm$core$Maybe$Nothing,
		type_: $author$project$InputField$Text,
		value: ''
	});
var $author$project$InputField$withDisable = F2(
	function (isDisabled, _v0) {
		var constraints = _v0.a;
		return $author$project$InputField$InputField(
			_Utils_update(
				constraints,
				{isDisabled: isDisabled}));
	});
var $author$project$InputField$withError = F2(
	function (lstErrors, _v0) {
		var constraints = _v0.a;
		return $author$project$InputField$InputField(
			_Utils_update(
				constraints,
				{error: lstErrors}));
	});
var $author$project$InputField$withExtraText = F2(
	function (label, _v0) {
		var constraints = _v0.a;
		return $author$project$InputField$InputField(
			_Utils_update(
				constraints,
				{label: label}));
	});
var $author$project$InputField$withMsg = F2(
	function (toMsg, _v0) {
		var constraints = _v0.a;
		return $author$project$InputField$InputField(
			_Utils_update(
				constraints,
				{
					toMsg: $elm$core$Maybe$Just(toMsg)
				}));
	});
var $author$project$InputField$withType = F2(
	function (type_, _v0) {
		var constraints = _v0.a;
		return $author$project$InputField$InputField(
			_Utils_update(
				constraints,
				{type_: type_}));
	});
var $author$project$InputField$withValue = F2(
	function (value, _v0) {
		var constraints = _v0.a;
		return $author$project$InputField$InputField(
			_Utils_update(
				constraints,
				{value: value}));
	});
var $author$project$Element$autocomplete = function (args) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('relative flex flex-col'),
				$elm$html$Html$Attributes$id(args.id)
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class(
						'absolute left-[5px] ' + ($elm$core$List$isEmpty(args.errors) ? 'bottom-[6px] z-[1]' : 'bottom-[32px] z-[1]'))
					]),
				_List_fromArray(
					[
						A2($author$project$Icon$search, 'bg-sky-400', $author$project$Icon$Large)
					])),
				$author$project$InputField$toHtml(
				A2(
					$author$project$InputField$withExtraText,
					args.placeholder,
					A2(
						$author$project$InputField$withError,
						args.errors,
						A2(
							$author$project$InputField$withDisable,
							args.isDisabled,
							A2(
								$author$project$InputField$withType,
								$author$project$InputField$Autocomplete,
								A2(
									$author$project$InputField$withMsg,
									args.toMsg,
									A2($author$project$InputField$withValue, args.value, $author$project$InputField$view))))))),
				A2(
				$elm$html$Html$ul,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class(
						'flex flex-col gap-2 text-gray-500 rounded-b-lg gap-y-[1px] absolute left-0 w-full bg-gray-100 border border-gray-100 z-[1] overflow-hidden ' + function () {
							var _v0 = args.placeholder;
							if (_v0.$ === 'Placeholder') {
								return 'top-[38px]';
							} else {
								return 'top-[62px]';
							}
						}()),
						A2(
						$elm$html$Html$Attributes$style,
						'display',
						(args.showList && $elm$core$List$isEmpty(args.errors)) ? 'flex' : 'none')
					]),
				A2(
					$elm$core$List$map,
					function (item) {
						return A2(
							$elm$html$Html$li,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('cursor-pointer bg-white text-sm py-1 px-2 cursor-pointer hover:bg-gray-100'),
									$elm$html$Html$Events$onClick(
									args.onClick(
										args.itemLabel(item)))
								]),
							_List_fromArray(
								[
									$elm$html$Html$text(
									args.itemLabel(item))
								]));
					},
					A2(
						$elm$core$List$filter,
						function (item) {
							return args.filterListCondition(item);
						},
						args.options)))
			]));
};
var $elm$svg$Svg$line = $elm$svg$Svg$trustedNode('line');
var $elm$svg$Svg$Attributes$x1 = _VirtualDom_attribute('x1');
var $elm$svg$Svg$Attributes$x2 = _VirtualDom_attribute('x2');
var $elm$svg$Svg$Attributes$y1 = _VirtualDom_attribute('y1');
var $elm$svg$Svg$Attributes$y2 = _VirtualDom_attribute('y2');
var $author$project$Icon$awaitingAction = A2(
	$elm$svg$Svg$svg,
	_List_fromArray(
		[
			$elm$svg$Svg$Attributes$width('20'),
			$elm$svg$Svg$Attributes$height('20'),
			$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
			$elm$svg$Svg$Attributes$fill('none'),
			$elm$svg$Svg$Attributes$stroke('currentColor'),
			$elm$svg$Svg$Attributes$strokeWidth('2'),
			$elm$svg$Svg$Attributes$strokeLinecap('round'),
			$elm$svg$Svg$Attributes$strokeLinejoin('round')
		]),
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d('M10.29 3.86L1.82 18a1 1 0 0 0 .86 1.5h18.64a1 1 0 0 0 .86-1.5L13.71 3.86a1 1 0 0 0-1.72 0z')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$line,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x1('12'),
					$elm$svg$Svg$Attributes$y1('9'),
					$elm$svg$Svg$Attributes$x2('12'),
					$elm$svg$Svg$Attributes$y2('13')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$line,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x1('12'),
					$elm$svg$Svg$Attributes$y1('17'),
					$elm$svg$Svg$Attributes$x2('12.01'),
					$elm$svg$Svg$Attributes$y2('17')
				]),
			_List_Nil)
		]));
var $elm$html$Html$table = _VirtualDom_node('table');
var $elm$html$Html$tbody = _VirtualDom_node('tbody');
var $elm$html$Html$td = _VirtualDom_node('td');
var $elm$html$Html$th = _VirtualDom_node('th');
var $elm$html$Html$thead = _VirtualDom_node('thead');
var $elm$html$Html$tr = _VirtualDom_node('tr');
var $author$project$Element$basicTable = function (_v0) {
	var th = _v0.th;
	var td = _v0.td;
	var _v1 = _Utils_Tuple2(
		A2(
			$elm$html$Html$thead,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('px-2 py-1 border')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$tr,
					_List_fromArray(
						[
							A2($elm$html$Html$Attributes$style, 'text-align', 'left')
						]),
					A2(
						$elm$core$List$map,
						function (th_) {
							return A2(
								$elm$html$Html$th,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('bg-gray-100 py-[6px] px-[8px]')
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(th_)
									]));
						},
						th))
				])),
		A2(
			$elm$core$List$map,
			function (row) {
				return A2(
					$elm$html$Html$tr,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('border border-b-1 border-gray-100')
						]),
					A2(
						$elm$core$List$map,
						function (td_) {
							return A2(
								$elm$html$Html$td,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('relative py-4 whitespace-nowrap py-[6px] px-[8px]')
									]),
								_List_fromArray(
									[td_]));
						},
						row));
			},
			td));
	var viewTh = _v1.a;
	var viewTd = _v1.b;
	return A2(
		$elm$html$Html$table,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('text-left text-sm'),
				A2($elm$html$Html$Attributes$style, 'border-spacing', '0')
			]),
		_List_fromArray(
			[
				viewTh,
				A2(
				$elm$html$Html$tbody,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('bg-white')
					]),
				viewTd)
			]));
};
var $author$project$Icon$business = F2(
	function (stroke, size) {
		return A2(
			$elm$svg$Svg$svg,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$width(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$height(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$viewBox('0 0 1024 1024')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$fill(
							(stroke === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(stroke)),
							$elm$svg$Svg$Attributes$d('M128 384h768v-64a64 64 0 0 0-64-64H192a64 64 0 0 0-64 64v64zm0 64v320a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64V448H128zm64-256h640a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H192A128 128 0 0 1 64 768V320a128 128 0 0 1 128-128z')
						]),
					_List_Nil),
					A2(
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$fill(
							(stroke === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(stroke)),
							$elm$svg$Svg$Attributes$d('M384 128v64h256v-64H384zm0-64h256a64 64 0 0 1 64 64v64a64 64 0 0 1-64 64H384a64 64 0 0 1-64-64v-64a64 64 0 0 1 64-64z')
						]),
					_List_Nil)
				]));
	});
var $author$project$Demo$buttonWithSizeLabel = F2(
	function (sizeLabel, buttonHtml) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('flex flex-col gap-1 items-start')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-xs font-mono text-gray-500')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(sizeLabel)
						])),
					buttonHtml
				]));
	});
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$ErrorUI$byFieldName = F2(
	function (field, errors) {
		return A2(
			$elm$core$Maybe$withDefault,
			_List_Nil,
			A2($elm$core$Dict$get, field, errors));
	});
var $elm$svg$Svg$rect = $elm$svg$Svg$trustedNode('rect');
var $elm$svg$Svg$Attributes$rx = _VirtualDom_attribute('rx');
var $elm$svg$Svg$Attributes$x = _VirtualDom_attribute('x');
var $elm$svg$Svg$Attributes$y = _VirtualDom_attribute('y');
var $author$project$Icon$calendar = function (fill) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$width('24px'),
				$elm$svg$Svg$Attributes$height('24px'),
				$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
				$elm$svg$Svg$Attributes$fill('none')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M8 3V7M16 3V7'),
						$elm$svg$Svg$Attributes$stroke(
						(fill === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(fill)),
						$elm$svg$Svg$Attributes$strokeWidth('2'),
						$elm$svg$Svg$Attributes$strokeLinecap('round')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$rect,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$x('6'),
						$elm$svg$Svg$Attributes$y('12'),
						$elm$svg$Svg$Attributes$width('3'),
						$elm$svg$Svg$Attributes$height('3'),
						$elm$svg$Svg$Attributes$rx('0.5'),
						$elm$svg$Svg$Attributes$fill(
						(fill === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(fill))
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$rect,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$x('10.5'),
						$elm$svg$Svg$Attributes$y('12'),
						$elm$svg$Svg$Attributes$width('3'),
						$elm$svg$Svg$Attributes$height('3'),
						$elm$svg$Svg$Attributes$rx('0.5'),
						$elm$svg$Svg$Attributes$fill(
						(fill === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(fill))
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$rect,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$x('15'),
						$elm$svg$Svg$Attributes$y('12'),
						$elm$svg$Svg$Attributes$width('3'),
						$elm$svg$Svg$Attributes$height('3'),
						$elm$svg$Svg$Attributes$rx('0.5'),
						$elm$svg$Svg$Attributes$fill(
						(fill === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(fill))
					]),
				_List_Nil)
			]));
};
var $elm$svg$Svg$Attributes$class = _VirtualDom_attribute('class');
var $elm$svg$Svg$defs = $elm$svg$Svg$trustedNode('defs');
var $elm$svg$Svg$style = $elm$svg$Svg$trustedNode('style');
var $author$project$Icon$chat = F2(
	function (stroke, size) {
		return A2(
			$elm$svg$Svg$svg,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$width(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$height(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$viewBox('0 0 24 24')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$defs,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$style,
							_List_Nil,
							_List_fromArray(
								[
									$elm$html$Html$text(
									'.cls-1{fill:none;stroke:' + (((stroke === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(stroke)) + ';stroke-miterlimit:10;stroke-width:1.91px;}'))
								]))
						])),
					A2(
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$class('cls-1'),
							$elm$svg$Svg$Attributes$d('M18.68,8.16V15.8a2.86,2.86,0,0,1-2.86,2.86H13.91v2.86L8.18,18.66H4.36A2.86,2.86,0,0,1,1.5,15.8V8.16A2.86,2.86,0,0,1,4.36,5.3H15.82A2.86,2.86,0,0,1,18.68,8.16Z')
						]),
					_List_Nil),
					A2(
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$class('cls-1'),
							$elm$svg$Svg$Attributes$d('M18.68,14.84h1A2.86,2.86,0,0,0,22.5,12V4.34a2.86,2.86,0,0,0-2.86-2.86H8.18A2.86,2.86,0,0,0,5.32,4.34v1')
						]),
					_List_Nil),
					A2(
					$elm$svg$Svg$line,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$class('cls-1'),
							$elm$svg$Svg$Attributes$x1('5.32'),
							$elm$svg$Svg$Attributes$y1('11.98'),
							$elm$svg$Svg$Attributes$x2('7.23'),
							$elm$svg$Svg$Attributes$y2('11.98')
						]),
					_List_Nil),
					A2(
					$elm$svg$Svg$line,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$class('cls-1'),
							$elm$svg$Svg$Attributes$x1('9.14'),
							$elm$svg$Svg$Attributes$y1('11.98'),
							$elm$svg$Svg$Attributes$x2('11.05'),
							$elm$svg$Svg$Attributes$y2('11.98')
						]),
					_List_Nil),
					A2(
					$elm$svg$Svg$line,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$class('cls-1'),
							$elm$svg$Svg$Attributes$x1('12.95'),
							$elm$svg$Svg$Attributes$y1('11.98'),
							$elm$svg$Svg$Attributes$x2('14.86'),
							$elm$svg$Svg$Attributes$y2('11.98')
						]),
					_List_Nil)
				]));
	});
var $author$project$Icon$check = F2(
	function (stroke, size) {
		return A2(
			$elm$svg$Svg$svg,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$fill(
					(stroke === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(stroke)),
					$elm$svg$Svg$Attributes$width(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$height(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$viewBox('0 0 305.002 305.002')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$strokeWidth('0')
						]),
					_List_Nil),
					A2(
					$elm$svg$Svg$g,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$strokeLinecap('round'),
							$elm$svg$Svg$Attributes$strokeLinejoin('round')
						]),
					_List_Nil),
					A2(
					$elm$svg$Svg$g,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$g,
							_List_Nil,
							_List_fromArray(
								[
									A2(
									$elm$svg$Svg$g,
									_List_Nil,
									_List_fromArray(
										[
											A2(
											$elm$svg$Svg$path,
											_List_fromArray(
												[
													$elm$svg$Svg$Attributes$d('M152.502,0.001C68.412,0.001,0,68.412,0,152.501s68.412,152.5,152.502,152.5c84.089,0,152.5-68.411,152.5-152.5 S236.591,0.001,152.502,0.001z M152.502,280.001C82.197,280.001,25,222.806,25,152.501c0-70.304,57.197-127.5,127.502-127.5 c70.304,0,127.5,57.196,127.5,127.5C280.002,222.806,222.806,280.001,152.502,280.001z'),
													$elm$svg$Svg$Attributes$fill(
													(stroke === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(stroke))
												]),
											_List_Nil),
											A2(
											$elm$svg$Svg$path,
											_List_fromArray(
												[
													$elm$svg$Svg$Attributes$d('M218.473,93.97l-90.546,90.547l-41.398-41.398c-4.882-4.881-12.796-4.881-17.678,0c-4.881,4.882-4.881,12.796,0,17.678 l50.237,50.237c2.441,2.44,5.64,3.661,8.839,3.661c3.199,0,6.398-1.221,8.839-3.661l99.385-99.385 c4.881-4.882,4.881-12.796,0-17.678C231.269,89.089,223.354,89.089,218.473,93.97z'),
													$elm$svg$Svg$Attributes$fill(
													(stroke === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(stroke))
												]),
											_List_Nil)
										]))
								]))
						]))
				]));
	});
var $elm$html$Html$Attributes$checked = $elm$html$Html$Attributes$boolProperty('checked');
var $elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			$elm$core$String$join,
			after,
			A2($elm$core$String$split, before, string));
	});
var $author$project$Element$checkbox = F3(
	function (label, toMsg, checked) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('flex items-center gap-2')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('relative flex items-center')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$input,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('appearance-none w-4 h-4 border-2 border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-200 focus:ring-offset-1 cursor-pointer transition-all duration-200 hover:border-gray-400 rounded-sm'),
									$elm$html$Html$Attributes$type_('checkbox'),
									$elm$html$Html$Events$onCheck(toMsg),
									$elm$html$Html$Attributes$checked(checked),
									$elm$html$Html$Attributes$id(
									'checkbox-' + A3($elm$core$String$replace, ' ', '-', label))
								]),
							_List_Nil),
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('absolute left-[7px] top-0.5 flex items-center justify-center pointer-events-none')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class(
											'w-2 h-2 text-sky-500 flex items-center justify-center transition-opacity duration-200 text-[20px] ' + (checked ? 'opacity-100' : 'opacity-0'))
										]),
									_List_fromArray(
										[
											$elm$html$Html$text('✔')
										]))
								]))
						])),
					A2(
					$elm$html$Html$label,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$for(
							'checkbox-' + A3($elm$core$String$replace, ' ', '-', label)),
							$elm$html$Html$Attributes$class('text-sm text-gray-700 cursor-pointer select-none')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(label)
						]))
				]));
	});
var $elm$svg$Svg$circle = $elm$svg$Svg$trustedNode('circle');
var $elm$svg$Svg$Attributes$cx = _VirtualDom_attribute('cx');
var $elm$svg$Svg$Attributes$cy = _VirtualDom_attribute('cy');
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$svg$Svg$Attributes$pathLength = _VirtualDom_attribute('pathLength');
var $elm$svg$Svg$Attributes$r = _VirtualDom_attribute('r');
var $elm$core$Basics$round = _Basics_round;
var $elm$svg$Svg$Attributes$strokeDasharray = _VirtualDom_attribute('stroke-dasharray');
var $elm$svg$Svg$Attributes$strokeDashoffset = _VirtualDom_attribute('stroke-dashoffset');
var $elm$svg$Svg$Attributes$style = _VirtualDom_attribute('style');
var $author$project$Element$circularProgressBar = function (_v0) {
	var sum = _v0.sum;
	var count = _v0.count;
	var size = _v0.size;
	var shownData = _v0.shownData;
	var viewBoxSize = 100;
	var usedPercentage = (sum > 0) ? $elm$core$Basics$round((count / sum) * 100) : 0;
	var sizeToStrokeWidth = function (size_) {
		switch (size_.$) {
			case 'S':
				return 8;
			case 'M':
				return 10;
			default:
				return 14;
		}
	};
	var strokeWidthStr = $elm$core$String$fromInt(
		sizeToStrokeWidth(size));
	var radius = ((viewBoxSize - sizeToStrokeWidth(size)) / 2) - 0.5;
	var radiusStr = $elm$core$String$fromFloat(radius);
	var progressBarColor = (_Utils_cmp(count, 0.3 * sum) < 0) ? 'bg-yellow-400' : ((_Utils_cmp(count, 0.7 * sum) < 0) ? 'bg-orange-400' : 'bg-red-400');
	var generalSize = function (size_) {
		switch (size_.$) {
			case 'S':
				return '40px';
			case 'M':
				return '100px';
			default:
				return '200px';
		}
	};
	var center = viewBoxSize / 2;
	var centerStr = $elm$core$String$fromFloat(center);
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('relative'),
				A2(
				$elm$html$Html$Attributes$style,
				'width',
				generalSize(size)),
				A2(
				$elm$html$Html$Attributes$style,
				'height',
				generalSize(size))
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$svg,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$viewBox('0 0 100 100'),
						$elm$svg$Svg$Attributes$width(
						generalSize(size)),
						$elm$svg$Svg$Attributes$height(
						generalSize(size))
					]),
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$circle,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$cx(centerStr),
								$elm$svg$Svg$Attributes$cy(centerStr),
								$elm$svg$Svg$Attributes$r(radiusStr),
								$elm$svg$Svg$Attributes$fill('transparent'),
								$elm$svg$Svg$Attributes$stroke('#f0f0f0'),
								$elm$svg$Svg$Attributes$strokeWidth(strokeWidthStr)
							]),
						_List_Nil),
						A2(
						$elm$svg$Svg$circle,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$cx(centerStr),
								$elm$svg$Svg$Attributes$cy(centerStr),
								$elm$svg$Svg$Attributes$r(radiusStr),
								$elm$svg$Svg$Attributes$fill('transparent'),
								$elm$svg$Svg$Attributes$stroke(
								$author$project$Colors$tailwindColorToColor(progressBarColor)),
								$elm$svg$Svg$Attributes$strokeWidth(strokeWidthStr),
								$elm$svg$Svg$Attributes$pathLength('100'),
								$elm$svg$Svg$Attributes$strokeDasharray(
								$elm$core$String$fromInt(usedPercentage) + (' ' + $elm$core$String$fromInt(100 - usedPercentage))),
								$elm$svg$Svg$Attributes$strokeDashoffset('-75'),
								$elm$svg$Svg$Attributes$style('transition: all 700ms linear')
							]),
						_List_Nil)
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]')
					]),
				_List_fromArray(
					[
						function () {
						switch (shownData.$) {
							case 'Percentage':
								return A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class(
											'font-bold text-gray-500 ' + function () {
												switch (size.$) {
													case 'S':
														return 'text-sm';
													case 'M':
														return 'text-2xl';
													default:
														return 'text-3xl';
												}
											}())
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											$elm$core$String$fromInt(usedPercentage) + '%')
										]));
							case 'PercentageAndCount':
								return A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('flex flex-col leading-[0.9] ')
										]),
									_List_fromArray(
										[
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class('text-gray-500 font-bold text-center')
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(
													$elm$core$String$fromInt(count) + ('/' + $elm$core$String$fromInt(sum)))
												])),
											A2(
											$elm$html$Html$span,
											_List_fromArray(
												[
													$elm$html$Html$Attributes$class(
													'font-bold text-center ' + function () {
														switch (size.$) {
															case 'S':
																return 'text-sm';
															case 'M':
																return 'text-2xl';
															default:
																return 'text-3xl';
														}
													}())
												]),
											_List_fromArray(
												[
													$elm$html$Html$text(
													$elm$core$String$fromInt(usedPercentage) + '%')
												]))
										]));
							default:
								return A2(
									$elm$html$Html$span,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class(
											'text-gray-500 ' + function () {
												switch (size.$) {
													case 'S':
														return 'text-sm';
													case 'M':
														return 'text-2xl';
													default:
														return 'text-3xl';
												}
											}())
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(
											$elm$core$String$fromInt(count))
										]));
						}
					}()
					]))
			]));
};
var $author$project$Icon$close = F2(
	function (fill, size) {
		return A2(
			$elm$svg$Svg$svg,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$width(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$height(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$viewBox('0 0 1024 1024'),
					$elm$svg$Svg$Attributes$fill(
					(fill === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(fill))
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$d('M176.662 817.173c-8.19 8.471-7.96 21.977 0.51 30.165 8.472 8.19 21.978 7.96 30.166-0.51l618.667-640c8.189-8.472 7.96-21.978-0.511-30.166-8.471-8.19-21.977-7.96-30.166 0.51l-618.666 640z'),
							$elm$svg$Svg$Attributes$fill('')
						]),
					_List_Nil),
					A2(
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$d('M795.328 846.827c8.19 8.471 21.695 8.7 30.166 0.511 8.471-8.188 8.7-21.694 0.511-30.165l-618.667-640c-8.188-8.471-21.694-8.7-30.165-0.511-8.471 8.188-8.7 21.694-0.511 30.165l618.666 640z'),
							$elm$svg$Svg$Attributes$fill('')
						]),
					_List_Nil)
				]));
	});
var $author$project$Icon$columns = function (fill) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$width('25px'),
				$elm$svg$Svg$Attributes$height('25px'),
				$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
				$elm$svg$Svg$Attributes$fill('none')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M9 5V19M15 5V19M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z'),
						$elm$svg$Svg$Attributes$stroke(
						(fill === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(fill)),
						$elm$svg$Svg$Attributes$strokeWidth('2'),
						$elm$svg$Svg$Attributes$strokeLinecap('round'),
						$elm$svg$Svg$Attributes$strokeLinejoin('round')
					]),
				_List_Nil)
			]));
};
var $author$project$Icon$completed = A2(
	$elm$svg$Svg$svg,
	_List_fromArray(
		[
			$elm$svg$Svg$Attributes$width('20'),
			$elm$svg$Svg$Attributes$height('20'),
			$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
			$elm$svg$Svg$Attributes$fill('none'),
			$elm$svg$Svg$Attributes$stroke('currentColor'),
			$elm$svg$Svg$Attributes$strokeWidth('2'),
			$elm$svg$Svg$Attributes$strokeLinecap('round'),
			$elm$svg$Svg$Attributes$strokeLinejoin('round')
		]),
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d('M20 6L9 17l-5-5')
				]),
			_List_Nil)
		]));
var $author$project$Icon$connect = F2(
	function (fill, size) {
		return A2(
			$elm$svg$Svg$svg,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$width(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$height(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
					$elm$svg$Svg$Attributes$fill(
					(fill === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(fill))
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$d('M14 10C14 9.44771 13.5523 9 13 9H12.5C9.46243 9 7 11.4624 7 14.5C7 17.5376 9.46243 20 12.5 20H17.5C20.5376 20 23 17.5376 23 14.5C23 12.0091 21.3441 9.90488 19.073 9.22823C18.5098 9.06042 18 9.52887 18 10.1166V10.1683C18 10.6659 18.3745 11.0735 18.8345 11.2634C20.1055 11.788 21 13.0395 21 14.5C21 16.433 19.433 18 17.5 18H12.5C10.567 18 9 16.433 9 14.5C9 12.567 10.567 11 12.5 11H13C13.5523 11 14 10.5523 14 10Z')
						]),
					_List_Nil),
					A2(
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$d('M11.5 4C14.5376 4 17 6.46243 17 9.5C17 12.5376 14.5376 15 11.5 15H11C10.4477 15 10 14.5523 10 14C10 13.4477 10.4477 13 11 13H11.5C13.433 13 15 11.433 15 9.5C15 7.567 13.433 6 11.5 6H6.5C4.567 6 3 7.567 3 9.5C3 10.9605 3.89451 12.212 5.16553 12.7366C5.62548 12.9264 6 13.3341 6 13.8317V13.8834C6 14.4711 5.49024 14.9396 4.92699 14.7718C2.65592 14.0951 1 11.9909 1 9.5C1 6.46243 3.46243 4 6.5 4H11.5Z')
						]),
					_List_Nil)
				]));
	});
var $justinmimbs$time_extra$Time$Extra$Day = {$: 'Day'};
var $justinmimbs$time_extra$Time$Extra$Month = {$: 'Month'};
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var $elm$core$String$concat = function (strings) {
	return A2($elm$core$String$join, '', strings);
};
var $justinmimbs$time_extra$Time$Extra$Millisecond = {$: 'Millisecond'};
var $justinmimbs$time_extra$Time$Extra$Week = {$: 'Week'};
var $justinmimbs$date$Date$Day = {$: 'Day'};
var $justinmimbs$date$Date$Friday = {$: 'Friday'};
var $justinmimbs$date$Date$Monday = {$: 'Monday'};
var $justinmimbs$date$Date$Month = {$: 'Month'};
var $justinmimbs$date$Date$Quarter = {$: 'Quarter'};
var $justinmimbs$date$Date$Saturday = {$: 'Saturday'};
var $justinmimbs$date$Date$Sunday = {$: 'Sunday'};
var $justinmimbs$date$Date$Thursday = {$: 'Thursday'};
var $justinmimbs$date$Date$Tuesday = {$: 'Tuesday'};
var $justinmimbs$date$Date$Wednesday = {$: 'Wednesday'};
var $justinmimbs$date$Date$Week = {$: 'Week'};
var $justinmimbs$date$Date$Year = {$: 'Year'};
var $elm$time$Time$Fri = {$: 'Fri'};
var $elm$time$Time$Mon = {$: 'Mon'};
var $justinmimbs$date$Date$RD = function (a) {
	return {$: 'RD', a: a};
};
var $elm$time$Time$Sat = {$: 'Sat'};
var $elm$time$Time$Sun = {$: 'Sun'};
var $elm$time$Time$Thu = {$: 'Thu'};
var $elm$time$Time$Tue = {$: 'Tue'};
var $elm$time$Time$Wed = {$: 'Wed'};
var $elm$core$Basics$modBy = _Basics_modBy;
var $justinmimbs$date$Date$weekdayNumber = function (_v0) {
	var rd = _v0.a;
	var _v1 = A2($elm$core$Basics$modBy, 7, rd);
	if (!_v1) {
		return 7;
	} else {
		var n = _v1;
		return n;
	}
};
var $justinmimbs$date$Date$weekdayToNumber = function (wd) {
	switch (wd.$) {
		case 'Mon':
			return 1;
		case 'Tue':
			return 2;
		case 'Wed':
			return 3;
		case 'Thu':
			return 4;
		case 'Fri':
			return 5;
		case 'Sat':
			return 6;
		default:
			return 7;
	}
};
var $justinmimbs$date$Date$daysSincePreviousWeekday = F2(
	function (wd, date) {
		return A2(
			$elm$core$Basics$modBy,
			7,
			($justinmimbs$date$Date$weekdayNumber(date) + 7) - $justinmimbs$date$Date$weekdayToNumber(wd));
	});
var $justinmimbs$date$Date$isLeapYear = function (y) {
	return ((!A2($elm$core$Basics$modBy, 4, y)) && (!(!A2($elm$core$Basics$modBy, 100, y)))) || (!A2($elm$core$Basics$modBy, 400, y));
};
var $justinmimbs$date$Date$daysBeforeMonth = F2(
	function (y, m) {
		var leapDays = $justinmimbs$date$Date$isLeapYear(y) ? 1 : 0;
		switch (m.$) {
			case 'Jan':
				return 0;
			case 'Feb':
				return 31;
			case 'Mar':
				return 59 + leapDays;
			case 'Apr':
				return 90 + leapDays;
			case 'May':
				return 120 + leapDays;
			case 'Jun':
				return 151 + leapDays;
			case 'Jul':
				return 181 + leapDays;
			case 'Aug':
				return 212 + leapDays;
			case 'Sep':
				return 243 + leapDays;
			case 'Oct':
				return 273 + leapDays;
			case 'Nov':
				return 304 + leapDays;
			default:
				return 334 + leapDays;
		}
	});
var $justinmimbs$date$Date$floorDiv = F2(
	function (a, b) {
		return $elm$core$Basics$floor(a / b);
	});
var $justinmimbs$date$Date$daysBeforeYear = function (y1) {
	var y = y1 - 1;
	var leapYears = (A2($justinmimbs$date$Date$floorDiv, y, 4) - A2($justinmimbs$date$Date$floorDiv, y, 100)) + A2($justinmimbs$date$Date$floorDiv, y, 400);
	return (365 * y) + leapYears;
};
var $justinmimbs$date$Date$firstOfMonth = F2(
	function (y, m) {
		return $justinmimbs$date$Date$RD(
			($justinmimbs$date$Date$daysBeforeYear(y) + A2($justinmimbs$date$Date$daysBeforeMonth, y, m)) + 1);
	});
var $justinmimbs$date$Date$firstOfYear = function (y) {
	return $justinmimbs$date$Date$RD(
		$justinmimbs$date$Date$daysBeforeYear(y) + 1);
};
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$time$Time$Jan = {$: 'Jan'};
var $justinmimbs$date$Date$daysInMonth = F2(
	function (y, m) {
		switch (m.$) {
			case 'Jan':
				return 31;
			case 'Feb':
				return $justinmimbs$date$Date$isLeapYear(y) ? 29 : 28;
			case 'Mar':
				return 31;
			case 'Apr':
				return 30;
			case 'May':
				return 31;
			case 'Jun':
				return 30;
			case 'Jul':
				return 31;
			case 'Aug':
				return 31;
			case 'Sep':
				return 30;
			case 'Oct':
				return 31;
			case 'Nov':
				return 30;
			default:
				return 31;
		}
	});
var $justinmimbs$date$Date$monthToNumber = function (m) {
	switch (m.$) {
		case 'Jan':
			return 1;
		case 'Feb':
			return 2;
		case 'Mar':
			return 3;
		case 'Apr':
			return 4;
		case 'May':
			return 5;
		case 'Jun':
			return 6;
		case 'Jul':
			return 7;
		case 'Aug':
			return 8;
		case 'Sep':
			return 9;
		case 'Oct':
			return 10;
		case 'Nov':
			return 11;
		default:
			return 12;
	}
};
var $elm$time$Time$Apr = {$: 'Apr'};
var $elm$time$Time$Aug = {$: 'Aug'};
var $elm$time$Time$Dec = {$: 'Dec'};
var $elm$time$Time$Feb = {$: 'Feb'};
var $elm$time$Time$Jul = {$: 'Jul'};
var $elm$time$Time$Jun = {$: 'Jun'};
var $elm$time$Time$Mar = {$: 'Mar'};
var $elm$time$Time$May = {$: 'May'};
var $elm$time$Time$Nov = {$: 'Nov'};
var $elm$time$Time$Oct = {$: 'Oct'};
var $elm$time$Time$Sep = {$: 'Sep'};
var $justinmimbs$date$Date$numberToMonth = function (mn) {
	var _v0 = A2($elm$core$Basics$max, 1, mn);
	switch (_v0) {
		case 1:
			return $elm$time$Time$Jan;
		case 2:
			return $elm$time$Time$Feb;
		case 3:
			return $elm$time$Time$Mar;
		case 4:
			return $elm$time$Time$Apr;
		case 5:
			return $elm$time$Time$May;
		case 6:
			return $elm$time$Time$Jun;
		case 7:
			return $elm$time$Time$Jul;
		case 8:
			return $elm$time$Time$Aug;
		case 9:
			return $elm$time$Time$Sep;
		case 10:
			return $elm$time$Time$Oct;
		case 11:
			return $elm$time$Time$Nov;
		default:
			return $elm$time$Time$Dec;
	}
};
var $justinmimbs$date$Date$toCalendarDateHelp = F3(
	function (y, m, d) {
		toCalendarDateHelp:
		while (true) {
			var monthDays = A2($justinmimbs$date$Date$daysInMonth, y, m);
			var mn = $justinmimbs$date$Date$monthToNumber(m);
			if ((mn < 12) && (_Utils_cmp(d, monthDays) > 0)) {
				var $temp$y = y,
					$temp$m = $justinmimbs$date$Date$numberToMonth(mn + 1),
					$temp$d = d - monthDays;
				y = $temp$y;
				m = $temp$m;
				d = $temp$d;
				continue toCalendarDateHelp;
			} else {
				return {day: d, month: m, year: y};
			}
		}
	});
var $justinmimbs$date$Date$divWithRemainder = F2(
	function (a, b) {
		return _Utils_Tuple2(
			A2($justinmimbs$date$Date$floorDiv, a, b),
			A2($elm$core$Basics$modBy, b, a));
	});
var $justinmimbs$date$Date$year = function (_v0) {
	var rd = _v0.a;
	var _v1 = A2($justinmimbs$date$Date$divWithRemainder, rd, 146097);
	var n400 = _v1.a;
	var r400 = _v1.b;
	var _v2 = A2($justinmimbs$date$Date$divWithRemainder, r400, 36524);
	var n100 = _v2.a;
	var r100 = _v2.b;
	var _v3 = A2($justinmimbs$date$Date$divWithRemainder, r100, 1461);
	var n4 = _v3.a;
	var r4 = _v3.b;
	var _v4 = A2($justinmimbs$date$Date$divWithRemainder, r4, 365);
	var n1 = _v4.a;
	var r1 = _v4.b;
	var n = (!r1) ? 0 : 1;
	return ((((n400 * 400) + (n100 * 100)) + (n4 * 4)) + n1) + n;
};
var $justinmimbs$date$Date$toOrdinalDate = function (_v0) {
	var rd = _v0.a;
	var y = $justinmimbs$date$Date$year(
		$justinmimbs$date$Date$RD(rd));
	return {
		ordinalDay: rd - $justinmimbs$date$Date$daysBeforeYear(y),
		year: y
	};
};
var $justinmimbs$date$Date$toCalendarDate = function (_v0) {
	var rd = _v0.a;
	var date = $justinmimbs$date$Date$toOrdinalDate(
		$justinmimbs$date$Date$RD(rd));
	return A3($justinmimbs$date$Date$toCalendarDateHelp, date.year, $elm$time$Time$Jan, date.ordinalDay);
};
var $justinmimbs$date$Date$month = A2(
	$elm$core$Basics$composeR,
	$justinmimbs$date$Date$toCalendarDate,
	function ($) {
		return $.month;
	});
var $justinmimbs$date$Date$monthToQuarter = function (m) {
	return (($justinmimbs$date$Date$monthToNumber(m) + 2) / 3) | 0;
};
var $justinmimbs$date$Date$quarter = A2($elm$core$Basics$composeR, $justinmimbs$date$Date$month, $justinmimbs$date$Date$monthToQuarter);
var $justinmimbs$date$Date$quarterToMonth = function (q) {
	return $justinmimbs$date$Date$numberToMonth((q * 3) - 2);
};
var $justinmimbs$date$Date$floor = F2(
	function (interval, date) {
		var rd = date.a;
		switch (interval.$) {
			case 'Year':
				return $justinmimbs$date$Date$firstOfYear(
					$justinmimbs$date$Date$year(date));
			case 'Quarter':
				return A2(
					$justinmimbs$date$Date$firstOfMonth,
					$justinmimbs$date$Date$year(date),
					$justinmimbs$date$Date$quarterToMonth(
						$justinmimbs$date$Date$quarter(date)));
			case 'Month':
				return A2(
					$justinmimbs$date$Date$firstOfMonth,
					$justinmimbs$date$Date$year(date),
					$justinmimbs$date$Date$month(date));
			case 'Week':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Mon, date));
			case 'Monday':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Mon, date));
			case 'Tuesday':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Tue, date));
			case 'Wednesday':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Wed, date));
			case 'Thursday':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Thu, date));
			case 'Friday':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Fri, date));
			case 'Saturday':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Sat, date));
			case 'Sunday':
				return $justinmimbs$date$Date$RD(
					rd - A2($justinmimbs$date$Date$daysSincePreviousWeekday, $elm$time$Time$Sun, date));
			default:
				return date;
		}
	});
var $elm$core$Basics$clamp = F3(
	function (low, high, number) {
		return (_Utils_cmp(number, low) < 0) ? low : ((_Utils_cmp(number, high) > 0) ? high : number);
	});
var $justinmimbs$date$Date$fromCalendarDate = F3(
	function (y, m, d) {
		return $justinmimbs$date$Date$RD(
			($justinmimbs$date$Date$daysBeforeYear(y) + A2($justinmimbs$date$Date$daysBeforeMonth, y, m)) + A3(
				$elm$core$Basics$clamp,
				1,
				A2($justinmimbs$date$Date$daysInMonth, y, m),
				d));
	});
var $elm$time$Time$flooredDiv = F2(
	function (numerator, denominator) {
		return $elm$core$Basics$floor(numerator / denominator);
	});
var $elm$time$Time$posixToMillis = function (_v0) {
	var millis = _v0.a;
	return millis;
};
var $elm$time$Time$toAdjustedMinutesHelp = F3(
	function (defaultOffset, posixMinutes, eras) {
		toAdjustedMinutesHelp:
		while (true) {
			if (!eras.b) {
				return posixMinutes + defaultOffset;
			} else {
				var era = eras.a;
				var olderEras = eras.b;
				if (_Utils_cmp(era.start, posixMinutes) < 0) {
					return posixMinutes + era.offset;
				} else {
					var $temp$defaultOffset = defaultOffset,
						$temp$posixMinutes = posixMinutes,
						$temp$eras = olderEras;
					defaultOffset = $temp$defaultOffset;
					posixMinutes = $temp$posixMinutes;
					eras = $temp$eras;
					continue toAdjustedMinutesHelp;
				}
			}
		}
	});
var $elm$time$Time$toAdjustedMinutes = F2(
	function (_v0, time) {
		var defaultOffset = _v0.a;
		var eras = _v0.b;
		return A3(
			$elm$time$Time$toAdjustedMinutesHelp,
			defaultOffset,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				60000),
			eras);
	});
var $elm$core$Basics$ge = _Utils_ge;
var $elm$time$Time$toCivil = function (minutes) {
	var rawDay = A2($elm$time$Time$flooredDiv, minutes, 60 * 24) + 719468;
	var era = (((rawDay >= 0) ? rawDay : (rawDay - 146096)) / 146097) | 0;
	var dayOfEra = rawDay - (era * 146097);
	var yearOfEra = ((((dayOfEra - ((dayOfEra / 1460) | 0)) + ((dayOfEra / 36524) | 0)) - ((dayOfEra / 146096) | 0)) / 365) | 0;
	var dayOfYear = dayOfEra - (((365 * yearOfEra) + ((yearOfEra / 4) | 0)) - ((yearOfEra / 100) | 0));
	var mp = (((5 * dayOfYear) + 2) / 153) | 0;
	var month = mp + ((mp < 10) ? 3 : (-9));
	var year = yearOfEra + (era * 400);
	return {
		day: (dayOfYear - ((((153 * mp) + 2) / 5) | 0)) + 1,
		month: month,
		year: year + ((month <= 2) ? 1 : 0)
	};
};
var $elm$time$Time$toDay = F2(
	function (zone, time) {
		return $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).day;
	});
var $elm$time$Time$toMonth = F2(
	function (zone, time) {
		var _v0 = $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).month;
		switch (_v0) {
			case 1:
				return $elm$time$Time$Jan;
			case 2:
				return $elm$time$Time$Feb;
			case 3:
				return $elm$time$Time$Mar;
			case 4:
				return $elm$time$Time$Apr;
			case 5:
				return $elm$time$Time$May;
			case 6:
				return $elm$time$Time$Jun;
			case 7:
				return $elm$time$Time$Jul;
			case 8:
				return $elm$time$Time$Aug;
			case 9:
				return $elm$time$Time$Sep;
			case 10:
				return $elm$time$Time$Oct;
			case 11:
				return $elm$time$Time$Nov;
			default:
				return $elm$time$Time$Dec;
		}
	});
var $elm$time$Time$toYear = F2(
	function (zone, time) {
		return $elm$time$Time$toCivil(
			A2($elm$time$Time$toAdjustedMinutes, zone, time)).year;
	});
var $justinmimbs$date$Date$fromPosix = F2(
	function (zone, posix) {
		return A3(
			$justinmimbs$date$Date$fromCalendarDate,
			A2($elm$time$Time$toYear, zone, posix),
			A2($elm$time$Time$toMonth, zone, posix),
			A2($elm$time$Time$toDay, zone, posix));
	});
var $justinmimbs$date$Date$toRataDie = function (_v0) {
	var rd = _v0.a;
	return rd;
};
var $justinmimbs$time_extra$Time$Extra$dateToMillis = function (date) {
	var daysSinceEpoch = $justinmimbs$date$Date$toRataDie(date) - 719163;
	return daysSinceEpoch * 86400000;
};
var $justinmimbs$time_extra$Time$Extra$timeFromClock = F4(
	function (hour, minute, second, millisecond) {
		return (((hour * 3600000) + (minute * 60000)) + (second * 1000)) + millisecond;
	});
var $elm$time$Time$toHour = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			24,
			A2(
				$elm$time$Time$flooredDiv,
				A2($elm$time$Time$toAdjustedMinutes, zone, time),
				60));
	});
var $elm$time$Time$toMillis = F2(
	function (_v0, time) {
		return A2(
			$elm$core$Basics$modBy,
			1000,
			$elm$time$Time$posixToMillis(time));
	});
var $elm$time$Time$toMinute = F2(
	function (zone, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2($elm$time$Time$toAdjustedMinutes, zone, time));
	});
var $elm$time$Time$toSecond = F2(
	function (_v0, time) {
		return A2(
			$elm$core$Basics$modBy,
			60,
			A2(
				$elm$time$Time$flooredDiv,
				$elm$time$Time$posixToMillis(time),
				1000));
	});
var $justinmimbs$time_extra$Time$Extra$timeFromPosix = F2(
	function (zone, posix) {
		return A4(
			$justinmimbs$time_extra$Time$Extra$timeFromClock,
			A2($elm$time$Time$toHour, zone, posix),
			A2($elm$time$Time$toMinute, zone, posix),
			A2($elm$time$Time$toSecond, zone, posix),
			A2($elm$time$Time$toMillis, zone, posix));
	});
var $justinmimbs$time_extra$Time$Extra$toOffset = F2(
	function (zone, posix) {
		var millis = $elm$time$Time$posixToMillis(posix);
		var localMillis = $justinmimbs$time_extra$Time$Extra$dateToMillis(
			A2($justinmimbs$date$Date$fromPosix, zone, posix)) + A2($justinmimbs$time_extra$Time$Extra$timeFromPosix, zone, posix);
		return ((localMillis - millis) / 60000) | 0;
	});
var $justinmimbs$time_extra$Time$Extra$posixFromDateTime = F3(
	function (zone, date, time) {
		var millis = $justinmimbs$time_extra$Time$Extra$dateToMillis(date) + time;
		var offset0 = A2(
			$justinmimbs$time_extra$Time$Extra$toOffset,
			zone,
			$elm$time$Time$millisToPosix(millis));
		var posix1 = $elm$time$Time$millisToPosix(millis - (offset0 * 60000));
		var offset1 = A2($justinmimbs$time_extra$Time$Extra$toOffset, zone, posix1);
		if (_Utils_eq(offset0, offset1)) {
			return posix1;
		} else {
			var posix2 = $elm$time$Time$millisToPosix(millis - (offset1 * 60000));
			var offset2 = A2($justinmimbs$time_extra$Time$Extra$toOffset, zone, posix2);
			return _Utils_eq(offset1, offset2) ? posix2 : posix1;
		}
	});
var $justinmimbs$time_extra$Time$Extra$floorDate = F3(
	function (dateInterval, zone, posix) {
		return A3(
			$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
			zone,
			A2(
				$justinmimbs$date$Date$floor,
				dateInterval,
				A2($justinmimbs$date$Date$fromPosix, zone, posix)),
			0);
	});
var $justinmimbs$time_extra$Time$Extra$floor = F3(
	function (interval, zone, posix) {
		switch (interval.$) {
			case 'Millisecond':
				return posix;
			case 'Second':
				return A3(
					$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
					zone,
					A2($justinmimbs$date$Date$fromPosix, zone, posix),
					A4(
						$justinmimbs$time_extra$Time$Extra$timeFromClock,
						A2($elm$time$Time$toHour, zone, posix),
						A2($elm$time$Time$toMinute, zone, posix),
						A2($elm$time$Time$toSecond, zone, posix),
						0));
			case 'Minute':
				return A3(
					$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
					zone,
					A2($justinmimbs$date$Date$fromPosix, zone, posix),
					A4(
						$justinmimbs$time_extra$Time$Extra$timeFromClock,
						A2($elm$time$Time$toHour, zone, posix),
						A2($elm$time$Time$toMinute, zone, posix),
						0,
						0));
			case 'Hour':
				return A3(
					$justinmimbs$time_extra$Time$Extra$posixFromDateTime,
					zone,
					A2($justinmimbs$date$Date$fromPosix, zone, posix),
					A4(
						$justinmimbs$time_extra$Time$Extra$timeFromClock,
						A2($elm$time$Time$toHour, zone, posix),
						0,
						0,
						0));
			case 'Day':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Day, zone, posix);
			case 'Month':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Month, zone, posix);
			case 'Year':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Year, zone, posix);
			case 'Quarter':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Quarter, zone, posix);
			case 'Week':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Week, zone, posix);
			case 'Monday':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Monday, zone, posix);
			case 'Tuesday':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Tuesday, zone, posix);
			case 'Wednesday':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Wednesday, zone, posix);
			case 'Thursday':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Thursday, zone, posix);
			case 'Friday':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Friday, zone, posix);
			case 'Saturday':
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Saturday, zone, posix);
			default:
				return A3($justinmimbs$time_extra$Time$Extra$floorDate, $justinmimbs$date$Date$Sunday, zone, posix);
		}
	});
var $justinmimbs$time_extra$Time$Extra$toFractionalDay = F2(
	function (zone, posix) {
		return A2($justinmimbs$time_extra$Time$Extra$timeFromPosix, zone, posix) / 86400000;
	});
var $justinmimbs$time_extra$Time$Extra$toMonths = F2(
	function (zone, posix) {
		var wholeMonths = (12 * (A2($elm$time$Time$toYear, zone, posix) - 1)) + ($justinmimbs$date$Date$monthToNumber(
			A2($elm$time$Time$toMonth, zone, posix)) - 1);
		var fractionalMonth = (A2($elm$time$Time$toDay, zone, posix) + A2($justinmimbs$time_extra$Time$Extra$toFractionalDay, zone, posix)) / 100;
		return wholeMonths + fractionalMonth;
	});
var $justinmimbs$time_extra$Time$Extra$toRataDieMoment = F2(
	function (zone, posix) {
		return $justinmimbs$date$Date$toRataDie(
			A2($justinmimbs$date$Date$fromPosix, zone, posix)) + A2($justinmimbs$time_extra$Time$Extra$toFractionalDay, zone, posix);
	});
var $elm$core$Basics$truncate = _Basics_truncate;
var $justinmimbs$time_extra$Time$Extra$diff = F4(
	function (interval, zone, posix1, posix2) {
		diff:
		while (true) {
			switch (interval.$) {
				case 'Millisecond':
					return $elm$time$Time$posixToMillis(posix2) - $elm$time$Time$posixToMillis(posix1);
				case 'Second':
					return (A4($justinmimbs$time_extra$Time$Extra$diff, $justinmimbs$time_extra$Time$Extra$Millisecond, zone, posix1, posix2) / 1000) | 0;
				case 'Minute':
					return (A4($justinmimbs$time_extra$Time$Extra$diff, $justinmimbs$time_extra$Time$Extra$Millisecond, zone, posix1, posix2) / 60000) | 0;
				case 'Hour':
					return (A4($justinmimbs$time_extra$Time$Extra$diff, $justinmimbs$time_extra$Time$Extra$Millisecond, zone, posix1, posix2) / 3600000) | 0;
				case 'Day':
					return (A2($justinmimbs$time_extra$Time$Extra$toRataDieMoment, zone, posix2) - A2($justinmimbs$time_extra$Time$Extra$toRataDieMoment, zone, posix1)) | 0;
				case 'Month':
					return (A2($justinmimbs$time_extra$Time$Extra$toMonths, zone, posix2) - A2($justinmimbs$time_extra$Time$Extra$toMonths, zone, posix1)) | 0;
				case 'Year':
					return (A4($justinmimbs$time_extra$Time$Extra$diff, $justinmimbs$time_extra$Time$Extra$Month, zone, posix1, posix2) / 12) | 0;
				case 'Quarter':
					return (A4($justinmimbs$time_extra$Time$Extra$diff, $justinmimbs$time_extra$Time$Extra$Month, zone, posix1, posix2) / 3) | 0;
				case 'Week':
					return (A4($justinmimbs$time_extra$Time$Extra$diff, $justinmimbs$time_extra$Time$Extra$Day, zone, posix1, posix2) / 7) | 0;
				default:
					var weekday = interval;
					var $temp$interval = $justinmimbs$time_extra$Time$Extra$Week,
						$temp$zone = zone,
						$temp$posix1 = A3($justinmimbs$time_extra$Time$Extra$floor, weekday, zone, posix1),
						$temp$posix2 = A3($justinmimbs$time_extra$Time$Extra$floor, weekday, zone, posix2);
					interval = $temp$interval;
					zone = $temp$zone;
					posix1 = $temp$posix1;
					posix2 = $temp$posix2;
					continue diff;
			}
		}
	});
var $author$project$Element$dateExpiryIndicatorWidget = function (_v0) {
	var nextAudit = _v0.nextAudit;
	var currentTime = _v0.currentTime;
	var timezone = _v0.timezone;
	var event = _v0.event;
	var referTo = _v0.referTo;
	var oneYearInMonths = 12;
	var monthsToNextAudit = A4($justinmimbs$time_extra$Time$Extra$diff, $justinmimbs$time_extra$Time$Extra$Month, timezone, currentTime, nextAudit);
	var percentageToNextAudit = (monthsToNextAudit > 12) ? 0 : $elm$core$Basics$round((monthsToNextAudit / oneYearInMonths) * 100);
	var isGreen = monthsToNextAudit > 4;
	var daysToNextAudit = A4($justinmimbs$time_extra$Time$Extra$diff, $justinmimbs$time_extra$Time$Extra$Day, timezone, currentTime, nextAudit);
	var isOrange = (monthsToNextAudit <= 4) && (daysToNextAudit > 31);
	var isRed = (monthsToNextAudit <= 1) && (daysToNextAudit <= 31);
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('flex flex-col bg-white rounded p-2 max-w-[173px] w-full')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flex gap-2 items-center mb-1')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('relative flex w-[130px] h-[5px] bg-gray-200 rounded')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class(
										'absolute top-0 left-0 h-full rounded-l ' + (isGreen ? 'bg-green-400' : (isOrange ? 'bg-orange-400' : 'bg-red-400'))),
										A2(
										$elm$html$Html$Attributes$style,
										'width',
										$elm$core$String$fromInt(
											((100 - percentageToNextAudit) > 100) ? 100 : (100 - percentageToNextAudit)) + '%')
									]),
								_List_Nil)
							])),
						isGreen ? A2($author$project$Icon$check, 'bg-green-400', $author$project$Icon$Large) : (isOrange ? A2($author$project$Icon$warning, 'bg-orange-400', $author$project$Icon$Large) : A2($author$project$Icon$warning, 'bg-red-400', $author$project$Icon$Large))
					])),
				A2(
				$elm$html$Html$span,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-gray-500 text-sm')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(
						((monthsToNextAudit >= 1) && (monthsToNextAudit <= 12)) ? ('~' + $elm$core$String$concat(
							_List_fromArray(
								[
									$elm$core$String$fromInt(monthsToNextAudit),
									' months until ' + event
								]))) : ((monthsToNextAudit > 12) ? 'Due is next year' : ((monthsToNextAudit === 1) ? ('Your ' + (referTo + ' is next month !')) : (((daysToNextAudit > 0) && (daysToNextAudit < 31)) ? ('Your ' + (referTo + (' is in ' + ($elm$core$String$fromInt(daysToNextAudit) + ' days')))) : ((daysToNextAudit < 0) ? ('Your ' + (referTo + (' passed ' + ($elm$core$String$fromInt(
							$elm$core$Basics$abs(daysToNextAudit)) + ' days ago')))) : '')))))
					]))
			]));
};
var $author$project$Icon$defaultUser = A2(
	$elm$svg$Svg$svg,
	_List_fromArray(
		[
			$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
			$elm$svg$Svg$Attributes$width('24px'),
			$elm$svg$Svg$Attributes$height('24px'),
			$elm$svg$Svg$Attributes$fill('currentColor')
		]),
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d('M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z'),
					$elm$svg$Svg$Attributes$stroke('currentColor'),
					$elm$svg$Svg$Attributes$strokeWidth('2'),
					$elm$svg$Svg$Attributes$strokeLinecap('round'),
					$elm$svg$Svg$Attributes$strokeLinejoin('round')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d('M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z'),
					$elm$svg$Svg$Attributes$stroke('currentColor'),
					$elm$svg$Svg$Attributes$strokeWidth('2'),
					$elm$svg$Svg$Attributes$strokeLinecap('round'),
					$elm$svg$Svg$Attributes$strokeLinejoin('round')
				]),
			_List_Nil)
		]));
var $elm$html$Html$p = _VirtualDom_node('p');
var $author$project$Demo$demoClickCaption = function (mLabel) {
	return A2(
		$elm$html$Html$p,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('text-sm text-gray-600 min-h-[1.25rem]')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(
				function () {
					if (mLabel.$ === 'Nothing') {
						return 'Click a message button to see feedback here.';
					} else {
						var label = mLabel.a;
						return 'Last action: ' + label;
					}
				}())
			]));
};
var $author$project$Demo$demoPaginationLastPage = F2(
	function (total, pageSize) {
		return A2(
			$elm$core$Basics$max,
			1,
			$elm$core$Basics$ceiling(total / pageSize));
	});
var $author$project$Demo$demoPaginationTotal = 47;
var $author$project$Icon$download = F2(
	function (overrideColor, size) {
		return A2(
			$elm$svg$Svg$svg,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$width(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$height(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
					$elm$svg$Svg$Attributes$fill('none')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$d('M12.5535 16.5061C12.4114 16.6615 12.2106 16.75 12 16.75C11.7894 16.75 11.5886 16.6615 11.4465 16.5061L7.44648 12.1311C7.16698 11.8254 7.18822 11.351 7.49392 11.0715C7.79963 10.792 8.27402 10.8132 8.55352 11.1189L11.25 14.0682V3C11.25 2.58579 11.5858 2.25 12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V14.0682L15.4465 11.1189C15.726 10.8132 16.2004 10.792 16.5061 11.0715C16.8118 11.351 16.833 11.8254 16.5535 12.1311L12.5535 16.5061Z'),
							$elm$svg$Svg$Attributes$fill(
							(overrideColor === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(overrideColor))
						]),
					_List_Nil),
					A2(
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$d('M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z'),
							$elm$svg$Svg$Attributes$fill(
							(overrideColor === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(overrideColor))
						]),
					_List_Nil)
				]));
	});
var $elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {index: index, match: match, number: number, submatches: submatches};
	});
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $elm$regex$Regex$fromString = function (string) {
	return A2(
		$elm$regex$Regex$fromStringWith,
		{caseInsensitive: false, multiline: false},
		string);
};
var $elm$regex$Regex$never = _Regex_never;
var $elm_community$string_extra$String$Extra$regexFromString = A2(
	$elm$core$Basics$composeR,
	$elm$regex$Regex$fromString,
	$elm$core$Maybe$withDefault($elm$regex$Regex$never));
var $elm$regex$Regex$replace = _Regex_replaceAtMost(_Regex_infinity);
var $elm$core$String$toUpper = _String_toUpper;
var $elm$core$String$trim = _String_trim;
var $elm_community$string_extra$String$Extra$camelize = function (string) {
	return A3(
		$elm$regex$Regex$replace,
		$elm_community$string_extra$String$Extra$regexFromString('[-_\\s]+(.)?'),
		function (_v0) {
			var submatches = _v0.submatches;
			if (submatches.b && (submatches.a.$ === 'Just')) {
				var match = submatches.a.a;
				return $elm$core$String$toUpper(match);
			} else {
				return '';
			}
		},
		$elm$core$String$trim(string));
};
var $elm$core$String$cons = _String_cons;
var $elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return $elm$core$Maybe$Just(
				f(value));
		} else {
			return $elm$core$Maybe$Nothing;
		}
	});
var $elm_community$string_extra$String$Extra$changeCase = F2(
	function (mutator, word) {
		return A2(
			$elm$core$Maybe$withDefault,
			'',
			A2(
				$elm$core$Maybe$map,
				function (_v0) {
					var head = _v0.a;
					var tail = _v0.b;
					return A2(
						$elm$core$String$cons,
						mutator(head),
						tail);
				},
				$elm$core$String$uncons(word)));
	});
var $elm$core$Char$toLower = _Char_toLower;
var $elm_community$string_extra$String$Extra$decapitalize = function (word) {
	return A2($elm_community$string_extra$String$Extra$changeCase, $elm$core$Char$toLower, word);
};
var $elm$core$String$append = _String_append;
var $elm$core$String$toLower = _String_toLower;
var $elm$core$Char$toUpper = _Char_toUpper;
var $elm_community$string_extra$String$Extra$toSentenceCase = function (word) {
	return A2($elm_community$string_extra$String$Extra$changeCase, $elm$core$Char$toUpper, word);
};
var $elm_community$string_extra$String$Extra$humanize = function (string) {
	return $elm_community$string_extra$String$Extra$toSentenceCase(
		$elm$core$String$toLower(
			$elm$core$String$trim(
				A3(
					$elm$regex$Regex$replace,
					$elm_community$string_extra$String$Extra$regexFromString('_id$|[-_\\s]+'),
					$elm$core$Basics$always(' '),
					A3(
						$elm$regex$Regex$replace,
						$elm_community$string_extra$String$Extra$regexFromString('[A-Z]+'),
						A2(
							$elm$core$Basics$composeR,
							function ($) {
								return $.match;
							},
							$elm$core$String$append('-')),
						string)))));
};
var $author$project$Element$viewErrorRow = function (error) {
	return A2(
		$elm$html$Html$li,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('bg-red-500 text-white flex gap-1 p-1 text-xs items-center mt-[2px]')
			]),
		_List_fromArray(
			[
				A2($author$project$Icon$warning, '#ffffff', $author$project$Icon$Small),
				A2(
				$elm$html$Html$span,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(error)
					]))
			]));
};
var $elm_community$html_extra$Html$Extra$nothing = $elm$html$Html$text('');
var $elm_community$html_extra$Html$Extra$viewIf = F2(
	function (condition, html) {
		return condition ? html : $elm_community$html_extra$Html$Extra$nothing;
	});
var $author$project$Element$dropdown = function (_v0) {
	var label = _v0.label;
	var field = _v0.field;
	var toggleMsg = _v0.toggleMsg;
	var lst = _v0.lst;
	var isOpened = _v0.isOpened;
	var toMsg = _v0.toMsg;
	var selected = _v0.selected;
	var errors = _v0.errors;
	var style = function (i) {
		return (!i) ? 'text-sm py-1 px-2 cursor-pointer hover:bg-gray-100' : (_Utils_eq(
			i,
			$elm$core$List$length(lst) - 1) ? 'text-sm py-1 px-2 cursor-pointer rounded-b hover:bg-gray-100' : 'text-sm py-1 px-2 cursor-pointer hover:bg-gray-100');
	};
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('relative flex flex-col rounded min-w-[150px]'),
				$elm$html$Html$Events$onClick(toggleMsg)
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class(
						'flex w-full justify-between text-sm p-2 cursor-pointer items-center gap-1 ' + ((isOpened ? 'rounded-t' : 'rounded') + ((!$elm$core$List$isEmpty(errors)) ? ' border border-red-500 bg-red-100 text-red-500 hover:bg-red-100' : ' border border-sky-400 text-sky-400 bg-sky-400/5')))
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(
								function () {
									if (selected.$ === 'Just') {
										var s = selected.a;
										return $elm_community$string_extra$String$Extra$humanize(s);
									} else {
										return label;
									}
								}())
							])),
						isOpened ? $author$project$Icon$arrowUp : $author$project$Icon$arrowDown
					])),
				A2(
				$elm$html$Html$ul,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flex flex-col gap-2 text-gray-500 rounded-b-lg gap-y-[1px] absolute top-[38px] left-0 w-full bg-gray-100 border border-gray-100 z-[1]'),
						A2(
						$elm$html$Html$Attributes$style,
						'display',
						isOpened ? 'flex' : 'none')
					]),
				A2(
					$elm$core$List$indexedMap,
					F2(
						function (index, item) {
							var strToCamelCase = $elm_community$string_extra$String$Extra$decapitalize(
								$elm_community$string_extra$String$Extra$camelize(
									A3($elm$core$String$replace, ' ', '-', item)));
							var selectedToCamelCase = $elm_community$string_extra$String$Extra$decapitalize(
								$elm_community$string_extra$String$Extra$camelize(
									A3(
										$elm$core$String$replace,
										' ',
										'-',
										A2($elm$core$Maybe$withDefault, '', selected))));
							return A2(
								$elm$html$Html$li,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class(
										_Utils_ap(
											style(index),
											_Utils_eq(selectedToCamelCase, strToCamelCase) ? ' bg-sky-400 text-white hover:text-white hover:bg-sky-400' : ' bg-white')),
										$elm$html$Html$Events$onClick(
										toMsg(
											$elm_community$string_extra$String$Extra$humanize(strToCamelCase)))
									]),
								_List_fromArray(
									[
										$elm$html$Html$text(item)
									]));
						}),
					lst)),
				A2(
				$elm_community$html_extra$Html$Extra$viewIf,
				!$elm$core$List$isEmpty(errors),
				A2(
					$elm$html$Html$ul,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex flex-col gap-[2px]')
						]),
					A2($elm$core$List$map, $author$project$Element$viewErrorRow, errors)))
			]));
};
var $author$project$Icon$expand = function (fill) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$width('25px'),
				$elm$svg$Svg$Attributes$height('25px'),
				$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
				$elm$svg$Svg$Attributes$fill('none')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M4 9V5.6C4 5.03995 4 4.75992 4.10899 4.54601C4.20487 4.35785 4.35785 4.20487 4.54601 4.109C4.75992 4 5.03995 4 5.6 4L9 4M4 15V18.4C4 18.9601 4 19.2401 4.10899 19.454C4.20487 19.6422 4.35785 19.7951 4.54601 19.891C4.75992 20 5.03995 20 5.6 20L9 20M15 4H18.4C18.9601 4 19.2401 4 19.454 4.10899C19.6422 4.20487 19.7951 4.35785 19.891 4.54601C20 4.75992 20 5.03995 20 5.6V9M20 15V18.4C20 18.9601 20 19.2401 19.891 19.454C19.7951 19.6422 19.6422 19.7951 19.454 19.891C19.2401 20 18.9601 20 18.4 20H15'),
						$elm$svg$Svg$Attributes$stroke(
						(fill === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(fill)),
						$elm$svg$Svg$Attributes$strokeWidth('2'),
						$elm$svg$Svg$Attributes$strokeLinecap('round'),
						$elm$svg$Svg$Attributes$strokeLinejoin('round')
					]),
				_List_Nil)
			]));
};
var $author$project$Icon$export = function (fill) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$fill(
				(fill === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(fill)),
				$elm$svg$Svg$Attributes$width('24'),
				$elm$svg$Svg$Attributes$height('24'),
				$elm$svg$Svg$Attributes$viewBox('0 0 1920 1920')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('m0 1016.081 409.186 409.073 79.85-79.736-272.867-272.979h1136.415V959.611H216.169l272.866-272.866-79.85-79.85L0 1016.082ZM1465.592 305.32l315.445 315.445h-315.445V305.32Zm402.184 242.372-329.224-329.11C1507.042 187.07 1463.334 169 1418.835 169h-743.83v677.647h112.94V281.941h564.706v451.765h451.765v903.53H787.946V1185.47H675.003v564.705h1242.353V667.522c0-44.498-18.07-88.207-49.581-119.83Z'),
						$elm$svg$Svg$Attributes$fillRule('evenodd')
					]),
				_List_Nil)
			]));
};
var $author$project$Icon$filter = function (fill) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$width('25px'),
				$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
				$elm$svg$Svg$Attributes$fill('none')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M4 5L10 5M10 5C10 6.10457 10.8954 7 12 7C13.1046 7 14 6.10457 14 5M10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5M14 5L20 5M4 12L16 12M16 12C16 13.1046 16.8954 14 18 14C19.1046 14 20 13.1046 20 12C20 10.8954 19.1046 10 18 10C16.8954 10 16 10.8954 16 12ZM8 19L20 19M8 19C8 17.8954 7.10457 17 6 17C4.89543 17 4 17.8954 4 19C4 20.1046 4.89543 21 6 21C7.10457 21 8 20.1046 8 19Z'),
						$elm$svg$Svg$Attributes$stroke(
						(fill === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(fill)),
						$elm$svg$Svg$Attributes$strokeWidth('1.5'),
						$elm$svg$Svg$Attributes$strokeLinecap('round')
					]),
				_List_Nil)
			]));
};
var $elm$html$Html$form = _VirtualDom_node('form');
var $elm$html$Html$h2 = _VirtualDom_node('h2');
var $author$project$Element$formLayout = F2(
	function (head, children) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('flex justify-center mt-32')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex flex-col w-[380px] py-[2px] rounded items-center bg-gradient-to-l from-sky-200')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('flex flex-col w-[376px] rounded gap-y-4 bg-white dark:bg-black py-10 px-8')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$h2,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('text-gray-950 dark:text-white')
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(head)
										])),
									A2(
									$elm$html$Html$form,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('flex flex-col gap-y-4')
										]),
									children)
								]))
						]))
				]));
	});
var $elm$html$Html$h1 = _VirtualDom_node('h1');
var $elm$html$Html$h3 = _VirtualDom_node('h3');
var $author$project$Icon$home = F2(
	function (fill, size) {
		return A2(
			$elm$svg$Svg$svg,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$width(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$height(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
					$elm$svg$Svg$Attributes$fill('none')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$d('M5 9.77746V16.2C5 17.8802 5 18.7203 5.32698 19.362C5.6146 19.9265 6.07354 20.3854 6.63803 20.673C7.27976 21 8.11984 21 9.8 21H14.2C15.8802 21 16.7202 21 17.362 20.673C17.9265 20.3854 18.3854 19.9265 18.673 19.362C19 18.7203 19 17.8802 19 16.2V5.00002M21 12L15.5668 5.96399C14.3311 4.59122 13.7133 3.90484 12.9856 3.65144C12.3466 3.42888 11.651 3.42893 11.0119 3.65159C10.2843 3.90509 9.66661 4.59157 8.43114 5.96452L3 12M14 21V15H10V21'),
							$elm$svg$Svg$Attributes$stroke(
							(fill === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(fill)),
							$elm$svg$Svg$Attributes$strokeWidth('2'),
							$elm$svg$Svg$Attributes$strokeLinecap('round'),
							$elm$svg$Svg$Attributes$strokeLinejoin('round')
						]),
					_List_Nil)
				]));
	});
var $author$project$Demo$iconTile = F2(
	function (name, iconHtml) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('flex flex-col items-center justify-between gap-2 p-3 border border-gray-200 rounded-lg bg-white min-h-[108px] w-[132px]')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex flex-1 items-center justify-center text-gray-800')
						]),
					_List_fromArray(
						[iconHtml])),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-[10px] font-mono text-gray-500 text-center leading-tight break-all w-full')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(name)
						]))
				]));
	});
var $author$project$Demo$iconGridSection = F2(
	function (title, items) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('flex flex-col gap-3')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$h3,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-lg')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(title)
						])),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex flex-wrap gap-3')
						]),
					A2(
						$elm$core$List$map,
						function (_v0) {
							var name = _v0.a;
							var node = _v0.b;
							return A2($author$project$Demo$iconTile, name, node);
						},
						items))
				]));
	});
var $author$project$Icon$XLarge = {$: 'XLarge'};
var $author$project$Icon$XSmall = {$: 'XSmall'};
var $author$project$Demo$iconSizeReference = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('flex flex-col gap-2')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$h3,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-lg')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Icon.Size and sizeToString')
				])),
			A2(
			$elm$html$Html$p,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-xs font-mono text-gray-600 break-all')
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(
					A2(
						$elm$core$String$join,
						' · ',
						_List_fromArray(
							[
								'XSmall → ' + $author$project$Icon$sizeToString($author$project$Icon$XSmall),
								'Small → ' + $author$project$Icon$sizeToString($author$project$Icon$Small),
								'Medium → ' + $author$project$Icon$sizeToString($author$project$Icon$Medium),
								'Large → ' + $author$project$Icon$sizeToString($author$project$Icon$Large),
								'XLarge → ' + $author$project$Icon$sizeToString($author$project$Icon$XLarge)
							])))
				]))
		]));
var $author$project$Icon$inProgress = A2(
	$elm$svg$Svg$svg,
	_List_fromArray(
		[
			$elm$svg$Svg$Attributes$fill('currentColor'),
			$elm$svg$Svg$Attributes$width('24px'),
			$elm$svg$Svg$Attributes$height('24px'),
			$elm$svg$Svg$Attributes$viewBox('0 0 1920 1920')
		]),
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d('M320.006 960.032c0 352.866 287.052 639.974 640.026 639.974 173.767 0 334.093-69.757 451.938-188.072l-211.928-211.912h480.019v479.981l-155.046-155.114C1377.649 1672.883 1177.24 1760 960.032 1760 518.814 1760 160 1401.134 160 960.032ZM959.968 160C1401.186 160 1760 518.866 1760 959.968h-160.006c0-352.866-287.052-639.974-640.026-639.974-173.767 0-334.093 69.757-451.938 188.072l211.928 211.912H239.94V239.997L394.985 395.03C542.351 247.117 742.76 160 959.968 160Z'),
					$elm$svg$Svg$Attributes$fillRule('evenodd')
				]),
			_List_Nil)
		]));
var $author$project$Icon$infoCircle = F2(
	function (stroke, size) {
		return A2(
			$elm$svg$Svg$svg,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$width(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$height(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
					$elm$svg$Svg$Attributes$fill('none')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$d('M12 7C12.5523 7 13 7.44772 13 8V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V8C11 7.44772 11.4477 7 12 7Z'),
							$elm$svg$Svg$Attributes$fill(
							(stroke === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(stroke))
						]),
					_List_Nil),
					A2(
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$d('M12 17C12.5523 17 13 16.5523 13 16C13 15.4477 12.5523 15 12 15C11.4477 15 11 15.4477 11 16C11 16.5523 11.4477 17 12 17Z'),
							$elm$svg$Svg$Attributes$fill(
							(stroke === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(stroke))
						]),
					_List_Nil),
					A2(
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$fillRule('evenodd'),
							$elm$svg$Svg$Attributes$clipRule('evenodd'),
							$elm$svg$Svg$Attributes$d('M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z'),
							$elm$svg$Svg$Attributes$fill(
							(stroke === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(stroke))
						]),
					_List_Nil)
				]));
	});
var $author$project$Element$levelUI = function (level) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('h-[10px] flex items-end gap-[1px]')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('level-low')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class(
								'w-[9px] h-[7px] border border-white ' + (_Utils_eq(level, $author$project$Element$Low) ? 'bg-green-400' : 'bg-gray-200'))
							]),
						_List_Nil)
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('level-medium')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class(
								'w-[9px] h-[10px] border border-white ' + (_Utils_eq(level, $author$project$Element$Medium) ? 'bg-yellow-400' : 'bg-gray-200'))
							]),
						_List_Nil)
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('level-high')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class(
								'w-[9px] h-[15px] border border-white ' + (_Utils_eq(level, $author$project$Element$High) ? 'bg-red-400' : 'bg-gray-200'))
							]),
						_List_Nil)
					]))
			]));
};
var $elm$svg$Svg$Attributes$version = _VirtualDom_attribute('version');
var $author$project$Icon$lightbulb = F2(
	function (fill, size) {
		return A2(
			$elm$svg$Svg$svg,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$height(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$width(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$version('1.1'),
					$elm$svg$Svg$Attributes$id('_x32_'),
					$elm$svg$Svg$Attributes$viewBox('0 0 512 512'),
					$elm$svg$Svg$Attributes$fill(
					(fill === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(fill))
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$g,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$path,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$d('M428.215,172.215c0.008-47.522-19.292-90.648-50.445-121.777C346.649,19.293,303.515-0.007,256,0   c-47.514-0.007-90.648,19.293-121.769,50.446c-31.153,31.121-50.454,74.247-50.446,121.769   c-0.008,31.786,8.673,61.634,23.754,87.181h-0.008c0.016,0.032,0.048,0.064,0.064,0.096c0.04,0.064,0.065,0.128,0.104,0.192   l0.016-0.007c10.98,19.436,26.7,34.724,38.945,48.835c6.167,7.056,11.452,13.751,15,20.014c3.572,6.295,5.382,11.908,5.502,17.53   v95.421c0.008,29.44,23.858,53.296,53.305,53.304h7.64C233.312,504.96,243.787,512,256,512c12.213,0,22.688-7.04,27.894-17.218   h7.64c29.447-0.008,53.296-23.865,53.304-53.304v-95.414v-0.008c0.12-5.622,1.93-11.236,5.502-17.53   c5.302-9.419,14.592-19.709,24.762-30.914c10.074-11.179,20.982-23.352,29.191-37.936l0.008,0.007   c0.032-0.048,0.056-0.111,0.088-0.16c0.024-0.048,0.056-0.08,0.08-0.128h-0.008C419.542,233.849,428.223,204.001,428.215,172.215z    M311.828,461.771c-5.23,5.214-12.325,8.401-20.294,8.409h-71.068c-7.969-0.008-15.064-3.195-20.294-8.409   c-5.213-5.23-8.401-12.333-8.409-20.294v-5.326l120.128,25.54C311.868,461.715,311.852,461.747,311.828,461.771z M320.237,441.477   c0,1.754-0.216,3.452-0.513,5.11l-127.96-27.205v-33.524l128.473,27.316V441.477z M320.237,396.397L191.764,369.08V358.1h128.473   V396.397z M383.143,247.142l-0.104,0.169l-0.064,0.112c-8.505,15.408-22.92,29.848-36.159,44.904   c-6.607,7.576-12.918,15.361-17.867,24.034c-3.003,5.286-5.39,11.036-6.935,17.13H189.986c-1.546-6.102-3.932-11.844-6.944-17.13   c-7.432-12.982-17.867-24.081-27.893-35.246c-10.059-11.1-19.733-22.159-26.124-33.692l-0.08-0.128l-0.089-0.152   c-13.005-21.959-20.462-47.514-20.47-74.928c0.008-40.803,16.506-77.626,43.238-104.374C178.374,41.1,215.197,24.61,256,24.602   C296.804,24.61,333.627,41.1,360.375,67.84c26.732,26.748,43.23,63.571,43.238,104.374   C403.605,199.628,396.149,225.183,383.143,247.142z')
								]),
							_List_Nil)
						]))
				]));
	});
var $author$project$Element$loadingElement = A2(
	$elm$html$Html$div,
	_List_fromArray(
		[
			$elm$html$Html$Attributes$class('flex justify-center items-center w-full')
		]),
	_List_fromArray(
		[
			A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('relative h-[20px] w-[20px] flex')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75')
						]),
					_List_Nil),
					A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('relative inline-flex rounded-full h-[20px] w-[20px] bg-sky-500')
						]),
					_List_Nil)
				]))
		]));
var $author$project$Icon$location = function (stroke) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$width('24px'),
				$elm$svg$Svg$Attributes$height('24px'),
				$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
				$elm$svg$Svg$Attributes$fill('none')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z'),
						$elm$svg$Svg$Attributes$stroke(
						(stroke === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(stroke)),
						$elm$svg$Svg$Attributes$strokeWidth('2'),
						$elm$svg$Svg$Attributes$strokeLinecap('round'),
						$elm$svg$Svg$Attributes$strokeLinejoin('round')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z'),
						$elm$svg$Svg$Attributes$stroke(
						(stroke === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(stroke)),
						$elm$svg$Svg$Attributes$strokeWidth('2'),
						$elm$svg$Svg$Attributes$strokeLinecap('round'),
						$elm$svg$Svg$Attributes$strokeLinejoin('round')
					]),
				_List_Nil)
			]));
};
var $author$project$Icon$mail = function (stroke) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$width('24px'),
				$elm$svg$Svg$Attributes$height('24px'),
				$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
				$elm$svg$Svg$Attributes$fill('none')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M21 8L17.4392 9.97822C15.454 11.0811 14.4614 11.6326 13.4102 11.8488C12.4798 12.0401 11.5202 12.0401 10.5898 11.8488C9.53864 11.6326 8.54603 11.0811 6.5608 9.97822L3 8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z'),
						$elm$svg$Svg$Attributes$stroke(
						(stroke === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(stroke)),
						$elm$svg$Svg$Attributes$strokeWidth('2'),
						$elm$svg$Svg$Attributes$strokeLinecap('round'),
						$elm$svg$Svg$Attributes$strokeLinejoin('round')
					]),
				_List_Nil)
			]));
};
var $author$project$Icon$menuOnLeft = function (fill) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$width('24px'),
				$elm$svg$Svg$Attributes$height('24px'),
				$elm$svg$Svg$Attributes$fill(
				(fill === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(fill))
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M21 19V5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2zm-11 0V5h9l.002 14H10z')
					]),
				_List_Nil)
			]));
};
var $author$project$Icon$menuOnTop = function (fill) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$width('24px'),
				$elm$svg$Svg$Attributes$height('24px'),
				$elm$svg$Svg$Attributes$fill(
				(fill === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(fill))
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M3 5v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2H5c-1.103 0-2 .897-2 2zm2 14v-9h14.001l.001 9H5z')
					]),
				_List_Nil)
			]));
};
var $author$project$Icon$minimize = function (fill) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$width('24px'),
				$elm$svg$Svg$Attributes$height('24px'),
				$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
				$elm$svg$Svg$Attributes$fill('none')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M3 12L21 12'),
						$elm$svg$Svg$Attributes$stroke(
						(fill === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(fill)),
						$elm$svg$Svg$Attributes$strokeWidth('2'),
						$elm$svg$Svg$Attributes$strokeLinecap('round'),
						$elm$svg$Svg$Attributes$strokeLinejoin('round')
					]),
				_List_Nil)
			]));
};
var $elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var $elm$html$Html$Attributes$attribute = $elm$virtual_dom$VirtualDom$attribute;
var $elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var $elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			$elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var $author$project$Element$multiselect = function (args) {
	var toggleSelection = function (id) {
		var newSelections = A2($elm$core$List$member, id, args.selections) ? A2(
			$elm$core$List$filter,
			$elm$core$Basics$neq(id),
			args.selections) : A2($elm$core$List$cons, id, args.selections);
		return args.onSelection(newSelections);
	};
	var isSelected = function (id) {
		return A2($elm$core$List$member, id, args.selections);
	};
	var viewOption = F2(
		function (selections, item) {
			var label = args.itemLabel(item);
			var id = args.itemId(item);
			var selected = isSelected(id);
			var disabled = args.itemDisabled(item);
			var baseClasses = 'text-sm px-3 py-1 rounded cursor-pointer border transition-all duration-150 ' + (selected ? 'bg-sky-500 text-white border-sky-500' : 'bg-gray-100 text-gray-500 hover:bg-sky-100 border-gray-300');
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class(baseClasses),
						$elm$html$Html$Events$onClick(
						toggleSelection(id)),
						$elm$html$Html$Attributes$classList(
						_List_fromArray(
							[
								_Utils_Tuple2(
								'border border-red-500 bg-red-100 text-red-500 hover:bg-red-100',
								!$elm$core$List$isEmpty(args.errors))
							])),
						A2(
						$elm$html$Html$Attributes$attribute,
						'aria-disabled',
						disabled ? 'true' : 'false'),
						$elm$html$Html$Attributes$classList(
						_List_fromArray(
							[
								_Utils_Tuple2('opacity-50 cursor-not-allowed', disabled)
							]))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(label),
						A2(
						$elm_community$html_extra$Html$Extra$viewIf,
						A2($elm$core$List$member, id, selections),
						A2(
							$elm$html$Html$span,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('ml-1 text-white font-bold')
								]),
							_List_fromArray(
								[
									$elm$html$Html$text('×')
								])))
					]));
		});
	return A2(
		$elm$html$Html$div,
		A2(
			$elm$core$List$cons,
			$elm$html$Html$Attributes$class(
				'flex flex-col ' + ($elm$core$List$isEmpty(args.selections) ? '' : 'gap-2')),
			args.extraAttrs),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flex flex-row flex-wrap gap-1')
					]),
				A2(
					$elm$core$List$map,
					viewOption(args.selections),
					args.options)),
				function () {
				var _v0 = args.hint;
				if (_v0.$ === 'Just') {
					var hint = _v0.a;
					return hint.element;
				} else {
					return $elm$html$Html$text('');
				}
			}(),
				A2(
				$elm_community$html_extra$Html$Extra$viewIf,
				!$elm$core$List$isEmpty(args.errors),
				A2(
					$elm$html$Html$ul,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex flex-col gap-[2px]')
						]),
					A2($elm$core$List$map, $author$project$Element$viewErrorRow, args.errors)))
			]));
};
var $author$project$Demo$multiselectDemoItems = _List_fromArray(
	[
		{disabled: false, id: '1', label: 'Alpha'},
		{disabled: true, id: '2', label: 'Beta (disabled)'},
		{disabled: false, id: '3', label: 'Gamma'}
	]);
var $author$project$Icon$notApplicable = A2(
	$elm$svg$Svg$svg,
	_List_fromArray(
		[
			$elm$svg$Svg$Attributes$width('20'),
			$elm$svg$Svg$Attributes$height('20'),
			$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
			$elm$svg$Svg$Attributes$fill('none'),
			$elm$svg$Svg$Attributes$stroke('currentColor'),
			$elm$svg$Svg$Attributes$strokeWidth('2'),
			$elm$svg$Svg$Attributes$strokeLinecap('round'),
			$elm$svg$Svg$Attributes$strokeLinejoin('round')
		]),
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$line,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x1('18'),
					$elm$svg$Svg$Attributes$y1('6'),
					$elm$svg$Svg$Attributes$x2('6'),
					$elm$svg$Svg$Attributes$y2('18')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$line,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x1('6'),
					$elm$svg$Svg$Attributes$y1('6'),
					$elm$svg$Svg$Attributes$x2('18'),
					$elm$svg$Svg$Attributes$y2('18')
				]),
			_List_Nil)
		]));
var $elm$svg$Svg$Attributes$points = _VirtualDom_attribute('points');
var $elm$svg$Svg$polyline = $elm$svg$Svg$trustedNode('polyline');
var $author$project$Icon$notStarted = A2(
	$elm$svg$Svg$svg,
	_List_fromArray(
		[
			$elm$svg$Svg$Attributes$width('20'),
			$elm$svg$Svg$Attributes$height('20'),
			$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
			$elm$svg$Svg$Attributes$fill('none'),
			$elm$svg$Svg$Attributes$stroke('currentColor'),
			$elm$svg$Svg$Attributes$strokeWidth('2'),
			$elm$svg$Svg$Attributes$strokeLinecap('round'),
			$elm$svg$Svg$Attributes$strokeLinejoin('round')
		]),
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$circle,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$cx('12'),
					$elm$svg$Svg$Attributes$cy('12'),
					$elm$svg$Svg$Attributes$r('10')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$polyline,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$points('12 6 12 12 16 14')
				]),
			_List_Nil)
		]));
var $author$project$Element$notificationAlignToClass = function (align) {
	switch (align.$) {
		case 'Left':
			return 'left-0 translate-x-0 animate-move-left rounded-r-md';
		case 'Center':
			return 'left-[50%] translate-x-[-50%] animate-fade-out rounded-md ';
		default:
			return 'right-0 translate-x-0 animate-move-right rounded-l-md';
	}
};
var $author$project$Element$notificationIconStyle = function (color) {
	return 'font-bold min-w-[25px] h-[25px] flex justify-center items-center border-2 rounded-full border-' + (color + '-500');
};
var $author$project$Element$notificationToIcon = F2(
	function (notification_, color) {
		switch (notification_.$) {
			case 'Info':
				return A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							$author$project$Element$notificationIconStyle(color))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('!')
						]));
			case 'Warning':
				return A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							$author$project$Element$notificationIconStyle(color))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('!')
						]));
			case 'Error':
				return A2(
					$elm$html$Html$span,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(
							$author$project$Element$notificationIconStyle(color))
						]),
					_List_fromArray(
						[
							$elm$html$Html$text('!')
						]));
			default:
				return A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex gap-2')
						]),
					_List_fromArray(
						[
							A2($author$project$Icon$check, '', $author$project$Icon$Medium)
						]));
		}
	});
var $author$project$Element$notificationWrapperStyle = function (color) {
	return 'absolute gap-1 flex whitespace-nowrap border text-lg items-center px-3 py-2 items-center border-' + (color + ('-300 bg-' + (color + ('-200 text-' + (color + '-500')))));
};
var $author$project$Element$notification = F3(
	function (top, notification_, align) {
		var _v0 = function () {
			switch (notification_.$) {
				case 'Info':
					var infoTxt = notification_.a;
					return {color: 'sky', txtValue: infoTxt};
				case 'Warning':
					var warnTxt = notification_.a;
					return {color: 'yellow', txtValue: warnTxt};
				case 'Error':
					var errDescription = notification_.a;
					return {color: 'red', txtValue: errDescription};
				default:
					var succTxt = notification_.a;
					return {color: 'green', txtValue: succTxt};
			}
		}();
		var color = _v0.color;
		var txtValue = _v0.txtValue;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(
					$author$project$Element$notificationWrapperStyle(color) + (' ' + $author$project$Element$notificationAlignToClass(align))),
					A2($elm$html$Html$Attributes$style, 'top', top)
				]),
			_List_fromArray(
				[
					A2($author$project$Element$notificationToIcon, notification_, color),
					A2(
					$elm$html$Html$p,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('text-inherit')
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(txtValue)
						]))
				]));
	});
var $author$project$Icon$overdue = A2(
	$elm$svg$Svg$svg,
	_List_fromArray(
		[
			$elm$svg$Svg$Attributes$width('20'),
			$elm$svg$Svg$Attributes$height('20'),
			$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
			$elm$svg$Svg$Attributes$fill('none'),
			$elm$svg$Svg$Attributes$stroke('currentColor'),
			$elm$svg$Svg$Attributes$strokeWidth('2'),
			$elm$svg$Svg$Attributes$strokeLinecap('round'),
			$elm$svg$Svg$Attributes$strokeLinejoin('round')
		]),
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$circle,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$cx('12'),
					$elm$svg$Svg$Attributes$cy('12'),
					$elm$svg$Svg$Attributes$r('10')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$line,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x1('12'),
					$elm$svg$Svg$Attributes$y1('8'),
					$elm$svg$Svg$Attributes$x2('12'),
					$elm$svg$Svg$Attributes$y2('12')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$line,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$x1('12'),
					$elm$svg$Svg$Attributes$y1('16'),
					$elm$svg$Svg$Attributes$x2('12.01'),
					$elm$svg$Svg$Attributes$y2('16')
				]),
			_List_Nil)
		]));
var $elm$core$Basics$min = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) < 0) ? x : y;
	});
var $elm$html$Html$option = _VirtualDom_node('option');
var $elm$html$Html$select = _VirtualDom_node('select');
var $elm$html$Html$a = _VirtualDom_node('a');
var $elm_community$html_extra$Html$Attributes$Extra$empty = $elm$html$Html$Attributes$classList(_List_Nil);
var $elm_community$html_extra$Html$Attributes$Extra$attributeIf = F2(
	function (condition, attr) {
		return condition ? attr : $elm_community$html_extra$Html$Attributes$Extra$empty;
	});
var $elm$html$Html$button = _VirtualDom_node('button');
var $author$project$Button$sizeToStyle = function (size) {
	if (size.$ === 'Just') {
		var size_ = size.a;
		switch (size_.$) {
			case 'Large':
				return ' px-4 py-2 text-md';
			case 'Medium':
				return ' px-3 py-[6px]';
			case 'Small':
				return ' px-[4px] text-xs h-[28px]';
			default:
				return ' min-w-[230px] px-4 py-4 text-xl';
		}
	} else {
		return '';
	}
};
var $author$project$Button$buttonDisabledStyle = function (size) {
	return 'w-fit whitespace-nowrap flex-start bg-gray-200 border rounded border-gray-300 text-gray-300 transition-all hover:bg-gray-100' + $author$project$Button$sizeToStyle(size);
};
var $elm$html$Html$Attributes$href = function (url) {
	return A2(
		$elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var $elm$html$Html$Attributes$target = $elm$html$Html$Attributes$stringProperty('target');
var $author$project$Button$toHtml = function (_v0) {
	var constraints = _v0.a;
	var _v1 = constraints;
	var label = _v1.label;
	var action = _v1.action;
	var styles = _v1.styles;
	var disabled = _v1.disabled;
	var icon = _v1.icon;
	var size = _v1.size;
	var targetBlank = _v1.targetBlank;
	var commonLstHtml = _List_fromArray(
		[
			function () {
			_v3$2:
			while (true) {
				if (icon.b) {
					if (!icon.b.b) {
						var icon_ = icon.a;
						return A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('flex gap-x-1 items-center')
								]),
							_List_fromArray(
								[
									A2(
									$elm$html$Html$div,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class('')
										]),
									_List_fromArray(
										[
											icon_($author$project$Icon$XSmall)
										])),
									$elm$html$Html$text(label)
								]));
					} else {
						if (!icon.b.b.b) {
							var icon_ = icon.a;
							var _v4 = icon.b;
							var icon_2 = _v4.a;
							return A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex items-center')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('')
											]),
										_List_fromArray(
											[
												icon_($author$project$Icon$XSmall)
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('')
											]),
										_List_fromArray(
											[
												icon_2($author$project$Icon$XSmall)
											])),
										$elm$html$Html$text(label)
									]));
						} else {
							break _v3$2;
						}
					}
				} else {
					break _v3$2;
				}
			}
			return $elm$html$Html$text(label);
		}()
		]);
	if (action.$ === 'Url') {
		var url = action.a;
		return A2(
			$elm$html$Html$a,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$href(url),
					$elm$html$Html$Attributes$class(
					styles(
						$elm$core$Maybe$Just(size))),
					A2(
					$elm_community$html_extra$Html$Attributes$Extra$attributeIf,
					targetBlank,
					$elm$html$Html$Attributes$target('_blank'))
				]),
			commonLstHtml);
	} else {
		var msg = action.a;
		return A2(
			$elm$html$Html$button,
			_List_fromArray(
				[
					A2(
					$elm_community$html_extra$Html$Attributes$Extra$attributeIf,
					!disabled,
					$elm$html$Html$Events$onClick(msg)),
					$elm$html$Html$Attributes$class(
					disabled ? $author$project$Button$buttonDisabledStyle(
						$elm$core$Maybe$Just(size)) : (styles(
						$elm$core$Maybe$Just(size)) + ' cursor-pointer')),
					$elm$html$Html$Attributes$disabled(disabled)
				]),
			commonLstHtml);
	}
};
var $author$project$Button$Button = function (a) {
	return {$: 'Button', a: a};
};
var $author$project$Button$Url = function (a) {
	return {$: 'Url', a: a};
};
var $author$project$Button$buttonPrimaryStyle = function (size) {
	return 'justify-self-start whitespace-nowrap w-fit flex-start bg-sky-400 border rounded border-sky-400 text-white transition-all hover:bg-sky-600 hover:border-sky-600' + $author$project$Button$sizeToStyle(size);
};
var $author$project$Button$view = $author$project$Button$Button(
	{
		action: $author$project$Button$Url('/'),
		disabled: false,
		icon: _List_Nil,
		label: '',
		size: $author$project$Button$Large,
		styles: $author$project$Button$buttonPrimaryStyle,
		targetBlank: false
	});
var $author$project$Button$withDisabled = F2(
	function (bool, _v0) {
		var constraints = _v0.a;
		return $author$project$Button$Button(
			_Utils_update(
				constraints,
				{disabled: bool}));
	});
var $author$project$Button$withIcon = F2(
	function (iconLst, _v0) {
		var constraints = _v0.a;
		return $author$project$Button$Button(
			_Utils_update(
				constraints,
				{
					icon: A2(
						$elm$core$List$map,
						function (i) {
							return function (_v1) {
								return i;
							};
						},
						iconLst)
				}));
	});
var $author$project$Button$Msg = function (a) {
	return {$: 'Msg', a: a};
};
var $author$project$Button$withMsg = F2(
	function (message, _v0) {
		var constraints = _v0.a;
		return $author$project$Button$Button(
			_Utils_update(
				constraints,
				{
					action: $author$project$Button$Msg(message)
				}));
	});
var $author$project$Button$buttonSecondaryStyle = function (size) {
	return 'justify-self-start whitespace-nowrap w-fit flex-start bg-white border border-gray-200 rounded text-sky-400 transition-all hover:bg-gray-50' + $author$project$Button$sizeToStyle(size);
};
var $author$project$Button$withSecondaryStyle = function (_v0) {
	var constraints = _v0.a;
	return $author$project$Button$Button(
		_Utils_update(
			constraints,
			{styles: $author$project$Button$buttonSecondaryStyle}));
};
var $author$project$Button$withSize = F2(
	function (size, _v0) {
		var constraints = _v0.a;
		return $author$project$Button$Button(
			_Utils_update(
				constraints,
				{size: size}));
	});
var $author$project$Button$withText = F2(
	function (str, _v0) {
		var constraints = _v0.a;
		return $author$project$Button$Button(
			_Utils_update(
				constraints,
				{label: str}));
	});
var $author$project$Element$pagination = function (config) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('flex content-center w-full my-2 text-gray-500 text-sm')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flex content-center gap-2')
					]),
				_List_fromArray(
					[
						$author$project$Button$toHtml(
						A2(
							$author$project$Button$withSize,
							$author$project$Button$Small,
							A2(
								$author$project$Button$withIcon,
								_List_fromArray(
									[$author$project$Icon$arrowLeft, $author$project$Icon$arrowLeft]),
								$author$project$Button$withSecondaryStyle(
									A2(
										$author$project$Button$withDisabled,
										config.isFirstPage,
										A2(
											$author$project$Button$withMsg,
											config.onPageChange(1),
											A2($author$project$Button$withText, '', $author$project$Button$view))))))),
						$author$project$Button$toHtml(
						A2(
							$author$project$Button$withSize,
							$author$project$Button$Small,
							A2(
								$author$project$Button$withIcon,
								_List_fromArray(
									[$author$project$Icon$arrowLeft]),
								$author$project$Button$withSecondaryStyle(
									A2(
										$author$project$Button$withDisabled,
										config.isFirstPage,
										A2(
											$author$project$Button$withMsg,
											config.onPageChange(config.currentPage - 1),
											A2($author$project$Button$withText, '', $author$project$Button$view))))))),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('p-2')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								$elm$core$String$fromInt(((config.currentPage - 1) * config.pageSize) + 1)),
								$elm$html$Html$text(' - '),
								$elm$html$Html$text(
								$elm$core$String$fromInt(
									A2($elm$core$Basics$min, config.total, config.currentPage * config.pageSize))),
								$elm$html$Html$text(' / '),
								$elm$html$Html$text(
								$elm$core$String$fromInt(config.total))
							])),
						$author$project$Button$toHtml(
						A2(
							$author$project$Button$withSize,
							$author$project$Button$Small,
							A2(
								$author$project$Button$withIcon,
								_List_fromArray(
									[
										A2($author$project$Icon$arrowRight, '', $author$project$Icon$Medium)
									]),
								$author$project$Button$withSecondaryStyle(
									A2(
										$author$project$Button$withDisabled,
										config.isLastPage,
										A2(
											$author$project$Button$withMsg,
											config.onPageChange(config.currentPage + 1),
											A2($author$project$Button$withText, '', $author$project$Button$view))))))),
						$author$project$Button$toHtml(
						A2(
							$author$project$Button$withSize,
							$author$project$Button$Small,
							A2(
								$author$project$Button$withIcon,
								_List_fromArray(
									[
										A2($author$project$Icon$arrowRight, '', $author$project$Icon$Medium),
										A2($author$project$Icon$arrowRight, '', $author$project$Icon$Medium)
									]),
								$author$project$Button$withSecondaryStyle(
									A2(
										$author$project$Button$withDisabled,
										config.isLastPage,
										A2(
											$author$project$Button$withMsg,
											config.onPageChange(config.lastPage),
											A2($author$project$Button$withText, '', $author$project$Button$view)))))))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flex align-center')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$select,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('cursor-pointer border border-gray-200 text-sky-400 rounded ml-2'),
								$elm$html$Html$Events$onInput(
								A2(
									$elm$core$Basics$composeR,
									$elm$core$String$toInt,
									A2(
										$elm$core$Basics$composeR,
										$elm$core$Maybe$withDefault(config.pageSize),
										config.onPageSizeInput))),
								$elm$html$Html$Attributes$value(
								$elm$core$String$fromInt(config.pageSize))
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$option,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('10')
									])),
								A2(
								$elm$html$Html$option,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('20')
									])),
								A2(
								$elm$html$Html$option,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('30')
									])),
								A2(
								$elm$html$Html$option,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('50')
									])),
								A2(
								$elm$html$Html$option,
								_List_Nil,
								_List_fromArray(
									[
										$elm$html$Html$text('100')
									]))
							]))
					]))
			]));
};
var $author$project$Icon$pencilOnPaper = F2(
	function (stroke, size) {
		return A2(
			$elm$svg$Svg$svg,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$fill(
					(stroke === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(stroke)),
					$elm$svg$Svg$Attributes$version('1.1'),
					$elm$svg$Svg$Attributes$id('Capa_1'),
					$elm$svg$Svg$Attributes$width(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$height(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$viewBox('0 0 399.67 399.67'),
					$elm$svg$Svg$Attributes$xmlSpace('preserve')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$g,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							$elm$svg$Svg$path,
							_List_fromArray(
								[
									$elm$svg$Svg$Attributes$d('M393.674,131.298l-29.509-29.51c-0.004-0.004-0.006-0.008-0.01-0.011s-0.008-0.006-0.011-0.009l-29.51-29.511\n\t\tc-2.343-2.344-5.522-3.661-8.839-3.661s-6.495,1.317-8.839,3.661l-14.59,14.59V12.5c0-6.903-5.598-12.5-12.5-12.5H14.835\n\t\tc-6.903,0-12.5,5.597-12.5,12.5v374.67c0,6.903,5.597,12.5,12.5,12.5h275.032c6.902,0,12.5-5.597,12.5-12.5V240.279l91.307-91.304\n\t\tC398.556,144.094,398.556,136.18,393.674,131.298z M277.367,374.67H27.335V25h250.032v86.847L174.073,215.139\n\t\tc-1.726,1.728-2.908,3.922-3.402,6.312l-15.359,74.4c-0.851,4.121,0.429,8.393,3.403,11.366c2.368,2.368,5.558,3.661,8.839,3.661\n\t\tc0.841,0,1.688-0.085,2.527-0.258l74.396-15.362c2.393-0.493,4.586-1.677,6.312-3.403l26.577-26.576V374.67z M190.468,249.21\n\t\tl26.252,26.253l-33.082,6.831L190.468,249.21z M241.951,265.339l-41.36-41.36L325.796,98.774l11.842,11.843l-76.36,76.362\n\t\tc-4.883,4.882-4.883,12.796,0,17.678c2.439,2.439,5.64,3.661,8.839,3.661s6.397-1.222,8.839-3.661l76.361-76.361l11.842,11.842\n\t\tL241.951,265.339z')
								]),
							_List_Nil)
						]))
				]));
	});
var $author$project$Icon$pending = A2(
	$elm$svg$Svg$svg,
	_List_fromArray(
		[
			$elm$svg$Svg$Attributes$width('20'),
			$elm$svg$Svg$Attributes$height('20'),
			$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
			$elm$svg$Svg$Attributes$fill('none'),
			$elm$svg$Svg$Attributes$stroke('currentColor'),
			$elm$svg$Svg$Attributes$strokeWidth('2'),
			$elm$svg$Svg$Attributes$strokeLinecap('round'),
			$elm$svg$Svg$Attributes$strokeLinejoin('round')
		]),
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$circle,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$cx('12'),
					$elm$svg$Svg$Attributes$cy('12'),
					$elm$svg$Svg$Attributes$r('10')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d('M12 6v6l4 2')
				]),
			_List_Nil)
		]));
var $author$project$Icon$phone = function (stroke) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$width('24px'),
				$elm$svg$Svg$Attributes$height('24px'),
				$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
				$elm$svg$Svg$Attributes$fill('none')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z'),
						$elm$svg$Svg$Attributes$stroke(
						(stroke === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(stroke)),
						$elm$svg$Svg$Attributes$strokeWidth('2'),
						$elm$svg$Svg$Attributes$strokeLinecap('round'),
						$elm$svg$Svg$Attributes$strokeLinejoin('round')
					]),
				_List_Nil)
			]));
};
var $author$project$Icon$pin = function (fill) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$width('24px'),
				$elm$svg$Svg$Attributes$height('24px'),
				$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
				$elm$svg$Svg$Attributes$fill('none')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$fillRule('evenodd'),
						$elm$svg$Svg$Attributes$clipRule('evenodd'),
						$elm$svg$Svg$Attributes$d('M17.1218 1.87023C15.7573 0.505682 13.4779 0.76575 12.4558 2.40261L9.61062 6.95916C9.61033 6.95965 9.60913 6.96167 9.6038 6.96549C9.59728 6.97016 9.58336 6.97822 9.56001 6.9848C9.50899 6.99916 9.44234 6.99805 9.38281 6.97599C8.41173 6.61599 6.74483 6.22052 5.01389 6.87251C4.08132 7.22378 3.61596 8.03222 3.56525 8.85243C3.51687 9.63502 3.83293 10.4395 4.41425 11.0208L7.94975 14.5563L1.26973 21.2363C0.879206 21.6269 0.879206 22.26 1.26973 22.6506C1.66025 23.0411 2.29342 23.0411 2.68394 22.6506L9.36397 15.9705L12.8995 19.5061C13.4808 20.0874 14.2853 20.4035 15.0679 20.3551C15.8881 20.3044 16.6966 19.839 17.0478 18.9065C17.6998 17.1755 17.3043 15.5086 16.9444 14.5375C16.9223 14.478 16.9212 14.4114 16.9355 14.3603C16.9421 14.337 16.9502 14.3231 16.9549 14.3165C16.9587 14.3112 16.9606 14.31 16.9611 14.3098L21.5177 11.4645C23.1546 10.4424 23.4147 8.16307 22.0501 6.79853L17.1218 1.87023ZM14.1523 3.46191C14.493 2.91629 15.2528 2.8296 15.7076 3.28445L20.6359 8.21274C21.0907 8.66759 21.0041 9.42737 20.4584 9.76806L15.9019 12.6133C14.9572 13.2032 14.7469 14.3637 15.0691 15.2327C15.3549 16.0037 15.5829 17.1217 15.1762 18.2015C15.1484 18.2752 15.1175 18.3018 15.0985 18.3149C15.0743 18.3316 15.0266 18.3538 14.9445 18.3589C14.767 18.3699 14.5135 18.2916 14.3137 18.0919L5.82846 9.6066C5.62872 9.40686 5.55046 9.15333 5.56144 8.97583C5.56651 8.8937 5.58877 8.84605 5.60548 8.82181C5.61855 8.80285 5.64516 8.7719 5.71886 8.74414C6.79869 8.33741 7.91661 8.56545 8.68762 8.85128C9.55668 9.17345 10.7171 8.96318 11.3071 8.01845L14.1523 3.46191Z'),
						$elm$svg$Svg$Attributes$fill(
						(fill === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(fill))
					]),
				_List_Nil)
			]));
};
var $author$project$Demo$msPerDay = ((24 * 60) * 60) * 1000;
var $author$project$Demo$posixWithDayOffset = F2(
	function (posix, days) {
		return $elm$time$Time$millisToPosix(
			$elm$time$Time$posixToMillis(posix) + (days * $author$project$Demo$msPerDay));
	});
var $author$project$Element$preselectedMultiselect = function (args) {
	var toggleSelection = function (id) {
		var newSelections = A2($elm$core$List$member, id, args.selections) ? A2(
			$elm$core$List$filter,
			$elm$core$Basics$neq(id),
			args.selections) : A2($elm$core$List$cons, id, args.selections);
		return args.onSelection(newSelections);
	};
	var viewOption = function (str) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('text-sm px-3 py-1 rounded cursor-pointer border transition-all duration-150 bg-sky-500 text-white border-sky-500'),
					$elm$html$Html$Events$onClick(
					toggleSelection(str))
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(str),
					A2(
					$elm_community$html_extra$Html$Extra$viewIf,
					A2($elm$core$List$member, str, args.selections),
					A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('ml-1 text-white font-bold')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('×')
							])))
				]));
	};
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('flex flex-col ')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flex flex-row flex-wrap gap-1')
					]),
				A2($elm$core$List$map, viewOption, args.selections))
			]));
};
var $author$project$Icon$reload = function (fill) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$fill(
				(fill === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(fill)),
				$elm$svg$Svg$Attributes$width('24px'),
				$elm$svg$Svg$Attributes$height('24px'),
				$elm$svg$Svg$Attributes$viewBox('0 0 24 24')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M23,12A11,11,0,1,1,12,1a10.9,10.9,0,0,1,5.882,1.7l1.411-1.411A1,1,0,0,1,21,2V6a1,1,0,0,1-1,1H16a1,1,0,0,1-.707-1.707L16.42,4.166A8.9,8.9,0,0,0,12,3a9,9,0,1,0,9,9,1,1,0,0,1,2,0Z')
					]),
				_List_Nil)
			]));
};
var $author$project$Icon$reset = function (fill) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$width('25px'),
				$elm$svg$Svg$Attributes$height('25px'),
				$elm$svg$Svg$Attributes$viewBox('0 0 25 25'),
				$elm$svg$Svg$Attributes$fill('none')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M4.56189 13.5L4.14285 13.9294L4.5724 14.3486L4.99144 13.9189L4.56189 13.5ZM9.92427 15.9243L15.9243 9.92427L15.0757 9.07574L9.07574 15.0757L9.92427 15.9243ZM9.07574 9.92426L15.0757 15.9243L15.9243 15.0757L9.92426 9.07574L9.07574 9.92426ZM19.9 12.5C19.9 16.5869 16.5869 19.9 12.5 19.9V21.1C17.2496 21.1 21.1 17.2496 21.1 12.5H19.9ZM5.1 12.5C5.1 8.41309 8.41309 5.1 12.5 5.1V3.9C7.75035 3.9 3.9 7.75035 3.9 12.5H5.1ZM12.5 5.1C16.5869 5.1 19.9 8.41309 19.9 12.5H21.1C21.1 7.75035 17.2496 3.9 12.5 3.9V5.1ZM5.15728 13.4258C5.1195 13.1227 5.1 12.8138 5.1 12.5H3.9C3.9 12.8635 3.92259 13.2221 3.9665 13.5742L5.15728 13.4258ZM12.5 19.9C9.9571 19.9 7.71347 18.6179 6.38048 16.6621L5.38888 17.3379C6.93584 19.6076 9.54355 21.1 12.5 21.1V19.9ZM4.99144 13.9189L7.42955 11.4189L6.57045 10.5811L4.13235 13.0811L4.99144 13.9189ZM4.98094 13.0706L2.41905 10.5706L1.58095 11.4294L4.14285 13.9294L4.98094 13.0706Z'),
						$elm$svg$Svg$Attributes$fill(
						(fill === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(fill))
					]),
				_List_Nil)
			]));
};
var $author$project$Icon$settings = function (stroke) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$viewBox('0 0 192 192'),
				$elm$svg$Svg$Attributes$width('30'),
				$elm$svg$Svg$Attributes$height('30'),
				$elm$svg$Svg$Attributes$fill(
				(stroke === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(stroke))
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$g,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$strokeWidth('0')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$g,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$id('SVGRepo_tracerCarrier'),
						$elm$svg$Svg$Attributes$strokeLinecap('round'),
						$elm$svg$Svg$Attributes$strokeLinejoin('round')
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$g,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$id('SVGRepo_iconCarrier')
					]),
				_List_fromArray(
					[
						A2(
						$elm$svg$Svg$path,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$fill(
								(stroke === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(stroke)),
								$elm$svg$Svg$Attributes$d('m80.16 29.054-5.958-.709 5.958.71Zm31.68 0-5.958.71 5.958-.71Zm34.217 19.756-2.365-5.515 2.365 5.514Zm10.081 3.352 5.196-3-5.196 3Zm7.896 13.676 5.196-3-5.196 3Zm-2.137 10.407-3.594-4.805 3.594 4.805Zm0 39.51 3.593-4.805-3.593 4.805Zm2.137 10.407 5.196 3-5.196-3Zm-7.896 13.676-5.196-3 5.196 3Zm-10.081 3.353 2.364-5.515-2.364 5.515Zm-34.217 19.755 5.958.709-5.958-.709Zm-31.68 0-5.958.709 5.958-.709Zm-34.217-19.755-2.364-5.515 2.364 5.515Zm-10.08-3.353-5.197 3 5.196-3Zm-7.897-13.676 5.196-3-5.196 3Zm2.137-10.407 3.594 4.805-3.594-4.805Zm0-39.51L26.51 81.05l3.593-4.805Zm-2.137-10.407 5.196 3-5.196-3Zm7.896-13.676-5.196-3 5.196 3Zm10.081-3.352-2.364 5.514 2.364-5.514Zm7.85 3.365-2.365 5.515 2.364-5.515Zm0 87.65 2.364 5.514-2.365-5.514ZM36.235 111.17l-3.594-4.805 3.594 4.805Zm76.823 41.535 5.958.71-5.958-.71Zm39.854-69.742-3.593-4.805 3.593 4.805Zm-16.369-30.074 2.364 5.514-2.364-5.514Zm-23.485-13.594-5.958.709 5.958-.71ZM88.104 16a14 14 0 0 0-13.902 12.345l11.916 1.419A2 2 0 0 1 88.104 28V16Zm15.792 0H88.104v12h15.792V16Zm13.902 12.345A14 14 0 0 0 103.896 16v12a2 2 0 0 1 1.986 1.764l11.916-1.419Zm1.219 10.24-1.219-10.24-11.916 1.419 1.219 10.24 11.916-1.419Zm24.675 4.71-9.513 4.08 4.729 11.028 9.513-4.08-4.729-11.028Zm17.642 5.867a14 14 0 0 0-17.642-5.867l4.729 11.029a2 2 0 0 1 2.521.838l10.392-6Zm7.896 13.676-7.896-13.676-10.392 6 7.896 13.676 10.392-6Zm-3.74 18.212a14 14 0 0 0 3.74-18.212l-10.392 6a2 2 0 0 1-.535 2.602l7.187 9.61Zm-8.984 6.718 8.984-6.718-7.187-9.61-8.983 6.718 7.186 9.61Zm8.984 23.182-8.984-6.718-7.186 9.61 8.983 6.718 7.187-9.61Zm3.74 18.212a14 14 0 0 0-3.74-18.212l-7.187 9.61a2 2 0 0 1 .535 2.602l10.392 6Zm-7.896 13.676 7.896-13.676-10.392-6-7.896 13.676 10.392 6Zm-17.642 5.867a14 14 0 0 0 17.642-5.867l-10.392-6a2.001 2.001 0 0 1-2.521.838l-4.729 11.029Zm-9.513-4.08 9.513 4.08 4.729-11.029-9.512-4.079-4.73 11.028Zm-16.381 19.03 1.219-10.24-11.916-1.419-1.219 10.24 11.916 1.419ZM103.896 176a14 14 0 0 0 13.902-12.345l-11.916-1.419a2 2 0 0 1-1.986 1.764v12Zm-15.792 0h15.792v-12H88.104v12Zm-13.902-12.345A14 14 0 0 0 88.104 176v-12a2 2 0 0 1-1.986-1.764l-11.916 1.419Zm-1.012-8.504 1.012 8.504 11.916-1.419-1.012-8.504-11.916 1.419ZM51.428 134.31l-7.85 3.366 4.73 11.029 7.849-3.366-4.73-11.029Zm-7.85 3.366a2 2 0 0 1-2.52-.838l-10.392 6a14 14 0 0 0 17.642 5.867l-4.73-11.029Zm-2.52-.838-7.896-13.676-10.392 6 7.896 13.676 10.392-6Zm-7.896-13.676a2 2 0 0 1 .535-2.602l-7.187-9.61a14 14 0 0 0-3.74 18.212l10.392-6Zm.535-2.602 6.132-4.585-7.187-9.61-6.132 4.585 7.187 9.61ZM26.51 81.05l6.132 4.586 7.187-9.61-6.132-4.586-7.187 9.61Zm-3.74-18.212a14 14 0 0 0 3.74 18.212l7.187-9.61a2 2 0 0 1-.535-2.602l-10.392-6Zm7.896-13.676L22.77 62.838l10.392 6 7.896-13.676-10.392-6Zm17.642-5.867a14 14 0 0 0-17.642 5.867l10.392 6a2 2 0 0 1 2.52-.838l4.73-11.029Zm7.849 3.366-7.85-3.366-4.729 11.029 7.85 3.366 4.729-11.029Zm18.045-18.316-1.012 8.504 11.916 1.419 1.012-8.504-11.916-1.419Zm-1.754 27.552c6.078-3.426 11.69-9.502 12.658-17.63L73.19 36.85c-.382 3.209-2.769 6.415-6.635 8.595l5.893 10.453Zm-21.02 1.793c7.284 3.124 15.055 1.57 21.02-1.793l-5.893-10.453c-3.704 2.088-7.481 2.468-10.398 1.217l-4.73 11.029ZM49 96c0-7.1-2.548-15.022-9.171-19.975l-7.187 9.61C35.36 87.668 37 91.438 37 96h12Zm23.448 40.103c-5.965-3.363-13.736-4.917-21.02-1.793l4.729 11.029c2.917-1.251 6.694-.871 10.398 1.218l5.893-10.454Zm-32.62-20.128C46.452 111.022 49 103.1 49 96H37c0 4.563-1.64 8.333-4.358 10.365l7.187 9.61Zm78.679 19.575c-5.536 3.298-10.517 8.982-11.406 16.446l11.916 1.419c.329-2.765 2.318-5.582 5.632-7.557l-6.142-10.308Zm20.402-1.953c-7.094-3.042-14.669-1.463-20.402 1.953l6.142 10.308c3.382-2.015 6.872-2.372 9.53-1.233l4.73-11.028Zm-53.803 20.135c-.968-8.127-6.58-14.202-12.658-17.629l-5.893 10.454c3.866 2.179 6.253 5.385 6.635 8.594l11.916-1.419ZM141 96c0 6.389 2.398 13.414 8.32 17.842l7.186-9.61C154.374 102.638 153 99.668 153 96h-12Zm8.32-17.842C143.398 82.586 141 89.61 141 96h12c0-3.668 1.374-6.638 3.506-8.232l-7.186-9.61ZM118.507 56.45c5.733 3.416 13.308 4.995 20.401 1.953l-4.729-11.029c-2.658 1.14-6.148.782-9.53-1.233l-6.142 10.31Zm-11.406-16.446c.889 7.464 5.87 13.148 11.406 16.446l6.142-10.309c-3.314-1.974-5.303-4.79-5.632-7.556l-11.916 1.419Z')
							]),
						_List_Nil),
						A2(
						$elm$svg$Svg$path,
						_List_fromArray(
							[
								$elm$svg$Svg$Attributes$stroke(
								(stroke === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(stroke)),
								$elm$svg$Svg$Attributes$strokeLinecap('round'),
								$elm$svg$Svg$Attributes$strokeLinejoin('round'),
								$elm$svg$Svg$Attributes$strokeWidth('12'),
								$elm$svg$Svg$Attributes$d('M96 120c13.255 0 24-10.745 24-24s-10.745-24-24-24-24 10.745-24 24 10.745 24 24 24Z')
							]),
						_List_Nil)
					]))
			]));
};
var $author$project$Element$singleselect = function (args) {
	var sanitizedItem = function (item) {
		return A2($elm$core$List$member, item, args.lst) ? $elm$core$Result$Ok(item) : $elm$core$Result$Err('Error: Unknown');
	};
	var isSelected = function (id) {
		return _Utils_eq(
			$elm$core$Maybe$Just(id),
			args.selected);
	};
	var viewOption = function (item) {
		var selected = isSelected(item);
		var baseClasses = 'text-sm px-3 py-1 rounded cursor-pointer border transition-all duration-150 ' + (selected ? 'bg-sky-500 text-white border-sky-500' : 'bg-gray-100 text-gray-500 hover:bg-sky-100 border-gray-300');
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(baseClasses),
					$elm$html$Html$Events$onClick(
					args.onSelection(
						sanitizedItem(item))),
					$elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2(
							'border border-red-500 bg-red-100 text-red-500 hover:bg-red-100',
							!$elm$core$List$isEmpty(args.errors))
						]))
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(
					A2(
						$elm$core$Maybe$withDefault,
						'',
						$elm$core$Result$toMaybe(
							sanitizedItem(item))))
				]));
	};
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('flex flex-col ')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flex flex-row flex-wrap gap-1')
					]),
				A2($elm$core$List$map, viewOption, args.lst)),
				A2(
				$elm_community$html_extra$Html$Extra$viewIf,
				!$elm$core$List$isEmpty(args.errors),
				A2(
					$elm$html$Html$ul,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex flex-col gap-[2px]')
						]),
					A2($elm$core$List$map, $author$project$Element$viewErrorRow, args.errors)))
			]));
};
var $author$project$Element$stringToLevel = function (level) {
	var _v0 = $elm$core$String$toUpper(level);
	switch (_v0) {
		case 'MEDIUM':
			return $elm$core$Maybe$Just($author$project$Element$Medium);
		case 'HIGH':
			return $elm$core$Maybe$Just($author$project$Element$High);
		case 'LOW':
			return $elm$core$Maybe$Just($author$project$Element$Low);
		default:
			return $elm$core$Maybe$Nothing;
	}
};
var $author$project$Element$styleshCheckbox = F2(
	function (toMsg, checked) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('flex items-center')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$input,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('appearance-none w-4 h-4 border-2 border-gray-200 bg-white checked:bg-sky-100 checked:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-100 focus:ring-offset-2 cursor-pointer transition-all duration-200 hover:border-gray-200'),
							$elm$html$Html$Attributes$type_('checkbox'),
							$elm$html$Html$Events$onCheck(toMsg),
							$elm$html$Html$Attributes$checked(checked)
						]),
					_List_Nil),
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('absolute inset-0 flex items-center justify-center pointer-events-none')
						]),
					_List_fromArray(
						[
							A2(
							$elm$html$Html$div,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('w-2 h-2 bg-white rounded-sm opacity-0 checked:opacity-100')
								]),
							_List_Nil)
						]))
				]));
	});
var $author$project$Element$switch = F2(
	function (onMsg, isDark) {
		return A2(
			$elm$html$Html$label,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(
					'mx-4 px-2 h-[38px] rounded border before:transition-all transition-all before:duration-50 before:absolute items-center flex cursor-pointer relative before:w-[calc(50%-6px)] before:[\'\'] before:h-[28px] before:rounded before:bg-gray-950 ' + ((!isDark) ? 'before:left-[5px] text-gray-950 bg-gray-100' : 'bg-gray-950 text-white before:bg-white before:left-[calc(50%+2px)]'))
				]),
			_List_fromArray(
				[
					$elm$html$Html$text('Light Dark'),
					A2(
					$elm$html$Html$input,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('h-[0] absolute invisible'),
							$elm$html$Html$Attributes$type_('checkbox'),
							$elm$html$Html$Events$onCheck(onMsg)
						]),
					_List_Nil)
				]));
	});
var $author$project$Icon$switch = F2(
	function (stroke, size) {
		return A2(
			$elm$svg$Svg$svg,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$width(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$height(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
					$elm$svg$Svg$Attributes$fill('none')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$d('M18.7153 1.71609C18.3241 1.32351 18.3241 0.687013 18.7153 0.294434C19.1066 -0.0981448 19.7409 -0.0981448 20.1321 0.294434L22.4038 2.57397L22.417 2.58733C23.1935 3.37241 23.1917 4.64056 22.4116 5.42342L20.1371 7.70575C19.7461 8.09808 19.1122 8.09808 18.7213 7.70575C18.3303 7.31342 18.3303 6.67733 18.7213 6.285L20.0018 5L4.99998 5C4.4477 5 3.99998 5.44772 3.99998 6V13C3.99998 13.5523 3.55227 14 2.99998 14C2.4477 14 1.99998 13.5523 1.99998 13V6C1.99998 4.34315 3.34313 3 4.99998 3H19.9948L18.7153 1.71609Z'),
							$elm$svg$Svg$Attributes$fill(
							(stroke === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(stroke))
						]),
					_List_Nil),
					A2(
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$d('M22 11C22 10.4477 21.5523 10 21 10C20.4477 10 20 10.4477 20 11V18C20 18.5523 19.5523 19 19 19L4.00264 19L5.28213 17.7161C5.67335 17.3235 5.67335 16.687 5.28212 16.2944C4.8909 15.9019 4.2566 15.9019 3.86537 16.2944L1.59369 18.574L1.58051 18.5873C0.803938 19.3724 0.805727 20.6406 1.58588 21.4234L3.86035 23.7058C4.25133 24.0981 4.88523 24.0981 5.2762 23.7058C5.66718 23.3134 5.66718 22.6773 5.2762 22.285L3.99563 21L19 21C20.6568 21 22 19.6569 22 18L22 11Z'),
							$elm$svg$Svg$Attributes$fill(
							(stroke === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(stroke))
						]),
					_List_Nil)
				]));
	});
var $elm$html$Html$textarea = _VirtualDom_node('textarea');
var $author$project$Element$textarea = function (_v0) {
	var id = _v0.id;
	var label = _v0.label;
	var value = _v0.value;
	var limit = _v0.limit;
	var toMsg = _v0.toMsg;
	var isDisabled = _v0.isDisabled;
	var error = _v0.error;
	var sanitizeValue = $elm$core$String$trim(
		A3(
			$elm$core$String$replace,
			'\n',
			' ',
			A3(
				$elm$core$String$replace,
				'\t',
				' ',
				A3(
					$elm$core$String$replace,
					'\u000D',
					' ',
					A3($elm$core$String$replace, '\n', ' ', value)))));
	var viewLimitIndicator = A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('absolute bottom-[-15px] right-[5px] text-xs')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flex items-center gap-1')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$span,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class(
								'' + ((_Utils_cmp(
									$elm$core$String$length(sanitizeValue),
									limit) > 0) ? ' text-red-500' : (((_Utils_cmp(
									$elm$core$String$length(sanitizeValue) + 10,
									limit) > -1) && (_Utils_cmp(
									$elm$core$String$length(sanitizeValue),
									limit) < 1)) ? ' text-orange-400' : 'text-sky-500')))
							]),
						_List_fromArray(
							[
								$elm$html$Html$text(
								(_Utils_cmp(
									$elm$core$String$length(sanitizeValue),
									limit) > 0) ? $elm$core$String$fromInt(
									limit - $elm$core$String$length(sanitizeValue)) : $elm$core$String$fromInt(
									$elm$core$String$length(sanitizeValue)))
							])),
						A2(
						$elm$html$Html$span,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(' / ')
							])),
						A2(
						$elm$html$Html$span,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(
								$elm$core$String$fromInt(limit))
							]))
					]))
			]));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('relative text-sm flex flex-col')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$label,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$for(id),
						$elm$html$Html$Attributes$class('text-sm text-gray-500 select-none')
					]),
				_List_fromArray(
					[
						function () {
						switch (label.$) {
							case 'PlaceholderLabel':
								var label_ = label.a;
								return $elm$html$Html$text(label_);
							case 'LabelAndPlaceholderA':
								var label_ = label.a;
								return $elm$html$Html$text(label_);
							default:
								return $elm$html$Html$text('');
						}
					}()
					])),
				A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$textarea,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class(
								'w-full p-2 rounded focus:outline-none focus:ring-0 focus:border-gray-400 min-h-[100px] ' + ((!$elm$core$List$isEmpty(error)) ? 'border border-red-500 bg-red-100 text-red-500' : (isDisabled ? 'border border-gray-200 bg-gray-100 text-gray-500' : 'border border-gray-300 bg-white text-gray-500'))),
								$elm$html$Html$Attributes$placeholder(
								function () {
									switch (label.$) {
										case 'Placeholder':
											var placeholder_ = label.a;
											return placeholder_;
										case 'LabelAndPlaceholderA':
											var placeholder_ = label.b;
											return placeholder_;
										default:
											return '';
									}
								}()),
								$elm$html$Html$Attributes$value(value),
								$elm$html$Html$Attributes$id(id),
								$elm$html$Html$Events$onInput(toMsg),
								$elm$html$Html$Attributes$disabled(isDisabled)
							]),
						_List_Nil),
						A2(
						$elm_community$html_extra$Html$Extra$viewIf,
						!$elm$core$String$isEmpty(value),
						viewLimitIndicator),
						A2(
						$elm_community$html_extra$Html$Extra$viewIf,
						!$elm$core$List$isEmpty(error),
						A2(
							$elm$html$Html$ul,
							_List_fromArray(
								[
									$elm$html$Html$Attributes$class('flex flex-col gap-[2px] mt-[-5px]')
								]),
							A2($elm$core$List$map, $author$project$Element$viewErrorRow, error)))
					]))
			]));
};
var $author$project$Icon$trash = F2(
	function (fill, size) {
		return A2(
			$elm$svg$Svg$svg,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$width(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$height(
					$author$project$Icon$sizeToString(size) + 'px'),
					$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
					$elm$svg$Svg$Attributes$fill('none')
				]),
			_List_fromArray(
				[
					A2(
					$elm$svg$Svg$path,
					_List_fromArray(
						[
							$elm$svg$Svg$Attributes$d('M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17'),
							$elm$svg$Svg$Attributes$stroke(
							(fill === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(fill)),
							$elm$svg$Svg$Attributes$strokeWidth('1'),
							$elm$svg$Svg$Attributes$strokeLinecap('round'),
							$elm$svg$Svg$Attributes$strokeLinejoin('round')
						]),
					_List_Nil)
				]));
	});
var $author$project$Icon$underReview = A2(
	$elm$svg$Svg$svg,
	_List_fromArray(
		[
			$elm$svg$Svg$Attributes$width('20'),
			$elm$svg$Svg$Attributes$height('20'),
			$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
			$elm$svg$Svg$Attributes$fill('none'),
			$elm$svg$Svg$Attributes$stroke('currentColor'),
			$elm$svg$Svg$Attributes$strokeWidth('2'),
			$elm$svg$Svg$Attributes$strokeLinecap('round'),
			$elm$svg$Svg$Attributes$strokeLinejoin('round')
		]),
	_List_fromArray(
		[
			A2(
			$elm$svg$Svg$path,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$d('M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z')
				]),
			_List_Nil),
			A2(
			$elm$svg$Svg$circle,
			_List_fromArray(
				[
					$elm$svg$Svg$Attributes$cx('12'),
					$elm$svg$Svg$Attributes$cy('12'),
					$elm$svg$Svg$Attributes$r('3')
				]),
			_List_Nil)
		]));
var $author$project$Icon$upload = function (overrideColor) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
				$elm$svg$Svg$Attributes$width('24px'),
				$elm$svg$Svg$Attributes$height('24px'),
				$elm$svg$Svg$Attributes$fill(
				(overrideColor === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(overrideColor))
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M12.5535 2.49392C12.4114 2.33852 12.2106 2.25 12 2.25C11.7894 2.25 11.5886 2.33852 11.4465 2.49392L7.44648 6.86892C7.16698 7.17462 7.18822 7.64902 7.49392 7.92852C7.79963 8.20802 8.27402 8.18678 8.55352 7.88108L11.25 4.9318V16C11.25 16.4142 11.5858 16.75 12 16.75C12.4142 16.75 12.75 16.4142 12.75 16V4.9318L15.4465 7.88108C15.726 8.18678 16.2004 8.20802 16.5061 7.92852C16.8118 7.64902 16.833 7.17462 16.5535 6.86892L12.5535 2.49392Z'),
						$elm$svg$Svg$Attributes$fill(
						(overrideColor === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(overrideColor))
					]),
				_List_Nil),
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$d('M3.75 15C3.75 14.5858 3.41422 14.25 3 14.25C2.58579 14.25 2.25 14.5858 2.25 15V15.0549C2.24998 16.4225 2.24996 17.5248 2.36652 18.3918C2.48754 19.2919 2.74643 20.0497 3.34835 20.6516C3.95027 21.2536 4.70814 21.5125 5.60825 21.6335C6.47522 21.75 7.57754 21.75 8.94513 21.75H15.0549C16.4225 21.75 17.5248 21.75 18.3918 21.6335C19.2919 21.5125 20.0497 21.2536 20.6517 20.6516C21.2536 20.0497 21.5125 19.2919 21.6335 18.3918C21.75 17.5248 21.75 16.4225 21.75 15.0549V15C21.75 14.5858 21.4142 14.25 21 14.25C20.5858 14.25 20.25 14.5858 20.25 15C20.25 16.4354 20.2484 17.4365 20.1469 18.1919C20.0482 18.9257 19.8678 19.3142 19.591 19.591C19.3142 19.8678 18.9257 20.0482 18.1919 20.1469C17.4365 20.2484 16.4354 20.25 15 20.25H9C7.56459 20.25 6.56347 20.2484 5.80812 20.1469C5.07435 20.0482 4.68577 19.8678 4.40901 19.591C4.13225 19.3142 3.9518 18.9257 3.85315 18.1919C3.75159 17.4365 3.75 16.4354 3.75 15Z'),
						$elm$svg$Svg$Attributes$fill(
						(overrideColor === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(overrideColor))
					]),
				_List_Nil)
			]));
};
var $author$project$Element$viewModal = function (_v0) {
	var size = _v0.size;
	var title = _v0.title;
	var children = _v0.children;
	var onClose = _v0.onClose;
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('flex items-center justify-center max-h-[100%] max-w-[100%] h-[100%] w-[100%] fixed top-[0] left-[0] z-[1] before:content-[\'\'] before:fixed before:inset-0 before:w-full before:h-full before:bg-black/50 before:backdrop-blur-[2px] before:transition-all before:duration-500 before:z-1')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$id('modal'),
						$elm$html$Html$Attributes$class(
						'flex flex-col bg-white z-[2] relative z-[100] rounded-lg shadow-lg' + function () {
							switch (size.$) {
								case 'SM':
									return ' px-8 py-6 min-w-[300px] min-h-[150px] w-[350px] max-h-[800px]';
								case 'MD':
									return ' px-6 py-6 min-w-[300px] min-h-[300px] w-[600px] max-h-[800px]';
								case 'LG':
									return ' p-6 min-w-[300px] min-h-[300px] w-[1150px] max-h-[95vh]';
								default:
									return ' px-8 py-6 w-[calc(100vw-20px)] min-h-[300px] h-[calc(100vh-20px)] max-h-[calc(100vh-20px)] overflow-auto';
							}
						}())
					]),
				_List_fromArray(
					[
						function () {
						if (onClose.$ === 'Just') {
							var msg = onClose.a;
							return A2(
								$elm$html$Html$span,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('absolute text-black right-[10px] top-[10px] cursor-pointer'),
										$elm$html$Html$Events$onClick(msg)
									]),
								_List_fromArray(
									[
										A2($author$project$Icon$close, '#000000', $author$project$Icon$Large)
									]));
						} else {
							return $elm$html$Html$text('');
						}
					}(),
						A2(
						$elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[
								function () {
								if (title.$ === 'Just') {
									var title_ = title.a;
									return A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-2xl mb-4 font-semibold')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(title_)
											]));
								} else {
									return $elm$html$Html$text('');
								}
							}()
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('overflow-y-auto max-h-[80vh] min-h-[200px]')
							]),
						_List_fromArray(
							[children]))
					]))
			]));
};
var $elm_community$string_extra$String$Extra$classify = function (string) {
	return $elm_community$string_extra$String$Extra$toSentenceCase(
		A3(
			$elm$core$String$replace,
			' ',
			'',
			$elm_community$string_extra$String$Extra$camelize(
				A3(
					$elm$regex$Regex$replace,
					$elm_community$string_extra$String$Extra$regexFromString('[\\W_]'),
					$elm$core$Basics$always(' '),
					string))));
};
var $author$project$ErrorUI$hasError = F2(
	function (field, errors) {
		return !(!$elm$core$List$length(
			A2($author$project$ErrorUI$byFieldName, field, errors)));
	});
var $elm$virtual_dom$VirtualDom$MayPreventDefault = function (a) {
	return {$: 'MayPreventDefault', a: a};
};
var $elm$html$Html$Events$preventDefaultOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayPreventDefault(decoder));
	});
var $elm_community$html_extra$Html$Events$Extra$onClickPreventDefault = function (msg) {
	return A2(
		$elm$html$Html$Events$preventDefaultOn,
		'click',
		$elm$json$Json$Decode$succeed(
			_Utils_Tuple2(msg, true)));
};
var $author$project$ErrorUI$withStandaloneField = function (lst) {
	return $elm$core$List$isEmpty(lst) ? $elm$html$Html$text('') : A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('mt-1')
			]),
		A2($elm$core$List$map, $author$project$InputField$inputFieldError, lst));
};
var $author$project$Button$viewTabs = F5(
	function (field, toMsg, lstOfTabs, selectedTab, errors) {
		var humanizedSelectedTab = A2($elm$core$Maybe$map, $elm_community$string_extra$String$Extra$humanize, selectedTab);
		var hasError = A2($author$project$ErrorUI$hasError, field, errors);
		return A2(
			$elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('flex gap-x-[2px]')
						]),
					A2(
						$elm$core$List$indexedMap,
						F2(
							function (index, tab) {
								var tab_ = $elm$core$String$toLower(tab);
								var selectedTab_ = A2($elm$core$Maybe$map, $elm$core$String$toLower, humanizedSelectedTab);
								var overrideStyle = function (i) {
									return (!i) ? ' rounded-l' : (_Utils_eq(
										i,
										$elm$core$List$length(lstOfTabs) - 1) ? ' rounded-r' : '');
								};
								return A2(
									$elm$html$Html$button,
									_List_fromArray(
										[
											$elm$html$Html$Attributes$class(
											'bg-gray-200 text-sm text-gray-500 py-2 px-3 bg-gray-200 text-sm text-gray-500 ' + (overrideStyle(index) + (hasError ? ' border border-red-500 bg-red-100 text-red-500' : ' border border-transparent'))),
											$elm_community$html_extra$Html$Events$Extra$onClickPreventDefault(
											toMsg(
												$elm_community$string_extra$String$Extra$classify(tab_))),
											$elm$html$Html$Attributes$classList(
											_List_fromArray(
												[
													_Utils_Tuple2(
													'bg-sky-400 text-white hover:bg-sky-400 hover:text-white',
													_Utils_eq(
														selectedTab_,
														$elm$core$Maybe$Just(tab_)))
												]))
										]),
									_List_fromArray(
										[
											$elm$html$Html$text(tab)
										]));
							}),
						lstOfTabs)),
					$author$project$ErrorUI$withStandaloneField(
					A2($author$project$ErrorUI$byFieldName, field, errors))
				]));
	});
var $author$project$Button$buttonLinkStyle = function (size) {
	return 'w-fit whitespace-nowrap text-sky-500 dark:text-white transition-all hover:text-sky-600 dark:hover:text-gray-300' + ' cursor-pointer';
};
var $author$project$Button$withLinkStyle = function (_v0) {
	var constraints = _v0.a;
	return $author$project$Button$Button(
		_Utils_update(
			constraints,
			{styles: $author$project$Button$buttonLinkStyle}));
};
var $author$project$Button$buttonNegativeStyle = function (size) {
	return 'w-fit whitespace-nowrap flex-start bg-white border rounded border-red-300 text-red-500 transition-all hover:bg-red-100' + $author$project$Button$sizeToStyle(size);
};
var $author$project$Button$withNegativeStyle = function (_v0) {
	var constraints = _v0.a;
	return $author$project$Button$Button(
		_Utils_update(
			constraints,
			{styles: $author$project$Button$buttonNegativeStyle}));
};
var $author$project$Button$withPrimaryStyle = function (_v0) {
	var constraints = _v0.a;
	return $author$project$Button$Button(
		_Utils_update(
			constraints,
			{styles: $author$project$Button$buttonPrimaryStyle}));
};
var $author$project$Button$withTargetBlank = F2(
	function (targetBlank, _v0) {
		var constraints = _v0.a;
		return $author$project$Button$Button(
			_Utils_update(
				constraints,
				{targetBlank: targetBlank}));
	});
var $author$project$Button$withUrl = F2(
	function (url, _v0) {
		var constraints = _v0.a;
		return $author$project$Button$Button(
			_Utils_update(
				constraints,
				{
					action: $author$project$Button$Url(url)
				}));
	});
var $author$project$Icon$world = function (stroke) {
	return A2(
		$elm$svg$Svg$svg,
		_List_fromArray(
			[
				$elm$svg$Svg$Attributes$width('24px'),
				$elm$svg$Svg$Attributes$height('24px'),
				$elm$svg$Svg$Attributes$viewBox('0 0 24 24'),
				$elm$svg$Svg$Attributes$fill('none')
			]),
		_List_fromArray(
			[
				A2(
				$elm$svg$Svg$path,
				_List_fromArray(
					[
						$elm$svg$Svg$Attributes$fillRule('evenodd'),
						$elm$svg$Svg$Attributes$clipRule('evenodd'),
						$elm$svg$Svg$Attributes$d('M6.15407 7.30116C7.52877 5.59304 9.63674 4.5 12 4.5C12.365 4.5 12.7238 4.52607 13.0748 4.57644L13.7126 5.85192L11.2716 8.2929L8.6466 8.6679L7.36009 9.95441L6.15407 7.30116ZM5.2011 8.82954C4.75126 9.79256 4.5 10.8669 4.5 12C4.5 15.6945 7.17133 18.7651 10.6878 19.3856L11.0989 18.7195L8.8147 15.547L10.3741 13.5256L9.63268 13.1549L6.94027 13.6036L6.41366 11.4972L5.2011 8.82954ZM7.95559 11.4802L8.05962 11.8964L9.86722 11.5951L11.3726 12.3478L14.0824 11.9714L18.9544 14.8135C19.3063 13.9447 19.5 12.995 19.5 12C19.5 8.93729 17.6642 6.30336 15.033 5.13856L15.5377 6.1481L11.9787 9.70711L9.35371 10.0821L7.95559 11.4802ZM18.2539 16.1414C16.9774 18.0652 14.8369 19.366 12.3859 19.4902L12.9011 18.6555L10.6853 15.578L12.0853 13.7632L13.7748 13.5286L18.2539 16.1414ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z'),
						$elm$svg$Svg$Attributes$fill(
						(stroke === '') ? 'currentColor' : $author$project$Colors$tailwindColorToColor(stroke))
					]),
				_List_Nil)
			]));
};
var $author$project$Demo$view = function (model) {
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('flex flex-col items-center my-10 h-screen gap-6')
			]),
		_List_fromArray(
			[
				A2(
				$elm$html$Html$h1,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('text-2xl font-bold')
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('Why UI')
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flex flex-col items-center gap-8 mt-10')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h2,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-lg font-bold')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Input Fields')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('w-full flex gap-10')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Normal Input Field text - with both label and placeholder')
											])),
										$author$project$InputField$toHtml(
										A2(
											$author$project$InputField$withExtraText,
											A2($author$project$InputField$Both, 'Name', 'Normal input field'),
											A2(
												$author$project$InputField$withError,
												A2($author$project$ErrorUI$byFieldName, 'normalInputFieldValue', model.formErrors),
												A2(
													$author$project$InputField$withDisable,
													false,
													A2(
														$author$project$InputField$withType,
														$author$project$InputField$Text,
														A2(
															$author$project$InputField$withMsg,
															$author$project$Demo$SetNormalInputFieldValue,
															A2($author$project$InputField$withValue, model.normalInputFieldValue, $author$project$InputField$view)))))))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Input Field text - disabled')
											])),
										$author$project$InputField$toHtml(
										A2(
											$author$project$InputField$withExtraText,
											A2($author$project$InputField$Both, 'Name', 'Disabled input field'),
											A2(
												$author$project$InputField$withError,
												A2($author$project$ErrorUI$byFieldName, 'normalInputFieldValue', model.formErrors),
												A2(
													$author$project$InputField$withDisable,
													true,
													A2(
														$author$project$InputField$withType,
														$author$project$InputField$Text,
														A2(
															$author$project$InputField$withMsg,
															$author$project$Demo$SetNormalInputFieldValue,
															A2($author$project$InputField$withValue, model.normalInputFieldValue, $author$project$InputField$view)))))))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Input Field text - with error')
											])),
										$author$project$InputField$toHtml(
										A2(
											$author$project$InputField$withExtraText,
											A2($author$project$InputField$Both, 'Name', 'Error input field'),
											A2(
												$author$project$InputField$withError,
												A2($author$project$ErrorUI$byFieldName, 'normalInputFieldValueError', model.formErrors),
												A2(
													$author$project$InputField$withDisable,
													false,
													A2(
														$author$project$InputField$withType,
														$author$project$InputField$Text,
														A2(
															$author$project$InputField$withMsg,
															$author$project$Demo$SetNormalInputFieldValue,
															A2($author$project$InputField$withValue, model.normalInputFieldValue, $author$project$InputField$view)))))))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Input Field numeric ')
											])),
										$author$project$InputField$toHtml(
										A2(
											$author$project$InputField$withExtraText,
											A2($author$project$InputField$Both, 'Name', 'Decimal input field'),
											A2(
												$author$project$InputField$withError,
												A2($author$project$ErrorUI$byFieldName, 'decimalInputFieldValue', model.formErrors),
												A2(
													$author$project$InputField$withDisable,
													false,
													A2(
														$author$project$InputField$withType,
														$author$project$InputField$Decimal,
														A2(
															$author$project$InputField$withMsg,
															$author$project$Demo$SetDecimalInputFieldValue,
															A2($author$project$InputField$withValue, model.decimalInputFieldValue, $author$project$InputField$view)))))))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Input Field text - password ')
											])),
										$author$project$InputField$toHtml(
										A2(
											$author$project$InputField$withExtraText,
											A2($author$project$InputField$Both, 'Password', 'Password input field'),
											A2(
												$author$project$InputField$withError,
												A2($author$project$ErrorUI$byFieldName, 'password', model.formErrors),
												A2(
													$author$project$InputField$withDisable,
													false,
													A2(
														$author$project$InputField$withType,
														$author$project$InputField$Password(
															_Utils_Tuple3('password', model.showPassword.b, $author$project$Demo$ShowPassword)),
														A2(
															$author$project$InputField$withMsg,
															$author$project$Demo$SetPassword,
															A2($author$project$InputField$withValue, model.password, $author$project$InputField$view)))))))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Input Field text - Card expiration ')
											])),
										$author$project$InputField$toHtml(
										A2(
											$author$project$InputField$withExtraText,
											A2($author$project$InputField$Both, 'Card Number', '1234 5678 9012 3456'),
											A2(
												$author$project$InputField$withError,
												A2($author$project$ErrorUI$byFieldName, 'card', model.formErrors),
												A2(
													$author$project$InputField$withDisable,
													false,
													A2(
														$author$project$InputField$withType,
														$author$project$InputField$Text,
														A2(
															$author$project$InputField$withMsg,
															$author$project$Demo$SetCardNumberValue,
															A2($author$project$InputField$withValue, model.cardNumber, $author$project$InputField$view))))))),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('flex aling-items gap-4')
											]),
										_List_fromArray(
											[
												$author$project$InputField$toHtml(
												A2(
													$author$project$InputField$withExtraText,
													A2($author$project$InputField$Both, 'Expiration (MM/YY)', '12/25'),
													A2(
														$author$project$InputField$withError,
														A2($author$project$ErrorUI$byFieldName, 'expiration', model.formErrors),
														A2(
															$author$project$InputField$withDisable,
															false,
															A2(
																$author$project$InputField$withType,
																$author$project$InputField$Text,
																A2(
																	$author$project$InputField$withMsg,
																	$author$project$Demo$SetCardExpirationValue,
																	A2($author$project$InputField$withValue, model.cardExpiration, $author$project$InputField$view))))))),
												$author$project$InputField$toHtml(
												A2(
													$author$project$InputField$withExtraText,
													A2($author$project$InputField$Both, 'CVC', '123'),
													A2(
														$author$project$InputField$withError,
														A2($author$project$ErrorUI$byFieldName, 'cvc', model.formErrors),
														A2(
															$author$project$InputField$withDisable,
															false,
															A2(
																$author$project$InputField$withType,
																$author$project$InputField$Text,
																A2(
																	$author$project$InputField$withMsg,
																	$author$project$Demo$SetCvcValue,
																	A2($author$project$InputField$withValue, model.cvc, $author$project$InputField$view)))))))
											]))
									]))
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flex flex-col items-center gap-8 mt-10 w-full max-w-5xl px-4')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h2,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-lg font-bold')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Element')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('w-full flex flex-col gap-10')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Autocomplete')
											])),
										$author$project$Element$autocomplete(
										{
											errors: A2($author$project$ErrorUI$byFieldName, 'userAutocomplete', model.formErrors),
											filterListCondition: function (u) {
												return A2(
													$elm$core$String$contains,
													$elm$core$String$toLower(model.userAutocompleteValue),
													$elm$core$String$toLower(u.name)) || A2(
													$elm$core$String$contains,
													$elm$core$String$toLower(model.userAutocompleteValue),
													$elm$core$String$toLower(u.email));
											},
											id: 'userAutocomplete',
											isDisabled: false,
											itemLabel: function ($) {
												return $.name;
											},
											onClick: $author$project$Demo$ChooseUser,
											options: model.users,
											placeholder: A2($author$project$InputField$Both, 'User', 'User\'s name'),
											showList: ($elm$core$String$length(model.userAutocompleteValue) > 0) && (!model.hasChoosenUser),
											toMsg: $author$project$Demo$SetUserAutocompleteValue,
											value: model.userAutocompleteValue
										})
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Preselected multiselect')
											])),
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-sm text-gray-600')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Pills reflect the current selection; clicking removes an item from the list.')
											])),
										$author$project$Element$preselectedMultiselect(
										{errors: _List_Nil, onSelection: $author$project$Demo$SetPreselectedMultiselect, selections: model.preselectedMultiselectItems})
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Multiselect')
											])),
										$author$project$Element$multiselect(
										{
											disabled: false,
											errors: _List_Nil,
											extraAttrs: _List_Nil,
											hint: $elm$core$Maybe$Nothing,
											id: 'demoMultiselect',
											itemDisabled: function ($) {
												return $.disabled;
											},
											itemId: function ($) {
												return $.id;
											},
											itemLabel: function ($) {
												return $.label;
											},
											onSelection: $author$project$Demo$SetElementMultiselect,
											options: $author$project$Demo$multiselectDemoItems,
											selections: model.multiselectSelections
										})
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Multiselect with errors')
											])),
										$author$project$Element$multiselect(
										{
											disabled: false,
											errors: _List_fromArray(
												['Select at least one option']),
											extraAttrs: _List_Nil,
											hint: $elm$core$Maybe$Nothing,
											id: 'demoMultiselectErr',
											itemDisabled: function ($) {
												return $.disabled;
											},
											itemId: function ($) {
												return $.id;
											},
											itemLabel: function ($) {
												return $.label;
											},
											onSelection: $author$project$Demo$SetElementMultiselect,
											options: $author$project$Demo$multiselectDemoItems,
											selections: model.multiselectSelections
										})
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Singleselect')
											])),
										$author$project$Element$singleselect(
										{
											errors: _List_Nil,
											lst: _List_fromArray(
												['draft', 'published', 'archived']),
											onSelection: $author$project$Demo$SetElementSingleselectStatus,
											selected: model.singleselectStatus
										})
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Singleselect with errors')
											])),
										$author$project$Element$singleselect(
										{
											errors: _List_fromArray(
												['Choose a size']),
											lst: _List_fromArray(
												['small', 'medium', 'large']),
											onSelection: $author$project$Demo$SetElementSingleselectSize,
											selected: model.singleselectSize
										})
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Checkbox and styleshCheckbox')
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('flex flex-col gap-3')
											]),
										_List_fromArray(
											[
												A3($author$project$Element$checkbox, 'Agree to terms', $author$project$Demo$SetDemoElementCheckbox, model.demoElementCheckbox),
												A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('flex items-center gap-2')
													]),
												_List_fromArray(
													[
														A2($author$project$Element$styleshCheckbox, $author$project$Demo$SetStyleshCheckbox, model.styleshCheckboxChecked),
														A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('text-sm text-gray-600')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('styleshCheckbox (compact)')
															]))
													]))
											]))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Textarea')
											])),
										$author$project$Element$textarea(
										{
											error: _List_Nil,
											id: 'demoTextarea',
											isDisabled: false,
											label: A2($author$project$Element$LabelAndPlaceholderA, 'Notes', 'Type here…'),
											limit: 120,
											toMsg: $author$project$Demo$SetDemoTextarea,
											value: model.demoTextareaValue
										})
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Textarea — disabled with error')
											])),
										$author$project$Element$textarea(
										{
											error: _List_fromArray(
												['Cannot edit this field']),
											id: 'demoTextareaErr',
											isDisabled: true,
											label: $author$project$Element$PlaceholderLabel('Disabled'),
											limit: 50,
											toMsg: $elm$core$Basics$always(
												$author$project$Demo$SetDemoTextarea(model.demoTextareaValue)),
											value: 'Locked content'
										})
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('viewErrorRow')
											])),
										A2(
										$elm$html$Html$ul,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('flex flex-col gap-[2px] max-w-md')
											]),
										_List_fromArray(
											[
												$author$project$Element$viewErrorRow('First validation message'),
												$author$project$Element$viewErrorRow('Second validation message')
											]))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Form layout')
											])),
										A2(
										$author$project$Element$formLayout,
										'Sign in',
										_List_fromArray(
											[
												$author$project$InputField$toHtml(
												A2(
													$author$project$InputField$withExtraText,
													A2($author$project$InputField$Both, 'Email', 'you@example.com'),
													A2(
														$author$project$InputField$withError,
														_List_Nil,
														A2(
															$author$project$InputField$withDisable,
															false,
															A2(
																$author$project$InputField$withType,
																$author$project$InputField$Text,
																A2(
																	$author$project$InputField$withMsg,
																	$author$project$Demo$SetNormalInputFieldValue,
																	A2($author$project$InputField$withValue, model.normalInputFieldValue, $author$project$InputField$view))))))),
												A2(
												$author$project$Demo$buttonWithSizeLabel,
												'Button.Large',
												$author$project$Button$toHtml(
													$author$project$Button$withPrimaryStyle(
														A2(
															$author$project$Button$withDisabled,
															false,
															A2(
																$author$project$Button$withMsg,
																$author$project$Demo$ButtonDemoClick('Form layout submit'),
																A2($author$project$Button$withText, 'Submit', $author$project$Button$view))))))
											]))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2 items-start')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Loading')
											])),
										$author$project$Element$loadingElement
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-3')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Notification')
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('relative h-14 w-full max-w-xl')
											]),
										_List_fromArray(
											[
												A3(
												$author$project$Element$notification,
												'0',
												$author$project$Element$Info('Info message'),
												$author$project$Element$Left)
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('relative h-14 w-full max-w-xl')
											]),
										_List_fromArray(
											[
												A3(
												$author$project$Element$notification,
												'0',
												$author$project$Element$Warning('Warning message'),
												$author$project$Element$Center)
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('relative h-14 w-full max-w-xl')
											]),
										_List_fromArray(
											[
												A3(
												$author$project$Element$notification,
												'0',
												$author$project$Element$Error('Error message'),
												$author$project$Element$Right)
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('relative h-14 w-full max-w-xl')
											]),
										_List_fromArray(
											[
												A3(
												$author$project$Element$notification,
												'0',
												$author$project$Element$Success('Success message'),
												$author$project$Element$Left)
											]))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('notificationToIcon')
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('flex flex-wrap gap-4 items-center text-sm text-gray-600')
											]),
										_List_fromArray(
											[
												A2(
												$author$project$Element$notificationToIcon,
												$author$project$Element$Info(''),
												'sky'),
												A2(
												$author$project$Element$notificationToIcon,
												$author$project$Element$Warning(''),
												'yellow'),
												A2(
												$author$project$Element$notificationToIcon,
												$author$project$Element$Error(''),
												'red'),
												A2(
												$author$project$Element$notificationToIcon,
												$author$project$Element$Success(''),
												'green')
											]))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Notification style helpers (class strings)')
											])),
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-xs font-mono text-gray-500 break-all')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(
												$author$project$Element$notificationAlignToClass($author$project$Element$Center))
											])),
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-xs font-mono text-gray-500 break-all')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(
												$author$project$Element$notificationIconStyle('sky'))
											])),
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-xs font-mono text-gray-500 break-all')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(
												$author$project$Element$notificationWrapperStyle('yellow'))
											]))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Theme switch')
											])),
										A2($author$project$Element$switch, $author$project$Demo$SetDemoThemeSwitch, model.demoThemeSwitchDark),
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-sm text-gray-600')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(
												'Dark mode: ' + (model.demoThemeSwitchDark ? 'on' : 'off'))
											]))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Pagination')
											])),
										$author$project$Element$pagination(
										{
											currentPage: model.demoPaginationPage,
											isFirstPage: model.demoPaginationPage <= 1,
											isLastPage: _Utils_cmp(
												model.demoPaginationPage,
												A2($author$project$Demo$demoPaginationLastPage, $author$project$Demo$demoPaginationTotal, model.demoPaginationPageSize)) > -1,
											lastPage: A2($author$project$Demo$demoPaginationLastPage, $author$project$Demo$demoPaginationTotal, model.demoPaginationPageSize),
											onPageChange: $author$project$Demo$DemoPaginationPage,
											onPageSizeInput: $author$project$Demo$DemoPaginationPageSize,
											pageSize: model.demoPaginationPageSize,
											total: $author$project$Demo$demoPaginationTotal
										})
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Dropdown')
											])),
										$author$project$Element$dropdown(
										{
											errors: _List_Nil,
											field: 'demoDropdown',
											isOpened: model.demoDropdownOpen,
											label: 'Choose role',
											lst: _List_fromArray(
												['Admin', 'Editor', 'Viewer']),
											selected: model.demoDropdownSelected,
											toMsg: $author$project$Demo$SetDemoDropdown,
											toggleMsg: $author$project$Demo$ToggleDemoDropdown
										})
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Dropdown with errors')
											])),
										$author$project$Element$dropdown(
										{
											errors: _List_fromArray(
												['Required']),
											field: 'demoDropdownErr',
											isOpened: model.demoDropdownErrOpen,
											label: 'Status',
											lst: _List_fromArray(
												['Active', 'Paused']),
											selected: model.demoDropdownErrSelected,
											toMsg: $author$project$Demo$SetDemoDropdownErr,
											toggleMsg: $author$project$Demo$ToggleDemoDropdownErr
										})
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2 overflow-x-auto')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Basic table')
											])),
										$author$project$Element$basicTable(
										{
											td: _List_fromArray(
												[
													_List_fromArray(
													[
														$elm$html$Html$text('John Doe'),
														$elm$html$Html$text('Admin'),
														$elm$html$Html$text('john@example.com')
													]),
													_List_fromArray(
													[
														$elm$html$Html$text('Jane Doe'),
														$elm$html$Html$text('User'),
														$elm$html$Html$text('jane@example.com')
													])
												]),
											th: _List_fromArray(
												['Name', 'Role', 'Email'])
										})
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Date expiry indicator')
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('flex flex-wrap gap-4')
											]),
										_List_fromArray(
											[
												$author$project$Element$dateExpiryIndicatorWidget(
												{
													currentTime: model.now,
													event: 'review',
													nextAudit: A2($author$project$Demo$posixWithDayOffset, model.now, 200),
													referTo: 'review',
													timezone: model.zone
												}),
												$author$project$Element$dateExpiryIndicatorWidget(
												{
													currentTime: model.now,
													event: 'review',
													nextAudit: A2($author$project$Demo$posixWithDayOffset, model.now, 55),
													referTo: 'review',
													timezone: model.zone
												}),
												$author$project$Element$dateExpiryIndicatorWidget(
												{
													currentTime: model.now,
													event: 'review',
													nextAudit: A2($author$project$Demo$posixWithDayOffset, model.now, -10),
													referTo: 'review',
													timezone: model.zone
												})
											]))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Level UI and stringToLevel')
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('flex flex-wrap items-end gap-6')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('flex flex-col gap-1')
													]),
												_List_fromArray(
													[
														A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('text-xs text-gray-500')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('Low')
															])),
														$author$project$Element$levelUI($author$project$Element$Low)
													])),
												A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('flex flex-col gap-1')
													]),
												_List_fromArray(
													[
														A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('text-xs text-gray-500')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('Medium')
															])),
														$author$project$Element$levelUI($author$project$Element$Medium)
													])),
												A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('flex flex-col gap-1')
													]),
												_List_fromArray(
													[
														A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('text-xs text-gray-500')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('High')
															])),
														$author$project$Element$levelUI($author$project$Element$High)
													]))
											])),
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-sm text-gray-600')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(
												'stringToLevel \"HIGH\" → ' + function () {
													var _v0 = $author$project$Element$stringToLevel('HIGH');
													if ((_v0.$ === 'Just') && (_v0.a.$ === 'High')) {
														var _v1 = _v0.a;
														return 'Just High';
													} else {
														return 'unexpected';
													}
												}())
											]))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Modal')
											])),
										$author$project$Button$toHtml(
										A2(
											$author$project$Button$withSize,
											$author$project$Button$Medium,
											$author$project$Button$withSecondaryStyle(
												A2(
													$author$project$Button$withDisabled,
													false,
													A2(
														$author$project$Button$withMsg,
														$author$project$Demo$OpenDemoModal,
														A2($author$project$Button$withText, 'Open modal', $author$project$Button$view)))))),
										model.demoModalOpen ? $author$project$Element$viewModal(
										{
											children: A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('flex flex-col gap-4')
													]),
												_List_fromArray(
													[
														A2(
														$elm$html$Html$p,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('text-gray-600')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('Content passed as ModalArgs.children.')
															])),
														$author$project$Button$toHtml(
														$author$project$Button$withPrimaryStyle(
															A2(
																$author$project$Button$withDisabled,
																false,
																A2(
																	$author$project$Button$withMsg,
																	$author$project$Demo$CloseDemoModal,
																	A2($author$project$Button$withText, 'Close', $author$project$Button$view)))))
													])),
											onClose: $elm$core$Maybe$Just($author$project$Demo$CloseDemoModal),
											size: $author$project$Element$MD,
											title: $elm$core$Maybe$Just('Demo modal')
										}) : $elm$html$Html$text('')
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Circular progress')
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('flex flex-wrap items-end gap-8')
											]),
										_List_fromArray(
											[
												A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('flex flex-col gap-1 items-center')
													]),
												_List_fromArray(
													[
														A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('text-xs font-mono text-gray-500')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('Element.S · Percentage')
															])),
														$author$project$Element$circularProgressBar(
														{count: 72, shownData: $author$project$Element$Percentage, size: $author$project$Element$S, sum: 100})
													])),
												A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('flex flex-col gap-1 items-center')
													]),
												_List_fromArray(
													[
														A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('text-xs font-mono text-gray-500')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('Element.M · PercentageAndCount')
															])),
														$author$project$Element$circularProgressBar(
														{count: 20, shownData: $author$project$Element$PercentageAndCount, size: $author$project$Element$M, sum: 50})
													])),
												A2(
												$elm$html$Html$div,
												_List_fromArray(
													[
														$elm$html$Html$Attributes$class('flex flex-col gap-1 items-center')
													]),
												_List_fromArray(
													[
														A2(
														$elm$html$Html$span,
														_List_fromArray(
															[
																$elm$html$Html$Attributes$class('text-xs font-mono text-gray-500')
															]),
														_List_fromArray(
															[
																$elm$html$Html$text('Element.L · Count')
															])),
														$author$project$Element$circularProgressBar(
														{count: 7, shownData: $author$project$Element$Count, size: $author$project$Element$L, sum: 10})
													]))
											]))
									]))
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flex flex-col items-center gap-8 mt-10 w-full max-w-5xl px-4')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h2,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-lg font-bold')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Buttons')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('w-full flex flex-col gap-10')
							]),
						_List_fromArray(
							[
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Variants and sizes')
											])),
										A2(
										$elm$html$Html$div,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('flex flex-wrap items-start gap-3')
											]),
										_List_fromArray(
											[
												A2(
												$author$project$Demo$buttonWithSizeLabel,
												'Button.Large',
												$author$project$Button$toHtml(
													A2(
														$author$project$Button$withSize,
														$author$project$Button$Large,
														$author$project$Button$withPrimaryStyle(
															A2(
																$author$project$Button$withDisabled,
																false,
																A2(
																	$author$project$Button$withMsg,
																	$author$project$Demo$ButtonDemoClick('Primary'),
																	A2($author$project$Button$withText, 'Primary', $author$project$Button$view))))))),
												A2(
												$author$project$Demo$buttonWithSizeLabel,
												'Button.Medium',
												$author$project$Button$toHtml(
													A2(
														$author$project$Button$withSize,
														$author$project$Button$Medium,
														$author$project$Button$withSecondaryStyle(
															A2(
																$author$project$Button$withDisabled,
																false,
																A2(
																	$author$project$Button$withMsg,
																	$author$project$Demo$ButtonDemoClick('Secondary'),
																	A2($author$project$Button$withText, 'Secondary', $author$project$Button$view))))))),
												A2(
												$author$project$Demo$buttonWithSizeLabel,
												'Button.Small',
												$author$project$Button$toHtml(
													A2(
														$author$project$Button$withSize,
														$author$project$Button$Small,
														$author$project$Button$withNegativeStyle(
															A2(
																$author$project$Button$withDisabled,
																false,
																A2(
																	$author$project$Button$withMsg,
																	$author$project$Demo$ButtonDemoClick('Negative'),
																	A2($author$project$Button$withText, 'Negative', $author$project$Button$view))))))),
												A2(
												$author$project$Demo$buttonWithSizeLabel,
												'Button.Medium',
												$author$project$Button$toHtml(
													A2(
														$author$project$Button$withSize,
														$author$project$Button$Medium,
														$author$project$Button$withLinkStyle(
															A2(
																$author$project$Button$withDisabled,
																false,
																A2(
																	$author$project$Button$withMsg,
																	$author$project$Demo$ButtonDemoClick('Link'),
																	A2($author$project$Button$withText, 'Link style', $author$project$Button$view))))))),
												A2(
												$author$project$Demo$buttonWithSizeLabel,
												'Button.Large',
												$author$project$Button$toHtml(
													$author$project$Button$withPrimaryStyle(
														A2(
															$author$project$Button$withDisabled,
															true,
															A2(
																$author$project$Button$withMsg,
																$author$project$Demo$ButtonDemoClick('Disabled'),
																A2($author$project$Button$withText, 'Disabled', $author$project$Button$view)))))),
												A2(
												$author$project$Demo$buttonWithSizeLabel,
												'Button.Large',
												$author$project$Button$toHtml(
													A2(
														$author$project$Button$withTargetBlank,
														true,
														$author$project$Button$withSecondaryStyle(
															A2(
																$author$project$Button$withDisabled,
																false,
																A2(
																	$author$project$Button$withUrl,
																	'https://elm-lang.org',
																	A2($author$project$Button$withText, 'External link', $author$project$Button$view))))))),
												A2(
												$author$project$Demo$buttonWithSizeLabel,
												'Button.Large',
												$author$project$Button$toHtml(
													A2(
														$author$project$Button$withIcon,
														_List_fromArray(
															[
																A2($author$project$Icon$check, '', $author$project$Icon$Small)
															]),
														$author$project$Button$withPrimaryStyle(
															A2(
																$author$project$Button$withDisabled,
																false,
																A2(
																	$author$project$Button$withMsg,
																	$author$project$Demo$ButtonDemoClick('Save with icon'),
																	A2($author$project$Button$withText, 'Save', $author$project$Button$view)))))))
											])),
										$author$project$Demo$demoClickCaption(model.lastButtonDemoClick)
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Hero size')
											])),
										A2(
										$author$project$Demo$buttonWithSizeLabel,
										'Button.Hero',
										$author$project$Button$toHtml(
											A2(
												$author$project$Button$withSize,
												$author$project$Button$Hero,
												$author$project$Button$withPrimaryStyle(
													A2(
														$author$project$Button$withDisabled,
														false,
														A2(
															$author$project$Button$withMsg,
															$author$project$Demo$ButtonDemoClick('Hero'),
															A2($author$project$Button$withText, 'Continue', $author$project$Button$view)))))))
									])),
								A2(
								$elm$html$Html$div,
								_List_fromArray(
									[
										$elm$html$Html$Attributes$class('flex flex-col gap-2')
									]),
								_List_fromArray(
									[
										A2(
										$elm$html$Html$h3,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-lg')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text('Tab group (Button.viewTabs)')
											])),
										A5(
										$author$project$Button$viewTabs,
										'demoTabs',
										$author$project$Demo$SetDemoTab,
										_List_fromArray(
											['Annual review', 'Quarterly', 'Monthly']),
										model.demoTabSelection,
										$elm$core$Dict$empty),
										A2(
										$elm$html$Html$p,
										_List_fromArray(
											[
												$elm$html$Html$Attributes$class('text-sm text-gray-600')
											]),
										_List_fromArray(
											[
												$elm$html$Html$text(
												'Selected: ' + A2($elm$core$Maybe$withDefault, '(none)', model.demoTabSelection))
											]))
									]))
							]))
					])),
				A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('flex flex-col items-center gap-8 mt-10 w-full max-w-5xl px-4 pb-32')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$h2,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('text-lg font-bold')
							]),
						_List_fromArray(
							[
								$elm$html$Html$text('Icons')
							])),
						A2(
						$elm$html$Html$div,
						_List_fromArray(
							[
								$elm$html$Html$Attributes$class('w-full flex flex-col gap-10')
							]),
						_List_fromArray(
							[
								$author$project$Demo$iconSizeReference,
								A2(
								$author$project$Demo$iconGridSection,
								'Svg · status (fixed size)',
								_List_fromArray(
									[
										_Utils_Tuple2('Icon.notStarted', $author$project$Icon$notStarted),
										_Utils_Tuple2('Icon.pending', $author$project$Icon$pending),
										_Utils_Tuple2('Icon.inProgress', $author$project$Icon$inProgress),
										_Utils_Tuple2('Icon.underReview', $author$project$Icon$underReview),
										_Utils_Tuple2('Icon.awaitingAction', $author$project$Icon$awaitingAction),
										_Utils_Tuple2('Icon.completed', $author$project$Icon$completed),
										_Utils_Tuple2('Icon.overdue', $author$project$Icon$overdue),
										_Utils_Tuple2('Icon.notApplicable', $author$project$Icon$notApplicable)
									])),
								A2(
								$author$project$Demo$iconGridSection,
								'Html · stroke / size',
								_List_fromArray(
									[
										_Utils_Tuple2(
										'Icon.warning',
										A2($author$project$Icon$warning, '', $author$project$Icon$Medium)),
										_Utils_Tuple2(
										'Icon.business',
										A2($author$project$Icon$business, '', $author$project$Icon$Medium)),
										_Utils_Tuple2(
										'Icon.chat',
										A2($author$project$Icon$chat, '', $author$project$Icon$Medium)),
										_Utils_Tuple2(
										'Icon.infoCircle',
										A2($author$project$Icon$infoCircle, '', $author$project$Icon$Medium)),
										_Utils_Tuple2(
										'Icon.search',
										A2($author$project$Icon$search, '', $author$project$Icon$Medium)),
										_Utils_Tuple2(
										'Icon.arrowRight',
										A2($author$project$Icon$arrowRight, '', $author$project$Icon$Medium)),
										_Utils_Tuple2(
										'Icon.download',
										A2($author$project$Icon$download, '', $author$project$Icon$Medium)),
										_Utils_Tuple2(
										'Icon.attach',
										A2($author$project$Icon$attach, '', $author$project$Icon$Medium))
									])),
								A2(
								$author$project$Demo$iconGridSection,
								'Html · stroke only',
								_List_fromArray(
									[
										_Utils_Tuple2(
										'Icon.location',
										$author$project$Icon$location('')),
										_Utils_Tuple2(
										'Icon.world',
										$author$project$Icon$world('')),
										_Utils_Tuple2(
										'Icon.eye',
										$author$project$Icon$eye('')),
										_Utils_Tuple2(
										'Icon.upload',
										$author$project$Icon$upload(''))
									])),
								A2(
								$author$project$Demo$iconGridSection,
								'Html · no args',
								_List_fromArray(
									[
										_Utils_Tuple2('Icon.arrowDown', $author$project$Icon$arrowDown),
										_Utils_Tuple2('Icon.arrowUp', $author$project$Icon$arrowUp),
										_Utils_Tuple2('Icon.arrowLeft', $author$project$Icon$arrowLeft),
										_Utils_Tuple2('Icon.arrowBack', $author$project$Icon$arrowBack),
										_Utils_Tuple2('Icon.defaultUser', $author$project$Icon$defaultUser)
									])),
								A2(
								$author$project$Demo$iconGridSection,
								'Svg · fill string',
								_List_fromArray(
									[
										_Utils_Tuple2(
										'Icon.calendar',
										$author$project$Icon$calendar('')),
										_Utils_Tuple2(
										'Icon.mail',
										$author$project$Icon$mail('')),
										_Utils_Tuple2(
										'Icon.phone',
										$author$project$Icon$phone('')),
										_Utils_Tuple2(
										'Icon.settings',
										$author$project$Icon$settings('')),
										_Utils_Tuple2(
										'Icon.filter',
										$author$project$Icon$filter('')),
										_Utils_Tuple2(
										'Icon.menuOnLeft',
										$author$project$Icon$menuOnLeft('')),
										_Utils_Tuple2(
										'Icon.menuOnTop',
										$author$project$Icon$menuOnTop('')),
										_Utils_Tuple2(
										'Icon.minimize',
										$author$project$Icon$minimize('')),
										_Utils_Tuple2(
										'Icon.columns',
										$author$project$Icon$columns('')),
										_Utils_Tuple2(
										'Icon.export',
										$author$project$Icon$export('')),
										_Utils_Tuple2(
										'Icon.reset',
										$author$project$Icon$reset('')),
										_Utils_Tuple2(
										'Icon.expand',
										$author$project$Icon$expand('')),
										_Utils_Tuple2(
										'Icon.reload',
										$author$project$Icon$reload('')),
										_Utils_Tuple2(
										'Icon.pin',
										$author$project$Icon$pin(''))
									])),
								A2(
								$author$project$Demo$iconGridSection,
								'Svg · fill (or stroke) and size',
								_List_fromArray(
									[
										_Utils_Tuple2(
										'Icon.assessment',
										A2($author$project$Icon$assessment, '', $author$project$Icon$Medium)),
										_Utils_Tuple2(
										'Icon.check',
										A2($author$project$Icon$check, '', $author$project$Icon$Medium)),
										_Utils_Tuple2(
										'Icon.switch',
										A2($author$project$Icon$switch, '', $author$project$Icon$Medium)),
										_Utils_Tuple2(
										'Icon.pencilOnPaper',
										A2($author$project$Icon$pencilOnPaper, '', $author$project$Icon$Medium)),
										_Utils_Tuple2(
										'Icon.close',
										A2($author$project$Icon$close, '', $author$project$Icon$Medium)),
										_Utils_Tuple2(
										'Icon.home',
										A2($author$project$Icon$home, '', $author$project$Icon$Medium)),
										_Utils_Tuple2(
										'Icon.trash',
										A2($author$project$Icon$trash, '', $author$project$Icon$Medium)),
										_Utils_Tuple2(
										'Icon.lightbulb',
										A2($author$project$Icon$lightbulb, '', $author$project$Icon$Medium)),
										_Utils_Tuple2(
										'Icon.connect',
										A2($author$project$Icon$connect, '', $author$project$Icon$Medium))
									]))
							]))
					]))
			]));
};
var $author$project$Demo$main = $elm$browser$Browser$element(
	{
		init: function (_v0) {
			return _Utils_Tuple2(
				$author$project$Demo$initialModel,
				A2(
					$elm$core$Task$perform,
					$author$project$Demo$GotClock,
					A3($elm$core$Task$map2, $elm$core$Tuple$pair, $elm$time$Time$here, $elm$time$Time$now)));
		},
		subscriptions: $author$project$Demo$subscriptions,
		update: $author$project$Demo$update,
		view: $author$project$Demo$view
	});
_Platform_export({'Demo':{'init':$author$project$Demo$main(
	$elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));