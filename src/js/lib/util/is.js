const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent || navigator.vendor || window.opera);

const is = {
  'object': (o) => typeof o === 'object',

  'array': (o) => o instanceof Array,

  'date': (o) => o instanceof Date,

  'defined': (o) => o !== null && o !== undefined,

  'number': (o) => !isNaN(parseFloat(o)) && isFinite(o),

  'string': (o) => typeof o === 'string',

  'function': (o) => typeof o === 'function',

  'node': (o)  => o instanceof Node,

  'inside': (o, search) => o.indexOf(search) >= 0,

  'strNotEmpty': (string) =>
    is.string(string) &&
    string.trim().length > 0,

  'mobile': () => isMobile
};

export default is;
