
var Module = (() => {
  var _scriptName = import.meta.url;
  
  return (
async function(moduleArg = {}) {
  var moduleRtn;

// include: shell.js
// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(moduleArg) => Promise<Module>
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = moduleArg;

// Set up the promise that indicates the Module is initialized
var readyPromiseResolve, readyPromiseReject;
var readyPromise = new Promise((resolve, reject) => {
  readyPromiseResolve = resolve;
  readyPromiseReject = reject;
});
["_memory","_test_string_in","_test_string_out","_test_bytes_in","_test_bytes_out","_test_struct_in","_test_struct_out","_push_transform","_pop_transform","_reset_transform","_translate","_rotate","_rotate_at","_scale","_scale_at","_set_blend_mode","_reset_blend_mode","_set_color","_reset_color","_set_image","_unset_image","_reset_image","_viewport","_reset_viewport","_scissor","_reset_scissor","_reset_state","_clear","_draw_points","_draw_point","_draw_lines","_draw_line","_draw_lines_strip","_draw_filled_triangles","_draw_filled_triangle","_draw_filled_triangles_strip","_draw_filled_rects","_draw_filled_rect","_draw_textured_rects","_draw_textured_rect","_draw_outline_circle","_draw_filled_circle","_wasm_host_update","__wasm_host_copy_from_cart","_cart_strlen","_copy_to_cart","___indirect_function_table","__sapp_emsc_onpaste","__sapp_html5_get_ask_leave_site","__sapp_emsc_begin_drop","__sapp_emsc_drop","__sapp_emsc_end_drop","__sapp_emsc_invoke_fetch_cb","___em_lib_deps_sokol_app","_sapp_js_add_beforeunload_listener","_sapp_js_remove_beforeunload_listener","_sapp_js_add_clipboard_listener","_sapp_js_remove_clipboard_listener","_sapp_js_write_clipboard","_sapp_js_add_dragndrop_listeners","_sapp_js_dropped_file_size","_sapp_js_fetch_dropped_file","_sapp_js_remove_dragndrop_listeners","_sapp_js_init","_sapp_js_request_pointerlock","_sapp_js_exit_pointerlock","_sapp_js_set_cursor","_sapp_js_clear_favicon","_sapp_js_set_favicon","_slog_js_log","_main","onRuntimeInitialized"].forEach((prop) => {
  if (!Object.getOwnPropertyDescriptor(readyPromise, prop)) {
    Object.defineProperty(readyPromise, prop, {
      get: () => abort('You are getting ' + prop + ' on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'),
      set: () => abort('You are setting ' + prop + ' on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'),
    });
  }
});

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

// Attempt to auto-detect the environment
var ENVIRONMENT_IS_WEB = typeof window == 'object';
var ENVIRONMENT_IS_WORKER = typeof importScripts == 'function';
// N.b. Electron.js environment is simultaneously a NODE-environment, but
// also a web environment.
var ENVIRONMENT_IS_NODE = typeof process == 'object' && typeof process.versions == 'object' && typeof process.versions.node == 'string' && process.type != 'renderer';
var ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (ENVIRONMENT_IS_NODE) {
  // `require()` is no-op in an ESM module, use `createRequire()` to construct
  // the require()` function.  This is only necessary for multi-environment
  // builds, `-sENVIRONMENT=node` emits a static import declaration instead.
  // TODO: Swap all `require()`'s with `import()`'s?
  const { createRequire } = await import('module');
  let dirname = import.meta.url;
  if (dirname.startsWith("data:")) {
    dirname = '/';
  }
  /** @suppress{duplicate} */
  var require = createRequire(dirname);

}

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)


// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = Object.assign({}, Module);

var arguments_ = [];
var thisProgram = './this.program';
var quit_ = (status, toThrow) => {
  throw toThrow;
};

// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var readAsync, readBinary;

if (ENVIRONMENT_IS_NODE) {
  if (typeof process == 'undefined' || !process.release || process.release.name !== 'node') throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  var nodeVersion = process.versions.node;
  var numericVersion = nodeVersion.split('.').slice(0, 3);
  numericVersion = (numericVersion[0] * 10000) + (numericVersion[1] * 100) + (numericVersion[2].split('-')[0] * 1);
  var minVersion = 160000;
  if (numericVersion < 160000) {
    throw new Error('This emscripten-generated code requires node v16.0.0 (detected v' + nodeVersion + ')');
  }

  // These modules will usually be used on Node.js. Load them eagerly to avoid
  // the complexity of lazy-loading.
  var fs = require('fs');
  var nodePath = require('path');

  // EXPORT_ES6 + ENVIRONMENT_IS_NODE always requires use of import.meta.url,
  // since there's no way getting the current absolute path of the module when
  // support for that is not available.
  if (!import.meta.url.startsWith('data:')) {
    scriptDirectory = nodePath.dirname(require('url').fileURLToPath(import.meta.url)) + '/';
  }

// include: node_shell_read.js
readBinary = (filename) => {
  // We need to re-wrap `file://` strings to URLs. Normalizing isn't
  // necessary in that case, the path should already be absolute.
  filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
  var ret = fs.readFileSync(filename);
  assert(ret.buffer);
  return ret;
};

readAsync = (filename, binary = true) => {
  // See the comment in the `readBinary` function.
  filename = isFileURI(filename) ? new URL(filename) : nodePath.normalize(filename);
  return new Promise((resolve, reject) => {
    fs.readFile(filename, binary ? undefined : 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(binary ? data.buffer : data);
    });
  });
};
// end include: node_shell_read.js
  if (!Module['thisProgram'] && process.argv.length > 1) {
    thisProgram = process.argv[1].replace(/\\/g, '/');
  }

  arguments_ = process.argv.slice(2);

  // MODULARIZE will export the module in the proper place outside, we don't need to export here

  quit_ = (status, toThrow) => {
    process.exitCode = status;
    throw toThrow;
  };

} else
if (ENVIRONMENT_IS_SHELL) {

  if ((typeof process == 'object' && typeof require === 'function') || typeof window == 'object' || typeof importScripts == 'function') throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

} else

// Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  if (ENVIRONMENT_IS_WORKER) { // Check worker, not web, since window could be polyfilled
    scriptDirectory = self.location.href;
  } else if (typeof document != 'undefined' && document.currentScript) { // web
    scriptDirectory = document.currentScript.src;
  }
  // When MODULARIZE, this JS may be executed later, after document.currentScript
  // is gone, so we saved it, and we use it here instead of any other info.
  if (_scriptName) {
    scriptDirectory = _scriptName;
  }
  // blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
  // otherwise, slice off the final part of the url to find the script directory.
  // if scriptDirectory does not contain a slash, lastIndexOf will return -1,
  // and scriptDirectory will correctly be replaced with an empty string.
  // If scriptDirectory contains a query (starting with ?) or a fragment (starting with #),
  // they are removed because they could contain a slash.
  if (scriptDirectory.startsWith('blob:')) {
    scriptDirectory = '';
  } else {
    scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, '').lastIndexOf('/')+1);
  }

  if (!(typeof window == 'object' || typeof importScripts == 'function')) throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  {
// include: web_or_worker_shell_read.js
if (ENVIRONMENT_IS_WORKER) {
    readBinary = (url) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.responseType = 'arraybuffer';
      xhr.send(null);
      return new Uint8Array(/** @type{!ArrayBuffer} */(xhr.response));
    };
  }

  readAsync = (url) => {
    // Fetch has some additional restrictions over XHR, like it can't be used on a file:// url.
    // See https://github.com/github/fetch/pull/92#issuecomment-140665932
    // Cordova or Electron apps are typically loaded from a file:// url.
    // So use XHR on webview if URL is a file URL.
    if (isFileURI(url)) {
      return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = () => {
          if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            resolve(xhr.response);
            return;
          }
          reject(xhr.status);
        };
        xhr.onerror = reject;
        xhr.send(null);
      });
    }
    return fetch(url, { credentials: 'same-origin' })
      .then((response) => {
        if (response.ok) {
          return response.arrayBuffer();
        }
        return Promise.reject(new Error(response.status + ' : ' + response.url));
      })
  };
// end include: web_or_worker_shell_read.js
  }
} else
{
  throw new Error('environment detection error');
}

var out = Module['print'] || console.log.bind(console);
var err = Module['printErr'] || console.error.bind(console);

// Merge back in the overrides
Object.assign(Module, moduleOverrides);
// Free the object hierarchy contained in the overrides, this lets the GC
// reclaim data used.
moduleOverrides = null;
checkIncomingModuleAPI();

// Emit code to handle expected values on the Module object. This applies Module.x
// to the proper local x. This has two benefits: first, we only emit it if it is
// expected to arrive, and second, by using a local everywhere else that can be
// minified.

if (Module['arguments']) arguments_ = Module['arguments'];legacyModuleProp('arguments', 'arguments_');

if (Module['thisProgram']) thisProgram = Module['thisProgram'];legacyModuleProp('thisProgram', 'thisProgram');

// perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message
// Assertions on removed incoming Module JS APIs.
assert(typeof Module['memoryInitializerPrefixURL'] == 'undefined', 'Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['pthreadMainPrefixURL'] == 'undefined', 'Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['cdInitializerPrefixURL'] == 'undefined', 'Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['filePackagePrefixURL'] == 'undefined', 'Module.filePackagePrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['read'] == 'undefined', 'Module.read option was removed');
assert(typeof Module['readAsync'] == 'undefined', 'Module.readAsync option was removed (modify readAsync in JS)');
assert(typeof Module['readBinary'] == 'undefined', 'Module.readBinary option was removed (modify readBinary in JS)');
assert(typeof Module['setWindowTitle'] == 'undefined', 'Module.setWindowTitle option was removed (modify emscripten_set_window_title in JS)');
assert(typeof Module['TOTAL_MEMORY'] == 'undefined', 'Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY');
legacyModuleProp('asm', 'wasmExports');
legacyModuleProp('readAsync', 'readAsync');
legacyModuleProp('readBinary', 'readBinary');
legacyModuleProp('setWindowTitle', 'setWindowTitle');
var IDBFS = 'IDBFS is no longer included by default; build with -lidbfs.js';
var PROXYFS = 'PROXYFS is no longer included by default; build with -lproxyfs.js';
var WORKERFS = 'WORKERFS is no longer included by default; build with -lworkerfs.js';
var FETCHFS = 'FETCHFS is no longer included by default; build with -lfetchfs.js';
var ICASEFS = 'ICASEFS is no longer included by default; build with -licasefs.js';
var JSFILEFS = 'JSFILEFS is no longer included by default; build with -ljsfilefs.js';
var OPFS = 'OPFS is no longer included by default; build with -lopfs.js';

var NODEFS = 'NODEFS is no longer included by default; build with -lnodefs.js';

assert(!ENVIRONMENT_IS_SHELL, 'shell environment detected but not enabled at build time.  Add `shell` to `-sENVIRONMENT` to enable.');

// end include: shell.js

// include: preamble.js
// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

var wasmBinary = Module['wasmBinary'];legacyModuleProp('wasmBinary', 'wasmBinary');

if (typeof WebAssembly != 'object') {
  err('no native wasm support detected');
}

// include: base64Utils.js
// Converts a string of base64 into a byte array (Uint8Array).
function intArrayFromBase64(s) {
  if (typeof ENVIRONMENT_IS_NODE != 'undefined' && ENVIRONMENT_IS_NODE) {
    var buf = Buffer.from(s, 'base64');
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.length);
  }

  var decoded = atob(s);
  var bytes = new Uint8Array(decoded.length);
  for (var i = 0 ; i < decoded.length ; ++i) {
    bytes[i] = decoded.charCodeAt(i);
  }
  return bytes;
}

// If filename is a base64 data URI, parses and returns data (Buffer on node,
// Uint8Array otherwise). If filename is not a base64 data URI, returns undefined.
function tryParseAsDataURI(filename) {
  if (!isDataURI(filename)) {
    return;
  }

  return intArrayFromBase64(filename.slice(dataURIPrefix.length));
}
// end include: base64Utils.js
// Wasm globals

var wasmMemory;

//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS;

// In STRICT mode, we only define assert() when ASSERTIONS is set.  i.e. we
// don't define it at all in release modes.  This matches the behaviour of
// MINIMAL_RUNTIME.
// TODO(sbc): Make this the default even without STRICT enabled.
/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed' + (text ? ': ' + text : ''));
  }
}

// We used to include malloc/free by default in the past. Show a helpful error in
// builds with assertions.
function _free() {
  // Show a helpful error since we used to include free by default in the past.
  abort('free() called but not included in the build - add `_free` to EXPORTED_FUNCTIONS');
}

// Memory management

var HEAP,
/** @type {!Int8Array} */
  HEAP8,
/** @type {!Uint8Array} */
  HEAPU8,
/** @type {!Int16Array} */
  HEAP16,
/** @type {!Uint16Array} */
  HEAPU16,
/** @type {!Int32Array} */
  HEAP32,
/** @type {!Uint32Array} */
  HEAPU32,
/** @type {!Float32Array} */
  HEAPF32,
/** @type {!Float64Array} */
  HEAPF64;

// include: runtime_shared.js
function updateMemoryViews() {
  var b = wasmMemory.buffer;
  Module['HEAP8'] = HEAP8 = new Int8Array(b);
  Module['HEAP16'] = HEAP16 = new Int16Array(b);
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(b);
  Module['HEAPU16'] = HEAPU16 = new Uint16Array(b);
  Module['HEAP32'] = HEAP32 = new Int32Array(b);
  Module['HEAPU32'] = HEAPU32 = new Uint32Array(b);
  Module['HEAPF32'] = HEAPF32 = new Float32Array(b);
  Module['HEAPF64'] = HEAPF64 = new Float64Array(b);
}

// end include: runtime_shared.js
assert(!Module['STACK_SIZE'], 'STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time')

assert(typeof Int32Array != 'undefined' && typeof Float64Array !== 'undefined' && Int32Array.prototype.subarray != undefined && Int32Array.prototype.set != undefined,
       'JS engine does not provide full typed array support');

// If memory is defined in wasm, the user can't provide it, or set INITIAL_MEMORY
assert(!Module['wasmMemory'], 'Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally');
assert(!Module['INITIAL_MEMORY'], 'Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically');

// include: runtime_stack_check.js
// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  var max = _emscripten_stack_get_end();
  assert((max & 3) == 0);
  // If the stack ends at address zero we write our cookies 4 bytes into the
  // stack.  This prevents interference with SAFE_HEAP and ASAN which also
  // monitor writes to address zero.
  if (max == 0) {
    max += 4;
  }
  // The stack grow downwards towards _emscripten_stack_get_end.
  // We write cookies to the final two words in the stack and detect if they are
  // ever overwritten.
  HEAPU32[((max)>>2)] = 0x02135467;
  HEAPU32[(((max)+(4))>>2)] = 0x89BACDFE;
  // Also test the global address 0 for integrity.
  HEAPU32[((0)>>2)] = 1668509029;
}

function checkStackCookie() {
  if (ABORT) return;
  var max = _emscripten_stack_get_end();
  // See writeStackCookie().
  if (max == 0) {
    max += 4;
  }
  var cookie1 = HEAPU32[((max)>>2)];
  var cookie2 = HEAPU32[(((max)+(4))>>2)];
  if (cookie1 != 0x02135467 || cookie2 != 0x89BACDFE) {
    abort(`Stack overflow! Stack cookie has been overwritten at ${ptrToString(max)}, expected hex dwords 0x89BACDFE and 0x2135467, but received ${ptrToString(cookie2)} ${ptrToString(cookie1)}`);
  }
  // Also test the global address 0 for integrity.
  if (HEAPU32[((0)>>2)] != 0x63736d65 /* 'emsc' */) {
    abort('Runtime error: The application has corrupted its heap memory area (address zero)!');
  }
}
// end include: runtime_stack_check.js
var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the main() is called

var runtimeInitialized = false;

function preRun() {
  var preRuns = Module['preRun'];
  if (preRuns) {
    if (typeof preRuns == 'function') preRuns = [preRuns];
    preRuns.forEach(addOnPreRun);
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
  assert(!runtimeInitialized);
  runtimeInitialized = true;

  checkStackCookie();

  
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  checkStackCookie();
  
  callRuntimeCallbacks(__ATMAIN__);
}

function postRun() {
  checkStackCookie();

  var postRuns = Module['postRun'];
  if (postRuns) {
    if (typeof postRuns == 'function') postRuns = [postRuns];
    postRuns.forEach(addOnPostRun);
  }

  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}

function addOnExit(cb) {
}

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}

// include: runtime_math.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc

assert(Math.imul, 'This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.fround, 'This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.clz32, 'This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.trunc, 'This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
// end include: runtime_math.js
// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// Module.preRun (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};

function getUniqueRunDependency(id) {
  var orig = id;
  while (1) {
    if (!runDependencyTracking[id]) return id;
    id = orig + Math.random();
  }
}

function addRunDependency(id) {
  runDependencies++;

  Module['monitorRunDependencies']?.(runDependencies);

  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval != 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(() => {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            err('still waiting on run dependencies:');
          }
          err(`dependency: ${dep}`);
        }
        if (shown) {
          err('(end of list)');
        }
      }, 10000);
    }
  } else {
    err('warning: run dependency added without ID');
  }
}

function removeRunDependency(id) {
  runDependencies--;

  Module['monitorRunDependencies']?.(runDependencies);

  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    err('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}

/** @param {string|number=} what */
function abort(what) {
  Module['onAbort']?.(what);

  what = 'Aborted(' + what + ')';
  // TODO(sbc): Should we remove printing and leave it up to whoever
  // catches the exception?
  err(what);

  ABORT = true;

  // Use a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.
  // FIXME This approach does not work in Wasm EH because it currently does not assume
  // all RuntimeErrors are from traps; it decides whether a RuntimeError is from
  // a trap or not based on a hidden field within the object. So at the moment
  // we don't have a way of throwing a wasm trap from JS. TODO Make a JS API that
  // allows this in the wasm spec.

  // Suppress closure compiler warning here. Closure compiler's builtin extern
  // definition for WebAssembly.RuntimeError claims it takes no arguments even
  // though it can.
  // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure gets fixed.
  /** @suppress {checkTypes} */
  var e = new WebAssembly.RuntimeError(what);

  readyPromiseReject(e);
  // Throw the error whether or not MODULARIZE is set because abort is used
  // in code paths apart from instantiation where an exception is expected
  // to be thrown when abort is called.
  throw e;
}

// include: memoryprofiler.js
// end include: memoryprofiler.js
// show errors on likely calls to FS when it was not included
var FS = {
  error() {
    abort('Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with -sFORCE_FILESYSTEM');
  },
  init() { FS.error() },
  createDataFile() { FS.error() },
  createPreloadedFile() { FS.error() },
  createLazyFile() { FS.error() },
  open() { FS.error() },
  mkdev() { FS.error() },
  registerDevice() { FS.error() },
  analyzePath() { FS.error() },

  ErrnoError() { FS.error() },
};
Module['FS_createDataFile'] = FS.createDataFile;
Module['FS_createPreloadedFile'] = FS.createPreloadedFile;

// include: URIUtils.js
// Prefix of data URIs emitted by SINGLE_FILE and related options.
var dataURIPrefix = 'data:application/octet-stream;base64,';

/**
 * Indicates whether filename is a base64 data URI.
 * @noinline
 */
var isDataURI = (filename) => filename.startsWith(dataURIPrefix);

/**
 * Indicates whether filename is delivered via file protocol (as opposed to http/https)
 * @noinline
 */
var isFileURI = (filename) => filename.startsWith('file://');
// end include: URIUtils.js
function createExportWrapper(name, nargs) {
  return (...args) => {
    assert(runtimeInitialized, `native function \`${name}\` called before runtime initialization`);
    var f = wasmExports[name];
    assert(f, `exported native function \`${name}\` not found`);
    // Only assert for too many arguments. Too few can be valid since the missing arguments will be zero filled.
    assert(args.length <= nargs, `native function \`${name}\` called with ${args.length} args but expects ${nargs}`);
    return f(...args);
  };
}

// include: runtime_exceptions.js
// end include: runtime_exceptions.js
function findWasmBinary() {
    var f = 'data:application/octet-stream;base64,AGFzbQEAAAABvAIuYAF/AGABfwF/YAAAYAJ/fwBgAn9/AX9gAAF/YAN/f38AYAN/f38Bf2AEf39/fwBgBX9/f39/AX9gBX9/f39/AGAEfX19fQBgAn19AGADfX19AGADf35/AX5gBH9/f38Bf2AHf39/f39/fwBgAn98AGABfQF9YAABfGAGf39/f39/AGAIf39/f39/f38AYAl/f39/f39/f38AYAp/f39/f39/f39/AGABfQBgBn19fX19fQBgB39/f39/f38Bf2ABfAF9YAJ8fwF8YAZ/fH9/f38Bf2ACfn8Bf2AEf35+fwBgA39/fQBgBH9/fX8AYAJ+fgF/YAJ+fgF+YAZ/f39/f38Bf2ACfH8Bf2ABfwF8YAJ9fwF/YAF8AXxgA35/fwF/YAF8AX5gAn5+AXxgBH9/fn8BfmAEf35/fwF/ApAgkQEDZW52GV93YXNtX2hvc3RfY29weV9mcm9tX2NhcnQABgNlbnYLY2FydF9zdHJsZW4AAQNlbnYMY29weV90b19jYXJ0AAQDZW52BGV4aXQAAANlbnYQd2FzbV9ob3N0X3VwZGF0ZQACA2Vudg1fX2Fzc2VydF9mYWlsAAgDZW52DHNhcHBfanNfaW5pdAAAA2Vudh9lbXNjcmlwdGVuX2dldF9lbGVtZW50X2Nzc19zaXplAAcDZW52KGVtc2NyaXB0ZW5fc2V0X3Jlc2l6ZV9jYWxsYmFja19vbl90aHJlYWQACQNlbnYhZW1zY3JpcHRlbl9nZXRfZGV2aWNlX3BpeGVsX3JhdGlvABMDZW52ImVtc2NyaXB0ZW5fc2V0X2NhbnZhc19lbGVtZW50X3NpemUABwNlbnYYZW1zY3JpcHRlbl9zZXRfbWFpbl9sb29wAAYDZW52J2Vtc2NyaXB0ZW5fcmVxdWVzdF9hbmltYXRpb25fZnJhbWVfbG9vcAADA2VudhVzYXBwX2pzX2NsZWFyX2Zhdmljb24AAgNlbnYTc2FwcF9qc19zZXRfZmF2aWNvbgAGA2VudgtzbG9nX2pzX2xvZwADA2VudgpnbEdldEVycm9yAAUDZW52EWdsR2VuVmVydGV4QXJyYXlzAAMDZW52EWdsQmluZFZlcnRleEFycmF5AAADZW52DWdsUGl4ZWxTdG9yZWkAAwNlbnYNZ2xHZXRJbnRlZ2VydgADA2VudgxnbEdldFN0cmluZ2kABANlbnYaZ2xEaXNhYmxlVmVydGV4QXR0cmliQXJyYXkAAANlbnYIZ2xFbmFibGUAAANlbnYLZ2xEZXB0aEZ1bmMAAANlbnYLZ2xEZXB0aE1hc2sAAANlbnYJZ2xEaXNhYmxlAAADZW52DWdsU3RlbmNpbEZ1bmMABgNlbnYLZ2xTdGVuY2lsT3AABgNlbnYNZ2xTdGVuY2lsTWFzawAAA2VudhNnbEJsZW5kRnVuY1NlcGFyYXRlAAgDZW52F2dsQmxlbmRFcXVhdGlvblNlcGFyYXRlAAMDZW52DGdsQmxlbmRDb2xvcgALA2VudgtnbENvbG9yTWFzawAIA2Vudg9nbFBvbHlnb25PZmZzZXQADANlbnYLZ2xGcm9udEZhY2UAAANlbnYKZ2xDdWxsRmFjZQAAA2VudgxnbEJpbmRCdWZmZXIAAwNlbnYQZ2xCaW5kQnVmZmVyQmFzZQAGA2Vudg9nbEFjdGl2ZVRleHR1cmUAAANlbnYNZ2xCaW5kVGV4dHVyZQADA2Vudg1nbEJpbmRTYW1wbGVyAAMDZW52D2dsRGVsZXRlQnVmZmVycwADA2VudhBnbERlbGV0ZVRleHR1cmVzAAMDZW52FWdsRGVsZXRlUmVuZGVyYnVmZmVycwADA2VudhBnbERlbGV0ZVNhbXBsZXJzAAMDZW52D2dsRGVsZXRlUHJvZ3JhbQAAA2VudgxnbFVzZVByb2dyYW0AAANlbnYUZ2xEZWxldGVGcmFtZWJ1ZmZlcnMAAwNlbnYUZ2xEZWxldGVWZXJ0ZXhBcnJheXMAAwNlbnYMZ2xHZW5CdWZmZXJzAAMDZW52DGdsQnVmZmVyRGF0YQAIA2Vudg9nbEJ1ZmZlclN1YkRhdGEACANlbnYSZ2xHZW5SZW5kZXJidWZmZXJzAAMDZW52EmdsQmluZFJlbmRlcmJ1ZmZlcgADA2VudiBnbFJlbmRlcmJ1ZmZlclN0b3JhZ2VNdWx0aXNhbXBsZQAKA2Vudg1nbEdlblRleHR1cmVzAAMDZW52D2dsVGV4UGFyYW1ldGVyaQAGA2Vudg5nbFRleFN0b3JhZ2UyRAAKA2Vudg5nbFRleFN0b3JhZ2UzRAAUA2VudhZnbENvbXByZXNzZWRUZXhJbWFnZTJEABUDZW52DGdsVGV4SW1hZ2UyRAAWA2VudhZnbENvbXByZXNzZWRUZXhJbWFnZTNEABYDZW52DGdsVGV4SW1hZ2UzRAAXA2Vudg1nbEdlblNhbXBsZXJzAAMDZW52E2dsU2FtcGxlclBhcmFtZXRlcmkABgNlbnYTZ2xTYW1wbGVyUGFyYW1ldGVyZgAgA2Vudg9nbENyZWF0ZVByb2dyYW0ABQNlbnYOZ2xBdHRhY2hTaGFkZXIAAwNlbnYNZ2xMaW5rUHJvZ3JhbQAAA2Vudg5nbERlbGV0ZVNoYWRlcgAAA2Vudg5nbEdldFByb2dyYW1pdgAGA2VudhNnbEdldFByb2dyYW1JbmZvTG9nAAgDZW52FGdsR2V0VW5pZm9ybUxvY2F0aW9uAAQDZW52C2dsVW5pZm9ybTFpAAMDZW52DmdsQ3JlYXRlU2hhZGVyAAEDZW52DmdsU2hhZGVyU291cmNlAAgDZW52D2dsQ29tcGlsZVNoYWRlcgAAA2Vudg1nbEdldFNoYWRlcml2AAYDZW52EmdsR2V0U2hhZGVySW5mb0xvZwAIA2VudhNnbEdldEF0dHJpYkxvY2F0aW9uAAQDZW52EWdsQmluZEZyYW1lYnVmZmVyAAMDZW52CmdsVmlld3BvcnQACANlbnYJZ2xTY2lzc29yAAgDZW52D2dsQ2xlYXJCdWZmZXJmdgAGA2Vudg9nbENsZWFyQnVmZmVyZmkAIQNlbnYPZ2xDbGVhckJ1ZmZlcml2AAYDZW52FWdsU3RlbmNpbEZ1bmNTZXBhcmF0ZQAIA2VudhNnbFN0ZW5jaWxPcFNlcGFyYXRlAAgDZW52FWdsVmVydGV4QXR0cmliUG9pbnRlcgAUA2VudhVnbFZlcnRleEF0dHJpYkRpdmlzb3IAAwNlbnYZZ2xFbmFibGVWZXJ0ZXhBdHRyaWJBcnJheQAAA2VudgxnbFVuaWZvcm0xZnYABgNlbnYMZ2xVbmlmb3JtMmZ2AAYDZW52DGdsVW5pZm9ybTNmdgAGA2VudgxnbFVuaWZvcm00ZnYABgNlbnYMZ2xVbmlmb3JtMWl2AAYDZW52DGdsVW5pZm9ybTJpdgAGA2VudgxnbFVuaWZvcm0zaXYABgNlbnYMZ2xVbmlmb3JtNGl2AAYDZW52EmdsVW5pZm9ybU1hdHJpeDRmdgAIA2VudhdnbERyYXdFbGVtZW50c0luc3RhbmNlZAAKA2Vudg5nbERyYXdFbGVtZW50cwAIA2VudhVnbERyYXdBcnJheXNJbnN0YW5jZWQACANlbnYMZ2xEcmF3QXJyYXlzAAYDZW52DGdsUmVhZEJ1ZmZlcgAAA2VudhFnbEJsaXRGcmFtZWJ1ZmZlcgAXA2VudhdnbEludmFsaWRhdGVGcmFtZWJ1ZmZlcgAGA2Vudh9lbXNjcmlwdGVuX3dlYmdsX2NyZWF0ZV9jb250ZXh0AAQDZW52JWVtc2NyaXB0ZW5fd2ViZ2xfbWFrZV9jb250ZXh0X2N1cnJlbnQAAQNlbnYhZW1zY3JpcHRlbl93ZWJnbF9lbmFibGVfZXh0ZW5zaW9uAAQDZW52K2Vtc2NyaXB0ZW5fc2V0X21vdXNlZG93bl9jYWxsYmFja19vbl90aHJlYWQACQNlbnYpZW1zY3JpcHRlbl9zZXRfbW91c2V1cF9jYWxsYmFja19vbl90aHJlYWQACQNlbnYrZW1zY3JpcHRlbl9zZXRfbW91c2Vtb3ZlX2NhbGxiYWNrX29uX3RocmVhZAAJA2VudixlbXNjcmlwdGVuX3NldF9tb3VzZWVudGVyX2NhbGxiYWNrX29uX3RocmVhZAAJA2VudixlbXNjcmlwdGVuX3NldF9tb3VzZWxlYXZlX2NhbGxiYWNrX29uX3RocmVhZAAJA2VudidlbXNjcmlwdGVuX3NldF93aGVlbF9jYWxsYmFja19vbl90aHJlYWQACQNlbnYpZW1zY3JpcHRlbl9zZXRfa2V5ZG93bl9jYWxsYmFja19vbl90aHJlYWQACQNlbnYnZW1zY3JpcHRlbl9zZXRfa2V5dXBfY2FsbGJhY2tfb25fdGhyZWFkAAkDZW52KmVtc2NyaXB0ZW5fc2V0X2tleXByZXNzX2NhbGxiYWNrX29uX3RocmVhZAAJA2VudixlbXNjcmlwdGVuX3NldF90b3VjaHN0YXJ0X2NhbGxiYWNrX29uX3RocmVhZAAJA2VuditlbXNjcmlwdGVuX3NldF90b3VjaG1vdmVfY2FsbGJhY2tfb25fdGhyZWFkAAkDZW52KmVtc2NyaXB0ZW5fc2V0X3RvdWNoZW5kX2NhbGxiYWNrX29uX3RocmVhZAAJA2Vudi1lbXNjcmlwdGVuX3NldF90b3VjaGNhbmNlbF9jYWxsYmFja19vbl90aHJlYWQACQNlbnYzZW1zY3JpcHRlbl9zZXRfcG9pbnRlcmxvY2tjaGFuZ2VfY2FsbGJhY2tfb25fdGhyZWFkAAkDZW52MmVtc2NyaXB0ZW5fc2V0X3BvaW50ZXJsb2NrZXJyb3JfY2FsbGJhY2tfb25fdGhyZWFkAAkDZW52J2Vtc2NyaXB0ZW5fc2V0X2ZvY3VzX2NhbGxiYWNrX29uX3RocmVhZAAJA2VudiZlbXNjcmlwdGVuX3NldF9ibHVyX2NhbGxiYWNrX29uX3RocmVhZAAJA2VudiFzYXBwX2pzX2FkZF9iZWZvcmV1bmxvYWRfbGlzdGVuZXIAAgNlbnYec2FwcF9qc19hZGRfY2xpcGJvYXJkX2xpc3RlbmVyAAIDZW52H3NhcHBfanNfYWRkX2RyYWduZHJvcF9saXN0ZW5lcnMAAANlbnYyZW1zY3JpcHRlbl9zZXRfd2ViZ2xjb250ZXh0bG9zdF9jYWxsYmFja19vbl90aHJlYWQACQNlbnY2ZW1zY3JpcHRlbl9zZXRfd2ViZ2xjb250ZXh0cmVzdG9yZWRfY2FsbGJhY2tfb25fdGhyZWFkAAkDZW52GmVtc2NyaXB0ZW5fcGVyZm9ybWFuY2Vfbm93ABMDZW52G2Vtc2NyaXB0ZW5fY2FuY2VsX21haW5fbG9vcAACA2VudhtzYXBwX2pzX3JlcXVlc3RfcG9pbnRlcmxvY2sAAgNlbnYkc2FwcF9qc19yZW1vdmVfYmVmb3JldW5sb2FkX2xpc3RlbmVyAAIDZW52IXNhcHBfanNfcmVtb3ZlX2NsaXBib2FyZF9saXN0ZW5lcgACA2VudiJzYXBwX2pzX3JlbW92ZV9kcmFnbmRyb3BfbGlzdGVuZXJzAAADZW52CV9hYm9ydF9qcwACA2VudhVfZW1zY3JpcHRlbl9tZW1jcHlfanMABhZ3YXNpX3NuYXBzaG90X3ByZXZpZXcxCGZkX2Nsb3NlAAEWd2FzaV9zbmFwc2hvdF9wcmV2aWV3MQhmZF93cml0ZQAPA2VudhZlbXNjcmlwdGVuX3Jlc2l6ZV9oZWFwAAEWd2FzaV9zbmFwc2hvdF9wcmV2aWV3MQdmZF9zZWVrAAkDngScBAINDQEBAgQBAAUDAQAFAgICDBgNDAsAAgsCAwAACAIIAgICAwwDCwMDGQMDCwYGDQ0GAgICAAMDAwAAAwEAAgACAgAAAAAAAAACAAAFBQEBBwQPBAgFAQcFBQUFBAAEAQMABAAEBAAEBAAEBAAEBAQDAwEDBAMDAQMEAwMBAwQDAwEDBAMDAQEDBwQAAAAAAAAAAAAAAQEBAQEBAQEBAQAAAAAAAAMBAAMCBAQBBQAKCgoKCgoAAQAAAAEBAQYHBgYGBgYCAgICAgICAgQiBAYjBgEQAAABAgUEARoFBQMDBgIGAgYCAgICDBgNDAsAAgMCAAILAgMAAAgBBQIIAgICAQokBQUGAwYMAwsDAxkDAwgLBgMGAAcFAAEDBQACAwEIBhUEAAAHAgIAAiUFBQUFBQIBBAMBAQ8FBQUFBQUFBQUFBQUFBQAAEAcHAgIABgACAgICAgIAAAAAAAAAAAAABAAAAAAAAAADAAAABAEBAAMAAQEEAQEBAQAIAQEABAQBAQEHBwQEAwQBBwEBAQEBBAQBAQEBAQEGBAMABwcHBwcHBwcHEQICAgIBAAAAAQIBAQEBARECAgABJhEBAQACGxsJJxIHBwcoBwUAAAcEAQAFAgEHDwQEARIcEgEBBw4OAQ4EAQcHBAQHBAQEBAQEBRwJGgYBCCkeHgoHHQMqAQUFBQIHBAUBAQcAHx8rAAUCBQUFAQABBSwJLQQFAXABGBgFBgEB7gXuBQbGAR1/AUGAgAQLfwFBAAt/AUEAC38BQQALfwBBqO8HC38AQYHwBwt/AEHw8QcLfwBBm/QHC38AQa2jCAt/AEGj9gcLfwBBgvgHC38AQdf4Bwt/AEHb+gcLfwBBovsHC38AQYn/Bwt/AEHziAgLfwBBsooIC38AQYyQCAt/AEGTkwgLfwBBiZYIC38AQZqXCAt/AEHmlwgLfwBB3JwIC38AQdSdCAt/AEHDoQgLfwBBqO8HC38AQa2jCAt/AEGtowgLfwBB0aMICwe0D1YGbWVtb3J5AgARX193YXNtX2NhbGxfY3RvcnMAkQEGbWFsbG9jAJoFDnRlc3Rfc3RyaW5nX2luAJkBD3Rlc3Rfc3RyaW5nX291dACaAQ10ZXN0X2J5dGVzX2luAJsBDnRlc3RfYnl0ZXNfb3V0AJwBDnRlc3Rfc3RydWN0X2luAJ0BD3Rlc3Rfc3RydWN0X291dACeAQ5wdXNoX3RyYW5zZm9ybQCfAQ1wb3BfdHJhbnNmb3JtAKABD3Jlc2V0X3RyYW5zZm9ybQChAQl0cmFuc2xhdGUAogEGcm90YXRlAKMBCXJvdGF0ZV9hdACkAQVzY2FsZQClAQhzY2FsZV9hdACmAQ5zZXRfYmxlbmRfbW9kZQCnARByZXNldF9ibGVuZF9tb2RlAKgBCXNldF9jb2xvcgCpAQtyZXNldF9jb2xvcgCqAQlzZXRfaW1hZ2UAqwELdW5zZXRfaW1hZ2UArAELcmVzZXRfaW1hZ2UArQEIdmlld3BvcnQArgEOcmVzZXRfdmlld3BvcnQArwEHc2Npc3NvcgCwAQ1yZXNldF9zY2lzc29yALEBC3Jlc2V0X3N0YXRlALIBBWNsZWFyALMBC2RyYXdfcG9pbnRzALQBCmRyYXdfcG9pbnQAtQEKZHJhd19saW5lcwC2AQlkcmF3X2xpbmUAtwEQZHJhd19saW5lc19zdHJpcAC4ARVkcmF3X2ZpbGxlZF90cmlhbmdsZXMAuQEUZHJhd19maWxsZWRfdHJpYW5nbGUAugEbZHJhd19maWxsZWRfdHJpYW5nbGVzX3N0cmlwALsBEWRyYXdfZmlsbGVkX3JlY3RzALwBEGRyYXdfZmlsbGVkX3JlY3QAvQETZHJhd190ZXh0dXJlZF9yZWN0cwC+ARJkcmF3X3RleHR1cmVkX3JlY3QAvwETZHJhd19vdXRsaW5lX2NpcmNsZQDAARJkcmF3X2ZpbGxlZF9jaXJjbGUAwQEZX19lbV9qc19fd2FzbV9ob3N0X3VwZGF0ZQMEIl9fZW1fanNfX193YXNtX2hvc3RfY29weV9mcm9tX2NhcnQDBRRfX2VtX2pzX19jYXJ0X3N0cmxlbgMGFV9fZW1fanNfX2NvcHlfdG9fY2FydAMHGV9faW5kaXJlY3RfZnVuY3Rpb25fdGFibGUBABJfc2FwcF9lbXNjX29ucGFzdGUApwMeX3NhcHBfaHRtbDVfZ2V0X2Fza19sZWF2ZV9zaXRlAK0DFV9zYXBwX2Vtc2NfYmVnaW5fZHJvcACuAw9fc2FwcF9lbXNjX2Ryb3AAsAMTX3NhcHBfZW1zY19lbmRfZHJvcACzAxpfc2FwcF9lbXNjX2ludm9rZV9mZXRjaF9jYgC0AxBfX21haW5fYXJnY19hcmd2ALUDF19fZW1fbGliX2RlcHNfc29rb2xfYXBwAwgqX19lbV9qc19fc2FwcF9qc19hZGRfYmVmb3JldW5sb2FkX2xpc3RlbmVyAwktX19lbV9qc19fc2FwcF9qc19yZW1vdmVfYmVmb3JldW5sb2FkX2xpc3RlbmVyAwonX19lbV9qc19fc2FwcF9qc19hZGRfY2xpcGJvYXJkX2xpc3RlbmVyAwsqX19lbV9qc19fc2FwcF9qc19yZW1vdmVfY2xpcGJvYXJkX2xpc3RlbmVyAwwgX19lbV9qc19fc2FwcF9qc193cml0ZV9jbGlwYm9hcmQDDShfX2VtX2pzX19zYXBwX2pzX2FkZF9kcmFnbmRyb3BfbGlzdGVuZXJzAw4iX19lbV9qc19fc2FwcF9qc19kcm9wcGVkX2ZpbGVfc2l6ZQMPI19fZW1fanNfX3NhcHBfanNfZmV0Y2hfZHJvcHBlZF9maWxlAxArX19lbV9qc19fc2FwcF9qc19yZW1vdmVfZHJhZ25kcm9wX2xpc3RlbmVycwMRFV9fZW1fanNfX3NhcHBfanNfaW5pdAMSJF9fZW1fanNfX3NhcHBfanNfcmVxdWVzdF9wb2ludGVybG9jawMTIV9fZW1fanNfX3NhcHBfanNfZXhpdF9wb2ludGVybG9jawMUG19fZW1fanNfX3NhcHBfanNfc2V0X2N1cnNvcgMVHl9fZW1fanNfX3NhcHBfanNfY2xlYXJfZmF2aWNvbgMWHF9fZW1fanNfX3NhcHBfanNfc2V0X2Zhdmljb24DFxRfX2VtX2pzX19zbG9nX2pzX2xvZwMYBmZmbHVzaACmBRVlbXNjcmlwdGVuX3N0YWNrX2luaXQAogUZZW1zY3JpcHRlbl9zdGFja19nZXRfZnJlZQCjBRllbXNjcmlwdGVuX3N0YWNrX2dldF9iYXNlAKQFGGVtc2NyaXB0ZW5fc3RhY2tfZ2V0X2VuZAClBRlfZW1zY3JpcHRlbl9zdGFja19yZXN0b3JlAKcFF19lbXNjcmlwdGVuX3N0YWNrX2FsbG9jAKgFHGVtc2NyaXB0ZW5fc3RhY2tfZ2V0X2N1cnJlbnQAqQUNX19zdGFydF9lbV9qcwMZDF9fc3RvcF9lbV9qcwMaE19fc3RhcnRfZW1fbGliX2RlcHMDGxJfX3N0b3BfZW1fbGliX2RlcHMDHAxkeW5DYWxsX2ppamkAqwUJNAEAQQELF8MBxAHFAdoDuAO8A70D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lAFBCCGVASCUASCVAWohlgFBPCGXASCWASCXAWohmAEgAygCICGZAUEMIZoBIJkBIJoBbCGbASCYASCbAWohnAEgAyCcATYCFCADKAIkIZ0BIAMoAiAhngEgnQEgngEQvAIhnwEgAyCfATYCECADKAIQIaABQQAhoQEgoAEgoQFHIaIBQQEhowEgogEgowFxIaQBAkAgpAFFDQAgAygCECGlASClASgCBCGmAUECIacBIKYBIKcBRiGoAUEBIakBIKgBIKkBcSGqAQJAIKoBDQBBxQEhqwFBACGsASCsASCrATYC+KQIQcUBIa0BQQEhrgFBACGvAUHLggEhsAEgrQEgrgEgrwEgsAEQ5QELIAMoAhAhsQEgsQEoAgAhsgEgAygCFCGzASCzASgCACG0ASCyASC0AUYhtQFBASG2ASC1ASC2AXEhtwECQCC3AQ0AQcUBIbgBQQAhuQEguQEguAE2AvikCEHFASG6AUEBIbsBQQAhvAFBzIIBIb0BILoBILsBILwBIL0BEOUBCwsgAygCICG+AUEBIb8BIL4BIL8BaiHAASADIMABNgIgDAALAAsgAygCJCHBASDBARC9AiHCASADIMIBNgIMIAMoAgwhwwFBACHEASDDASDEAUchxQFBASHGASDFASDGAXEhxwECQCDHAUUNACADKAIkIcgBQQghyQEgyAEgyQFqIcoBQewAIcsBIMoBIMsBaiHMASADIMwBNgIIIAMoAgwhzQEgzQEoAgQhzgFBAiHPASDOASDPAUYh0AFBASHRASDQASDRAXEh0gECQCDSAQ0AQcYBIdMBQQAh1AEg1AEg0wE2AvikCEHGASHVAUEBIdYBQQAh1wFB0oIBIdgBINUBINYBINcBINgBEOUBCyADKAIMIdkBINkBKAIAIdoBIAMoAggh2wEg2wEoAgAh3AEg2gEg3AFGId0BQQEh3gEg3QEg3gFxId8BAkAg3wENAEHGASHgAUEAIeEBIOEBIOABNgL4pAhBxgEh4gFBASHjAUEAIeQBQdOCASHlASDiASDjASDkASDlARDlAQsLDAELIAMoAiQh5gFBACHnASDmASDnAUch6AFBASHpASDoASDpAXEh6gECQCDqAQ0AQcIBIesBQQAh7AEg7AEg6wE2AvikCEHCASHtAUEBIe4BQQAh7wFB1oIBIfABIO0BIO4BIO8BIPAB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CQoLDA0ODxAREgsgAiACKAIAIgFBBGo2AgAgACABKAIANgIADwsgAiACKAIAIgFBBGo2AgAgACABNAIANwMADwsgAiACKAIAIgFBBGo2AgAgACABNQIANwMADwsgAiACKAIAIgFBBGo2AgAgACABNAIANwMADwsgAiACKAIAIgFBBGo2AgAgACABNQIANwMADwsgAiACKAIAQQdqQXhxIgFBCGo2AgAgACABKQMANwMADwsgAiACKAIAIgFBBGo2AgAgACABMgEANwMADwsgAiACKAIAIgFBBGo2AgAgACABMwEANwMADwsgAiACKAIAIgFBBGo2AgAgACABMAAANwMADwsgAiACKAIAIgFBBGo2AgAgACABMQAANwMADwsgAiACKAIAQQdqQXhxIgFBCGo2AgAgACABKQMANwMADwsgAiACKAIAIgFBBGo2AgAgACABNQIANwMADwsgAiACKAIAQQdqQXhxIgFBCGo2AgAgACABKQMANwMADwsgAiACKAIAQQdqQXhxIgFBCGo2AgAgACABKQMANwMADwsgAiACKAIAIgFBBGo2AgAgACABNAIANwMADwsgAiACKAIAIgFBBGo2AgAgACABNQIANwMADwsgAiACKAIAQQdqQXhxIgFBCGo2AgAgACABKwMAOQMADwsgACACIAMRAwALCz4BAX8CQCAAUA0AA0AgAUF/aiIBIACnQQ9xQfDZB2otAAAgAnI6AAAgAEIPViEDIABCBIghACADDQALCyABCzYBAX8CQCAAUA0AA0AgAUF/aiIBIACnQQdxQTByOgAAIABCB1YhAiAAQgOIIQAgAg0ACwsgAQuKAQIBfgN/AkACQCAAQoCAgIAQWg0AIAAhAgwBCwNAIAFBf2oiASAAIABCCoAiAkIKfn2nQTByOgAAIABC/////58BViEDIAIhACADDQALCwJAIAJQDQAgAqchAwNAIAFBf2oiASADIANBCm4iBEEKbGtBMHI6AAAgA0EJSyEFIAQhAyAFDQALCyABC28BAX8jAEGAAmsiBSQAAkAgAiADTA0AIARBgMAEcQ0AIAUgASACIANrIgNBgAIgA0GAAkkiAhsQ2QQaAkAgAg0AA0AgACAFQYACEIYFIANBgH5qIgNB/wFLDQALCyAAIAUgAxCGBQsgBUGAAmokAAsPACAAIAEgAkEWQRcQhAULjxkD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IgFBfyABGzYC2N0JCwtTAQF+AkACQCADQcAAcUUNACABIANBQGqthiECQgAhAQwBCyADRQ0AIAFBwAAgA2utiCACIAOtIgSGhCECIAEgBIYhAQsgACABNwMAIAAgAjcDCAtTAQF+AkACQCADQcAAcUUNACACIANBQGqtiCEBQgAhAgwBCyADRQ0AIAJBwAAgA2uthiABIAOtIgSIhCEBIAIgBIghAgsgACABNwMAIAAgAjcDCAuQBAIFfwJ+IwBBIGsiAiQAIAFC////////P4MhBwJAAkAgAUIwiEL//wGDIginIgNB/4d/akH9D0sNACAAQjyIIAdCBIaEIQcgA0GAiH9qrSEIAkACQCAAQv//////////D4MiAEKBgICAgICAgAhUDQAgB0IBfCEHDAELIABCgICAgICAgIAIUg0AIAdCAYMgB3whBwtCACAHIAdC/////////wdWIgMbIQAgA60gCHwhBwwBCwJAIAAgB4RQDQAgCEL//wFSDQAgAEI8iCAHQgSGhEKAgICAgICABIQhAEL/DyEHDAELAkAgA0H+hwFNDQBC/w8hB0IAIQAMAQsCQEGA+ABBgfgAIAhQIgQbIgUgA2siBkHwAEwNAEIAIQBCACEHDAELIAJBEGogACAHIAdCgICAgICAwACEIAQbIgdBgAEgBmsQnQUgAiAAIAcgBhCeBSACKQMAIgdCPIggAkEIaikDAEIEhoQhAAJAAkAgB0L//////////w+DIAUgA0cgAikDECACQRBqQQhqKQMAhEIAUnGthCIHQoGAgICAgICACFQNACAAQgF8IQAMAQsgB0KAgICAgICAgAhSDQAgAEIBgyAAfCEACyAAQoCAgICAgIAIhSAAIABC/////////wdWIgMbIQAgA60hBwsgAkEgaiQAIAdCNIYgAUKAgICAgICAgIB/g4QgAIS/CwYAIAAkAQsEACMBCxIAQYCABCQDQQBBD2pBcHEkAgsHACMAIwJrCwQAIwMLBAAjAgvIAgEDfwJAIAANAEEAIQECQEEAKAKg7wdFDQBBACgCoO8HEKYFIQELAkBBACgCiO4HRQ0AQQAoAojuBxCmBSABciEBCwJAEOMEKAIAIgBFDQADQAJAAkAgACgCTEEATg0AQQEhAgwBCyAAEOEERSECCwJAIAAoAhQgACgCHEYNACAAEKYFIAFyIQELAkAgAg0AIAAQ4gQLIAAoAjgiAA0ACwsQ5AQgAQ8LAkACQCAAKAJMQQBODQBBASECDAELIAAQ4QRFIQILAkACQAJAIAAoAhQgACgCHEYNACAAQQBBACAAKAIkEQcAGiAAKAIUDQBBfyEBIAJFDQEMAgsCQCAAKAIEIgEgACgCCCIDRg0AIAAgASADa6xBASAAKAIoEQ4AGgtBACEBIABBADYCHCAAQgA3AxAgAEIANwIEIAINAQsgABDiBAsgAQsGACAAJAALEgECfyMAIABrQXBxIgEkACABCwQAIwALDQAgASACIAMgABEOAAslAQF+IAAgASACrSADrUIghoQgBBCqBSEFIAVCIIinEKAFIAWnCxQAIAAgAacgAUIgiKcgAiADEJABCwvyowQEAEGAgAQLgNoDQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05MT1dNRU1PUlk6IE5hdGl2ZUFjdGl2aXR5IG9uTG93TWVtb3J5AF9zYXBwX3N0cmNweQBfc2dfc3RyY3B5AEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OREVTVFJPWTogTmF0aXZlQWN0aXZpdHkgb25EZXN0cm95AE51bXBhZE11bHRpcGx5AF9zZ19zbG90X2luZGV4AHBvb2wtPmZyZWVfcXVldWVbaV0gIT0gc2xvdF9pbmRleAAoMCkgIT0gc2xvdF9pbmRleABidWYtPmNtbi51cGRhdGVfZnJhbWVfaW5kZXggIT0gX3NnLmZyYW1lX2luZGV4AF9zZ19wb29sX2ZyZWVfaW5kZXgAX3NnX2dsX3N0b3JhZ2VidWZmZXJfYmluZF9pbmRleABfc2dfcG9vbF9hbGxvY19pbmRleABfc2cuZ2wuY2FjaGUuY3VyX3BpcGVsaW5lLT5zaGFkZXItPmNtbi5zdGFnZVtzdGFnZV9pbmRleF0ubnVtX3VuaWZvcm1fYmxvY2tzID4gdWJfaW5kZXgALSsgICAwWDB4AC0wWCswWCAwWC0weCsweCAweABzZ19xdWVyeV9idWZmZXJfb3ZlcmZsb3cAU0dQIHZlcnRpY2VzIGJ1ZmZlciBvdmVyZmxvdwBTR1AgdHJhbnNmb3JtIHN0YWNrIG92ZXJmbG93AFNHUCBzdGF0ZSBzdGFjayBvdmVyZmxvdwBTR1AgdHJhbnNmb3JtIHN0YWNrIHVuZGVyZmxvdwBTR1Agc3RhdGUgc3RhY2sgdW5kZXJmbG93AFdJTjMyX0NSRUFURV9IRUxQRVJfV0lORE9XX0ZBSUxFRDogZmFpbGVkIHRvIGNyZWF0ZSBoZWxwZXIgd2luZG93AHNhcHBfd2dwdV9nZXRfcmVuZGVyX3ZpZXcAc2FwcF9kM2QxMV9nZXRfcmVuZGVyX3ZpZXcAc2FwcF93Z3B1X2dldF9kZXB0aF9zdGVuY2lsX3ZpZXcAc2FwcF9kM2QxMV9nZXRfZGVwdGhfc3RlbmNpbF92aWV3AHNhcHBfd2dwdV9nZXRfcmVzb2x2ZV92aWV3AHNhcHBfZDNkMTFfZ2V0X3Jlc29sdmVfdmlldwBfc2dfZ2xfZHJhdwBzZ19kcmF3AHNhcHBfZDNkMTFfZ2V0X2RldmljZV9jb250ZXh0AFdJTjMyX0RVTU1ZX0NPTlRFWFRfU0VUX1BJWEVMRk9STUFUX0ZBSUxFRDogZmFpbGVkIHRvIHNldCBwaXhlbCBmb3JtYXQgZm9yIGR1bW15IEdMIGNvbnRleHQAV0lOMzJfQ1JFQVRFX0RVTU1ZX0NPTlRFWFRfRkFJTEVEOiBmYWlsZWQgdG8gY3JlYXRlIGR1bW15IEdMIGNvbnRleHQAX3NhcHBfdGltaW5nX3B1dABWQUxJREFURV9TSEFERVJERVNDX1VCX1NURDE0MF9BUlJBWV9UWVBFOiB1bmlmb3JtIGFycmF5cyBvbmx5IGFsbG93ZWQgZm9yIEZMT0FUNCwgSU5UNCwgTUFUNCBpbiBzdGQxNDAgbGF5b3V0AGRzdABzZ19hcHBseV92aWV3cG9ydABzZ3BfcmVzZXRfdmlld3BvcnQAc2dwX3ZpZXdwb3J0AEluc2VydABfc2dfcmVzZXRfc2xvdABWQUxJREFURV9BVUJfTk9fVUJfQVRfU0xPVDogc2dfYXBwbHlfdW5pZm9ybXM6IG5vIHVuaWZvcm0gYmxvY2sgZGVjbGFyYXRpb24gYXQgdGhpcyBzaGFkZXIgc3RhZ2UgVUIgc2xvdABfc2dwX2dldF9waXBlbGluZV91bmlmb3JtX2NvdW50AFZBTElEQVRFX0FQSVBfU0FNUExFX0NPVU5UOiBzZ19hcHBseV9waXBlbGluZTogcGlwZWxpbmUgTVNBQSBzYW1wbGUgY291bnQgZG9lc24ndCBtYXRjaCByZW5kZXIgcGFzcyBhdHRhY2htZW50IHNhbXBsZSBjb3VudABWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfREVQVEhfSU1BR0VfU0FNUExFX0NPVU5UOiBwYXNzIGRlcHRoIGF0dGFjaG1lbnQgc2FtcGxlIGNvdW50IG11c3QgbWF0Y2ggY29sb3IgYXR0YWNobWVudCBzYW1wbGUgY291bnQAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0lNQUdFX1NBTVBMRV9DT1VOVFM6IGFsbCBwYXNzIGF0dGFjaG1lbnRzIG11c3QgaGF2ZSB0aGUgc2FtZSBzYW1wbGUgY291bnQAV0lOMzJfRFVNTVlfQ09OVEVYVF9NQUtFX0NVUlJFTlRfRkFJTEVEOiBmYWlsZWQgdG8gbWFrZSBkdW1teSBHTCBjb250ZXh0IGN1cnJlbnQAX3NnX3VuaWZvcm1fYWxpZ25tZW50AF9zZ19zaGFkZXJfY29tbW9uX2luaXQAX3NnX3BpcGVsaW5lX2NvbW1vbl9pbml0AHNnX2NvbW1pdABBcnJvd1JpZ2h0AEFsdFJpZ2h0AFNoaWZ0UmlnaHQAQnJhY2tldFJpZ2h0AENvbnRyb2xSaWdodABNZXRhUmlnaHQAQXJyb3dMZWZ0AEFsdExlZnQAU2hpZnRMZWZ0AEJyYWNrZXRMZWZ0AENvbnRyb2xMZWZ0AE1ldGFMZWZ0AFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRVhQRUNUX0NPTE9SRk9STUFUX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uY29sb3JfZm9ybWF0IHRvIGJlIHVuc2V0AFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRVhQRUNUX0RFUFRIRk9STUFUX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uZGVwdGhfZm9ybWF0IHRvIGJlIHVuc2V0AHViX2Rlc2MtPnNpemUgPT0gKHNpemVfdCljdXJfdW5pZm9ybV9vZmZzZXQAX3NnX2dsX2J1ZmZlcl90YXJnZXQAX3NnX2dsX3RleHR1cmVfdGFyZ2V0AF9zZ19nbF9jdWJlZmFjZV90YXJnZXQAc2dfYXBwbHlfc2Npc3Nvcl9yZWN0AHNncF9kcmF3X3RleHR1cmVkX3JlY3QAc2dwX2RyYXdfZmlsbGVkX3JlY3QAc2dwX3Jlc2V0X3Byb2plY3QAV0lOMzJfRDNEMTFfR0VUX0lEWEdJRkFDVE9SWV9GQUlMRUQ6IGNvdWxkIG5vdCBvYnRhaW4gSURYR0lGYWN0b3J5IG9iamVjdABXSU4zMl9EM0QxMV9HRVRfSURYR0lBREFQVEVSX0ZBSUxFRDogY291bGQgbm90IG9idGFpbiBJRFhHSUFkYXB0ZXIgb2JqZWN0AFdHUFVfU1dBUENIQUlOX0NSRUFURV9TV0FQQ0hBSU5fRkFJTEVEOiB3Z3B1OiBmYWlsZWQgdG8gY3JlYXRlIHN3YXBjaGFpbiBvYmplY3QATnVtcGFkU3VidHJhY3QAX2NvbG9yX2J1ZmZlcl9mbG9hdABfY29sb3JfYnVmZmVyX2hhbGZfZmxvYXQAX3NnX2dsX3RleGltYWdlX2ludGVybmFsX2Zvcm1hdABfc2dfaXNfdmFsaWRfcmVuZGVydGFyZ2V0X2RlcHRoX2Zvcm1hdABfc2dfZ2xfc3VwcG9ydGVkX3RleHR1cmVfZm9ybWF0AF9zZ19nbF90ZXhpbWFnZV9mb3JtYXQAVkFMSURBVEVfQVBJUF9DT0xPUl9GT1JNQVQ6IHNnX2FwcGx5X3BpcGVsaW5lOiBwaXBlbGluZSBjb2xvciBhdHRhY2htZW50IHBpeGVsIGZvcm1hdCBkb2Vzbid0IG1hdGNoIHBhc3MgY29sb3IgYXR0YWNobWVudCBwaXhlbCBmb3JtYXQAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfSU1BR0VfRk9STUFUOiBwYXNzIHJlc29sdmUgYXR0YWNobWVudCBwaXhlbCBmb3JtYXQgbXVzdCBtYXRjaCBjb2xvciBhdHRhY2htZW50IHBpeGVsIGZvcm1hdABWQUxJREFURV9BUElQX0RFUFRIX0ZPUk1BVDogc2dfYXBwbHlfcGlwZWxpbmU6IHBpcGVsaW5lIGRlcHRoIHBpeGVsX2Zvcm1hdCBkb2Vzbid0IG1hdGNoIHBhc3MgZGVwdGggYXR0YWNobWVudCBwaXhlbCBmb3JtYXQAVkFMSURBVEVfSU1BR0VERVNDX05PX01TQUFfUlRfU1VQUE9SVDogTVNBQSBub3Qgc3VwcG9ydGVkIGZvciB0aGlzIHBpeGVsIGZvcm1hdABWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfQ09MT1JfSU5WX1BJWEVMRk9STUFUOiBwYXNzIGNvbG9yLWF0dGFjaG1lbnQgaW1hZ2VzIG11c3QgYmUgcmVuZGVyYWJsZSBjb2xvciBwaXhlbCBmb3JtYXQAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0RFUFRIX0lOVl9QSVhFTEZPUk1BVDogcGFzcyBkZXB0aC1hdHRhY2htZW50IGltYWdlIG11c3QgYmUgZGVwdGggb3IgZGVwdGgtc3RlbmNpbCBwaXhlbCBmb3JtYXQAV0lOMzJfV0dMX1NFVF9QSVhFTEZPUk1BVF9GQUlMRUQ6IGZhaWxlZCB0byBzZXQgc2VsZWN0ZWQgcGl4ZWwgZm9ybWF0AFdJTjMyX1dHTF9GSU5EX1BJWEVMRk9STUFUX0ZBSUxFRDogZmFpbGVkIHRvIGZpbmQgbWF0Y2hpbmcgV0dMIHBpeGVsIGZvcm1hdABWQUxJREFURV9JTUFHRURFU0NfREVQVEhfM0RfSU1BR0U6IDNEIGltYWdlcyBjYW5ub3QgaGF2ZSBhIGRlcHRoL3N0ZW5jaWwgaW1hZ2UgZm9ybWF0AF9zZ19hdHRhY2htZW50c19hdABfc2dfc2FtcGxlcl9hdABfc2dfYnVmZmVyX2F0AF9zZ19zaGFkZXJfYXQAc2dwX3JvdGF0ZV9hdABfc2dfcGlwZWxpbmVfYXQAc2dwX3NjYWxlX2F0AF9zZ19pbWFnZV9hdABWQUxJREFURV9QSVBFTElORURFU0NfTk9fQ09OVF9BVFRSUzogc2dfcGlwZWxpbmVfZGVzYy5sYXlvdXQuYXR0cnMgaXMgbm90IGNvbnRpbnVvdXMATWludXMAVkFMSURBVEVfQUJORF9WQlM6IHNnX2FwcGx5X2JpbmRpbmdzOiBudW1iZXIgb2YgdmVydGV4IGJ1ZmZlcnMgZG9lc24ndCBtYXRjaCBudW1iZXIgb2YgcGlwZWxpbmUgdmVydGV4IGxheW91dHMAYXR0cwBCRUdJTlBBU1NfQVRUQUNITUVOVF9JTlZBTElEOiBzZ19iZWdpbl9wYXNzOiBhbiBhdHRhY2htZW50IHdhcyBwcm92aWRlZCB0aGF0IG5vIGxvbmdlciBleGlzdHMAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX05PX0NPTlRfQ09MT1JfQVRUUzogY29sb3IgYXR0YWNobWVudHMgbXVzdCBvY2N1cHkgY29udGludW91cyBzbG90cwBWQUxJREFURV9TSEFERVJERVNDX05PX0NPTlRfVUJfTUVNQkVSUzogdW5pZm9ybSBibG9jayBtZW1iZXJzIG11c3Qgb2NjdXB5IGNvbnRpbnVvdXMgc2xvdHMAVkFMSURBVEVfU0hBREVSREVTQ19OT19DT05UX1VCUzogc2hhZGVyIHVuaWZvcm0gYmxvY2tzIG11c3Qgb2NjdXB5IGNvbnRpbnVvdXMgc2xvdHMATElOVVhfR0xYX0xPQURfRU5UUllfUE9JTlRTX0ZBSUxFRDogZmFpbGVkIHRvIGxvYWQgR0xYIGVudHJ5IHBvaW50cwBfc2dfbG9va3VwX2F0dGFjaG1lbnRzAF9zZ19nbF9kaXNjYXJkX2F0dGFjaG1lbnRzAFZBTElEQVRFX0FQSVBfQVRUX0NPVU5UOiBzZ19hcHBseV9waXBlbGluZTogbnVtYmVyIG9mIHBpcGVsaW5lIGNvbG9yIGF0dGFjaG1lbnRzIGRvZXNuJ3QgbWF0Y2ggbnVtYmVyIG9mIHBhc3MgY29sb3IgYXR0YWNobWVudHMAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX05PX0FUVEFDSE1FTlRTOiBzZ19hdHRhY2htZW50c19kZXNjIG5vIGNvbG9yIG9yIGRlcHRoLXN0ZW5jaWwgYXR0YWNobWVudHMAV0dQVV9BVFRBQ0hNRU5UU19DUkVBVEVfVEVYVFVSRV9WSUVXX0ZBSUxFRDogd2dwdVRleHR1cmVDcmVhdGVWaWV3KCkgZmFpbGVkIGluIGNyZWF0ZSBhdHRhY2htZW50cwBfc2dfcGFzc19hY3Rpb25fZGVmYXVsdHMAX3NhcHBfZGVzY19kZWZhdWx0cwBfc2dfcGlwZWxpbmVfZGVzY19kZWZhdWx0cwBfc2dfZ2xfaW5pdF9saW1pdHMAc2dwX2RyYXdfdGV4dHVyZWRfcmVjdHMAc2dwX2RyYXdfZmlsbGVkX3JlY3RzAF9zZ19nbF9iZWdpbl9wYXNzAHNnX2JlZ2luX3Bhc3MAIV9zZy5jdXJfcGFzcy5pbl9wYXNzAF9zZ19nbF9lbmRfcGFzcwBzZ19lbmRfcGFzcwBhdHRyX2xvYyA8IChHTGludClfc2cubGltaXRzLm1heF92ZXJ0ZXhfYXR0cnMAcG9vbCAmJiBwb29sLT5nZW5fY3RycwBWQUxJREFURV9BQk5EX1ZTX0VYUEVDVEVEX05PTkZJTFRFUklOR19TQU1QTEVSOiBzZ19hcHBseV9iaW5kaW5nczogc2hhZGVyIGV4cGVjdGVkIFNHX1NBTVBMRVJUWVBFX05PTkZJTFRFUklORyBvbiB2ZXJ0ZXggc3RhZ2UsIGJ1dCBzYW1wbGVyIGhhcyBTR19GSUxURVJfTElORUFSIGZpbHRlcnMAVkFMSURBVEVfQUJORF9GU19FWFBFQ1RFRF9OT05GSUxURVJJTkdfU0FNUExFUjogc2dfYXBwbHlfYmluZGluZ3M6IHNoYWRlciBleHBlY3RlZCBTR19TQU1QTEVSVFlQRV9OT05GSUxURVJJTkcgb24gZnJhZ21lbnQgc3RhZ2UsIGJ1dCBzYW1wbGVyIGhhcyBTR19GSUxURVJfTElORUFSIGZpbHRlcnMAX3NnX25vdGlmeV9jb21taXRfbGlzdGVuZXJzAF9zZ19zZXR1cF9jb21taXRfbGlzdGVuZXJzAF9zZ19kaXNjYXJkX2NvbW1pdF9saXN0ZW5lcnMAbnVtX3NtcHMgPT0gc3RhZ2UtPm51bV9zYW1wbGVycwBTR1AgZmFpbGVkIHRvIGFsbG9jYXRlIGJ1ZmZlcnMAc21wX2luZGV4IDwgbnVtX3NtcHMAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX01JUExFVkVMOiBwYXNzIGF0dGFjaG1lbnQgbWlwIGxldmVsIGlzIGJpZ2dlciB0aGFuIGltYWdlIGhhcyBtaXBtYXBzAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19ERVBUSF9NSVBMRVZFTDogcGFzcyBkZXB0aCBhdHRhY2htZW50IG1pcCBsZXZlbCBpcyBiaWdnZXIgdGhhbiBpbWFnZSBoYXMgbWlwbWFwcwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfUkVTT0xWRV9NSVBMRVZFTDogcGFzcyByZXNvbHZlIGF0dGFjaG1lbnQgbWlwIGxldmVsIGlzIGJpZ2dlciB0aGFuIGltYWdlIGhhcyBtaXBtYXBzAFZBTElEQVRFX1NIQURFUkRFU0NfTk9fVUJfTUVNQkVSUzogR0wgYmFja2VuZCByZXF1aXJlcyB1bmlmb3JtIGJsb2NrIG1lbWJlciBkZWNsYXJhdGlvbnMAX3NnX2dsX2FwcGx5X3VuaWZvcm1zAHNnX2FwcGx5X3VuaWZvcm1zAF9zZ192YWxpZGF0ZV9hcHBseV91bmlmb3JtcwAwID09IF9zZy5jb21taXRfbGlzdGVuZXJzLml0ZW1zADAgIT0gX3NnLmNvbW1pdF9saXN0ZW5lcnMuaXRlbXMAX3NnX3NldHVwX3Bvb2xzAF9zZ19kaXNjYXJkX3Bvb2xzADAgPT0gX3NhcHAuZGVmYXVsdF9pY29uX3BpeGVscwAwICE9IF9zYXBwLmRlZmF1bHRfaWNvbl9waXhlbHMAX3NnX2dsX2FwcGx5X2JpbmRpbmdzAHNnX2FwcGx5X2JpbmRpbmdzAF9zZ192YWxpZGF0ZV9hcHBseV9iaW5kaW5ncwBfc2dfZ2xfY2FjaGVfY2xlYXJfdGV4dHVyZV9zYW1wbGVyX2JpbmRpbmdzAERSQVdfV0lUSE9VVF9CSU5ESU5HUzogYXR0ZW1wdGluZyB0byBkcmF3IHdpdGhvdXQgcmVzb3VyY2UgYmluZGluZ3MAaW1nX2luZGV4IDwgbnVtX2ltZ3MATElOVVhfR0xYX05PX0dMWEZCQ09ORklHUzogZ2xYR2V0RkJDb25maWdzKCkgcmV0dXJuZWQgbm8gY29uZmlncwBMSU5VWF9FR0xfTk9fQ09ORklHUzogZWdsQ2hvb3NlQ29uZmlnKCkgcmV0dXJuZWQgbm8gY29uZmlncwBfc2FwcC5kcm9wLm51bV9maWxlcyA8PSBfc2FwcC5kcm9wLm1heF9maWxlcwBudW1faW1ncyA9PSBzdGFnZS0+bnVtX2ltYWdlcwBhdHRyLT52Yl9pbmRleCA8IGJuZC0+bnVtX3ZicwBjYW52YXMAX3NhcHBfZHJvcHBlZF9maWxlX3BhdGhfcHRyAGJ1ZiAmJiBkYXRhICYmIGRhdGEtPnB0cgBkZXNjLT5kYXRhLnB0cgBXSU4zMl9XR0xfREVTQ1JJQkVfUElYRUxGT1JNQVRfRkFJTEVEOiBmYWlsZWQgdG8gZ2V0IHBpeGVsIGZvcm1hdCBkZXNjcmlwdG9yAF9zZ19nbF9ibGVuZF9mYWN0b3IAc2dwX3Jlc2V0X3NjaXNzb3IAc2dwX3NjaXNzb3IAX3NncF9zZXRfZXJyb3IATm8gZXJyb3IAc2dwX3Jlc2V0X2NvbG9yAHNncF9zZXRfY29sb3IARW50ZXIAX3NnX2dsX21pbl9maWx0ZXIAMCA9PSBfc2cuY29tbWl0X2xpc3RlbmVycy51cHBlcgBJREVOVElDQUxfQ09NTUlUX0xJU1RFTkVSOiBhdHRlbXB0aW5nIHRvIGFkZCBpZGVudGljYWwgY29tbWl0IGxpc3RlbmVyAHNnX2Rlc3Ryb3lfc2FtcGxlcgBfc2dfdW5pbml0X3NhbXBsZXIAX3NnX2luaXRfc2FtcGxlcgBfc2dfZ2xfY3JlYXRlX3NhbXBsZXIAX3NnX2dsX2NhY2hlX2ludmFsaWRhdGVfdGV4dHVyZV9zYW1wbGVyAF9zZ19nbF9jYWNoZV9iaW5kX3RleHR1cmVfc2FtcGxlcgBzZ19tYWtlX3NhbXBsZXIAX3NnX2dsX2Rpc2NhcmRfc2FtcGxlcgBfc2dfZGVhbGxvY19zYW1wbGVyAHNncC1uZWFyZXN0LXNhbXBsZXIAU0dQIGZhaWxlZCB0byBjcmVhdGUgbmVhcmVzdCBzYW1wbGVyAFZBTElEQVRFX1NIQURFUkRFU0NfQ09NUEFSSVNPTl9TQU1QTEVSX1JFUVVJUkVEOiBzaGFkZXIgc3RhZ2U6IGltYWdlIHNhbXBsZSB0eXBlIERFUFRIIGNhbiBvbmx5IGJlIHVzZWQgd2l0aCBDT01QQVJJU09OIHNhbXBsZXIAVkFMSURBVEVfU0hBREVSREVTQ19OT05GSUxURVJJTkdfU0FNUExFUl9SRVFVSVJFRDogc2hhZGVyIHN0YWdlOiBpbWFnZSBzYW1wbGUgdHlwZSBVTkZJTFRFUkFCTEVfRkxPQVQsIFVJTlQsIFNJTlQgY2FuIG9ubHkgYmUgdXNlZCB3aXRoIE5PTkZJTFRFUklORyBzYW1wbGVyAHNhcHBfZ2xfZ2V0X2ZyYW1lYnVmZmVyAHNnX2Rlc3Ryb3lfYnVmZmVyAF9zZ191bmluaXRfYnVmZmVyAF9zZ19pbml0X2J1ZmZlcgBfc2FwcF9jbGVhcl9kcm9wX2J1ZmZlcgBfc2dfZ2xfY3JlYXRlX2J1ZmZlcgBzZ19tYWtlX2J1ZmZlcgBfc2dfZ2xfY2FjaGVfYmluZF9zdG9yYWdlX2J1ZmZlcgBfc2dfZ2xfZGlzY2FyZF9idWZmZXIAX3NnX2dsX2NhY2hlX2JpbmRfYnVmZmVyAF9zZ19nbF9hcHBlbmRfYnVmZmVyAHNnX2FwcGVuZF9idWZmZXIAX3NnX3ZhbGlkYXRlX2FwcGVuZF9idWZmZXIAX3NnX2RlYWxsb2NfYnVmZmVyAF9zYXBwLmRyb3AuYnVmZmVyAF9zYXBwLmNsaXBib2FyZC5idWZmZXIAU0dQIGZhaWxlZCB0byBjcmVhdGUgdmVydGV4IGJ1ZmZlcgBWQUxJREFURV9BUFBFTkRCVUZfVVNBR0U6IHNnX2FwcGVuZF9idWZmZXI6IGNhbm5vdCBhcHBlbmQgdG8gaW1tdXRhYmxlIGJ1ZmZlcgBWQUxJREFURV9VUERBVEVCVUZfVVNBR0U6IHNnX3VwZGF0ZV9idWZmZXI6IGNhbm5vdCB1cGRhdGUgaW1tdXRhYmxlIGJ1ZmZlcgBWQUxJREFURV9BQk5EX1ZTX1NUT1JBR0VCVUZGRVJfQklORElOR19CVUZGRVJUWVBFOiBzZ19hcHBseV9iaW5kaW5nczogYnVmZmVyIGJvdW5kIHRvIHZlcnRleCBzdGFnZSBzdG9yYWdlIGJ1ZmZlciBzbG90IGlzIG5vdCBvZiB0eXBlIHN0b3JhZ2UgYnVmZmVyAFZBTElEQVRFX0FCTkRfRlNfU1RPUkFHRUJVRkZFUl9CSU5ESU5HX0JVRkZFUlRZUEU6IHNnX2FwcGx5X2JpbmRpbmdzOiBidWZmZXIgYm91bmQgdG8gZnJhaG1lbnQgc3RhZ2Ugc3RvcmFnZSBidWZmZXIgc2xvdCBpcyBub3Qgb2YgdHlwZSBzdG9yYWdlIGJ1ZmZlcgBDTElQQk9BUkRfU1RSSU5HX1RPT19CSUc6IGNsaXBib2FyZCBzdHJpbmcgZGlkbid0IGZpdCBpbnRvIGNsaXBib2FyZCBidWZmZXIAc2dfZGVzdHJveV9zaGFkZXIAX3NnX3VuaW5pdF9zaGFkZXIAX3NnX2luaXRfc2hhZGVyAF9zZ19sb29rdXBfc2hhZGVyAF9zZ19nbF9jcmVhdGVfc2hhZGVyAF9zZ19nbF9jb21waWxlX3NoYWRlcgBzZ19tYWtlX3NoYWRlcgBfc2dfZ2xfZGlzY2FyZF9zaGFkZXIAX3NnX2RlYWxsb2Nfc2hhZGVyAHBpcC0+c2hhZGVyAFNHUCBmYWlsZWQgdG8gY3JlYXRlIHRoZSBjb21tb24gc2hhZGVyAFZBTElEQVRFX1BJUEVMSU5FREVTQ19BVFRSX1NFTUFOVElDUzogRDNEMTEgbWlzc2luZyB2ZXJ0ZXggYXR0cmlidXRlIHNlbWFudGljcyBpbiBzaGFkZXIAX3RleHR1cmVfZmxvYXRfbGluZWFyAF9zYXBwX2NsZWFyAHNncF9jbGVhcgBfc2dfY2xlYXIAc2dwX3NldHVwAHNnX3NldHVwAHNhcHAAc29rb2xfYXBwAF9zYXBwX2Vtc2NfZHJvcABfc2dfZ2xfc3RlbmNpbF9vcABfc2dfZ2xfYmxlbmRfb3AAc21wLT5nbC5zbXAAX3NncF9kcmF3X3NvbGlkX3BpcABibmQtPnBpcABfc2dfZ2xfd3JhcABBcnJvd1VwAFBhZ2VVcABpbmZvAFZBTElEQVRFX0FCTkRfVkJfT1ZFUkZMT1c6IHNnX2FwcGx5X2JpbmRpbmdzOiBidWZmZXIgaW4gdmVydGV4IGJ1ZmZlciBzbG90IGlzIG92ZXJmbG93bgBWQUxJREFURV9BQk5EX0lCX09WRVJGTE9XOiBzZ19hcHBseV9iaW5kaW5nczogYnVmZmVyIGluIGluZGV4IGJ1ZmZlciBzbG90IGlzIG92ZXJmbG93bgBzZ3Bfc2h1dGRvd24AQXJyb3dEb3duAFBhZ2VEb3duAFdJTjMyX1dHTF9DUkVBVEVfQ09OVEVYVF9BVFRSSUJTX0ZBSUxFRF9PVEhFUjogQ3JlYXRlQ29udGV4dEF0dHJpYnNBUkIgZmFpbGVkIGZvciBvdGhlciByZWFzb24AU2VtaWNvbG9uAExJTlVYX1gxMV9GQUlMRURfVE9fQkVDT01FX09XTkVSX09GX0NMSVBCT0FSRDogWDExOiBGYWlsZWQgdG8gYmVjb21lIG93bmVyIG9mIGNsaXBib2FyZCBzZWxlY3Rpb24AYWN0aW9uAExJTlVYX0dMWF9RVUVSWV9WRVJTSU9OX0ZBSUxFRDogZmFpbGVkIHRvIHF1ZXJ5IEdMWCB2ZXJzaW9uAF9zYXBwX3NldHVwX2RlZmF1bHRfaWNvbgBzYXBwX3NldF9pY29uAF9zYXBwX2Vtc2Nfc2V0X2ljb24Ac2dwX2JlZ2luAG1haW4AV0dQVV9TV0FQQ0hBSU5fQ1JFQVRFX0RFUFRIX1NURU5DSUxfVEVYVFVSRV9GQUlMRUQ6IHdncHU6IGZhaWxlZCB0byBjcmVhdGUgZGVwdGgtc3RlbmNpbCB0ZXh0dXJlIGZvciBzd2FwY2hhaW4AV0dQVV9TV0FQQ0hBSU5fQ1JFQVRFX01TQUFfVEVYVFVSRV9GQUlMRUQ6IHdncHU6IGZhaWxlZCB0byBjcmVhdGUgbXNhYSB0ZXh0dXJlIGZvciBzd2FwY2hhaW4AV0dQVV9TV0FQQ0hBSU5fQ1JFQVRFX1NVUkZBQ0VfRkFJTEVEOiB3Z3B1OiBmYWlsZWQgdG8gY3JlYXRlIHN1cmZhY2UgZm9yIHN3YXBjaGFpbgBQcmludFNjcmVlbgBuYW4AMCA9PSBfc2cuY29tbWl0X2xpc3RlbmVycy5udW0Ac2dwX3Jlc2V0X3RyYW5zZm9ybQBzZ3BfcG9wX3RyYW5zZm9ybQBzZ3BfcHVzaF90cmFuc2Zvcm0Ac2dwX3Jlc2V0X3VuaWZvcm0Ac2dwX3NldF91bmlmb3JtAF9zZ19pbml0X3Bvb2wAX3NnX2Rpc2NhcmRfcG9vbABDT01NSVRfTElTVEVORVJfQVJSQVlfRlVMTDogY29tbWl0IGxpc3RlbmVyIGFycmF5IGZ1bGwAU0dQIHZlcnRpY2VzIGJ1ZmZlciBpcyBmdWxsAFNHUCB1bmlmb3JtIGJ1ZmZlciBpcyBmdWxsAFNHUCBjb21tYW5kIGJ1ZmZlciBpcyBmdWxsAFdJTjMyX0xPQURfT1BFTkdMMzJfRExMX0ZBSUxFRDogZmFpbGVkIGxvYWRpbmcgb3BlbmdsMzIuZGxsAEVxdWFsAE51bXBhZERlY2ltYWwAQ2Fwc0xvY2sATnVtTG9jawBTY3JvbGxMb2NrAE9LOiBPawBzZ3BfZmx1c2gAQmFja3NsYXNoAFNsYXNoAC9Vc2Vycy9rb25zdW1lci9EZXNrdG9wL2Rldi9udWxsMC1zb2tvbC93YnVpbGQvX2RlcHMvc29rb2wtc3JjL3Nva29sX2dmeC5oAC9Vc2Vycy9rb25zdW1lci9EZXNrdG9wL2Rldi9udWxsMC1zb2tvbC93YnVpbGQvX2RlcHMvc29rb2wtc3JjL3Nva29sX2FwcC5oAC9Vc2Vycy9rb25zdW1lci9EZXNrdG9wL2Rldi9udWxsMC1zb2tvbC93YnVpbGQvX2RlcHMvc29rb2xfZ3Atc3JjL3Nva29sX2dwLmgAQU5EUk9JRF9XUklURV9NU0dfRkFJTEVEOiBmYWlsZWQgdG8gd3JpdGUgbWVzc2FnZSBpbiBfc2FwcF9hbmRyb2lkX21zZwAhc2hkLT5nbC5wcm9nAFZBTElEQVRFX1NIQURFUkRFU0NfVUJfTUVNQkVSX05BTUU6IHVuaWZvcm0gYmxvY2sgbWVtYmVyIG5hbWUgbWlzc2luZwBMSU5VWF9HTFhfUkVRVUlSRURfRVhURU5TSU9OU19NSVNTSU5HOiBHTFggZXh0ZW5zaW9ucyBBUkJfY3JlYXRlX2NvbnRleHQgYW5kIEFSQl9jcmVhdGVfY29udGV4dF9wcm9maWxlIG1pc3NpbmcAd2FybmluZwBfc2dfZ2xfY2FjaGVfcmVzdG9yZV90ZXh0dXJlX3NhbXBsZXJfYmluZGluZwBfc2dfZ2xfY2FjaGVfc3RvcmVfdGV4dHVyZV9zYW1wbGVyX2JpbmRpbmcAX3NnX2dsX2NhY2hlX3Jlc3RvcmVfYnVmZmVyX2JpbmRpbmcAX3NnX2dsX2NhY2hlX3N0b3JlX2J1ZmZlcl9iaW5kaW5nAGltZwBMSU5VWF9HTFhfTk9fU1VJVEFCTEVfR0xYRkJDT05GSUc6IGZhaWxlZCB0byBmaW5kIGEgc3VpdGFibGUgR0xYRkJDb25maWcAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfTEFZRVI6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50IGlzIGFycmF5IHRleHR1cmUsIGJ1dCBsYXllciBpbmRleCBpcyB0b28gYmlnAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19MQVlFUjogcGFzcyBhdHRhY2htZW50IGltYWdlIGlzIGFycmF5IHRleHR1cmUsIGJ1dCBsYXllciBpbmRleCBpcyB0b28gYmlnAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19ERVBUSF9MQVlFUjogcGFzcyBkZXB0aCBhdHRhY2htZW50IGltYWdlIGlzIGFycmF5IHRleHR1cmUsIGJ1dCBsYXllciBpbmRleCBpcyB0b28gYmlnAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19SRVNPTFZFX0ZBQ0U6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50IGlzIGN1YmVtYXAsIGJ1dCBmYWNlIGluZGV4IGlzIHRvbyBiaWcAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0ZBQ0U6IHBhc3MgYXR0YWNobWVudCBpbWFnZSBpcyBjdWJlbWFwLCBidXQgZmFjZSBpbmRleCBpcyB0b28gYmlnAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19ERVBUSF9GQUNFOiBwYXNzIGRlcHRoIGF0dGFjaG1lbnQgaW1hZ2UgaXMgY3ViZW1hcCwgYnV0IGZhY2UgaW5kZXggaXMgdG9vIGJpZwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfUkVTT0xWRV9TTElDRTogcGFzcyByZXNvbHZlIGF0dGFjaG1lbnQgaXMgM2QgdGV4dHVyZSwgYnV0IHNsaWNlIHZhbHVlIGlzIHRvbyBiaWcAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1NMSUNFOiBwYXNzIGF0dGFjaG1lbnQgaW1hZ2UgaXMgM2QgdGV4dHVyZSwgYnV0IHNsaWNlIHZhbHVlIGlzIHRvbyBiaWcAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0RFUFRIX1NMSUNFOiBwYXNzIGRlcHRoIGF0dGFjaG1lbnQgaW1hZ2UgaXMgM2QgdGV4dHVyZSwgYnV0IHNsaWNlIHZhbHVlIGlzIHRvbyBiaWcAZ2xfYnVmAGluZgBfc2dfdmVydGV4Zm9ybWF0X2J5dGVzaXplAF9zZ19waXhlbGZvcm1hdF9ieXRlc2l6ZQBfc2dfZ2xfdmVydGV4Zm9ybWF0X3NpemUAX3NnX3VuaWZvcm1fc2l6ZQBvZmZzZXQgPCBfc2FwcC5kcm9wLmJ1Zl9zaXplAF9zZ3BfcXVlcnlfaW1hZ2Vfc2l6ZQBwb29sLT5xdWV1ZV90b3AgPCBwb29sLT5zaXplAF9zZy5nbC5jYWNoZS5jdXJfcGlwZWxpbmUtPnNoYWRlci0+Y21uLnN0YWdlW3N0YWdlX2luZGV4XS51bmlmb3JtX2Jsb2Nrc1t1Yl9pbmRleF0uc2l6ZSA9PSBkYXRhLT5zaXplAFZBTElEQVRFX1VQREFURUJVRl9TSVpFOiBzZ191cGRhdGVfYnVmZmVyOiB1cGRhdGUgc2l6ZSBpcyBiaWdnZXIgdGhhbiBidWZmZXIgc2l6ZQBWQUxJREFURV9BUFBFTkRCVUZfU0laRTogc2dfYXBwZW5kX2J1ZmZlcjogb3ZlcmFsbCBhcHBlbmRlZCBzaXplIGlzIGJpZ2dlciB0aGFuIGJ1ZmZlciBzaXplAFZBTElEQVRFX0JVRkZFUkRFU0NfREFUQV9TSVpFOiBpbW11dGFibGUgYnVmZmVyIGRhdGEgc2l6ZSBkaWZmZXJzIGZyb20gYnVmZmVyIHNpemUAVkFMSURBVEVfU0hBREVSREVTQ19VQl9TSVpFX01JU01BVENIOiBzaXplIG9mIHVuaWZvcm0gYmxvY2sgbWVtYmVycyBkb2Vzbid0IG1hdGNoIHVuaWZvcm0gYmxvY2sgc2l6ZQBWQUxJREFURV9BVUJfU0laRTogc2dfYXBwbHlfdW5pZm9ybXM6IGRhdGEgc2l6ZSBkb2Vzbid0IG1hdGNoIGRlY2xhcmVkIHVuaWZvcm0gYmxvY2sgc2l6ZQBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfSU1BR0VfU0laRVM6IGFsbCBwYXNzIGF0dGFjaG1lbnRzIG11c3QgaGF2ZSB0aGUgc2FtZSBzaXplAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19SRVNPTFZFX0lNQUdFX1NJWkVTOiBwYXNzIHJlc29sdmUgYXR0YWNobWVudCBzaXplIG11c3QgbWF0Y2ggY29sb3IgYXR0YWNobWVudCBpbWFnZSBzaXplAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19ERVBUSF9JTUFHRV9TSVpFUzogcGFzcyBkZXB0aCBhdHRhY2htZW50IGltYWdlIHNpemUgbXVzdCBtYXRjaCBjb2xvciBhdHRhY2htZW50IGltYWdlIHNpemUAVkFMSURBVEVfSU1BR0VEQVRBX0RBVEFfU0laRTogc2dfaW1hZ2VfZGF0YTogZGF0YSBzaXplIGRvZXNuJ3QgbWF0Y2ggZXhwZWN0ZWQgc3VyZmFjZSBzaXplAFZBTElEQVRFX0JFR0lOUEFTU19BVFRBQ0hNRU5UU19FWElTVFM6IHNnX2JlZ2luX3Bhc3M6IGF0dGFjaG1lbnRzIG9iamVjdCBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQVBJUF9TSEFERVJfRVhJU1RTOiBzZ19hcHBseV9waXBlbGluZTogc2hhZGVyIG9iamVjdCBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQUJORF9QSVBFTElORV9FWElTVFM6IHNnX2FwcGx5X2JpbmRpbmdzOiBjdXJyZW50bHkgYXBwbGllZCBwaXBlbGluZSBvYmplY3Qgbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FQSVBfUElQRUxJTkVfRVhJU1RTOiBzZ19hcHBseV9waXBlbGluZTogcGlwZWxpbmUgb2JqZWN0IG5vIGxvbmdlciBhbGl2ZQBWQUxJREFURV9BUElQX0NVUlBBU1NfQVRUQUNITUVOVFNfRVhJU1RTOiBzZ19hcHBseV9waXBlbGluZTogY3VycmVudCBwYXNzIGF0dGFjaG1lbnRzIG5vIGxvbmdlciBhbGl2ZQBWQUxJREFURV9BQk5EX1ZCX0VYSVNUUzogc2dfYXBwbHlfYmluZGluZ3M6IHZlcnRleCBidWZmZXIgbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FCTkRfSUJfRVhJU1RTOiBzZ19hcHBseV9iaW5kaW5nczogaW5kZXggYnVmZmVyIG5vIGxvbmdlciBhbGl2ZQBWQUxJREFURV9BQk5EX1ZTX1NNUF9FWElTVFM6IHNnX2FwcGx5X2JpbmRpbmdzOiBzYW1wbGVyIGJvdW5kIHRvIHZlcnRleCBzdGFnZSBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQUJORF9WU19TVE9SQUdFQlVGRkVSX0VYSVNUUzogc2dfYXBwbHlfYmluZGluZ3M6IHN0b3JhZ2UgYnVmZmVyIGJvdW5kIHRvIHZlcnRleCBzdGFnZSBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQUJORF9WU19JTUdfRVhJU1RTOiBzZ19hcHBseV9iaW5kaW5nczogaW1hZ2UgYm91bmQgdG8gdmVydGV4IHN0YWdlIG5vIGxvbmdlciBhbGl2ZQBWQUxJREFURV9BQk5EX0ZTX1NNUF9FWElTVFM6IHNnX2FwcGx5X2JpbmRpbmdzOiBzYW1wbGVyIGJvdW5kIHRvIGZyYWdtZW50IHN0YWdlIG5vIGxvbmdlciBhbGl2ZQBWQUxJREFURV9BQk5EX0ZTX1NUT1JBR0VCVUZGRVJfRVhJU1RTOiBzZ19hcHBseV9iaW5kaW5nczogc3RvcmFnZSBidWZmZXIgYm91bmQgdG8gZnJhZ21lbnQgc3RhZ2Ugbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FCTkRfRlNfSU1HX0VYSVNUUzogc2dfYXBwbHlfYmluZGluZ3M6IGltYWdlIGJvdW5kIHRvIGZyYWdtZW50IHN0YWdlIG5vIGxvbmdlciBhbGl2ZQBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfUkVTT0xWRV9JTUFHRV9OT19SVDogcGFzcyByZXNvbHZlIGF0dGFjaG1lbnQgaW1hZ2UgbXVzdCBoYXZlIHJlbmRlcl90YXJnZXQ9dHJ1ZQBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfSU1BR0VfTk9fUlQ6IHBhc3MgYXR0YWNobWVudCBpbWFnZSBtdXN0IGJlIGhhdmUgcmVuZGVyX3RhcmdldD10cnVlAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19ERVBUSF9JTUFHRV9OT19SVDogcGFzcyBkZXB0aCBhdHRhY2htZW50IGltYWdlIG11c3QgYmUgaGF2ZSByZW5kZXJfdGFyZ2V0PXRydWUAVkFMSURBVEVfU0hBREVSREVTQ19JTUFHRV9TQU1QTEVSX1BBSVJfSEFTX05BTUVfQlVUX05PVF9VU0VEOiBzaGFkZXIgc3RhZ2U6IGltYWdlLXNhbXBsZXItcGFpciBoYXMgbmFtZSBidXQgLnVzZWQgZmllbGQgbm90IHRydWUAVkFMSURBVEVfU0hBREVSREVTQ19JTUFHRV9TQU1QTEVSX1BBSVJfSEFTX1NBTVBMRVJfQlVUX05PVF9VU0VEOiBzaGFkZXIgc3RhZ2U6IGltYWdlLXNhbXBsZXItcGFpciAuc2FtcGxlcl9zbG90ICE9IDAgYnV0IC51c2VkIGZpZWxkIG5vdCB0cnVlAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfU0FNUExFUl9QQUlSX0hBU19JTUFHRV9CVVRfTk9UX1VTRUQ6IHNoYWRlciBzdGFnZTogaW1hZ2Utc2FtcGxlci1wYWlyIGhhcyAuaW1hZ2Vfc2xvdCAhPSAwIGJ1dCAudXNlZCBmaWVsZCBub3QgdHJ1ZQBfc2FwcF9yaW5nX2VucXVldWUAX3NhcHBfcmluZ19kZXF1ZXVlAHBvb2wtPmZyZWVfcXVldWUAV0lOMzJfR0VUX1BJWEVMRk9STUFUX0FUVFJJQl9GQUlMRUQ6IGZhaWxlZCB0byBnZXQgV0dMIHBpeGVsIGZvcm1hdCBhdHRyaWJ1dGUAQmFja3F1b3RlAFF1b3RlAERlbGV0ZQBfc2FwcF9pbml0X3N0YXRlAHNncF9yZXNldF9zdGF0ZQBzZ19xdWVyeV9zYW1wbGVyX3N0YXRlAHNnX3F1ZXJ5X2J1ZmZlcl9zdGF0ZQBzZ19xdWVyeV9zaGFkZXJfc3RhdGUAc2dfcXVlcnlfcGlwZWxpbmVfc3RhdGUAc2dfcXVlcnlfaW1hZ2Vfc3RhdGUAX3NhcHBfZGlzY2FyZF9zdGF0ZQBfc2dwX2JsZW5kX3N0YXRlAF9zZ19yZXNldF9zYW1wbGVyX3RvX2FsbG9jX3N0YXRlAF9zZ19yZXNldF9idWZmZXJfdG9fYWxsb2Nfc3RhdGUAX3NnX3Jlc2V0X3NoYWRlcl90b19hbGxvY19zdGF0ZQBfc2dfcmVzZXRfcGlwZWxpbmVfdG9fYWxsb2Nfc3RhdGUAX3NnX3Jlc2V0X2ltYWdlX3RvX2FsbG9jX3N0YXRlAFZBTElEQVRFX0FQSVBfU0hBREVSX1ZBTElEOiBzZ19hcHBseV9waXBlbGluZTogc2hhZGVyIG9iamVjdCBub3QgaW4gdmFsaWQgc3RhdGUAVkFMSURBVEVfQUJORF9QSVBFTElORV9WQUxJRDogc2dfYXBwbHlfYmluZGluZ3M6IGN1cnJlbnRseSBhcHBsaWVkIHBpcGVsaW5lIG9iamVjdCBub3QgaW4gdmFsaWQgc3RhdGUAVkFMSURBVEVfQVBJUF9QSVBFTElORV9WQUxJRDogc2dfYXBwbHlfcGlwZWxpbmU6IHBpcGVsaW5lIG9iamVjdCBub3QgaW4gdmFsaWQgc3RhdGUAVkFMSURBVEVfQVBJUF9DVVJQQVNTX0FUVEFDSE1FTlRTX1ZBTElEOiBzZ19hcHBseV9waXBlbGluZTogY3VycmVudCBwYXNzIGF0dGFjaG1lbnRzIG5vdCBpbiB2YWxpZCBzdGF0ZQBERUFMTE9DX1NBTVBMRVJfSU5WQUxJRF9TVEFURTogc2dfZGVhbGxvY19zYW1wbGVyKCk6IHNhbXBsZXIgbXVzdCBiZSBpbiBhbGxvYyBzdGF0ZQBERUFMTE9DX0lNQUdFX0lOVkFMSURfU1RBVEU6IHNnX2RlYWxsb2NfaW1hZ2UoKTogaW1hZ2UgbXVzdCBiZSBpbiBhbGxvYyBzdGF0ZQBVTklOSVRfQVRUQUNITUVOVFNfSU5WQUxJRF9TVEFURTogc2dfdW5pbml0X2F0dGFjaG1lbnRzKCk6IGF0dGFjaG1lbnRzIG11c3QgYmUgaW4gVkFMSUQgb3IgRkFJTEVEIHN0YXRlAFVOSU5JVF9TQU1QTEVSX0lOVkFMSURfU1RBVEU6IHNnX3VuaW5pdF9zYW1wbGVyKCk6IHNhbXBsZXIgbXVzdCBiZSBpbiBWQUxJRCBvciBGQUlMRUQgc3RhdGUAVU5JTklUX0JVRkZFUl9JTlZBTElEX1NUQVRFOiBzZ191bmluaXRfYnVmZmVyKCk6IGJ1ZmZlciBtdXN0IGJlIGluIFZBTElEIG9yIEZBSUxFRCBzdGF0ZQBVTklOSVRfU0hBREVSX0lOVkFMSURfU1RBVEU6IHNnX3VuaW5pdF9zaGFkZXIoKTogc2hhZGVyIG11c3QgYmUgaW4gVkFMSUQgb3IgRkFJTEVEIHN0YXRlAFVOSU5JVF9QSVBFTElORV9JTlZBTElEX1NUQVRFOiBzZ191bmluaXRfcGlwZWxpbmUoKTogcGlwZWxpbmUgbXVzdCBiZSBpbiBWQUxJRCBvciBGQUlMRUQgc3RhdGUAVU5JTklUX0lNQUdFX0lOVkFMSURfU1RBVEU6IHNnX3VuaW5pdF9pbWFnZSgpOiBpbWFnZSBtdXN0IGJlIGluIFZBTElEIG9yIEZBSUxFRCBzdGF0ZQBGQUlMX0FUVEFDSE1FTlRTX0lOVkFMSURfU1RBVEU6IHNnX2ZhaWxfYXR0YWNobWVudHMoKTogYXR0YWNobWVudHMgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBERUFMTE9DX0FUVEFDSE1FTlRTX0lOVkFMSURfU1RBVEU6IHNnX2RlYWxsb2NfYXR0YWNobWVudHMoKTogYXR0YWNobWVudHMgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBJTklUX0FUVEFDSE1FTlRTX0lOVkFMSURfU1RBVEU6IHNnX2luaXRfYXR0YWNobWVudHMoKTogcGFzcyBtdXN0IGJlIGluIEFMTE9DIHN0YXRlAElOSVRfU0FNUExFUl9JTlZBTElEX1NUQVRFOiBzZ19pbml0X3NhbXBsZXIoKTogc2FtcGxlciBtdXN0IGJlIGluIEFMTE9DIHN0YXRlAEZBSUxfU0FNUExFUl9JTlZBTElEX1NUQVRFOiBzZ19mYWlsX3NhbXBsZXIoKTogc2FtcGxlciBtdXN0IGJlIGluIEFMTE9DIHN0YXRlAElOSVRfQlVGRkVSX0lOVkFMSURfU1RBVEU6IHNnX2luaXRfYnVmZmVyKCk6IGJ1ZmZlciBtdXN0IGJlIGluIEFMTE9DIHN0YXRlAEZBSUxfQlVGRkVSX0lOVkFMSURfU1RBVEU6IHNnX2ZhaWxfYnVmZmVyKCk6IGJ1ZmZlciBtdXN0IGJlIGluIEFMTE9DIHN0YXRlAERFQUxMT0NfQlVGRkVSX0lOVkFMSURfU1RBVEU6IHNnX2RlYWxsb2NfYnVmZmVyKCk6IGJ1ZmZlciBtdXN0IGJlIGluIEFMTE9DIHN0YXRlAElOSVRfU0hBREVSX0lOVkFMSURfU1RBVEU6IHNnX2luaXRfc2hhZGVyKCk6IHNoYWRlciBtdXN0IGJlIGluIEFMTE9DIHN0YXRlAEZBSUxfU0hBREVSX0lOVkFMSURfU1RBVEU6IHNnX2ZhaWxfc2hhZGVyKCk6IHNoYWRlciBtdXN0IGJlIGluIEFMTE9DIHN0YXRlAERFQUxMT0NfU0hBREVSX0lOVkFMSURfU1RBVEU6IHNnX2RlYWxsb2Nfc2hhZGVyKCk6IHNoYWRlciBtdXN0IGJlIGluIEFMTE9DIHN0YXRlAElOSVRfUElQRUxJTkVfSU5WQUxJRF9TVEFURTogc2dfaW5pdF9waXBlbGluZSgpOiBwaXBlbGluZSBtdXN0IGJlIGluIEFMTE9DIHN0YXRlAEZBSUxfUElQRUxJTkVfSU5WQUxJRF9TVEFURTogc2dfZmFpbF9waXBlbGluZSgpOiBwaXBlbGluZSBtdXN0IGJlIGluIEFMTE9DIHN0YXRlAERFQUxMT0NfUElQRUxJTkVfSU5WQUxJRF9TVEFURTogc2dfZGVhbGxvY19waXBlbGluZSgpOiBwaXBlbGluZSBtdXN0IGJlIGluIEFMTE9DIHN0YXRlAElOSVRfSU1BR0VfSU5WQUxJRF9TVEFURTogc2dfaW5pdF9pbWFnZSgpOiBpbWFnZSBtdXN0IGJlIGluIEFMTE9DIHN0YXRlAEZBSUxfSU1BR0VfSU5WQUxJRF9TVEFURTogc2dfZmFpbF9pbWFnZSgpOiBpbWFnZSBtdXN0IGJlIGluIEFMTE9DIHN0YXRlAHNncF9yb3RhdGUAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05TQVZFSU5TVEFOQ0VTVEFURTogTmF0aXZlQWN0aXZpdHkgb25TYXZlSW5zdGFuY2VTdGF0ZQBzZ3BfdHJhbnNsYXRlAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OQ1JFQVRFOiBOYXRpdmVBY3Rpdml0eSBvbkNyZWF0ZQBfc2FwcF9pbWFnZV92YWxpZGF0ZQBBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTlBBVVNFOiBOYXRpdmVBY3Rpdml0eSBvblBhdXNlAHNhcHBfbWV0YWxfZ2V0X21zYWFfY29sb3JfdGV4dHVyZQBzYXBwX21ldGFsX2dldF9kZXB0aF9zdGVuY2lsX3RleHR1cmUAX3NnX2dsX2NhY2hlX2FjdGl2ZV90ZXh0dXJlAHNncC13aGl0ZS10ZXh0dXJlAFdHUFVfU1dBUENIQUlOX0NSRUFURV9ERVBUSF9TVEVOQ0lMX1ZJRVdfRkFJTEVEOiB3Z3B1OiBmYWlsZWQgdG8gY3JlYXRlIHZpZXcgb2JqZWN0IGZvciBzd2FwY2hhaW4gZGVwdGgtc3RlbmNpbCB0ZXh0dXJlAFdHUFVfU1dBUENIQUlOX0NSRUFURV9NU0FBX1ZJRVdfRkFJTEVEOiB3Z3B1OiBmYWlsZWQgdG8gY3JlYXRlIHZpZXcgb2JqZWN0IGZvciBzd2FwY2hhaW4gbXNhYSB0ZXh0dXJlAF9zZ19nbF9pbmRleF90eXBlAF9zZ19nbF92ZXJ0ZXhmb3JtYXRfdHlwZQBfc2dfZ2xfcHJpbWl0aXZlX3R5cGUAX3NnX2dsX3RleGltYWdlX3R5cGUAQU5EUk9JRF9DUkVBVEVfVEhSRUFEX1BJUEVfRkFJTEVEOiBmYWlsZWQgdG8gY3JlYXRlIHRocmVhZCBwaXBlAEVzY2FwZQBBTkRST0lEX05BVElWRV9BQ1RJVklUWV9ET05FOiBOYXRpdmVBY3Rpdml0eSBkb25lAEFORFJPSURfTE9PUF9USFJFQURfRE9ORTogbG9vcCB0aHJlYWQgZG9uZQBzZ19kZXN0cm95X3BpcGVsaW5lAF9zZ19nbF9hcHBseV9waXBlbGluZQBWQUxJREFURV9BQk5EX1BJUEVMSU5FOiBzZ19hcHBseV9iaW5kaW5nczogbXVzdCBiZSBjYWxsZWQgYWZ0ZXIgc2dfYXBwbHlfcGlwZWxpbmUAX3NnX3ZhbGlkYXRlX2FwcGx5X3BpcGVsaW5lAF9zZ191bmluaXRfcGlwZWxpbmUAX3NnX2luaXRfcGlwZWxpbmUAc2dwX3Jlc2V0X3BpcGVsaW5lAHNncF9zZXRfcGlwZWxpbmUAX3NnLmdsLmNhY2hlLmN1cl9waXBlbGluZQBfc2dfbG9va3VwX3BpcGVsaW5lAF9zZ19nbF9jcmVhdGVfcGlwZWxpbmUAc2dfbWFrZV9waXBlbGluZQBfc2dfZ2xfZGlzY2FyZF9waXBlbGluZQBfc2dfZGVhbGxvY19waXBlbGluZQBTR1AgZmFpbGVkIHRvIGNyZWF0ZSB0aGUgY29tbW9uIHBpcGVsaW5lAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OUkVTVU1FOiBOYXRpdmVBY3Rpdml0eSBvblJlc3VtZQBIb21lAFZBTElEQVRFX0FQUEVOREJVRl9VUERBVEU6IHNnX2FwcGVuZF9idWZmZXI6IGNhbm5vdCBjYWxsIHNnX2FwcGVuZF9idWZmZXIgYW5kIHNnX3VwZGF0ZV9idWZmZXIgaW4gc2FtZSBmcmFtZQBWQUxJREFURV9VUERBVEVCVUZfQVBQRU5EOiBzZ191cGRhdGVfYnVmZmVyOiBjYW5ub3QgY2FsbCBzZ191cGRhdGVfYnVmZmVyIGFuZCBzZ19hcHBlbmRfYnVmZmVyIGluIHNhbWUgZnJhbWUAVkFMSURBVEVfVVBEQVRFQlVGX09OQ0U6IHNnX3VwZGF0ZV9idWZmZXI6IG9ubHkgb25lIHVwZGF0ZSBhbGxvd2VkIHBlciBidWZmZXIgYW5kIGZyYW1lAFZBTElEQVRFX1VQRElNR19PTkNFOiBzZ191cGRhdGVfaW1hZ2U6IG9ubHkgb25lIHVwZGF0ZSBhbGxvd2VkIHBlciBpbWFnZSBhbmQgZnJhbWUAaW1nX3NtcF9kZXNjLT5nbHNsX25hbWUAc2FwcF9tZXRhbF9nZXRfY3VycmVudF9kcmF3YWJsZQBWQUxJREFURV9JTUFHRURFU0NfQ09NUFJFU1NFRF9JTU1VVEFCTEU6IGNvbXByZXNzZWQgaW1hZ2VzIG11c3QgYmUgaW1tdXRhYmxlAHNncF9zY2FsZQBfc2dfZ2xfcmVzZXRfc3RhdGVfY2FjaGUAX3NnX2dsX3NoYWRlcl9zdGFnZQBWQUxJREFURV9BQk5EX1ZTX0lNQUdFX01TQUE6IHNnX2FwcGx5X2JpbmRpbmdzOiBjYW5ub3QgYmluZCBpbWFnZSB3aXRoIHNhbXBsZV9jb3VudD4xIHRvIHZlcnRleCBzdGFnZQBWQUxJREFURV9BQk5EX1ZTX1VORVhQRUNURURfU0FNUExFUl9CSU5ESU5HOiBzZ19hcHBseV9iaW5kaW5nczogdW5leHBlY3RlZCBzYW1wbGVyIGJpbmRpbmcgb24gdmVydGV4IHN0YWdlAFZBTElEQVRFX0FCTkRfVlNfVU5FWFBFQ1RFRF9TVE9SQUdFQlVGRkVSX0JJTkRJTkc6IHNnX2FwcGx5X2JpbmRpbmdzOiB1bmV4cGVjdGVkIHN0b3JhZ2UgYnVmZmVyIGJpbmRpbmcgb24gdmVydGV4IHN0YWdlAFZBTElEQVRFX0FCTkRfVlNfVU5FWFBFQ1RFRF9JTUFHRV9CSU5ESU5HOiBzZ19hcHBseV9iaW5kaW5nczogdW5leHBlY3RlZCBpbWFnZSBiaW5kaW5nIG9uIHZlcnRleCBzdGFnZQBWQUxJREFURV9BQk5EX1ZTX0VYUEVDVEVEX0RFUFRIX0lNQUdFOiBzZ19hcHBseV9iaW5kaW5nczogZGVwdGggaW1hZ2UgZXhwZWN0ZWQgb24gdmVydGV4IHN0YWdlAFZBTElEQVRFX0FCTkRfVlNfRVhQRUNURURfRklMVEVSQUJMRV9JTUFHRTogc2dfYXBwbHlfYmluZGluZ3M6IGZpbHRlcmFibGUgaW1hZ2UgZXhwZWN0ZWQgb24gdmVydGV4IHN0YWdlAFZBTElEQVRFX0FCTkRfRlNfSU1BR0VfTVNBQTogc2dfYXBwbHlfYmluZGluZ3M6IGNhbm5vdCBiaW5kIGltYWdlIHdpdGggc2FtcGxlX2NvdW50PjEgdG8gZnJhZ21lbnQgc3RhZ2UAVkFMSURBVEVfQUJORF9GU19VTkVYUEVDVEVEX1NBTVBMRVJfQklORElORzogc2dfYXBwbHlfYmluZGluZ3M6IHVuZXhwZWN0ZWQgc2FtcGxlciBiaW5kaW5nIG9uIGZyYWdtZW50IHN0YWdlAFZBTElEQVRFX0FCTkRfRlNfVU5FWFBFQ1RFRF9TVE9SQUdFQlVGRkVSX0JJTkRJTkc6IHNnX2FwcGx5X2JpbmRpbmdzOiB1bmV4cGVjdGVkIHN0b3JhZ2UgYnVmZmVyIGJpbmRpbmcgb24gZnJhZ21lbnQgc3RhZ2UAVkFMSURBVEVfQUJORF9GU19VTkVYUEVDVEVEX0lNQUdFX0JJTkRJTkc6IHNnX2FwcGx5X2JpbmRpbmdzOiB1bmV4cGVjdGVkIGltYWdlIGJpbmRpbmcgb24gZnJhZ21lbnQgc3RhZ2UAVkFMSURBVEVfQUJORF9GU19FWFBFQ1RFRF9ERVBUSF9JTUFHRTogc2dfYXBwbHlfYmluZGluZ3M6IGRlcHRoIGltYWdlIGV4cGVjdGVkIG9uIGZyYWdtZW50IHN0YWdlAFZBTElEQVRFX0FCTkRfRlNfRVhQRUNURURfRklMVEVSQUJMRV9JTUFHRTogc2dfYXBwbHlfYmluZGluZ3M6IGZpbHRlcmFibGUgaW1hZ2UgZXhwZWN0ZWQgb24gZnJhZ21lbnQgc3RhZ2UAX3NnX2dsX3VzYWdlAHNnX2Rlc3Ryb3lfaW1hZ2UAX3NnX3VuaW5pdF9pbWFnZQBfc2dfaW5pdF9pbWFnZQBzZ3BfdW5zZXRfaW1hZ2UAc2dwX3Jlc2V0X2ltYWdlAHNncF9zZXRfaW1hZ2UAX3NnX2dsX2F0dGFjaG1lbnRzX2RzX2ltYWdlAF9zZ19nbF9hdHRhY2htZW50c19jb2xvcl9pbWFnZQBfc2dfZ2xfYXR0YWNobWVudHNfcmVzb2x2ZV9pbWFnZQBfc2dfZ2xfY3JlYXRlX2ltYWdlAHNnX21ha2VfaW1hZ2UAX3NnX2dsX2Rpc2NhcmRfaW1hZ2UAX3NnX2RlYWxsb2NfaW1hZ2UAVkFMSURBVEVfSU1BR0VERVNDX05PTlJUX1BJWEVMRk9STUFUOiBpbnZhbGlkIHBpeGVsIGZvcm1hdCBmb3Igbm9uLXJlbmRlci10YXJnZXQgaW1hZ2UAVkFMSURBVEVfSU1BR0VERVNDX1JUX1BJWEVMRk9STUFUOiBpbnZhbGlkIHBpeGVsIGZvcm1hdCBmb3IgcmVuZGVyLXRhcmdldCBpbWFnZQBTR1AgZmFpbGVkIHRvIGNyZWF0ZSB3aGl0ZSBpbWFnZQBWQUxJREFURV9VUERJTUdfVVNBR0U6IHNnX3VwZGF0ZV9pbWFnZTogY2Fubm90IHVwZGF0ZSBpbW11dGFibGUgaW1hZ2UAc2dwX3Jlc2V0X2JsZW5kX21vZGUAc2dwX3NldF9ibGVuZF9tb2RlAEludmFsaWQgZXJyb3IgY29kZQBOdW1wYWREaXZpZGUAV0dQVV9DUkVBVEVfSU5TVEFOQ0VfRkFJTEVEOiB3Z3B1OiBmYWlsZWQgdG8gY3JlYXRlIGluc3RhbmNlAHNhcHBfd2dwdV9nZXRfZGV2aWNlAHNhcHBfbWV0YWxfZ2V0X2RldmljZQBzYXBwX2QzZDExX2dldF9kZXZpY2UAQmFja3NwYWNlAFNwYWNlAFdJTjMyX0QzRDExX1FVRVJZX0lOVEVSRkFDRV9JRFhHSURFVklDRTFfRkFJTEVEOiBjb3VsZCBub3Qgb2J0YWluIElEWEdJRGV2aWNlMSBpbnRlcmZhY2UAY29vcmQAUGVyaW9kAExJTlVYX0dMWF9FWFRFTlNJT05fTk9UX0ZPVU5EOiBHTFggZXh0ZW5zaW9uIG5vdCBmb3VuZABfZmxvYXRfYmxlbmQAc2dfcXVlcnlfYmFja2VuZABfc2dfZ2xfc2V0dXBfYmFja2VuZABfc2dfZ2xfZGlzY2FyZF9iYWNrZW5kAGRzdCA9PSBkc3RfZW5kAGRzdCA8IGRzdF9lbmQAc2dwX2VuZABibmQAX3NncF9tZXJnZV9iYXRjaF9jb21tYW5kAEVuZABWQUxJREFURV9BQk5EX1ZTX0VYUEVDVEVEX1NBTVBMRVJfQklORElORzogc2dfYXBwbHlfYmluZGluZ3M6IHNhbXBsZXIgYmluZGluZyBvbiB2ZXJ0ZXggc3RhZ2UgaXMgbWlzc2luZyBvciB0aGUgc2FtcGxlciBoYW5kbGUgaXMgaW52YWxpZABWQUxJREFURV9BQk5EX0ZTX0VYUEVDVEVEX1NBTVBMRVJfQklORElORzogc2dfYXBwbHlfYmluZGluZ3M6IHNhbXBsZXIgYmluZGluZyBvbiBmcmFnbWVudCBzdGFnZSBpcyBtaXNzaW5nIG9yIHRoZSBzYW1wbGVyIGhhbmRsZSBpcyBpbnZhbGlkAFZBTElEQVRFX0FCTkRfVlNfRVhQRUNURURfU1RPUkFHRUJVRkZFUl9CSU5ESU5HOiBzZ19hcHBseV9iaW5kaW5nczogc3RvcmFnZSBidWZmZXIgYmluZGluZyBvbiB2ZXJ0ZXggc3RhZ2UgaXMgbWlzc2luZyBvciB0aGUgYnVmZmVyIGhhbmRsZSBpcyBpbnZhbGlkAFZBTElEQVRFX0FCTkRfRlNfRVhQRUNURURfU1RPUkFHRUJVRkZFUl9CSU5ESU5HOiBzZ19hcHBseV9iaW5kaW5nczogc3RvcmFnZSBidWZmZXIgYmluZGluZyBvbiBmcmFnbWVudCBzdGFnZSBpcyBtaXNzaW5nIG9yIHRoZSBidWZmZXIgaGFuZGxlIGlzIGludmFsaWQAVkFMSURBVEVfQUJORF9WU19FWFBFQ1RFRF9JTUFHRV9CSU5ESU5HOiBzZ19hcHBseV9iaW5kaW5nczogaW1hZ2UgYmluZGluZyBvbiB2ZXJ0ZXggc3RhZ2UgaXMgbWlzc2luZyBvciB0aGUgaW1hZ2UgaGFuZGxlIGlzIGludmFsaWQAVkFMSURBVEVfQUJORF9GU19FWFBFQ1RFRF9JTUFHRV9CSU5ESU5HOiBzZ19hcHBseV9iaW5kaW5nczogaW1hZ2UgYmluZGluZyBvbiBmcmFnbWVudCBzdGFnZSBpcyBtaXNzaW5nIG9yIHRoZSBpbWFnZSBoYW5kbGUgaXMgaW52YWxpZABWQUxJREFURV9QSVBFTElORURFU0NfU0hBREVSOiBzZ19waXBlbGluZV9kZXNjLnNoYWRlciBtaXNzaW5nIG9yIGludmFsaWQAIV9zZy5jdXJfcGFzcy52YWxpZABfc2FwcC52YWxpZABfc2cuZ2wudmFsaWQAX3NnLnZhbGlkAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19JTUFHRTogcGFzcyBhdHRhY2htZW50IGltYWdlIGlzIG5vdCB2YWxpZABWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfREVQVEhfSU1BR0U6IHBhc3MgZGVwdGggYXR0YWNobWVudCBpbWFnZSBpcyBub3QgdmFsaWQAVkFMSURBVEVfQkVHSU5QQVNTX0NPTE9SX0FUVEFDSE1FTlRfSU1BR0U6IHNnX2JlZ2luX3Bhc3M6IG9uZSBvciBtb3JlIGNvbG9yIGF0dGFjaG1lbnQgaW1hZ2VzIGFyZSBub3QgdmFsaWQAVkFMSURBVEVfQkVHSU5QQVNTX0RFUFRIU1RFTkNJTF9BVFRBQ0hNRU5UX0lNQUdFOiBzZ19iZWdpbl9wYXNzOiBvbmUgb3IgbW9yZSBkZXB0aC1zdGVuY2lsIGF0dGFjaG1lbnQgaW1hZ2VzIGFyZSBub3QgdmFsaWQAVkFMSURBVEVfQkVHSU5QQVNTX1JFU09MVkVfQVRUQUNITUVOVF9JTUFHRTogc2dfYmVnaW5fcGFzczogb25lIG9yIG1vcmUgcmVzb2x2ZSBhdHRhY2htZW50IGltYWdlcyBhcmUgbm90IHZhbGlkAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19SRVNPTFZFX0lNQUdFOiBwYXNzIHJlc29sdmUgYXR0YWNobWVudCBpbWFnZSBub3QgdmFsaWQAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9FWFBFQ1RfQ09MT1JGT1JNQVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLmNvbG9yX2Zvcm1hdCB0byBiZSB2YWxpZABkZXNjLT5zaGFkZXIuaWQgPT0gc2hkLT5zbG90LmlkAGF0dHMtPnNsb3QuaWQgPT0gX3NnLmN1cl9wYXNzLmF0dHNfaWQuaWQAX3NnLmdsLmNhY2hlLmN1cl9waXBlbGluZS0+c2hhZGVyLT5zbG90LmlkID09IF9zZy5nbC5jYWNoZS5jdXJfcGlwZWxpbmUtPmNtbi5zaGFkZXJfaWQuaWQAX3NnLmdsLmNhY2hlLmN1cl9waXBlbGluZS0+c2xvdC5pZCA9PSBfc2cuZ2wuY2FjaGUuY3VyX3BpcGVsaW5lX2lkLmlkAHNoZABWQUxJREFURV9CRUdJTlBBU1NfQ0FOQVJZOiBzZ19iZWdpbl9wYXNzOiBwYXNzIHN0cnVjdCBub3QgaW5pdGlhbGl6ZWQAU29rb2wgaXMgbm90IGluaXRpYWxpemVkAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19DQU5BUlk6IHNnX2F0dGFjaG1lbnRzX2Rlc2Mgbm90IGluaXRpYWxpemVkAFZBTElEQVRFX1NBTVBMRVJERVNDX0NBTkFSWTogc2dfc2FtcGxlcl9kZXNjIG5vdCBpbml0aWFsaXplZABWQUxJREFURV9CVUZGRVJERVNDX0NBTkFSWTogc2dfYnVmZmVyX2Rlc2Mgbm90IGluaXRpYWxpemVkAFZBTElEQVRFX1NIQURFUkRFU0NfQ0FOQVJZOiBzZ19zaGFkZXJfZGVzYyBub3QgaW5pdGlhbGl6ZWQAVkFMSURBVEVfUElQRUxJTkVERVNDX0NBTkFSWTogc2dfcGlwZWxpbmVfZGVzYyBub3QgaW5pdGlhbGl6ZWQAVkFMSURBVEVfSU1BR0VERVNDX0NBTkFSWTogc2dfaW1hZ2VfZGVzYyBub3QgaW5pdGlhbGl6ZWQAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05OQVRJVkVXSU5ET1dERVNUUk9ZRUQ6IE5hdGl2ZUFjdGl2aXR5IG9uTmF0aXZlV2luZG93RGVzdHJveWVkAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OSU5QVVRRVUVVRURFU1RST1lFRDogTmF0aXZlQWN0aXZpdHkgb25JbnB1dFF1ZXVlRGVzdHJveWVkAEFORFJPSURfVU5LTk9XTl9NU0c6IHVua25vd24gbXNnIHR5cGUgcmVjZWl2ZWQAUEFTU19QT09MX0VYSEFVU1RFRDogcGFzcyBwb29sIGV4aGF1c3RlZABTQU1QTEVSX1BPT0xfRVhIQVVTVEVEOiBzYW1wbGVyIHBvb2wgZXhoYXVzdGVkAEJVRkZFUl9QT09MX0VYSEFVU1RFRDogYnVmZmVyIHBvb2wgZXhoYXVzdGVkAFNIQURFUl9QT09MX0VYSEFVU1RFRDogc2hhZGVyIHBvb2wgZXhoYXVzdGVkAFBJUEVMSU5FX1BPT0xfRVhIQVVTVEVEOiBwaXBlbGluZSBwb29sIGV4aGF1c3RlZABJTUFHRV9QT09MX0VYSEFVU1RFRDogaW1hZ2UgcG9vbCBleGhhdXN0ZWQAQU5EUk9JRF9MT09QX1RIUkVBRF9TVEFSVEVEOiBsb29wIHRocmVhZCBzdGFydGVkAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX0NSRUFURV9TVUNDRVNTOiBOYXRpdmVBY3Rpdml0eSBzdWNjZXNzZnVsbHkgY3JlYXRlZABBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTk5BVElWRVdJTkRPV0NSRUFURUQ6IE5hdGl2ZUFjdGl2aXR5IG9uTmF0aXZlV2luZG93Q3JlYXRlZABBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTklOUFVUUVVFVUVDUkVBVEVEOiBOYXRpdmVBY3Rpdml0eSBvbklucHV0UXVldWVDcmVhdGVkAFdJTjMyX1dHTF9BUkJfQ1JFQVRFX0NPTlRFWFRfUkVRVUlSRUQ6IEFSQl9jcmVhdGVfY29udGV4dCByZXF1aXJlZABXSU4zMl9XR0xfQVJCX0NSRUFURV9DT05URVhUX1BST0ZJTEVfUkVRVUlSRUQ6IEFSQl9jcmVhdGVfY29udGV4dF9wcm9maWxlIHJlcXVpcmVkAFZBTElEQVRFX1NIQURFUkRFU0NfU09VUkNFX09SX0JZVEVDT0RFOiBzaGFkZXIgc291cmNlIG9yIGJ5dGUgY29kZSByZXF1aXJlZABWQUxJREFURV9TSEFERVJERVNDX0JZVEVDT0RFOiBzaGFkZXIgYnl0ZSBjb2RlIHJlcXVpcmVkAFZBTElEQVRFX1NIQURFUkRFU0NfU09VUkNFOiBzaGFkZXIgc291cmNlIGNvZGUgcmVxdWlyZWQAVkFMSURBVEVfU0hBREVSREVTQ19OT19CWVRFQ09ERV9TSVpFOiBzaGFkZXIgYnl0ZSBjb2RlIGxlbmd0aCAoaW4gYnl0ZXMpIHJlcXVpcmVkAFRSQUNFX0hPT0tTX05PVF9FTkFCTEVEOiBzZ19pbnN0YWxsX3RyYWNlX2hvb2tzKCkgY2FsbGVkLCBidXQgU09LT0xfVFJBQ0VfSE9PS1MgaXMgbm90IGRlZmluZWQAVkFMSURBVEVfSU1BR0VERVNDX01TQUFfQlVUX05PX1JUOiBub24tcmVuZGVyLXRhcmdldCBpbWFnZXMgY2Fubm90IGJlIG11bHRpc2FtcGxlZABWQUxJREFUSU9OX0ZBSUxFRDogdmFsaWRhdGlvbiBsYXllciBjaGVja3MgZmFpbGVkAFdHUFVfQ1JFQVRFQklOREdST1VQX0ZBSUxFRDogd2dwdURldmljZUNyZWF0ZUJpbmRHcm91cCBmYWlsZWQATUFMTE9DX0ZBSUxFRDogbWVtb3J5IGFsbG9jYXRpb24gZmFpbGVkAExJTlVYX0dMWF9HRVRfVklTVUFMX0ZST01fRkJDT05GSUdfRkFJTEVEOiBnbFhHZXRWaXN1YWxGcm9tRkJDb25maWcgZmFpbGVkAFdHUFVfU0hBREVSX0NSRUFURV9CSU5ER1JPVVBfTEFZT1VUX0ZBSUxFRDogd2dwdURldmljZUNyZWF0ZUJpbmRHcm91cExheW91dCgpIGZvciBzaGFkZXIgc3RhZ2UgZmFpbGVkAExJTlVYX0VHTF9OT19OQVRJVkVfVklTVUFMOiBlZ2xHZXRDb25maWdBdHRyaWIoKSBmb3IgRUdMX05BVElWRV9WSVNVQUxfSUQgZmFpbGVkAExJTlVYX0VHTF9CSU5EX09QRU5HTF9FU19BUElfRkFJTEVEOiBlZ2xCaW5kQVBJKEVHTF9PUEVOR0xfRVNfQVBJKSBmYWlsZWQATElOVVhfRUdMX0JJTkRfT1BFTkdMX0FQSV9GQUlMRUQ6IGVnbEJpbmRBUEkoRUdMX09QRU5HTF9BUEkpIGZhaWxlZABMSU5VWF9FR0xfR0VUX0RJU1BMQVlfRkFJTEVEOiBlZ2xHZXREaXNwbGF5KCkgZmFpbGVkAExJTlVYX1gxMV9PUEVOX0RJU1BMQVlfRkFJTEVEOiBYT3BlbkRpc3BsYXkoKSBmYWlsZWQATElOVVhfR0xYX0NSRUFURV9XSU5ET1dfRkFJTEVEOiBnbFhDcmVhdGVXaW5kb3coKSBmYWlsZWQATElOVVhfWDExX0NSRUFURV9XSU5ET1dfRkFJTEVEOiBYQ3JlYXRlV2luZG93KCkgZmFpbGVkAFdHUFVfQ1JFQVRFX1RFWFRVUkVfVklFV19GQUlMRUQ6IHdncHVUZXh0dXJlQ3JlYXRlVmlldygpIGZhaWxlZABMSU5VWF9FR0xfQ1JFQVRFX0NPTlRFWFRfRkFJTEVEOiBlZ2xDcmVhdGVDb250ZXh0KCkgZmFpbGVkAFdHUFVfQ1JFQVRFX1BJUEVMSU5FX0xBWU9VVF9GQUlMRUQ6IHdncHVEZXZpY2VDcmVhdGVQaXBlbGluZUxheW91dCgpIGZhaWxlZABMSU5VWF9FR0xfTUFLRV9DVVJSRU5UX0ZBSUxFRDogZWdsTWFrZUN1cnJlbnQoKSBmYWlsZWQAV0dQVV9DUkVBVEVfU0FNUExFUl9GQUlMRUQ6IHdncHVEZXZpY2VDcmVhdGVTYW1wbGVyKCkgZmFpbGVkAFdHUFVfQ1JFQVRFX0JVRkZFUl9GQUlMRUQ6IHdncHVEZXZpY2VDcmVhdGVCdWZmZXIoKSBmYWlsZWQATElOVVhfRUdMX0dFVF9WSVNVQUxfSU5GT19GQUlMRUQ6IFhHZXRWaXN1YWxJbmZvKCkgZmFpbGVkAExJTlVYX0VHTF9JTklUSUFMSVpFX0ZBSUxFRDogZWdsSW5pdGlhbGl6ZSgpIGZhaWxlZABXR1BVX0NSRUFURV9URVhUVVJFX0ZBSUxFRDogd2dwdURldmljZUNyZWF0ZVRleHR1cmUoKSBmYWlsZWQAV0dQVV9DUkVBVEVfUkVOREVSX1BJUEVMSU5FX0ZBSUxFRDogd2dwdURldmljZUNyZWF0ZVJlbmRlclBpcGVsaW5lKCkgZmFpbGVkAFdHUFVfQ1JFQVRFX1NIQURFUl9NT0RVTEVfRkFJTEVEOiB3Z3B1RGV2aWNlQ3JlYXRlU2hhZGVyTW9kdWxlKCkgZmFpbGVkAExJTlVYX0VHTF9DUkVBVEVfV0lORE9XX1NVUkZBQ0VfRkFJTEVEOiBlZ2xDcmVhdGVXaW5kb3dTdXJmYWNlKCkgZmFpbGVkAFdJTjMyX0dFVF9SQVdfSU5QVVRfREFUQV9GQUlMRUQ6IEdldFJhd0lucHV0RGF0YSgpIGZhaWxlZABfc2FwcF9lbXNjX3NpemVfY2hhbmdlZABBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTldJTkRPV0ZPQ1VTQ0hBTkdFRDogTmF0aXZlQWN0aXZpdHkgb25XaW5kb3dGb2N1c0NoYW5nZWQAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05DT05GSUdVUkFUSU9OQ0hBTkdFRDogTmF0aXZlQWN0aXZpdHkgb25Db25maWd1cmF0aW9uQ2hhbmdlZABWQUxJREFURV9BQk5EX0lCOiBzZ19hcHBseV9iaW5kaW5nczogcGlwZWxpbmUgb2JqZWN0IGRlZmluZXMgbm9uLWluZGV4ZWQgcmVuZGVyaW5nLCBidXQgaW5kZXggYnVmZmVyIHByb3ZpZGVkAFZBTElEQVRFX0FCTkRfTk9fSUI6IHNnX2FwcGx5X2JpbmRpbmdzOiBwaXBlbGluZSBvYmplY3QgZGVmaW5lcyBpbmRleGVkIHJlbmRlcmluZywgYnV0IG5vIGluZGV4IGJ1ZmZlciBwcm92aWRlZABWQUxJREFURV9BUElQX1BJUEVMSU5FX1ZBTElEX0lEOiBzZ19hcHBseV9waXBlbGluZTogaW52YWxpZCBwaXBlbGluZSBpZCBwcm92aWRlZABOdW1wYWRBZGQAX2NvbXByZXNzZWRfdGV4dHVyZV9hc3RjAF90ZXh0dXJlX2NvbXByZXNzaW9uX3B2cnRjAFdFQktJVF9XRUJHTF9jb21wcmVzc2VkX3RleHR1cmVfcHZydGMAX3RleHR1cmVfY29tcHJlc3Npb25fYnB0YwBfdGV4dHVyZV9jb21wcmVzc2lvbl9yZ3RjAF9jb21wcmVzc2VkX3RleHR1cmVfZXRjAF90ZXh0dXJlX2NvbXByZXNzaW9uX3MzdGMAX2NvbXByZXNzZWRfdGV4dHVyZV9zM3RjAF9zZ192YWxpZGF0ZV9zYW1wbGVyX2Rlc2MAX3NnX3ZhbGlkYXRlX2J1ZmZlcl9kZXNjAF9zZ192YWxpZGF0ZV9zaGFkZXJfZGVzYwBfc2FwcF92YWxpZGF0ZV9pY29uX2Rlc2MAX3NnX3ZhbGlkYXRlX3BpcGVsaW5lX2Rlc2MAX3NnX3ZhbGlkYXRlX2ltYWdlX2Rlc2MAVkFMSURBVEVfQUJORF9WU19JTUFHRV9UWVBFX01JU01BVENIOiBzZ19hcHBseV9iaW5kaW5nczogdHlwZSBvZiBpbWFnZSBib3VuZCB0byB2ZXJ0ZXggc3RhZ2UgZG9lc24ndCBtYXRjaCBzaGFkZXIgZGVzYwBWQUxJREFURV9BQk5EX0ZTX0lNQUdFX1RZUEVfTUlTTUFUQ0g6IHNnX2FwcGx5X2JpbmRpbmdzOiB0eXBlIG9mIGltYWdlIGJvdW5kIHRvIGZyYWdtZW50IHN0YWdlIGRvZXNuJ3QgbWF0Y2ggc2hhZGVyIGRlc2MAc21wICYmIGRlc2MAaW1nICYmIGRlc2MAYnVmICYmIGRlc2MAcGlwICYmIHNoZCAmJiBkZXNjAHNyYwBfc2FwcF9tYWxsb2MAX3NnX21hbGxvYwBfc2dfc2xvdF9hbGxvYwBfc2dfZ2xfY29tcGFyZV9mdW5jAF90ZXh0dXJlX2ZpbHRlcl9hbmlzb3Ryb3BpYwBwYW5pYwB2YgBhdHRzLT5nbC5mYgBUYWIAVkFMSURBVEVfQlVGRkVSREVTQ19OT19EQVRBOiBkeW5hbWljL3N0cmVhbSB1c2FnZSBidWZmZXJzIGNhbm5vdCBiZSBpbml0aWFsaXplZCB3aXRoIGRhdGEAVkFMSURBVEVfSU1BR0VERVNDX0lOSkVDVEVEX05PX0RBVEE6IGltYWdlcyB3aXRoIGluamVjdGVkIHRleHR1cmVzIGNhbm5vdCBiZSBpbml0aWFsaXplZCB3aXRoIGRhdGEAVkFMSURBVEVfSU1BR0VERVNDX1JUX05PX0RBVEE6IHJlbmRlciB0YXJnZXQgaW1hZ2VzIGNhbm5vdCBiZSBpbml0aWFsaXplZCB3aXRoIGRhdGEAVkFMSURBVEVfSU1BR0VERVNDX0RZTkFNSUNfTk9fREFUQTogZHluYW1pYy9zdHJlYW0gaW1hZ2VzIGNhbm5vdCBiZSBpbml0aWFsaXplZCB3aXRoIGRhdGEAQ29tbWEAaW1nLT5nbC50ZXhbc2xvdF0AZGVzYy0+Z2xfYnVmZmVyc1tzbG90XQBkZXNjLT5nbF90ZXh0dXJlc1tzbG90XQBbAEtleVoAS2V5WQBBTkRST0lEX01TR19ERVNUUk9ZOiBNU0dfREVTVFJPWQBLZXlYAEtleVcAQU5EUk9JRF9NU0dfU0VUX05BVElWRV9XSU5ET1c6IE1TR19TRVRfTkFUSVZFX1dJTkRPVwBLZXlWAEtleVUAS2V5VABLZXlTAEFORFJPSURfTVNHX05PX0ZPQ1VTOiBNU0dfTk9fRk9DVVMAQU5EUk9JRF9NU0dfRk9DVVM6IE1TR19GT0NVUwBhX3N0YXRlLT5idWZmZXJfaW5kZXggPCBTR19NQVhfVkVSVEVYX0JVRkZFUlMAYnVmLT5jbW4uYWN0aXZlX3Nsb3QgPCBTR19OVU1fSU5GTElHSFRfRlJBTUVTAG51bV9pbWFnZXMgPD0gU0FQUF9NQVhfSUNPTklNQUdFUwBLZXlSAFZBTElEQVRFX0FCTkRfVlNfVU5FWFBFQ1RFRF9TQU1QTEVSX0NPTVBBUkVfTkVWRVI6IHNnX2FwcGx5X2JpbmRpbmdzOiBzaGFkZXIgZXhwZWN0cyBTR19TQU1QTEVSVFlQRV9DT01QQVJJU09OIG9uIHZlcnRleCBzdGFnZSBidXQgc2FtcGxlciBoYXMgU0dfQ09NUEFSRUZVTkNfTkVWRVIAVkFMSURBVEVfQUJORF9GU19VTkVYUEVDVEVEX1NBTVBMRVJfQ09NUEFSRV9ORVZFUjogc2dfYXBwbHlfYmluZGluZ3M6IHNoYWRlciBleHBlY3RzIFNHX1NBTVBMRVJUWVBFX0NPTVBBUklTT04gb24gZnJhZ21lbnQgc3RhZ2UgYnV0IHNhbXBsZXIgaGFzIFNHX0NPTVBBUkVGVU5DX05FVkVSAFZBTElEQVRFX0FCTkRfVlNfRVhQRUNURURfU0FNUExFUl9DT01QQVJFX05FVkVSOiBzZ19hcHBseV9iaW5kaW5nczogc2hhZGVyIGV4cGVjdHMgU0dfU0FNUExFUlRZUEVfRklMVEVSSU5HIG9yIFNHX1NBTVBMRVJUWVBFX05PTkZJTFRFUklORyBvbiB2ZXJ0ZXggc3RhZ2UgYnV0IHNhbXBsZXIgZG9lc24ndCBoYXZlIFNHX0NPTVBBUkVGVU5DX05FVkVSAFZBTElEQVRFX0FCTkRfRlNfRVhQRUNURURfU0FNUExFUl9DT01QQVJFX05FVkVSOiBzZ19hcHBseV9iaW5kaW5nczogc2hhZGVyIGV4cGVjdHMgU0dfU0FNUExFUlRZUEVfRklMVEVSSU5HIG9uIGZyYWdtZW50IHN0YWdlIGJ1dCBzYW1wbGVyIGRvZXNuJ3QgaGF2ZSBTR19DT01QQVJFRlVOQ19ORVZFUgBWQUxJREFURV9BQk5EX1ZCX1RZUEU6IHNnX2FwcGx5X2JpbmRpbmdzOiBidWZmZXIgaW4gdmVydGV4IGJ1ZmZlciBzbG90IGlzIG5vdCBhIFNHX0JVRkZFUlRZUEVfVkVSVEVYQlVGRkVSAFZBTElEQVRFX0FCTkRfSUJfVFlQRTogc2dfYXBwbHlfYmluZGluZ3M6IGJ1ZmZlciBpbiBpbmRleCBidWZmZXIgc2xvdCBpcyBub3QgYSBTR19CVUZGRVJUWVBFX0lOREVYQlVGRkVSAFZBTElEQVRFX1NBTVBMRVJERVNDX0FOSVNUUk9QSUNfUkVRVUlSRVNfTElORUFSX0ZJTFRFUklORzogc2dfc2FtcGxlcl9kZXNjLm1heF9hbmlzb3Ryb3B5ID4gMSByZXF1aXJlcyBtaW4vbWFnL21pcG1hcF9maWx0ZXIgdG8gYmUgU0dfRklMVEVSX0xJTkVBUgBLZXlRAEtleVAAS2V5TwBLZXlOAE5BTgBLZXlNAEtleUwATElOVVhfR0xYX0xPQURfTElCR0xfRkFJTEVEOiBmYWlsZWQgdG8gbG9hZCBsaWJHTABzbG90LT5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0lOSVRJQUwAc21wLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfSU5JVElBTABwaXAtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9JTklUSUFMAGltZy0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0lOSVRJQUwAYnVmLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfSU5JVElBTABzaGQtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9JTklUSUFMAEtleUsAS2V5SgBLZXlJAEtleUgAS2V5RwBLZXlGAElORgBLZXlFAEFORFJPSURfTVNHX1NFVF9JTlBVVF9RVUVVRTogTVNHX1NFVF9JTlBVVF9RVUVVRQBBTkRST0lEX01TR19DUkVBVEU6IE1TR19DUkVBVEUAQU5EUk9JRF9NU0dfUEFVU0U6IE1TR19QQVVTRQBwYXNzX2RlZi5zd2FwY2hhaW4uY29sb3JfZm9ybWF0ID4gU0dfUElYRUxGT1JNQVRfTk9ORQBBTkRST0lEX01TR19SRVNVTUU6IE1TR19SRVNVTUUAVkFMSURBVEVfSU1BR0VERVNDX1JUX0lNTVVUQUJMRTogcmVuZGVyIHRhcmdldCBpbWFnZXMgbXVzdCBiZSBTR19VU0FHRV9JTU1VVEFCTEUAX3NncC5pbml0X2Nvb2tpZSA9PSBfU0dQX0lOSVRfQ09PS0lFAEtleUQAVEVYQ09PUkQAc2xvdC0+aWQgPT0gU0dfSU5WQUxJRF9JRABfc2dwLnN0YXRlLnBpcGVsaW5lLmlkICE9IFNHX0lOVkFMSURfSUQAdS0+dHlwZSAhPSBTR19VTklGT1JNVFlQRV9JTlZBTElEAFZBTElEQVRFX0JFR0lOUEFTU19BVFRBQ0hNRU5UU19WQUxJRDogc2dfYmVnaW5fcGFzczogYXR0YWNobWVudHMgb2JqZWN0IG5vdCBpbiByZXNvdXJjZSBzdGF0ZSBWQUxJRABLZXlDAHNtcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0FMTE9DAHBpcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0FMTE9DAGltZy0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0FMTE9DAGJ1Zi0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0FMTE9DAHNoZC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0FMTE9DAFdJTjMyX0hFTFBFUl9XSU5ET1dfR0VURENfRkFJTEVEOiBmYWlsZWQgdG8gZ2V0IGhlbHBlciB3aW5kb3cgREMAS2V5QgBMSU5VWF9HTFhfQ1JFQVRFX0NPTlRFWFRfRkFJTEVEOiBGYWlsZWQgdG8gY3JlYXRlIEdMIGNvbnRleHQgdmlhIGdsWENyZWF0ZUNvbnRleHRBdHRyaWJzQVJCAFdJTjMyX1dHTF9JTkNPTVBBVElCTEVfREVWSUNFX0NPTlRFWFQ6IENyZWF0ZUNvbnRleHRBdHRyaWJzQVJCIGZhaWxlZCB3aXRoIEVSUk9SX0lOQ09NUEFUSUJMRV9ERVZJQ0VfQ09OVEVYVFNfQVJCAEtleUEAPGZgPAZmPABbbGluZToAW2lkOgBEaWdpdDkATnVtcGFkOQBGOQBEaWdpdDgATnVtcGFkOABGOABEaWdpdDcATnVtcGFkNwBGNwBEaWdpdDYATnVtcGFkNgBGNgBEaWdpdDUATnVtcGFkNQBGNQBEaWdpdDQATnVtcGFkNABGNABWQUxJREFURV9QSVBFTElORURFU0NfTEFZT1VUX1NUUklERTQ6IHNnX3BpcGVsaW5lX2Rlc2MubGF5b3V0LmJ1ZmZlcnNbXS5zdHJpZGUgbXVzdCBiZSBtdWx0aXBsZSBvZiA0AFZBTElEQVRFX0JVRkZFUkRFU0NfU1RPUkFHRUJVRkZFUl9TSVpFX01VTFRJUExFXzQ6IHNpemUgb2Ygc3RvcmFnZSBidWZmZXJzIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0AGNoYW5uZWwgPj0gMCAmJiBjaGFubmVsIDwgNABzaXplIDw9IHNpemVvZihmbG9hdCkgKiA0AERpZ2l0MwBOdW1wYWQzAEYzAERpZ2l0MgBOdW1wYWQyAEYyAF9zZ19hbGlnbl91MzIARjEyAERpZ2l0MQBOdW1wYWQxAEYxAEYxMQBnbF9hdHRyLT52Yl9pbmRleCA9PSAtMQBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfUkVTT0xWRV9TQU1QTEVfQ09VTlQ6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50IGltYWdlIHNhbXBsZSBjb3VudCBtdXN0IGJlIDEAVkFMSURBVEVfSU1BR0VERVNDX01TQUFfM0RfSU1BR0U6IDNEIGltYWdlcyBjYW5ub3QgaGF2ZSBhIHNhbXBsZV9jb3VudCA+IDEAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfQ09MT1JfSU1BR0VfTVNBQTogcGFzcyByZXNvbHZlIGF0dGFjaG1lbnRzIG11c3QgaGF2ZSBhIGNvbG9yIGF0dGFjaG1lbnQgaW1hZ2Ugd2l0aCBzYW1wbGUgY291bnQgPiAxAFZBTElEQVRFX1NIQURFUkRFU0NfVUJfQVJSQVlfQ09VTlQ6IHVuaWZvcm0gYXJyYXkgY291bnQgbXVzdCBiZSA+PSAxAFZBTElEQVRFX0lNQUdFREVTQ19NU0FBX05VTV9NSVBNQVBTOiBNU0FBIGltYWdlcyBtdXN0IGhhdmUgbnVtX21pcG1hcHMgPT0gMQBEaWdpdDAAbWFpbjAAbnVsbDAAaVRleENoYW5uZWwwX2lTbXBDaGFubmVsMABOdW1wYWQwAHZzXzRfMABwc180XzAARjEwAExJTlVYX1gxMV9RVUVSWV9TWVNURU1fRFBJX0ZBSUxFRDogZmFpbGVkIHRvIHF1ZXJ5IHN5c3RlbSBkcGkgdmFsdWUsIGFzc3VtaW5nIGRlZmF1bHQgOTYuMABWQUxJREFURV9CVUZGRVJERVNDX1NJWkU6IHNnX2J1ZmZlcl9kZXNjLnNpemUgYW5kIC5kYXRhLnNpemUgY2Fubm90IGJvdGggYmUgMABhcnJheV9jb3VudCA+IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9FWFBFQ1RfU0FNUExFQ09VTlQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLnNhbXBsZV9jb3VudCA+IDAAcGFzc19kZWYuc3dhcGNoYWluLnNhbXBsZV9jb3VudCA+IDAAaW50ZXJfY21kX2NvdW50ID4gMABkZXNjLT5oZWlnaHQgPiAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRVhQRUNUX0hFSUdIVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uaGVpZ2h0ID4gMABwYXNzX2RlZi5zd2FwY2hhaW4uaGVpZ2h0ID4gMABkZXNjLT5tYXhfY29tbWl0X2xpc3RlbmVycyA+IDAAdC0+bnVtID4gMABkZXNjLT53aWR0aCA+IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9FWFBFQ1RfV0lEVEg6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLndpZHRoID4gMABwYXNzX2RlZi5zd2FwY2hhaW4ud2lkdGggPiAwAHViX2Rlc2MtPnNpemUgPiAwAGRlc2MtPnBpeGVscy5zaXplID4gMABfc2dwLmN1cl9zdGF0ZSA+IDAAbF9zdGF0ZS0+c3RyaWRlID4gMABWQUxJREFURV9JTUFHRURFU0NfSEVJR0hUOiBzZ19pbWFnZV9kZXNjLmhlaWdodCBtdXN0IGJlID4gMABWQUxJREFURV9JTUFHRURFU0NfV0lEVEg6IHNnX2ltYWdlX2Rlc2Mud2lkdGggbXVzdCBiZSA+IDAAZGVzYy0+c2FtcGxlX2NvdW50ID49IDAAYmFzZV9lbGVtZW50ID49IDAAZGVzYy0+aGVpZ2h0ID49IDAAbnVtX2VsZW1lbnRzID49IDAAZGVzYy0+bWF4X2Ryb3BwZWRfZmlsZXMgPj0gMABudW1faW5zdGFuY2VzID49IDAAZGVzYy0+c3dhcF9pbnRlcnZhbCA+PSAwAGRlc2MtPm1heF9kcm9wcGVkX2ZpbGVfcGF0aF9sZW5ndGggPj0gMABkZXNjLT53aWR0aCA+PSAwAGRlc2MtPmNsaXBib2FyZF9zaXplID49IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9XR1BVX0VYUEVDVF9SRU5ERVJWSUVXX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ud2dwdS5yZW5kZXJfdmlldyA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRDNEMTFfRVhQRUNUX1JFTkRFUlZJRVdfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5kM2QxMS5yZW5kZXJfdmlldyA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fV0dQVV9FWFBFQ1RfREVQVEhTVEVOQ0lMVklFV19OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLndncHUuZGVwdGhfc3RlbmNpbF92aWV3ID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9EM0QxMV9FWFBFQ1RfREVQVEhTVEVOQ0lMVklFV19OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLmQzZDExLmRlcHRoX3N0ZW5jaWxfdmlldyA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fV0dQVV9FWFBFQ1RfUkVTT0xWRVZJRVdfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi53Z3B1LnJlc29sdmVfdmlldyA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRDNEMTFfRVhQRUNUX1JFU09MVkVWSUVXX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uZDNkMTEucmVzb2x2ZV92aWV3ID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9FWFBFQ1RfU0FNUExFQ09VTlRfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5zYW1wbGVfY291bnQgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0VYUEVDVF9IRUlHSFRfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5oZWlnaHQgPT0gMABfc2cuY3VyX3Bhc3MuYXR0cyA9PSAwAHN0YWdlLT5udW1fc2FtcGxlcnMgPT0gMABzdGFnZS0+bnVtX2ltYWdlX3NhbXBsZXJzID09IDAAc3RhZ2UtPm51bV9zdG9yYWdlX2J1ZmZlcnMgPT0gMAB1Yi0+bnVtX3VuaWZvcm1zID09IDAAc3RhZ2UtPm51bV91bmlmb3JtX2Jsb2NrcyA9PSAwAHN0YWdlLT5udW1faW1hZ2VzID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9HTF9FWFBFQ1RfRlJBTUVCVUZGRVJfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5nbC5mcmFtZWJ1ZmZlciA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRVhQRUNUX1dJRFRIX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ud2lkdGggPT0gMABfc2dwLmN1cl9zdGF0ZSA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fTUVUQUxfRVhQRUNUX01TQUFDT0xPUlRFWFRVUkVfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5tZXRhbC5tc2FhX2NvbG9yX3RleHR1cmUgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX01FVEFMX0VYUEVDVF9ERVBUSFNURU5DSUxURVhUVVJFX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ubWV0YWwuZGVwdGhfc3RlbmNpbF90ZXh0dXJlID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9NRVRBTF9FWFBFQ1RfQ1VSUkVOVERSQVdBQkxFX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ubWV0YWwuY3VycmVudF9kcmF3YWJsZSA9PSAwAF9zZ3AuaW5pdF9jb29raWUgPT0gMAAoZGltICUgOCkgPT0gMABnbEdldEVycm9yKCkgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX1dHUFVfRVhQRUNUX1JFTkRFUlZJRVc6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLndncHUucmVuZGVyX3ZpZXcgIT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0QzRDExX0VYUEVDVF9SRU5ERVJWSUVXOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5kM2QxMS5yZW5kZXJfdmlldyAhPSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fV0dQVV9FWFBFQ1RfREVQVEhTVEVOQ0lMVklFVzogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ud2dwdS5kZXB0aF9zdGVuY2lsX3ZpZXcgIT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0QzRDExX0VYUEVDVF9ERVBUSFNURU5DSUxWSUVXOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5kM2QxMS5kZXB0aF9zdGVuY2lsX3ZpZXcgIT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX1dHUFVfRVhQRUNUX1JFU09MVkVWSUVXOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi53Z3B1LnJlc29sdmVfdmlldyAhPSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRDNEMTFfRVhQRUNUX1JFU09MVkVWSUVXOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5kM2QxMS5yZXNvbHZlX3ZpZXcgIT0gMABzbG90LT50YXJnZXQgIT0gMABkZXNjLT5waXhlbHMucHRyICE9IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9NRVRBTF9FWFBFQ1RfTVNBQUNPTE9SVEVYVFVSRTogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ubWV0YWwubXNhYV9jb2xvcl90ZXh0dXJlICE9IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9NRVRBTF9FWFBFQ1RfREVQVEhTVEVOQ0lMVEVYVFVSRTogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ubWV0YWwuZGVwdGhfc3RlbmNpbF90ZXh0dXJlICE9IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9NRVRBTF9FWFBFQ1RfQ1VSUkVOVERSQVdBQkxFOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5tZXRhbC5jdXJyZW50X2RyYXdhYmxlICE9IDAAV0lOMzJfRDNEMTFfQ1JFQVRFX0RFVklDRV9BTkRfU1dBUENIQUlOX1dJVEhfREVCVUdfRkFJTEVEOiBEM0QxMUNyZWF0ZURldmljZUFuZFN3YXBDaGFpbigpIHdpdGggRDNEMTFfQ1JFQVRFX0RFVklDRV9ERUJVRyBmYWlsZWQsIHJldHJ5aW5nIHdpdGhvdXQgZGVidWcgZmxhZy4AVkFMSURBVEVfU0hBREVSREVTQ19TVE9SQUdFQlVGRkVSX1JFQURPTkxZOiBzaGFkZXIgc3RhZ2Ugc3RvcmFnZSBidWZmZXJzIG11c3QgYmUgcmVhZG9ubHkgKHNnX3NoYWRlcl9kZXNjLnZzfGZzLnN0b3JhZ2VfYnVmZmVyc1tdLnJlYWRvbmx5KQBXR1BVX1NIQURFUl9UT09fTUFOWV9TQU1QTEVSUzogc2hhZGVyIHVzZXMgdG9vIG1hbnkgc2FtcGxlcnMgb24gc2hhZGVyIHN0YWdlICh3Z3B1KQBXR1BVX1NIQURFUl9UT09fTUFOWV9TVE9SQUdFQlVGRkVSUzogc2hhZGVyIHVzZXMgdG9vIG1hbnkgc3RvcmFnZSBidWZmZXIgYmluZGluZ3Mgb24gc2hhZGVyIHN0YWdlICh3Z3B1KQBXR1BVX1NIQURFUl9UT09fTUFOWV9JTUFHRVM6IHNoYWRlciB1c2VzIHRvbyBtYW55IHNhbXBsZWQgaW1hZ2VzIG9uIHNoYWRlciBzdGFnZSAod2dwdSkAV0dQVV9CSU5ER1JPVVBTQ0FDSEVfU0laRV9QT1cyOiBzZ19kZXNjLndncHVfYmluZGdyb3Vwc19jYWNoZV9zaXplIG11c3QgYmUgYSBwb3dlciBvZiAyICh3Z3B1KQBXR1BVX0JJTkRHUk9VUFNDQUNIRV9TSVpFX0dSRUFURVJfT05FOiBzZ19kZXNjLndncHVfYmluZGdyb3Vwc19jYWNoZV9zaXplIG11c3QgYmUgPiAxICh3Z3B1KQBXR1BVX0JJTkRHUk9VUFNfUE9PTF9FWEhBVVNURUQ6IGJpbmRncm91cHMgcG9vbCBleGhhdXN0ZWQgKGluY3JlYXNlIHNnX2Rlc2MuYmluZGdyb3Vwc19jYWNoZV9zaXplKSAod2dwdSkAVkFMSURBVEVfU0hBREVSREVTQ19TQU1QTEVSX05PVF9SRUZFUkVOQ0VEX0JZX0lNQUdFX1NBTVBMRVJfUEFJUlM6IHNoYWRlciBzdGFnZTogb25lIG9yIG1vcmUgc2FtcGxlcnMgYXJlIG5vdCByZWZlcmVuY2VkIGJ5IGltYWdlLXNhbXBsZXItcGFpcnMgKHNnX3NoYWRlcl9kZXNjLnZzfGZzLmltYWdlX3NhbXBsZXJfcGFpcnNbXS5zYW1wbGVyX3Nsb3QpAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfU0FNUExFUl9QQUlSX1NBTVBMRVJfU0xPVF9PVVRfT0ZfUkFOR0U6IHNoYWRlciBzdGFnZTogaW1hZ2Utc2FtcGxlci1wYWlyIGltYWdlIHNsb3QgaW5kZXggaXMgb3V0IG9mIHJhbmdlIChzZ19zaGFkZXJfZGVzYy52c3xmcy5pbWFnZV9zYW1wbGVyX3BhaXJzW10uc2FtcGxlcl9zbG90KQBWQUxJREFURV9TSEFERVJERVNDX0lNQUdFX1NBTVBMRVJfUEFJUl9JTUFHRV9TTE9UX09VVF9PRl9SQU5HRTogc2hhZGVyIHN0YWdlOiBpbWFnZS1zYW1wbGVyLXBhaXIgaW1hZ2Ugc2xvdCBpbmRleCBpcyBvdXQgb2YgcmFuZ2UgKHNnX3NoYWRlcl9kZXNjLnZzfGZzLmltYWdlX3NhbXBsZXJfcGFpcnNbXS5pbWFnZV9zbG90KQBWQUxJREFURV9TSEFERVJERVNDX0lNQUdFX05PVF9SRUZFUkVOQ0VEX0JZX0lNQUdFX1NBTVBMRVJfUEFJUlM6IHNoYWRlciBzdGFnZTogb25lIG9yIG1vcmUgaW1hZ2VzIGFyZSBub3RlIHJlZmVyZW5jZWQgYnkgIChzZ19zaGFkZXJfZGVzYy52c3xmcy5pbWFnZV9zYW1wbGVyX3BhaXJzW10uaW1hZ2Vfc2xvdCkAKDB4ODg5MiA9PSB0YXJnZXQpIHx8ICgweDg4OTMgPT0gdGFyZ2V0KSB8fCAoMHg5MEQyID09IHRhcmdldCkAKGltZ19zbXBfZGVzYy0+c2FtcGxlcl9zbG90ID49IDApICYmIChpbWdfc21wX2Rlc2MtPnNhbXBsZXJfc2xvdCA8IHN0YWdlLT5udW1fc2FtcGxlcnMpAElNQUdFX0RBVEFfU0laRV9NSVNNQVRDSDogaW1hZ2UgZGF0YSBzaXplIG1pc21hdGNoIChtdXN0IGJlIHdpZHRoKmhlaWdodCo0IGJ5dGVzKQAoaW5kZXggPj0gMCkgJiYgKGluZGV4IDw9IF9zYXBwLmRyb3AubWF4X2ZpbGVzKQAoaW1nX3NtcF9kZXNjLT5pbWFnZV9zbG90ID49IDApICYmIChpbWdfc21wX2Rlc2MtPmltYWdlX3Nsb3QgPCBzdGFnZS0+bnVtX2ltYWdlcykAc2dwX2dldF9lcnJvcl9tZXNzYWdlKGVycm9yKQBWQUxJREFURV9JTUFHRURBVEFfTk9EQVRBOiBzZ19pbWFnZV9kYXRhOiBubyBkYXRhICgucHRyIGFuZC9vciAuc2l6ZSBpcyB6ZXJvKQAoZGVzYy0+YWxsb2NhdG9yLmFsbG9jX2ZuICYmIGRlc2MtPmFsbG9jYXRvci5mcmVlX2ZuKSB8fCAoIWRlc2MtPmFsbG9jYXRvci5hbGxvY19mbiAmJiAhZGVzYy0+YWxsb2NhdG9yLmZyZWVfZm4pAChudWxsKQBHTF9WRVJURVhfQVRUUklCVVRFX05PVF9GT1VORF9JTl9TSEFERVI6IHZlcnRleCBhdHRyaWJ1dGUgbm90IGZvdW5kIGluIHNoYWRlciAoZ2wpAEdMX1RFWFRVUkVfTkFNRV9OT1RfRk9VTkRfSU5fU0hBREVSOiB0ZXh0dXJlIG5hbWUgbm90IGZvdW5kIGluIHNoYWRlciAoZ2wpAEdMX1RFWFRVUkVfRk9STUFUX05PVF9TVVBQT1JURUQ6IHBpeGVsIGZvcm1hdCBub3Qgc3VwcG9ydGVkIGZvciB0ZXh0dXJlIChnbCkAR0xfQVJSQVlfVEVYVFVSRVNfTk9UX1NVUFBPUlRFRDogYXJyYXkgdGV4dHVyZXMgbm90IHN1cHBvcnRlZCAoZ2wpAEdMXzNEX1RFWFRVUkVTX05PVF9TVVBQT1JURUQ6IDNkIHRleHR1cmVzIG5vdCBzdXBwb3J0ZWQgKGdsKQBHTF9TSEFERVJfQ09NUElMQVRJT05fRkFJTEVEOiBzaGFkZXIgY29tcGlsYXRpb24gZmFpbGVkIChnbCkAR0xfU0hBREVSX0xJTktJTkdfRkFJTEVEOiBzaGFkZXIgbGlua2luZyBmYWlsZWQgKGdsKQBHTF9GUkFNRUJVRkZFUl9TVEFUVVNfSU5DT01QTEVURV9NSVNTSU5HX0FUVEFDSE1FTlQ6IGZyYW1lYnVmZmVyIGNvbXBsZXRlbmVzcyBjaGVjayBmYWlsZWQgd2l0aCBHTF9GUkFNRUJVRkZFUl9JTkNPTVBMRVRFX01JU1NJTkdfQVRUQUNITUVOVCAoZ2wpAEdMX0ZSQU1FQlVGRkVSX1NUQVRVU19JTkNPTVBMRVRFX0FUVEFDSE1FTlQ6IGZyYW1lYnVmZmVyIGNvbXBsZXRlbmVzcyBjaGVjayBmYWlsZWQgd2l0aCBHTF9GUkFNRUJVRkZFUl9JTkNPTVBMRVRFX0FUVEFDSE1FTlQgKGdsKQBHTF9GUkFNRUJVRkZFUl9TVEFUVVNfSU5DT01QTEVURV9NVUxUSVNBTVBMRTogZnJhbWVidWZmZXIgY29tcGxldGVuZXNzIGNoZWNrIGZhaWxlZCB3aXRoIEdMX0ZSQU1FQlVGRkVSX0lOQ09NUExFVEVfTVVMVElTQU1QTEUgKGdsKQBHTF9GUkFNRUJVRkZFUl9TVEFUVVNfVU5TVVBQT1JURUQ6IGZyYW1lYnVmZmVyIGNvbXBsZXRlbmVzcyBjaGVjayBmYWlsZWQgd2l0aCBHTF9GUkFNRUJVRkZFUl9VTlNVUFBPUlRFRCAoZ2wpAEdMX0ZSQU1FQlVGRkVSX1NUQVRVU19VTkRFRklORUQ6IGZyYW1lYnVmZmVyIGNvbXBsZXRlbmVzcyBjaGVjayBmYWlsZWQgd2l0aCBHTF9GUkFNRUJVRkZFUl9VTkRFRklORUQgKGdsKQBHTF9GUkFNRUJVRkZFUl9TVEFUVVNfVU5LTk9XTjogZnJhbWVidWZmZXIgY29tcGxldGVuZXNzIGNoZWNrIGZhaWxlZCAodW5rbm93biByZWFzb24pIChnbCkATUVUQUxfQ1JFQVRFX1NBTVBMRVJfRkFJTEVEOiBmYWlsZWQgdG8gY3JlYXRlIHNhbXBsZXIgb2JqZWN0IChtZXRhbCkATUVUQUxfQ1JFQVRFX0JVRkZFUl9GQUlMRUQ6IGZhaWxlZCB0byBjcmVhdGUgYnVmZmVyIG9iamVjdCAobWV0YWwpAE1FVEFMX0NSRUFURV9URVhUVVJFX0ZBSUxFRDogZmFpbGVkIHRvIGNyZWF0ZSB0ZXh0dXJlIG9iamVjdCAobWV0YWwpAE1FVEFMX0NSRUFURV9EU1NfRkFJTEVEOiBmYWlsZWQgdG8gY3JlYXRlIGRlcHRoIHN0ZW5jaWwgc3RhdGUgKG1ldGFsKQBNRVRBTF9DUkVBVEVfUlBTX0ZBSUxFRDogZmFpbGVkIHRvIGNyZWF0ZSByZW5kZXIgcGlwZWxpbmUgc3RhdGUgKG1ldGFsKQBNRVRBTF9URVhUVVJFX0ZPUk1BVF9OT1RfU1VQUE9SVEVEOiBwaXhlbCBmb3JtYXQgbm90IHN1cHBvcnRlZCBmb3IgdGV4dHVyZSAobWV0YWwpAE1FVEFMX0ZSQUdNRU5UX1NIQURFUl9FTlRSWV9OT1RfRk9VTkQ6IGZyYWdtZW50IHNoYWRlciBlbnRyeSBub3QgZm91bmQgKG1ldGFsKQBNRVRBTF9WRVJURVhfU0hBREVSX0VOVFJZX05PVF9GT1VORDogdmVydGV4IHNoYWRlciBlbnRyeSBmdW5jdGlvbiBub3QgZm91bmQgKG1ldGFsKQBNRVRBTF9TSEFERVJfQ09NUElMQVRJT05fRkFJTEVEOiBzaGFkZXIgY29tcGlsYXRpb24gZmFpbGVkIChtZXRhbCkATUVUQUxfU0hBREVSX0NSRUFUSU9OX0ZBSUxFRDogc2hhZGVyIGNyZWF0aW9uIGZhaWxlZCAobWV0YWwpAFdJTjMyX1JFR0lTVEVSX1JBV19JTlBVVF9ERVZJQ0VTX0ZBSUxFRF9NT1VTRV9VTkxPQ0s6IFJlZ2lzdGVyUmF3SW5wdXREZXZpY2VzKCkgZmFpbGVkIChvbiBtb3VzZSB1bmxvY2spAFdJTjMyX1JFR0lTVEVSX1JBV19JTlBVVF9ERVZJQ0VTX0ZBSUxFRF9NT1VTRV9MT0NLOiBSZWdpc3RlclJhd0lucHV0RGV2aWNlcygpIGZhaWxlZCAob24gbW91c2UgbG9jaykARFJPUFBFRF9GSUxFX1BBVEhfVE9PX0xPTkc6IGRyb3BwZWQgZmlsZSBwYXRoIHRvbyBsb25nIChzYXBwX2Rlc2MubWF4X2Ryb3BwZWRfZmlsZWRfcGF0aF9sZW5ndGgpACFfc2FwcF9yaW5nX2VtcHR5KHJpbmcpACFfc2FwcF9yaW5nX2Z1bGwocmluZykAKHNsb3RfaW5kZXggPiAwKSAmJiAoc2xvdF9pbmRleCA8IHBvb2wtPnNpemUpAChzbG90X2luZGV4ID4gKDApKSAmJiAoc2xvdF9pbmRleCA8IHBvb2wtPnNpemUpAChzbG90X2luZGV4ID4gKDApKSAmJiAoc2xvdF9pbmRleCA8IHAtPmF0dGFjaG1lbnRzX3Bvb2wuc2l6ZSkAKHNsb3RfaW5kZXggPiAoMCkpICYmIChzbG90X2luZGV4IDwgcC0+c2FtcGxlcl9wb29sLnNpemUpAChzbG90X2luZGV4ID4gKDApKSAmJiAoc2xvdF9pbmRleCA8IHAtPmJ1ZmZlcl9wb29sLnNpemUpAChzbG90X2luZGV4ID4gKDApKSAmJiAoc2xvdF9pbmRleCA8IHAtPnNoYWRlcl9wb29sLnNpemUpAChzbG90X2luZGV4ID4gKDApKSAmJiAoc2xvdF9pbmRleCA8IHAtPnBpcGVsaW5lX3Bvb2wuc2l6ZSkAKHNsb3RfaW5kZXggPiAoMCkpICYmIChzbG90X2luZGV4IDwgcC0+aW1hZ2VfcG9vbC5zaXplKQBWQUxJREFURV9CVUZGRVJERVNDX0RBVEE6IGltbXV0YWJsZSBidWZmZXJzIG11c3QgYmUgaW5pdGlhbGl6ZWQgd2l0aCBkYXRhIChzZ19idWZmZXJfZGVzYy5kYXRhLnB0ciBhbmQgc2dfYnVmZmVyX2Rlc2MuZGF0YS5zaXplKQBWQUxJREFURV9TSEFERVJERVNDX0lNQUdFX1NBTVBMRVJfUEFJUl9OQU1FX1JFUVVJUkVEX0ZPUl9HTDogc2hhZGVyIHN0YWdlOiBpbWFnZS1zYW1wbGVyLXBhaXJzIG11c3QgYmUgbmFtZWQgaW4gR0wgKHNnX3NoYWRlcl9kZXNjLnZzfGZzLmltYWdlX3NhbXBsZXJfcGFpcnNbXS5uYW1lKQBwICYmIChTR19JTlZBTElEX0lEICE9IGF0dHNfaWQpAHAgJiYgKFNHX0lOVkFMSURfSUQgIT0gc21wX2lkKQBwICYmIChTR19JTlZBTElEX0lEICE9IHBpcF9pZCkAcCAmJiAoU0dfSU5WQUxJRF9JRCAhPSBpbWdfaWQpAHAgJiYgKFNHX0lOVkFMSURfSUQgIT0gYnVmX2lkKQBwICYmIChTR19JTlZBTElEX0lEICE9IHNoZF9pZCkAcGlwLT5zaGFkZXIgJiYgKHBpcC0+Y21uLnNoYWRlcl9pZC5pZCA9PSBwaXAtPnNoYWRlci0+c2xvdC5pZCkAcGlwICYmIChwaXAtPnNsb3QuaWQgPT0gX3NnLmN1cl9waXBlbGluZS5pZCkAcGlwLT5zaGFkZXIgJiYgKHBpcC0+c2hhZGVyLT5zbG90LmlkID09IHBpcC0+Y21uLnNoYWRlcl9pZC5pZCkAVkFMSURBVEVfU0hBREVSREVTQ19OT19DT05UX0lNQUdFX1NBTVBMRVJfUEFJUlM6IHNoYWRlciBzdGFnZSBpbWFnZS1zYW1wbGVyLXBhaXJzIG11c3Qgb2NjdXB5IGNvbnRpbnVvdXMgc2xvdHMgKHNnX3NoYWRlcl9kZXNjLnZzfGZzLmltYWdlX3NhbXBsZXJzW10pAFZBTElEQVRFX1NIQURFUkRFU0NfTk9fQ09OVF9TQU1QTEVSUzogc2hhZGVyIHN0YWdlIHNhbXBsZXJzIG11c3Qgb2NjdXB5IGNvbnRpbnVvdXMgc2xvdHMgKHNnX3NoYWRlcl9kZXNjLnZzfGZzLnNhbXBsZXJzW10pAFZBTElEQVRFX1NIQURFUkRFU0NfTk9fQ09OVF9TVE9SQUdFQlVGRkVSUzogc2hhZGVyIHN0YWdlIHN0b3JhZ2UgYnVmZmVycyBtdXN0IG9jY3VweSBjb250aW51b3VzIHNsb3RzIChzZ19zaGFkZXJfZGVzYy52c3xmcy5zdG9yYWdlX2J1ZmZlcnNbXSkAVkFMSURBVEVfU0hBREVSREVTQ19OT19DT05UX0lNQUdFUzogc2hhZGVyIHN0YWdlIGltYWdlcyBtdXN0IG9jY3VweSBjb250aW51b3VzIHNsb3RzIChzZ19zaGFkZXJfZGVzYy52c3xmcy5pbWFnZXNbXSkAKGRlc2MtPmNvbG9yX2NvdW50ID49IDApICYmIChkZXNjLT5jb2xvcl9jb3VudCA8PSBTR19NQVhfQ09MT1JfQVRUQUNITUVOVFMpAGF0dHMgJiYgKGluZGV4ID49IDApICYmIChpbmRleCA8IFNHX01BWF9DT0xPUl9BVFRBQ0hNRU5UUykAKHNsb3QgPj0gMCkgJiYgKHNsb3QgPCBTR19NQVhfU0hBREVSU1RBR0VfU1RPUkFHRUJVRkZFUlMpAChzdGFnZV9pbmRleCA9PSBTR19TSEFERVJTVEFHRV9WUykgfHwgKHN0YWdlX2luZGV4ID09IFNHX1NIQURFUlNUQUdFX0ZTKQAoc3RhZ2UgPT0gU0dfU0hBREVSU1RBR0VfVlMpIHx8IChzdGFnZSA9PSBTR19TSEFERVJTVEFHRV9GUykAKHN0YWdlID49IDApICYmIChzdGFnZSA8IFNHX05VTV9TSEFERVJfU1RBR0VTKQAobnVtX2ltYWdlcyA+IDApICYmIChudW1faW1hZ2VzIDw9IFNBUFBfTUFYX0lDT05JTUFHRVMpACh1Yl9pbmRleCA+PSAwKSAmJiAodWJfaW5kZXggPCBTR19NQVhfU0hBREVSU1RBR0VfVUJTKQAoZm10X2luZGV4ID4gU0dfUElYRUxGT1JNQVRfTk9ORSkgJiYgKGZtdF9pbmRleCA8IF9TR19QSVhFTEZPUk1BVF9OVU0pAChmbXRfaW5kZXggPj0gMCkgJiYgKGZtdF9pbmRleCA8IF9TR19QSVhFTEZPUk1BVF9OVU0pACgoaW50KWZtdCA+PSAwKSAmJiAoKGludClmbXQgPCBfU0dfUElYRUxGT1JNQVRfTlVNKQAoZGVzYy0+YXR0YWNobWVudHNfcG9vbF9zaXplID4gMCkgJiYgKGRlc2MtPmF0dGFjaG1lbnRzX3Bvb2xfc2l6ZSA8IF9TR19NQVhfUE9PTF9TSVpFKQAoZGVzYy0+c2FtcGxlcl9wb29sX3NpemUgPiAwKSAmJiAoZGVzYy0+c2FtcGxlcl9wb29sX3NpemUgPCBfU0dfTUFYX1BPT0xfU0laRSkAKGRlc2MtPmJ1ZmZlcl9wb29sX3NpemUgPiAwKSAmJiAoZGVzYy0+YnVmZmVyX3Bvb2xfc2l6ZSA8IF9TR19NQVhfUE9PTF9TSVpFKQAoZGVzYy0+c2hhZGVyX3Bvb2xfc2l6ZSA+IDApICYmIChkZXNjLT5zaGFkZXJfcG9vbF9zaXplIDwgX1NHX01BWF9QT09MX1NJWkUpAChkZXNjLT5waXBlbGluZV9wb29sX3NpemUgPiAwKSAmJiAoZGVzYy0+cGlwZWxpbmVfcG9vbF9zaXplIDwgX1NHX01BWF9QT09MX1NJWkUpAChkZXNjLT5pbWFnZV9wb29sX3NpemUgPiAwKSAmJiAoZGVzYy0+aW1hZ2VfcG9vbF9zaXplIDwgX1NHX01BWF9QT09MX1NJWkUpAHNtcCAmJiAoc21wLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfQUxMT0MpICYmIChzbXAtPnNsb3QuaWQgIT0gU0dfSU5WQUxJRF9JRCkAcGlwICYmIChwaXAtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9BTExPQykgJiYgKHBpcC0+c2xvdC5pZCAhPSBTR19JTlZBTElEX0lEKQBpbWcgJiYgKGltZy0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0FMTE9DKSAmJiAoaW1nLT5zbG90LmlkICE9IFNHX0lOVkFMSURfSUQpAGJ1ZiAmJiAoYnVmLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfQUxMT0MpICYmIChidWYtPnNsb3QuaWQgIT0gU0dfSU5WQUxJRF9JRCkAc2hkICYmIChzaGQtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9BTExPQykgJiYgKHNoZC0+c2xvdC5pZCAhPSBTR19JTlZBTElEX0lEKQAocGlwLT5zaGFkZXIgPT0gMCkgJiYgKHBpcC0+Y21uLnNoYWRlcl9pZC5pZCAhPSBTR19JTlZBTElEX0lEKQAoc21wLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfVkFMSUQpfHwoc21wLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfRkFJTEVEKQAoc21wLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfVkFMSUQpIHx8IChzbXAtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9GQUlMRUQpAChwaXAtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9WQUxJRCl8fChwaXAtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9GQUlMRUQpAChwaXAtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9WQUxJRCkgfHwgKHBpcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0ZBSUxFRCkAKGltZy0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX1ZBTElEKXx8KGltZy0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0ZBSUxFRCkAKGltZy0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX1ZBTElEKSB8fCAoaW1nLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfRkFJTEVEKQAoYnVmLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfVkFMSUQpfHwoYnVmLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfRkFJTEVEKQAoYnVmLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfVkFMSUQpIHx8IChidWYtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9GQUlMRUQpAChzaGQtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9WQUxJRCl8fChzaGQtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9GQUlMRUQpAChzaGQtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9WQUxJRCkgfHwgKHNoZC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0ZBSUxFRCkAc21wICYmIChzbXAtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9BTExPQykAcGlwICYmIChwaXAtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9BTExPQykAaW1nICYmIChpbWctPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9BTExPQykAYnVmICYmIChidWYtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9BTExPQykAc2hkICYmIChzaGQtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9BTExPQykAV0lOMzJfV0dMX09QRU5HTF9WRVJTSU9OX05PVF9TVVBQT1JURUQ6IHJlcXVlc3RlZCBPcGVuR0wgdmVyc2lvbiBub3Qgc3VwcG9ydGVkIGJ5IEdMIGRyaXZlciAoRVJST1JfSU5WQUxJRF9WRVJTSU9OX0FSQikAV0lOMzJfV0dMX09QRU5HTF9QUk9GSUxFX05PVF9TVVBQT1JURUQ6IHJlcXVlc3RlZCBPcGVuR0wgcHJvZmlsZSBub3Qgc3VwcG9ydCBieSBHTCBkcml2ZXIgKEVSUk9SX0lOVkFMSURfUFJPRklMRV9BUkIpAFZBTElEQVRFX1NIQURFUkRFU0NfQVRUUl9TVFJJTkdfVE9PX0xPTkc6IHZlcnRleCBhdHRyaWJ1dGUgbmFtZS9zZW1hbnRpYyBzdHJpbmcgdG9vIGxvbmcgKG1heCBsZW4gMTYpAF9zZ19tdWx0aXBsZV91NjQoKHVpbnQ2NF90KXN0YXJ0X3BvcywgNCkAVkFMSURBVEVfQlVGRkVSREVTQ19TVE9SQUdFQlVGRkVSX1NVUFBPUlRFRDogc3RvcmFnZSBidWZmZXJzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGJhY2tlbmQgM0QgQVBJIChyZXF1aXJlcyBPcGVuR0wgPj0gNC4zKQBMSU5VWF9HTFhfVkVSU0lPTl9UT09fTE9XOiBHTFggdmVyc2lvbiB0b28gbG93IChuZWVkIGF0IGxlYXN0IDEuMykARDNEMTFfQ1JFQVRFX0NPTlNUQU5UX0JVRkZFUl9GQUlMRUQ6IENyZWF0ZUJ1ZmZlcigpIGZhaWxlZCBmb3IgdW5pZm9ybSBjb25zdGFudCBidWZmZXIgKGQzZDExKQBEM0QxMV9NQVBfRk9SX0FQUEVORF9CVUZGRVJfRkFJTEVEOiBNYXAoKSBmYWlsZWQgd2hlbiBhcHBlbmRpbmcgdG8gYnVmZmVyIChkM2QxMSkARDNEMTFfTUFQX0ZPUl9VUERBVEVfQlVGRkVSX0ZBSUxFRDogTWFwKCkgZmFpbGVkIHdoZW4gdXBkYXRpbmcgYnVmZmVyIChkM2QxMSkARDNEMTFfQ1JFQVRFX0JVRkZFUl9TUlZfRkFJTEVEOiBDcmVhdGVTaGFkZXJSZXNvdXJjZVZpZXcoKSBmYWlsZWQgZm9yIHN0b3JhZ2UgYnVmZmVyIChkM2QxMSkARDNEMTFfQ1JFQVRFXzJEX1RFWFRVUkVfVU5TVVBQT1JURURfUElYRUxfRk9STUFUOiBwaXhlbCBmb3JtYXQgbm90IHN1cHBvcnRlZCBmb3IgMmQtLCBjdWJlLSBvciBhcnJheS10ZXh0dXJlIChkM2QxMSkARDNEMTFfQ1JFQVRFXzJEX1NSVl9GQUlMRUQ6IENyZWF0ZVNoYWRlclJlc291cmNlVmlldygpIGZhaWxlZCBmb3IgMmQtLCBjdWJlLSBvciBhcnJheS10ZXh0dXJlIChkM2QxMSkARDNEMTFfQ1JFQVRFXzJEX1RFWFRVUkVfRkFJTEVEOiBDcmVhdGVUZXh0dXJlMkQoKSBmYWlsZWQgZm9yIDJkLSwgY3ViZS0gb3IgYXJyYXktdGV4dHVyZSAoZDNkMTEpAEQzRDExX0NSRUFURV9NU0FBX1RFWFRVUkVfRkFJTEVEOiBDcmVhdGVUZXh0dXJlMkQoKSBmYWlsZWQgZm9yIE1TQUEgcmVuZGVyIHRhcmdldCB0ZXh0dXJlIChkM2QxMSkARDNEMTFfQ1JFQVRFX0RFUFRIX1RFWFRVUkVfVU5TVVBQT1JURURfUElYRUxfRk9STUFUOiBwaXhlbCBmb3JtYXQgbm90IHN1cHBvcnRlZCBmb3IgZGVwdGgtc3RlbmNpbCB0ZXh0dXJlIChkM2QxMSkARDNEMTFfQ1JFQVRFX0RFUFRIX1RFWFRVUkVfRkFJTEVEOiBDcmVhdGVUZXh0dXJlMkQoKSBmYWlsZWQgZm9yIGRlcHRoLXN0ZW5jaWwgdGV4dHVyZSAoZDNkMTEpAEQzRDExX0NSRUFURV8zRF9TUlZfRkFJTEVEOiBDcmVhdGVTaGFkZXJSZXNvdXJjZVZpZXcoKSBmYWlsZWQgZm9yIDNkIHRleHR1cmUgKGQzZDExKQBEM0QxMV9DUkVBVEVfM0RfVEVYVFVSRV9VTlNVUFBPUlRFRF9QSVhFTF9GT1JNQVQ6IHBpeGVsIGZvcm1hdCBub3Qgc3VwcG9ydGVkIGZvciAzRCB0ZXh0dXJlIChkM2QxMSkARDNEMTFfTUFQX0ZPUl9VUERBVEVfSU1BR0VfRkFJTEVEOiBNYXAoKSBmYWlsZWQgd2hlbiB1cGRhdGluZyBpbWFnZSAoZDNkMTEpAEQzRDExX1NIQURFUl9DT01QSUxBVElPTl9GQUlMRUQ6IHNoYWRlciBjb21waWxhdGlvbiBmYWlsZWQgKGQzZDExKQBEM0QxMV9MT0FEX0QzRENPTVBJTEVSXzQ3X0RMTF9GQUlMRUQ6IGxvYWRpbmcgZDNkY29tcGlsZXJfNDcuZGxsIGZhaWxlZCAoZDNkMTEpAEQzRDExX0NSRUFURV9SVFZfRkFJTEVEOiBDcmVhdGVSZW5kZXJUYXJnZXRWaWV3KCkgZmFpbGVkIChkM2QxMSkARDNEMTFfQ1JFQVRFX0RTVl9GQUlMRUQ6IENyZWF0ZURlcHRoU3RlbmNpbFZpZXcoKSBmYWlsZWQgKGQzZDExKQBEM0QxMV9DUkVBVEVfSU5QVVRfTEFZT1VUX0ZBSUxFRDogQ3JlYXRlSW5wdXRMYXlvdXQoKSBmYWlsZWQgKGQzZDExKQBEM0QxMV9DUkVBVEVfQlVGRkVSX0ZBSUxFRDogQ3JlYXRlQnVmZmVyKCkgZmFpbGVkIChkM2QxMSkARDNEMTFfQ1JFQVRFX1JBU1RFUklaRVJfU1RBVEVfRkFJTEVEOiBDcmVhdGVSYXN0ZXJpemVyU3RhdGUoKSBmYWlsZWQgKGQzZDExKQBEM0QxMV9DUkVBVEVfU0FNUExFUl9TVEFURV9GQUlMRUQ6IENyZWF0ZVNhbXBsZXJTdGF0ZSgpIGZhaWxlZCAoZDNkMTEpAEQzRDExX0NSRUFURV9ERVBUSF9TVEVOQ0lMX1NUQVRFX0ZBSUxFRDogQ3JlYXRlRGVwdGhTdGVuY2lsU3RhdGUoKSBmYWlsZWQgKGQzZDExKQBEM0QxMV9DUkVBVEVfQkxFTkRfU1RBVEVfRkFJTEVEOiBDcmVhdGVCbGVuZFN0YXRlKCkgZmFpbGVkIChkM2QxMSkARDNEMTFfQ1JFQVRFXzNEX1RFWFRVUkVfRkFJTEVEOiBDcmVhdGVUZXh0dXJlM0QoKSBmYWlsZWQgKGQzZDExKQBNQUNPU19JTlZBTElEX05TT1BFTkdMX1BST0ZJTEU6IG1hY29zOiBpbnZhbGlkIE5TT3BlbkdMUHJvZmlsZSAodmFsaWQgY2hvaWNlcyBhcmUgMS4wIGFuZCA0LjEpAHBvb2wtPnF1ZXVlX3RvcCA8PSAocG9vbC0+c2l6ZS0xKQBwb29sICYmIChudW0gPj0gMSkAKGJpbmRpbmdzLT5fc3RhcnRfY2FuYXJ5ID09IDApICYmIChiaW5kaW5ncy0+X2VuZF9jYW5hcnk9PTApAChfc2FwcC5mcmFtZWJ1ZmZlcl93aWR0aCA+IDApICYmIChfc2FwcC5mcmFtZWJ1ZmZlcl9oZWlnaHQgPiAwKQBzcmMgJiYgZHN0ICYmIChtYXhfbGVuID4gMCkAYnVmICYmIGRhdGEgJiYgZGF0YS0+cHRyICYmIChkYXRhLT5zaXplID4gMCkAcHRyICYmIChzaXplID4gMCkAKHBhc3MtPl9zdGFydF9jYW5hcnkgPT0gMCkgJiYgKHBhc3MtPl9lbmRfY2FuYXJ5ID09IDApAChkZXNjLT5fc3RhcnRfY2FuYXJ5ID09IDApICYmIChkZXNjLT5fZW5kX2NhbmFyeSA9PSAwKQAoYWxpZ24gPiAwKSAmJiAoKGFsaWduICYgKGFsaWduIC0gMSkpID09IDApAChzbG90X2luZGV4ID49IDApICYmIChzbG90X2luZGV4IDwgKFNHX01BWF9TSEFERVJTVEFHRV9JTUFHRVNBTVBMRVJQQUlSUyAqIFNHX05VTV9TSEFERVJfU1RBR0VTKSkAc21wICYmICgoc21wLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfVkFMSUQpIHx8IChzbXAtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9GQUlMRUQpKQBwaXAgJiYgKChwaXAtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9WQUxJRCkgfHwgKHBpcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0ZBSUxFRCkpAGltZyAmJiAoKGltZy0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX1ZBTElEKSB8fCAoaW1nLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfRkFJTEVEKSkAYnVmICYmICgoYnVmLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfVkFMSUQpIHx8IChidWYtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9GQUlMRUQpKQBzaGQgJiYgKChzaGQtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9WQUxJRCkgfHwgKHNoZC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0ZBSUxFRCkpAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OU1RBUlQ6IE5hdGl2ZUFjdGl2aXR5IG9uU3RhcnQoKQBBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTlNUT1A6IE5hdGl2ZUFjdGl2aXR5IG9uU3RvcCgpAFZBTElEQVRFX0FVQl9OT19QSVBFTElORTogc2dfYXBwbHlfdW5pZm9ybXM6IG11c3QgYmUgY2FsbGVkIGFmdGVyIHNnX2FwcGx5X3BpcGVsaW5lKCkAQU5EUk9JRF9VTlNVUFBPUlRFRF9JTlBVVF9FVkVOVF9JTlBVVF9DQjogdW5zdXBwb3J0ZWQgaW5wdXQgZXZlbnQgZW5jb3VudGVyZWQgaW4gX3NhcHBfYW5kcm9pZF9pbnB1dF9jYigpAEFORFJPSURfUkVBRF9NU0dfRkFJTEVEOiBmYWlsZWQgdG8gcmVhZCBtZXNzYWdlIGluIF9zYXBwX2FuZHJvaWRfbWFpbl9jYigpAEFORFJPSURfVU5TVVBQT1JURURfSU5QVVRfRVZFTlRfTUFJTl9DQjogdW5zdXBwb3J0ZWQgaW5wdXQgZXZlbnQgZW5jb3VudGVyZWQgaW4gX3NhcHBfYW5kcm9pZF9tYWluX2NiKCkAV0dQVV9SRVFVRVNUX0FEQVBURVJfU1RBVFVTX0VSUk9SOiB3Z3B1OiByZXF1ZXN0aW5nIGFkYXB0ZXIgZmFpbGVkIHdpdGggc3RhdHVzICdlcnJvcicAV0dQVV9SRVFVRVNUX0RFVklDRV9TVEFUVVNfRVJST1I6IHdncHU6IHJlcXVlc3RpbmcgZGV2aWNlIGZhaWxlZCB3aXRoIHN0YXR1cyAnZXJyb3InAFdHUFVfUkVRVUVTVF9BREFQVEVSX1NUQVRVU19VTktOT1dOOiB3Z3B1OiByZXF1ZXN0aW5nIGFkYXB0ZXIgZmFpbGVkIHdpdGggc3RhdHVzICd1bmtub3duJwBXR1BVX1JFUVVFU1RfREVWSUNFX1NUQVRVU19VTktOT1dOOiB3Z3B1OiByZXF1ZXN0aW5nIGRldmljZSBmYWlsZWQgd2l0aCBzdGF0dXMgJ3Vua25vd24nAFdHUFVfUkVRVUVTVF9BREFQVEVSX1NUQVRVU19VTkFWQUlMQUJMRTogd2dwdTogcmVxdWVzdGluZyBhZGFwdGVyIGZhaWxlZCB3aXRoICd1bmF2YWlsYWJsZScATElOVVhfWDExX0RST1BQRURfRklMRV9VUklfV1JPTkdfU0NIRU1FOiBkcm9wcGVkIGZpbGUgVVJMIGRvZXNuJ3Qgc3RhcnQgd2l0aCAnZmlsZTovLycAaGVsbG8hAF0gAE1FVEFMX0NSRUFURV9SUFNfT1VUUFVUOiAATUVUQUxfU0hBREVSX0NPTVBJTEFUSU9OX09VVFBVVDogAEQzRDExX1NIQURFUl9DT01QSUxBVElPTl9PVVRQVVQ6IAA6MDogAGhvc3Q6IHRlc3Rfc3RydWN0X2luIC0gJXV4JXUKAGhvc3Q6IHRlc3RfYnl0ZXNfaW4gKCV1KSAtICV1ICV1ICV1ICV1CgBGYWlsZWQgdG8gY3JlYXRlIGdyYXBoaWNzIGNvbnRleHQ6ICVzCgBob3N0OiB0ZXN0X3N0cmluZ19pbiAtICVzCgBBQk9SVElORyBiZWNhdXNlIG9mIFtwYW5pY10KAEZhaWxlZCB0byBjcmVhdGUgZ3JhcGhpY3MgY29udGV4dCEKAAoKAAoJAAABAgMAyAAAAGQAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAD/////AACAvwAAgL8AAIA/AACAvwAAgD8AAIA/AACAvwAAgD8AAIC/AACAvwAAgD8AAIA///9/f///f3///3////9//wAAAAAAAIA/AACAPwAAgD8AAIA/AAAAAAAAAAAAAAAA//9/f///f3///3////9//yN2ZXJzaW9uIDQxMAoKbGF5b3V0KGxvY2F0aW9uID0gMCkgaW4gdmVjNCBjb29yZDsKbGF5b3V0KGxvY2F0aW9uID0gMCkgb3V0IHZlYzIgdGV4VVY7CmxheW91dChsb2NhdGlvbiA9IDEpIG91dCB2ZWM0IGlDb2xvcjsKbGF5b3V0KGxvY2F0aW9uID0gMSkgaW4gdmVjNCBjb2xvcjsKCnZvaWQgbWFpbigpCnsKICAgIGdsX1Bvc2l0aW9uID0gdmVjNChjb29yZC54eSwgMC4wLCAxLjApOwogICAgdGV4VVYgPSBjb29yZC56dzsKICAgIGlDb2xvciA9IGNvbG9yOwp9CgoAAAAAAAAAI3ZlcnNpb24gNDEwCgp1bmlmb3JtIHNhbXBsZXIyRCBpVGV4Q2hhbm5lbDBfaVNtcENoYW5uZWwwOwoKbGF5b3V0KGxvY2F0aW9uID0gMCkgb3V0IHZlYzQgZnJhZ0NvbG9yOwpsYXlvdXQobG9jYXRpb24gPSAwKSBpbiB2ZWMyIHRleFVWOwpsYXlvdXQobG9jYXRpb24gPSAxKSBpbiB2ZWM0IGlDb2xvcjsKCnZvaWQgbWFpbigpCnsKICAgIGZyYWdDb2xvciA9IHRleHR1cmUoaVRleENoYW5uZWwwX2lTbXBDaGFubmVsMCwgdGV4VVYpICogaUNvbG9yOwp9CgoAAAAAAAAAAAAAAAAjdmVyc2lvbiAzMDAgZXMKCmxheW91dChsb2NhdGlvbiA9IDApIGluIHZlYzQgY29vcmQ7Cm91dCB2ZWMyIHRleFVWOwpvdXQgdmVjNCBpQ29sb3I7CmxheW91dChsb2NhdGlvbiA9IDEpIGluIHZlYzQgY29sb3I7Cgp2b2lkIG1haW4oKQp7CiAgICBnbF9Qb3NpdGlvbiA9IHZlYzQoY29vcmQueHksIDAuMCwgMS4wKTsKICAgIHRleFVWID0gY29vcmQuenc7CiAgICBpQ29sb3IgPSBjb2xvcjsKfQoKAAAAAAAAAAAAAAAAAAAjdmVyc2lvbiAzMDAgZXMKcHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7CnByZWNpc2lvbiBoaWdocCBpbnQ7Cgp1bmlmb3JtIGhpZ2hwIHNhbXBsZXIyRCBpVGV4Q2hhbm5lbDBfaVNtcENoYW5uZWwwOwoKbGF5b3V0KGxvY2F0aW9uID0gMCkgb3V0IGhpZ2hwIHZlYzQgZnJhZ0NvbG9yOwppbiBoaWdocCB2ZWMyIHRleFVWOwppbiBoaWdocCB2ZWM0IGlDb2xvcjsKCnZvaWQgbWFpbigpCnsKICAgIGZyYWdDb2xvciA9IHRleHR1cmUoaVRleENoYW5uZWwwX2lTbXBDaGFubmVsMCwgdGV4VVYpICogaUNvbG9yOwp9CgoAAAAAAAAAAAAAAAAAc3RhdGljIGZsb2F0NCBnbF9Qb3NpdGlvbjsKc3RhdGljIGZsb2F0NCBjb29yZDsKc3RhdGljIGZsb2F0MiB0ZXhVVjsKc3RhdGljIGZsb2F0NCBpQ29sb3I7CnN0YXRpYyBmbG9hdDQgY29sb3I7CgpzdHJ1Y3QgU1BJUlZfQ3Jvc3NfSW5wdXQKewogICAgZmxvYXQ0IGNvb3JkIDogVEVYQ09PUkQwOwogICAgZmxvYXQ0IGNvbG9yIDogVEVYQ09PUkQxOwp9OwoKc3RydWN0IFNQSVJWX0Nyb3NzX091dHB1dAp7CiAgICBmbG9hdDIgdGV4VVYgOiBURVhDT09SRDA7CiAgICBmbG9hdDQgaUNvbG9yIDogVEVYQ09PUkQxOwogICAgZmxvYXQ0IGdsX1Bvc2l0aW9uIDogU1ZfUG9zaXRpb247Cn07Cgp2b2lkIHZlcnRfbWFpbigpCnsKICAgIGdsX1Bvc2l0aW9uID0gZmxvYXQ0KGNvb3JkLnh5LCAwLjBmLCAxLjBmKTsKICAgIHRleFVWID0gY29vcmQuenc7CiAgICBpQ29sb3IgPSBjb2xvcjsKfQoKU1BJUlZfQ3Jvc3NfT3V0cHV0IG1haW4oU1BJUlZfQ3Jvc3NfSW5wdXQgc3RhZ2VfaW5wdXQpCnsKICAgIGNvb3JkID0gc3RhZ2VfaW5wdXQuY29vcmQ7CiAgICBjb2xvciA9IHN0YWdlX2lucHV0LmNvbG9yOwogICAgdmVydF9tYWluKCk7CiAgICBTUElSVl9Dcm9zc19PdXRwdXQgc3RhZ2Vfb3V0cHV0OwogICAgc3RhZ2Vfb3V0cHV0LmdsX1Bvc2l0aW9uID0gZ2xfUG9zaXRpb247CiAgICBzdGFnZV9vdXRwdXQudGV4VVYgPSB0ZXhVVjsKICAgIHN0YWdlX291dHB1dC5pQ29sb3IgPSBpQ29sb3I7CiAgICByZXR1cm4gc3RhZ2Vfb3V0cHV0Owp9CgAAAAAAAAAAAAAAVGV4dHVyZTJEPGZsb2F0ND4gaVRleENoYW5uZWwwIDogcmVnaXN0ZXIodDApOwpTYW1wbGVyU3RhdGUgaVNtcENoYW5uZWwwIDogcmVnaXN0ZXIoczApOwoKc3RhdGljIGZsb2F0NCBmcmFnQ29sb3I7CnN0YXRpYyBmbG9hdDIgdGV4VVY7CnN0YXRpYyBmbG9hdDQgaUNvbG9yOwoKc3RydWN0IFNQSVJWX0Nyb3NzX0lucHV0CnsKICAgIGZsb2F0MiB0ZXhVViA6IFRFWENPT1JEMDsKICAgIGZsb2F0NCBpQ29sb3IgOiBURVhDT09SRDE7Cn07CgpzdHJ1Y3QgU1BJUlZfQ3Jvc3NfT3V0cHV0CnsKICAgIGZsb2F0NCBmcmFnQ29sb3IgOiBTVl9UYXJnZXQwOwp9OwoKdm9pZCBmcmFnX21haW4oKQp7CiAgICBmcmFnQ29sb3IgPSBpVGV4Q2hhbm5lbDAuU2FtcGxlKGlTbXBDaGFubmVsMCwgdGV4VVYpICogaUNvbG9yOwp9CgpTUElSVl9Dcm9zc19PdXRwdXQgbWFpbihTUElSVl9Dcm9zc19JbnB1dCBzdGFnZV9pbnB1dCkKewogICAgdGV4VVYgPSBzdGFnZV9pbnB1dC50ZXhVVjsKICAgIGlDb2xvciA9IHN0YWdlX2lucHV0LmlDb2xvcjsKICAgIGZyYWdfbWFpbigpOwogICAgU1BJUlZfQ3Jvc3NfT3V0cHV0IHN0YWdlX291dHB1dDsKICAgIHN0YWdlX291dHB1dC5mcmFnQ29sb3IgPSBmcmFnQ29sb3I7CiAgICByZXR1cm4gc3RhZ2Vfb3V0cHV0Owp9CgAAAAAAAAAjaW5jbHVkZSA8bWV0YWxfc3RkbGliPgojaW5jbHVkZSA8c2ltZC9zaW1kLmg+Cgp1c2luZyBuYW1lc3BhY2UgbWV0YWw7CgpzdHJ1Y3QgbWFpbjBfb3V0CnsKICAgIGZsb2F0MiB0ZXhVViBbW3VzZXIobG9jbjApXV07CiAgICBmbG9hdDQgaUNvbG9yIFtbdXNlcihsb2NuMSldXTsKICAgIGZsb2F0NCBnbF9Qb3NpdGlvbiBbW3Bvc2l0aW9uXV07Cn07CgpzdHJ1Y3QgbWFpbjBfaW4KewogICAgZmxvYXQ0IGNvb3JkIFtbYXR0cmlidXRlKDApXV07CiAgICBmbG9hdDQgY29sb3IgW1thdHRyaWJ1dGUoMSldXTsKfTsKCnZlcnRleCBtYWluMF9vdXQgbWFpbjAobWFpbjBfaW4gaW4gW1tzdGFnZV9pbl1dKQp7CiAgICBtYWluMF9vdXQgb3V0ID0ge307CiAgICBvdXQuZ2xfUG9zaXRpb24gPSBmbG9hdDQoaW4uY29vcmQueHksIDAuMCwgMS4wKTsKICAgIG91dC50ZXhVViA9IGluLmNvb3JkLnp3OwogICAgb3V0LmlDb2xvciA9IGluLmNvbG9yOwogICAgcmV0dXJuIG91dDsKfQoKAAAAAAAAAAAAAAAAAAAAACNpbmNsdWRlIDxtZXRhbF9zdGRsaWI+CiNpbmNsdWRlIDxzaW1kL3NpbWQuaD4KCnVzaW5nIG5hbWVzcGFjZSBtZXRhbDsKCnN0cnVjdCBtYWluMF9vdXQKewogICAgZmxvYXQ0IGZyYWdDb2xvciBbW2NvbG9yKDApXV07Cn07CgpzdHJ1Y3QgbWFpbjBfaW4KewogICAgZmxvYXQyIHRleFVWIFtbdXNlcihsb2NuMCldXTsKICAgIGZsb2F0NCBpQ29sb3IgW1t1c2VyKGxvY24xKV1dOwp9OwoKZnJhZ21lbnQgbWFpbjBfb3V0IG1haW4wKG1haW4wX2luIGluIFtbc3RhZ2VfaW5dXSwgdGV4dHVyZTJkPGZsb2F0PiBpVGV4Q2hhbm5lbDAgW1t0ZXh0dXJlKDApXV0sIHNhbXBsZXIgaVNtcENoYW5uZWwwIFtbc2FtcGxlcigwKV1dKQp7CiAgICBtYWluMF9vdXQgb3V0ID0ge307CiAgICBvdXQuZnJhZ0NvbG9yID0gaVRleENoYW5uZWwwLnNhbXBsZShpU21wQ2hhbm5lbDAsIGluLnRleFVWKSAqIGluLmlDb2xvcjsKICAgIHJldHVybiBvdXQ7Cn0KCgAAACNpbmNsdWRlIDxtZXRhbF9zdGRsaWI+CiNpbmNsdWRlIDxzaW1kL3NpbWQuaD4KCnVzaW5nIG5hbWVzcGFjZSBtZXRhbDsKCnN0cnVjdCBtYWluMF9vdXQKewogICAgZmxvYXQyIHRleFVWIFtbdXNlcihsb2NuMCldXTsKICAgIGZsb2F0NCBpQ29sb3IgW1t1c2VyKGxvY24xKV1dOwogICAgZmxvYXQ0IGdsX1Bvc2l0aW9uIFtbcG9zaXRpb25dXTsKfTsKCnN0cnVjdCBtYWluMF9pbgp7CiAgICBmbG9hdDQgY29vcmQgW1thdHRyaWJ1dGUoMCldXTsKICAgIGZsb2F0NCBjb2xvciBbW2F0dHJpYnV0ZSgxKV1dOwp9OwoKdmVydGV4IG1haW4wX291dCBtYWluMChtYWluMF9pbiBpbiBbW3N0YWdlX2luXV0pCnsKICAgIG1haW4wX291dCBvdXQgPSB7fTsKICAgIG91dC5nbF9Qb3NpdGlvbiA9IGZsb2F0NChpbi5jb29yZC54eSwgMC4wLCAxLjApOwogICAgb3V0LnRleFVWID0gaW4uY29vcmQuenc7CiAgICBvdXQuaUNvbG9yID0gaW4uY29sb3I7CiAgICByZXR1cm4gb3V0Owp9CgoAAAAAAAAAAAAAAAAAAAAAI2luY2x1ZGUgPG1ldGFsX3N0ZGxpYj4KI2luY2x1ZGUgPHNpbWQvc2ltZC5oPgoKdXNpbmcgbmFtZXNwYWNlIG1ldGFsOwoKc3RydWN0IG1haW4wX291dAp7CiAgICBmbG9hdDQgZnJhZ0NvbG9yIFtbY29sb3IoMCldXTsKfTsKCnN0cnVjdCBtYWluMF9pbgp7CiAgICBmbG9hdDIgdGV4VVYgW1t1c2VyKGxvY24wKV1dOwogICAgZmxvYXQ0IGlDb2xvciBbW3VzZXIobG9jbjEpXV07Cn07CgpmcmFnbWVudCBtYWluMF9vdXQgbWFpbjAobWFpbjBfaW4gaW4gW1tzdGFnZV9pbl1dLCB0ZXh0dXJlMmQ8ZmxvYXQ+IGlUZXhDaGFubmVsMCBbW3RleHR1cmUoMCldXSwgc2FtcGxlciBpU21wQ2hhbm5lbDAgW1tzYW1wbGVyKDApXV0pCnsKICAgIG1haW4wX291dCBvdXQgPSB7fTsKICAgIG91dC5mcmFnQ29sb3IgPSBpVGV4Q2hhbm5lbDAuc2FtcGxlKGlTbXBDaGFubmVsMCwgaW4udGV4VVYpICogaW4uaUNvbG9yOwogICAgcmV0dXJuIG91dDsKfQoKAAAAZGlhZ25vc3RpYyhvZmYsIGRlcml2YXRpdmVfdW5pZm9ybWl0eSk7Cgp2YXI8cHJpdmF0ZT4gY29vcmQgOiB2ZWM0ZjsKCnZhcjxwcml2YXRlPiB0ZXhVViA6IHZlYzJmOwoKdmFyPHByaXZhdGU+IGlDb2xvciA6IHZlYzRmOwoKdmFyPHByaXZhdGU+IGNvbG9yIDogdmVjNGY7Cgp2YXI8cHJpdmF0ZT4gZ2xfUG9zaXRpb24gOiB2ZWM0ZjsKCmZuIG1haW5fMSgpIHsKICBsZXQgeF8xOSA6IHZlYzRmID0gY29vcmQ7CiAgbGV0IHhfMjAgOiB2ZWMyZiA9IHZlYzJmKHhfMTkueCwgeF8xOS55KTsKICBnbF9Qb3NpdGlvbiA9IHZlYzRmKHhfMjAueCwgeF8yMC55LCAwLjBmLCAxLjBmKTsKICBsZXQgeF8zMCA6IHZlYzRmID0gY29vcmQ7CiAgdGV4VVYgPSB2ZWMyZih4XzMwLnosIHhfMzAudyk7CiAgbGV0IHhfMzQgOiB2ZWM0ZiA9IGNvbG9yOwogIGlDb2xvciA9IHhfMzQ7CiAgcmV0dXJuOwp9CgpzdHJ1Y3QgbWFpbl9vdXQgewogIEBidWlsdGluKHBvc2l0aW9uKQogIGdsX1Bvc2l0aW9uIDogdmVjNGYsCiAgQGxvY2F0aW9uKDApCiAgdGV4VVZfMSA6IHZlYzJmLAogIEBsb2NhdGlvbigxKQogIGlDb2xvcl8xIDogdmVjNGYsCn0KCkB2ZXJ0ZXgKZm4gbWFpbihAbG9jYXRpb24oMCkgY29vcmRfcGFyYW0gOiB2ZWM0ZiwgQGxvY2F0aW9uKDEpIGNvbG9yX3BhcmFtIDogdmVjNGYpIC0+IG1haW5fb3V0IHsKICBjb29yZCA9IGNvb3JkX3BhcmFtOwogIGNvbG9yID0gY29sb3JfcGFyYW07CiAgbWFpbl8xKCk7CiAgcmV0dXJuIG1haW5fb3V0KGdsX1Bvc2l0aW9uLCB0ZXhVViwgaUNvbG9yKTsKfQoKAAAAAAAAAAAAAABkaWFnbm9zdGljKG9mZiwgZGVyaXZhdGl2ZV91bmlmb3JtaXR5KTsKCnZhcjxwcml2YXRlPiBmcmFnQ29sb3IgOiB2ZWM0ZjsKCkBncm91cCgxKSBAYmluZGluZyg0OCkgdmFyIGlUZXhDaGFubmVsMCA6IHRleHR1cmVfMmQ8ZjMyPjsKCkBncm91cCgxKSBAYmluZGluZyg2NCkgdmFyIGlTbXBDaGFubmVsMCA6IHNhbXBsZXI7Cgp2YXI8cHJpdmF0ZT4gdGV4VVYgOiB2ZWMyZjsKCnZhcjxwcml2YXRlPiBpQ29sb3IgOiB2ZWM0ZjsKCmZuIG1haW5fMSgpIHsKICBsZXQgeF8yMyA6IHZlYzJmID0gdGV4VVY7CiAgbGV0IHhfMjQgOiB2ZWM0ZiA9IHRleHR1cmVTYW1wbGUoaVRleENoYW5uZWwwLCBpU21wQ2hhbm5lbDAsIHhfMjMpOwogIGxldCB4XzI3IDogdmVjNGYgPSBpQ29sb3I7CiAgZnJhZ0NvbG9yID0gKHhfMjQgKiB4XzI3KTsKICByZXR1cm47Cn0KCnN0cnVjdCBtYWluX291dCB7CiAgQGxvY2F0aW9uKDApCiAgZnJhZ0NvbG9yXzEgOiB2ZWM0ZiwKfQoKQGZyYWdtZW50CmZuIG1haW4oQGxvY2F0aW9uKDApIHRleFVWX3BhcmFtIDogdmVjMmYsIEBsb2NhdGlvbigxKSBpQ29sb3JfcGFyYW0gOiB2ZWM0ZikgLT4gbWFpbl9vdXQgewogIHRleFVWID0gdGV4VVZfcGFyYW07CiAgaUNvbG9yID0gaUNvbG9yX3BhcmFtOwogIG1haW5fMSgpOwogIHJldHVybiBtYWluX291dChmcmFnQ29sb3IpOwp9CgoAAAD//39///9/f///f////3//EAAAACAAAABAAAAAAAAAAAAAAAD/cEP//6cm///uWP/U4Vf/nMxl/2a7av9CpfX/flfC/wMAAAAEAAAABAAAAAYAAACD+aIARE5uAPwpFQDRVycA3TT1AGLbwAA8mZUAQZBDAGNR/gC73qsAt2HFADpuJADSTUIASQbgAAnqLgAcktEA6x3+ACmxHADoPqcA9TWCAES7LgCc6YQAtCZwAEF+XwDWkTkAU4M5AJz0OQCLX4QAKPm9APgfOwDe/5cAD5gFABEv7wAKWosAbR9tAM9+NgAJyycARk+3AJ5mPwAt6l8Auid1AOXrxwA9e/EA9zkHAJJSigD7a+oAH7FfAAhdjQAwA1YAe/xGAPCrawAgvM8ANvSaAOOpHQBeYZEACBvmAIWZZQCgFF8AjUBoAIDY/wAnc00ABgYxAMpWFQDJqHMAe+JgAGuMwAAZxEcAzWfDAAno3ABZgyoAi3bEAKYclgBEr90AGVfRAKU+BQAFB/8AM34/AMIy6ACYT94Au30yACY9wwAea+8An/heADUfOgB/8soA8YcdAHyQIQBqJHwA1W76ADAtdwAVO0MAtRTGAMMZnQCtxMIALE1BAAwAXQCGfUYA43EtAJvGmgAzYgAAtNJ8ALSnlwA3VdUA1z72AKMQGABNdvwAZJ0qAHDXqwBjfPgAerBXABcV5wDASVYAO9bZAKeEOAAkI8sA1op3AFpUIwAAH7kA8QobABnO3wCfMf8AZh5qAJlXYQCs+0cAfn/YACJltwAy6IkA5r9gAO/EzQBsNgkAXT/UABbe1wBYO94A3puSANIiKAAohugA4lhNAMbKMgAI4xYA4H3LABfAUADzHacAGOBbAC4TNACDEmIAg0gBAPWOWwCtsH8AHunyAEhKQwAQZ9MAqt3YAK5fQgBqYc4ACiikANOZtAAGpvIAXHd/AKPCgwBhPIgAinN4AK+MWgBv170ALaZjAPS/ywCNge8AJsFnAFXKRQDK2TYAKKjSAMJhjQASyXcABCYUABJGmwDEWcQAyMVEAE2ykQAAF/MA1EOtAClJ5QD91RAAAL78AB6UzABwzu4AEz71AOzxgACz58MAx/goAJMFlADBcT4ALgmzAAtF8wCIEpwAqyB7AC61nwBHksIAezIvAAxVbQByp5AAa+cfADHLlgB5FkoAQXniAPTfiQDolJcA4uaEAJkxlwCI7WsAX182ALv9DgBImrQAZ6RsAHFyQgCNXTIAnxW4ALzlCQCNMSUA93Q5ADAFHAANDAEASwhoACzuWABHqpAAdOcCAL3WJAD3faYAbkhyAJ8W7wCOlKYAtJH2ANFTUQDPCvIAIJgzAPVLfgCyY2gA3T5fAEBdAwCFiX8AVVIpADdkwABt2BAAMkgyAFtMdQBOcdQARVRuAAsJwQAq9WkAFGbVACcHnQBdBFAAtDvbAOp2xQCH+RcASWt9AB0nugCWaSkAxsysAK0UVACQ4moAiNmJACxyUAAEpL4AdweUAPMwcAAA/CcA6nGoAGbCSQBk4D0Al92DAKM/lwBDlP0ADYaMADFB3gCSOZ0A3XCMABe35wAI3zsAFTcrAFyAoABagJMAEBGSAA/o2ABsgK8A2/9LADiQDwBZGHYAYqUVAGHLuwDHibkAEEC9ANLyBABJdScA67b2ANsiuwAKFKoAiSYvAGSDdgAJOzMADpQaAFE6qgAdo8IAr+2uAFwmEgBtwk0ALXqcAMBWlwADP4MACfD2ACtAjABtMZkAObQHAAwgFQDYw1sA9ZLEAMatSwBOyqUApzfNAOapNgCrkpQA3UJoABlj3gB2jO8AaItSAPzbNwCuoasA3xUxAACuoQAM+9oAZE1mAO0FtwApZTAAV1a/AEf/OgBq+bkAdb7zACiT3wCrgDAAZoz2AATLFQD6IgYA2eQdAD2zpABXG48ANs0JAE5C6QATvqQAMyO1APCqGgBPZagA0sGlAAs/DwBbeM0AI/l2AHuLBACJF3IAxqZTAG9u4gDv6wAAm0pYAMTatwCqZroAds/PANECHQCx8S0AjJnBAMOtdwCGSNoA912gAMaA9ACs8C8A3eyaAD9cvADQ3m0AkMcfACrbtgCjJToAAK+aAK1TkwC2VwQAKS20AEuAfgDaB6cAdqoOAHtZoQAWEioA3LctAPrl/QCJ2/4Aib79AOR2bAAGqfwAPoBwAIVuFQD9h/8AKD4HAGFnMwAqGIYATb3qALPnrwCPbW4AlWc5ADG/WwCE10gAMN8WAMctQwAlYTUAyXDOADDLuAC/bP0ApACiAAVs5ABa3aAAIW9HAGIS0gC5XIQAcGFJAGtW4ACZUgEAUFU3AB7VtwAz8cQAE25fAF0w5ACFLqkAHbLDAKEyNgAIt6QA6rHUABb3IQCPaeQAJ/93AAwDgACNQC0AT82gACClmQCzotMAL10KALT5QgAR2ssAfb7QAJvbwQCrF70AyqKBAAhqXAAuVRcAJwBVAH8U8ADhB4YAFAtkAJZBjQCHvt4A2v0qAGsltgB7iTQABfP+ALm/ngBoak8ASiqoAE/EWgAt+LwA11qYAPTHlQANTY0AIDqmAKRXXwAUP7EAgDiVAMwgAQBx3YYAyd62AL9g9QBNZREAAQdrAIywrACywNAAUVVIAB77DgCVcsMAowY7AMBANQAG3HsA4EXMAE4p+gDWysgA6PNBAHxk3gCbZNgA2b4xAKSXwwB3WNQAaePFAPDaEwC6OjwARhhGAFV1XwDSvfUAbpLGAKwuXQAORO0AHD5CAGHEhwAp/ekA59bzACJ8ygBvkTUACODFAP/XjQBuauIAsP3GAJMIwQB8XXQAa62yAM1unQA+cnsAxhFqAPfPqQApc98Atcm6ALcAUQDisg0AdLokAOV9YAB02IoADRUsAIEYDAB+ZpQAASkWAJ96dgD9/b4AVkXvANl+NgDs2RMAi7q5AMSX/AAxqCcA8W7DAJTFNgDYqFYAtKi1AM/MDgASiS0Ab1c0ACxWiQCZzuMA1iC5AGteqgA+KpwAEV/MAP0LSgDh9PsAjjttAOKGLADp1IQA/LSpAO/u0QAuNckALzlhADghRAAb2cgAgfwKAPtKagAvHNgAU7SEAE6ZjABUIswAKlXcAMDG1gALGZYAGnC4AGmVZAAmWmAAP1LuAH8RDwD0tREA/Mv1ADS8LQA0vO4A6F3MAN1eYABnjpsAkjPvAMkXuABhWJsA4Ve8AFGDxgDYPhAA3XFIAC0c3QCvGKEAISxGAFnz1wDZepgAnlTAAE+G+gBWBvwA5XmuAIkiNgA4rSIAZ5PcAFXoqgCCJjgAyuebAFENpACZM7EAqdcOAGkFSABlsvAAf4inAIhMlwD50TYAIZKzAHuCSgCYzyEAQJ/cANxHVQDhdDoAZ+tCAP6d3wBe1F8Ae2ekALqsegBV9qIAK4gjAEG6VQBZbggAISqGADlHgwCJ4+YA5Z7UAEn7QAD/VukAHA/KAMVZigCU+isA08HFAA/FzwDbWq4AR8WGAIVDYgAhhjsALHmUABBhhwAqTHsAgCwaAEO/EgCIJpAAeDyJAKjE5ADl23sAxDrCACb06gD3Z4oADZK/AGWjKwA9k7EAvXwLAKRR3AAn3WMAaeHdAJqUGQCoKZUAaM4oAAnttABEnyAATpjKAHCCYwB+fCMAD7kyAKf1jgAUVucAIfEIALWdKgBvfk0ApRlRALX5qwCC39YAlt1hABY2AgDEOp8Ag6KhAHLtbQA5jXoAgripAGsyXABGJ1sAADTtANIAdwD89FUAAVlNAOBxgAAAAAAAAAAAAAAAAED7Ifk/AAAAAC1EdD4AAACAmEb4PAAAAGBRzHg7AAAAgIMb8DkAAABAICV6OAAAAIAiguM2AAAAAB3zaTV49gEAAAAAAAAAAAAAAAAAGQALABkZGQAAAAAFAAAAAAAACQAAAAALAAAAAAAAAAAZAAoKGRkZAwoHAAEACQsYAAAJBgsAAAsABhkAAAAZGRkAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAGQALDRkZGQANAAACAAkOAAAACQAOAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAAAAAAAAAABMAAAAAEwAAAAAJDAAAAAAADAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAPAAAABA8AAAAACRAAAAAAABAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEgAAAAAAAAAAAAAAEQAAAAARAAAAAAkSAAAAAAASAAASAAAaAAAAGhoaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABoAAAAaGhoAAAAAAAAJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAXAAAAABcAAAAACRQAAAAAABQAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFgAAAAAAAAAAAAAAFQAAAAAVAAAAAAkWAAAAAAAWAAAWAAAwMTIzNDU2Nzg5QUJDREVGAEGA2gcLqBXDKAEA62UBAJmaAQApmwEA5poBAGabAQCjmwEA+5kBAE6aAQDenQEAapwBANibAQBwnQEA7JwBAEieAQB+vAEAVLcBAE+5AQDBuQEAsbcBAIy4AQAmuAEAdLoBAOG9AQAfugEA7bgBAAW9AQBnuwEAJLsBAMHGAQBVtgEAObwBALi8AQBMvQEAnr0BALe7AQD4uwEABrcBALS2AQDYugEA6J4BAP6fAQArnwEAo54BAPSgAQA3oQEAn8YBAKCgAQBRoAEAtp8BAIXGAQBwnwEAT5QBAPKTAQCTkwEArWUBALhpAQBhagEAfWgBAHtpAQDqagEAO5MBAH6SAQDSkgEAXmYBAPhoAQCeagEACBMBAOAbAQDOJwEAyWQBAL1DAQAFPwEAsT4BAKREAQCXRQEA2EEBACdDAQDuRQEAi0IBAA5EAQD1RAEAOEIBABdAAQAoQQEAuz8BAHBAAQDJQAEAUz8BAHJDAQA2RgEA2UIBAFlEAQBGRQEAfkEBAE5hAQDZYQEAH2EBAHthAQCoYQEA9mABAEYQAQBpGQEALV8BAJuBAQCNpAEALTEBALlwAQCYtQEAN34BADWZAQB4MwEA4l8BAGWEAQAphAEALVQBANZTAQAoZQEA3gwBAK2AAQCYfwEAqw4BABZ6AQB2cQEAE3EBAMpxAQBFTQEA8F4BAEF3AQBoXwEAP2QBAAdkAQC7YwEAd2QBAFsRAQAAEQEAvBcBABwqAQCAMQEAaIABAEwEAQArqAEA8pEBALqoAQCwpwEAQZYBAIOVAQAOpQEArjkBAL06AQAvOgEAsh0BADIdAQD7lgEAuZQBABmnAQAJtQEAo18BADVaAQB3DwEA0n0BALQiAQCrXgEApRIBAKQQAQC1WgEAhhYBAGktAQAyLAEAlS4BAOo4AQAuDQEAoQ0BAD8yAQCKBgEA438BAJ5cAQA0fwEAThcBAAQtAQDFKwEAKy4BAIE4AQCSMgEA5QsBAPhaAQDkFgEAxC0BAJUsAQD1LgEARjkBAAQzAQALBgEATF4BANMzAQD+egEAR1sBAC5cAQCzWwEAYYMBAIuKAQCrggEA9IgBAPmBAQCDiAEA7lwBAA4IAQCGCAEA1ZABABmMAQBOkAEAi4sBAM2PAQADiwEAR40BAAKGAQAvjwEABogBADqOAQADhwEA1YwBAImFAQC7jgEAi4cBALuNAQB9hgEAFYoBAFJtAQDeNAEA9T0BACw0AQA/PQEAMDUBAEk+AQAlEgEAXgsBAGIMAQCPBQEA5UkBAHo0AQCPPQEA0g8BAJY1AQBtdgEA4CMBAOJsAQB0bAEA4DUBANh2AQA4JAEAK1kBAPY2AQAebwEAyU0BANhPAQB5TwEAEk8BAOdWAQCucwEA+HQBAIoUAQAvTgEAKTYBAP1XAQCHNgEAYCABAJpOAQCvWQEAIzgBAJVvAQBBUAEAWlIBAPlRAQCQUQEAcVcBAFJ0AQDBdQEAMxUBAKlQAQBSNwEAk1gBALI3AQD1IAEAFlEBAPXCAQAGBQEA5TEBABUgAQB/MAEAYkwBAPVLAQDHHwEA0TABAIhLAQCeVAEAukwBAHtlAQAAAAAAAAAAAAAAAADDKAEA62UBACK+AQBXKAEAdwIBADl8AQCaAwEA9gMBAO0GAQCCOwEAXw4BAPMaAQAZDgEAJWMBAGhjAQAbtAEAk7QBANt8AQCvJAEAU5EBAMAJAQAKCgEAulUBAN2hAQB0oQEAemsBAPd3AQCvEQEAIFYBAIElAQAStgEAwhkBAHwrAQATZgEAYioBAH98AQANaAEARmgBAF9nAQAVZwEAo2cBAC1qAQADGgEAxGYBAPNpAQAyawEAvWgBAERpAQDYZwEAQIEBACTGAQAYJQEAS8MBAADEAQC1wwEAxykBAIV5AQD3eQEApHkBAA5zAQDrcgEAonIBAFR5AQB3cgEAx2ABAARiAQCQSQEAg8IBAElLAQCJRgEAzGsBADZHAQC9wgEAgWIBABtgAQDVYgEAc2ABAB5sAQAAAAEAWAABAF5JAQDnRgEAF0kBADViAQDTJgEAVAoBAAcmAQDjRwEAdiYBAFtIAQC/xAEAb8UBAMjFAQBoxAEAFMUBACxVAQBEmAEAQqIBAIwhAQAAAAAAqlUBAAMBAAC1cAEAAgEAAKgbAQABAQAA4wcBAFQBAACiBwEAWAEAAPkHAQBVAQAAugcBAFkBAADbBwEAVgEAAJkHAQBaAQAAaEcBABwBAACnKAEAGAEAAFdJAQAAAQAAtFUBACAAAADUIwEACgEAAKYkAQALAQAA41YBAA0BAACDSwEADAEAANEHAQAHAQAAzCMBAAkBAACOBwEABgEAAJwkAQAIAQAAJicBABsBAADwBAEABAEAAOA7AQAFAQAA+YABADAAAAAGfwEAMQAAAOJ+AQAyAAAA0H4BADMAAADAfQEANAAAAK59AQA1AAAAnH0BADYAAACKfQEANwAAAHh9AQA4AAAAZn0BADkAAABNfQEAQQAAAHp8AQBCAAAAYnsBAEMAAACMegEARAAAAE95AQBFAAAARnkBAEYAAABBeQEARwAAADx5AQBIAAAAN3kBAEkAAAAyeQEASgAAAC15AQBLAAAA8ncBAEwAAADtdwEATQAAAOR3AQBOAAAA33cBAE8AAADadwEAUAAAANV3AQBRAAAAqXMBAFIAAADmcgEAUwAAAOFyAQBUAAAA3HIBAFUAAADXcgEAVgAAAJ1yAQBXAAAAmHIBAFgAAABycgEAWQAAAG1yAQBaAAAABQgBAFcBAADHBwEAWwEAACaBAQBAAQAADX8BAEEBAADpfgEAQgEAANd+AQBDAQAAx30BAEQBAAC1fQEARQEAAKN9AQBGAQAAkX0BAEcBAAB/fQEASAEAAG19AQBJAQAAlAABAEwBAACjbQEATgEAAKQKAQBNAQAAmSgBAEoBAAAfVQEASwEAABV/AQAiAQAA8X4BACMBAADffgEAJAEAAM99AQAlAQAAvX0BACYBAACrfQEAJwEAAJl9AQAoAQAAh30BACkBAAB1fQEAKgEAADyBAQArAQAAGH8BACwBAAACfwEALQEAALAoAQAaAQAAuCgBABkBAAAOJQEAOwAAAJMoAQA9AAAAJHIBACwAAADMDwEALQAAABlWAQAuAAAA3igBAC8AAADQOwEAYAAAAO0HAQBbAAAA1CgBAFwAAACtBwEAXQAAANo7AQBgAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAAAEwAAAOhpAgAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAA//////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB49gEAAAAAAAUAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIAAAAVAAAA+GkCAAAEAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAD/////CgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABD3AQCwcAIAAEGo7wcLhTQoKTw6Oj57IGlmIChNb2R1bGU/LmNhcnQ/LmV4cG9ydHM/LnVwZGF0ZSkgeyBNb2R1bGUuY2FydC5leHBvcnRzLnVwZGF0ZShEYXRlLm5vdygpKTsgfSB9ACh1bnNpZ25lZCBpbnQgY2FydFB0ciwgdm9pZCogaG9zdFB0ciwgdW5zaWduZWQgaW50IHNpemUpPDo6PnsgbGV0IGkgPSAwOyBjb25zdCBtZW0gPSBuZXcgVWludDhBcnJheSggTW9kdWxlLmNhcnQuZXhwb3J0cy5tZW1vcnkuYnVmZmVyLnNsaWNlKGNhcnRQdHIsIGNhcnRQdHIgKyBzaXplKSApOyBmb3IgKGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7IE1vZHVsZS5IRUFQVThbaG9zdFB0ciArIGldID0gbWVtW2ldOyB9IH0AKHVuc2lnbmVkIGludCBjYXJ0UHRyKTw6Oj57IGNvbnN0IE1BWF9TVFJfTEVOID0gMTAyNDsgbGV0IGxlbiA9IDA7IGNvbnN0IG1lbSA9IG5ldyBVaW50OEFycmF5KCBNb2R1bGUuY2FydC5leHBvcnRzLm1lbW9yeS5idWZmZXIuc2xpY2UoY2FydFB0ciwgY2FydFB0ciArIE1BWF9TVFJfTEVOKSApOyBmb3IgKGxlbiA9IDA7IGxlbiA8IE1BWF9TVFJfTEVOOyBsZW4rKykgeyBpZiAobWVtW2xlbl0gPT09IDApIHsgYnJlYWs7IH0gfSBpZiAobGVuID09PSBNQVhfU1RSX0xFTikgeyByZXR1cm4gLTE7IH0gcmV0dXJuIGxlbjsgfQAodm9pZCogaG9zdFB0ciwgdW5zaWduZWQgaW50IHNpemUpPDo6PnsgY29uc3QgY2FydFB0ciA9IE1vZHVsZS5jYXJ0LmV4cG9ydHMubWFsbG9jKHNpemUpOyBjb25zdCBjYXJ0Qnl0ZXMgPSBNb2R1bGUuSEVBUFU4LnNsaWNlKGhvc3RQdHIsIGhvc3RQdHIgKyBzaXplKTsgY29uc3QgbWVtID0gbmV3IFVpbnQ4QXJyYXkoTW9kdWxlLmNhcnQuZXhwb3J0cy5tZW1vcnkuYnVmZmVyKTsgbWVtLnNldChjYXJ0Qnl0ZXMsIGNhcnRQdHIpOyByZXR1cm4gY2FydFB0cjsgfQAodm9pZCk8Ojo+eyBNb2R1bGUuc29rb2xfYmVmb3JldW5sb2FkID0gKGV2ZW50KSA9PiB7IGlmIChfX3NhcHBfaHRtbDVfZ2V0X2Fza19sZWF2ZV9zaXRlKCkgIT0gMCkgeyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyBldmVudC5yZXR1cm5WYWx1ZSA9ICcgJzsgfSB9OyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgTW9kdWxlLnNva29sX2JlZm9yZXVubG9hZCk7IH0AKHZvaWQpPDo6Pnsgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsIE1vZHVsZS5zb2tvbF9iZWZvcmV1bmxvYWQpOyB9ACh2b2lkKTw6Oj57IE1vZHVsZS5zb2tvbF9wYXN0ZSA9IChldmVudCkgPT4geyBjb25zdCBwYXN0ZWRfc3RyID0gZXZlbnQuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0Jyk7IHdpdGhTdGFja1NhdmUoKCkgPT4geyBjb25zdCBjc3RyID0gc3RyaW5nVG9VVEY4T25TdGFjayhwYXN0ZWRfc3RyKTsgX19zYXBwX2Vtc2Nfb25wYXN0ZShjc3RyKTsgfSk7IH07IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwYXN0ZScsIE1vZHVsZS5zb2tvbF9wYXN0ZSk7IH0AKHZvaWQpPDo6Pnsgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Bhc3RlJywgTW9kdWxlLnNva29sX3Bhc3RlKTsgfQAoY29uc3QgY2hhciogY19zdHIpPDo6PnsgY29uc3Qgc3RyID0gVVRGOFRvU3RyaW5nKGNfc3RyKTsgY29uc3QgdGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpOyB0YS5zZXRBdHRyaWJ1dGUoJ2F1dG9jb21wbGV0ZScsICdvZmYnKTsgdGEuc2V0QXR0cmlidXRlKCdhdXRvY29ycmVjdCcsICdvZmYnKTsgdGEuc2V0QXR0cmlidXRlKCdhdXRvY2FwaXRhbGl6ZScsICdvZmYnKTsgdGEuc2V0QXR0cmlidXRlKCdzcGVsbGNoZWNrJywgJ2ZhbHNlJyk7IHRhLnN0eWxlLmxlZnQgPSAtMTAwICsgJ3B4JzsgdGEuc3R5bGUudG9wID0gLTEwMCArICdweCc7IHRhLnN0eWxlLmhlaWdodCA9IDE7IHRhLnN0eWxlLndpZHRoID0gMTsgdGEudmFsdWUgPSBzdHI7IGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGEpOyB0YS5zZWxlY3QoKTsgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTsgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0YSk7IH0AKGNvbnN0IGNoYXIqIGNhbnZhc19uYW1lX2NzdHIpPDo6PnsgTW9kdWxlLnNva29sX2Ryb3BfZmlsZXMgPSBbXTsgY29uc3QgY2FudmFzX25hbWUgPSBVVEY4VG9TdHJpbmcoY2FudmFzX25hbWVfY3N0cik7IGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc19uYW1lKTsgTW9kdWxlLnNva29sX2RyYWdlbnRlciA9IChldmVudCkgPT4geyBldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgZXZlbnQucHJldmVudERlZmF1bHQoKTsgfTsgTW9kdWxlLnNva29sX2RyYWdsZWF2ZSA9IChldmVudCkgPT4geyBldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgZXZlbnQucHJldmVudERlZmF1bHQoKTsgfTsgTW9kdWxlLnNva29sX2RyYWdvdmVyID0gKGV2ZW50KSA9PiB7IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyB9OyBNb2R1bGUuc29rb2xfZHJvcCA9IChldmVudCkgPT4geyBldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgZXZlbnQucHJldmVudERlZmF1bHQoKTsgY29uc3QgZmlsZXMgPSBldmVudC5kYXRhVHJhbnNmZXIuZmlsZXM7IE1vZHVsZS5zb2tvbF9kcm9wcGVkX2ZpbGVzID0gZmlsZXM7IF9fc2FwcF9lbXNjX2JlZ2luX2Ryb3AoZmlsZXMubGVuZ3RoKTsgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykgeyB3aXRoU3RhY2tTYXZlKCgpID0+IHsgY29uc3QgY3N0ciA9IHN0cmluZ1RvVVRGOE9uU3RhY2soZmlsZXNbaV0ubmFtZSk7IF9fc2FwcF9lbXNjX2Ryb3AoaSwgY3N0cik7IH0pOyB9IGxldCBtb2RzID0gMDsgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7IG1vZHMgfD0gMTsgfSBpZiAoZXZlbnQuY3RybEtleSkgeyBtb2RzIHw9IDI7IH0gaWYgKGV2ZW50LmFsdEtleSkgeyBtb2RzIHw9IDQ7IH0gaWYgKGV2ZW50Lm1ldGFLZXkpIHsgbW9kcyB8PSA4OyB9IF9fc2FwcF9lbXNjX2VuZF9kcm9wKGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFksIG1vZHMpOyB9OyBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgTW9kdWxlLnNva29sX2RyYWdlbnRlciwgZmFsc2UpOyBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgTW9kdWxlLnNva29sX2RyYWdsZWF2ZSwgZmFsc2UpOyBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBNb2R1bGUuc29rb2xfZHJhZ292ZXIsIGZhbHNlKTsgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBNb2R1bGUuc29rb2xfZHJvcCwgZmFsc2UpOyB9AChpbnQgaW5kZXgpPDo6PnsgLyoqIEBzdXBwcmVzcyB7bWlzc2luZ1Byb3BlcnRpZXN9ICovIGNvbnN0IGZpbGVzID0gTW9kdWxlLnNva29sX2Ryb3BwZWRfZmlsZXM7IGlmICgoaW5kZXggPCAwKSB8fCAoaW5kZXggPj0gZmlsZXMubGVuZ3RoKSkgeyByZXR1cm4gMDsgfSBlbHNlIHsgcmV0dXJuIGZpbGVzW2luZGV4XS5zaXplOyB9IH0AKGludCBpbmRleCwgX3NhcHBfaHRtbDVfZmV0Y2hfY2FsbGJhY2sgY2FsbGJhY2ssIHZvaWQqIGJ1Zl9wdHIsIHVpbnQzMl90IGJ1Zl9zaXplLCB2b2lkKiB1c2VyX2RhdGEpPDo6PnsgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTsgcmVhZGVyLm9ubG9hZCA9IChsb2FkRXZlbnQpID0+IHsgY29uc3QgY29udGVudCA9IGxvYWRFdmVudC50YXJnZXQucmVzdWx0OyBpZiAoY29udGVudC5ieXRlTGVuZ3RoID4gYnVmX3NpemUpIHsgX19zYXBwX2Vtc2NfaW52b2tlX2ZldGNoX2NiKGluZGV4LCAwLCAxLCBjYWxsYmFjaywgMCwgYnVmX3B0ciwgYnVmX3NpemUsIHVzZXJfZGF0YSk7IH0gZWxzZSB7IEhFQVBVOC5zZXQobmV3IFVpbnQ4QXJyYXkoY29udGVudCksIGJ1Zl9wdHIpOyBfX3NhcHBfZW1zY19pbnZva2VfZmV0Y2hfY2IoaW5kZXgsIDEsIDAsIGNhbGxiYWNrLCBjb250ZW50LmJ5dGVMZW5ndGgsIGJ1Zl9wdHIsIGJ1Zl9zaXplLCB1c2VyX2RhdGEpOyB9IH07IHJlYWRlci5vbmVycm9yID0gKCkgPT4geyBfX3NhcHBfZW1zY19pbnZva2VfZmV0Y2hfY2IoaW5kZXgsIDAsIDIsIGNhbGxiYWNrLCAwLCBidWZfcHRyLCBidWZfc2l6ZSwgdXNlcl9kYXRhKTsgfTsgLyoqIEBzdXBwcmVzcyB7bWlzc2luZ1Byb3BlcnRpZXN9ICovIGNvbnN0IGZpbGVzID0gTW9kdWxlLnNva29sX2Ryb3BwZWRfZmlsZXM7IHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihmaWxlc1tpbmRleF0pOyB9AChjb25zdCBjaGFyKiBjYW52YXNfbmFtZV9jc3RyKTw6Oj57IGNvbnN0IGNhbnZhc19uYW1lID0gVVRGOFRvU3RyaW5nKGNhbnZhc19uYW1lX2NzdHIpOyBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXNfbmFtZSk7IGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBNb2R1bGUuc29rb2xfZHJhZ2VudGVyKTsgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIE1vZHVsZS5zb2tvbF9kcmFnbGVhdmUpOyBjYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBNb2R1bGUuc29rb2xfZHJhZ292ZXIpOyBjYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJvcCcsIE1vZHVsZS5zb2tvbF9kcm9wKTsgfQAoY29uc3QgY2hhciogY19zdHJfdGFyZ2V0KTw6Oj57IGNvbnN0IHRhcmdldF9zdHIgPSBVVEY4VG9TdHJpbmcoY19zdHJfdGFyZ2V0KTsgTW9kdWxlLnNhcHBfZW1zY190YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRfc3RyKTsgaWYgKCFNb2R1bGUuc2FwcF9lbXNjX3RhcmdldCkgeyBjb25zb2xlLmxvZygic29rb2xfYXBwLmg6IGludmFsaWQgdGFyZ2V0OiIgKyB0YXJnZXRfc3RyKTsgfSBpZiAoIU1vZHVsZS5zYXBwX2Vtc2NfdGFyZ2V0LnJlcXVlc3RQb2ludGVyTG9jaykgeyBjb25zb2xlLmxvZygic29rb2xfYXBwLmg6IHRhcmdldCBkb2Vzbid0IHN1cHBvcnQgcmVxdWVzdFBvaW50ZXJMb2NrOiIgKyB0YXJnZXRfc3RyKTsgfSB9ACh2b2lkKTw6Oj57IGlmIChNb2R1bGUuc2FwcF9lbXNjX3RhcmdldCkgeyBpZiAoTW9kdWxlLnNhcHBfZW1zY190YXJnZXQucmVxdWVzdFBvaW50ZXJMb2NrKSB7IE1vZHVsZS5zYXBwX2Vtc2NfdGFyZ2V0LnJlcXVlc3RQb2ludGVyTG9jaygpOyB9IH0gfQAodm9pZCk8Ojo+eyBpZiAoZG9jdW1lbnQuZXhpdFBvaW50ZXJMb2NrKSB7IGRvY3VtZW50LmV4aXRQb2ludGVyTG9jaygpOyB9IH0AKGludCBjdXJzb3JfdHlwZSwgaW50IHNob3duKTw6Oj57IGlmIChNb2R1bGUuc2FwcF9lbXNjX3RhcmdldCkgeyBsZXQgY3Vyc29yOyBpZiAoc2hvd24gPT09IDApIHsgY3Vyc29yID0gIm5vbmUiOyB9IGVsc2Ugc3dpdGNoIChjdXJzb3JfdHlwZSkgeyBjYXNlIDA6IGN1cnNvciA9ICJhdXRvIjsgYnJlYWs7IGNhc2UgMTogY3Vyc29yID0gImRlZmF1bHQiOyBicmVhazsgY2FzZSAyOiBjdXJzb3IgPSAidGV4dCI7IGJyZWFrOyBjYXNlIDM6IGN1cnNvciA9ICJjcm9zc2hhaXIiOyBicmVhazsgY2FzZSA0OiBjdXJzb3IgPSAicG9pbnRlciI7IGJyZWFrOyBjYXNlIDU6IGN1cnNvciA9ICJldy1yZXNpemUiOyBicmVhazsgY2FzZSA2OiBjdXJzb3IgPSAibnMtcmVzaXplIjsgYnJlYWs7IGNhc2UgNzogY3Vyc29yID0gIm53c2UtcmVzaXplIjsgYnJlYWs7IGNhc2UgODogY3Vyc29yID0gIm5lc3ctcmVzaXplIjsgYnJlYWs7IGNhc2UgOTogY3Vyc29yID0gImFsbC1zY3JvbGwiOyBicmVhazsgY2FzZSAxMDogY3Vyc29yID0gIm5vdC1hbGxvd2VkIjsgYnJlYWs7IGRlZmF1bHQ6IGN1cnNvciA9ICJhdXRvIjsgYnJlYWs7IH0gTW9kdWxlLnNhcHBfZW1zY190YXJnZXQuc3R5bGUuY3Vyc29yID0gY3Vyc29yOyB9IH0AKHZvaWQpPDo6PnsgY29uc3QgbGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb2tvbC1hcHAtZmF2aWNvbicpOyBpZiAobGluaykgeyBkb2N1bWVudC5oZWFkLnJlbW92ZUNoaWxkKGxpbmspOyB9IH0AKGludCB3LCBpbnQgaCwgY29uc3QgdWludDhfdCogcGl4ZWxzKTw6Oj57IGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpOyBjYW52YXMud2lkdGggPSB3OyBjYW52YXMuaGVpZ2h0ID0gaDsgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7IGNvbnN0IGltZ19kYXRhID0gY3R4LmNyZWF0ZUltYWdlRGF0YSh3LCBoKTsgaW1nX2RhdGEuZGF0YS5zZXQoSEVBUFU4LnN1YmFycmF5KHBpeGVscywgcGl4ZWxzICsgdypoKjQpKTsgY3R4LnB1dEltYWdlRGF0YShpbWdfZGF0YSwgMCwgMCk7IGNvbnN0IG5ld19saW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpOyBuZXdfbGluay5pZCA9ICdzb2tvbC1hcHAtZmF2aWNvbic7IG5ld19saW5rLnJlbCA9ICdzaG9ydGN1dCBpY29uJzsgbmV3X2xpbmsuaHJlZiA9IGNhbnZhcy50b0RhdGFVUkwoKTsgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChuZXdfbGluayk7IH0AKHVpbnQzMl90IGxldmVsLCBjb25zdCBjaGFyKiBjX3N0cik8Ojo+eyBjb25zdCBzdHIgPSBVVEY4VG9TdHJpbmcoY19zdHIpOyBzd2l0Y2ggKGxldmVsKSB7IGNhc2UgMDogY29uc29sZS5lcnJvcihzdHIpOyBicmVhazsgY2FzZSAxOiBjb25zb2xlLmVycm9yKHN0cik7IGJyZWFrOyBjYXNlIDI6IGNvbnNvbGUud2FybihzdHIpOyBicmVhazsgZGVmYXVsdDogY29uc29sZS5pbmZvKHN0cik7IGJyZWFrOyB9IH0AAEGtowgLJCR3aXRoU3RhY2tTYXZlLCRzdHJpbmdUb1VURjhPblN0YWNrAA==';
    return f;
}

var wasmBinaryFile;

function getBinarySync(file) {
  if (file == wasmBinaryFile && wasmBinary) {
    return new Uint8Array(wasmBinary);
  }
  var binary = tryParseAsDataURI(file);
  if (binary) {
    return binary;
  }
  if (readBinary) {
    return readBinary(file);
  }
  throw 'both async and sync fetching of the wasm failed';
}

function getBinaryPromise(binaryFile) {

  // Otherwise, getBinarySync should be able to get it synchronously
  return Promise.resolve().then(() => getBinarySync(binaryFile));
}

function instantiateArrayBuffer(binaryFile, imports, receiver) {
  return getBinaryPromise(binaryFile).then((binary) => {
    return WebAssembly.instantiate(binary, imports);
  }).then(receiver, (reason) => {
    err(`failed to asynchronously prepare wasm: ${reason}`);

    // Warn on some common problems.
    if (isFileURI(wasmBinaryFile)) {
      err(`warning: Loading from a file URI (${wasmBinaryFile}) is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing`);
    }
    abort(reason);
  });
}

function instantiateAsync(binary, binaryFile, imports, callback) {
  return instantiateArrayBuffer(binaryFile, imports, callback);
}

function getWasmImports() {
  // prepare imports
  return {
    'env': wasmImports,
    'wasi_snapshot_preview1': wasmImports,
  }
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
function createWasm() {
  var info = getWasmImports();
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/
  function receiveInstance(instance, module) {
    wasmExports = instance.exports;

    

    wasmMemory = wasmExports['memory'];
    
    assert(wasmMemory, 'memory not found in wasm exports');
    updateMemoryViews();

    wasmTable = wasmExports['__indirect_function_table'];
    
    assert(wasmTable, 'table not found in wasm exports');

    addOnInit(wasmExports['__wasm_call_ctors']);

    removeRunDependency('wasm-instantiate');
    return wasmExports;
  }
  // wait for the pthread pool (if any)
  addRunDependency('wasm-instantiate');

  // Prefer streaming instantiation if available.
  // Async compilation can be confusing when an error on the page overwrites Module
  // (for example, if the order of elements is wrong, and the one defining Module is
  // later), so we save Module and check it later.
  var trueModule = Module;
  function receiveInstantiationResult(result) {
    // 'result' is a ResultObject object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    assert(Module === trueModule, 'the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?');
    trueModule = null;
    // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
    // When the regression is fixed, can restore the above PTHREADS-enabled path.
    receiveInstance(result['instance']);
  }

  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to
  // run the instantiation parallel to any other async startup actions they are
  // performing.
  // Also pthreads and wasm workers initialize the wasm instance through this
  // path.
  if (Module['instantiateWasm']) {
    try {
      return Module['instantiateWasm'](info, receiveInstance);
    } catch(e) {
      err(`Module.instantiateWasm callback failed with error: ${e}`);
        // If instantiation fails, reject the module ready promise.
        readyPromiseReject(e);
    }
  }

  wasmBinaryFile ??= findWasmBinary();

  // If instantiation fails, reject the module ready promise.
  instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult).catch(readyPromiseReject);
  return {}; // no exports yet; we'll fill them in later
}

// Globals used by JS i64 conversions (see makeSetValue)
var tempDouble;
var tempI64;

// include: runtime_debug.js
// Endianness check
(() => {
  var h16 = new Int16Array(1);
  var h8 = new Int8Array(h16.buffer);
  h16[0] = 0x6373;
  if (h8[0] !== 0x73 || h8[1] !== 0x63) throw 'Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)';
})();

if (Module['ENVIRONMENT']) {
  throw new Error('Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)');
}

function legacyModuleProp(prop, newName, incoming=true) {
  if (!Object.getOwnPropertyDescriptor(Module, prop)) {
    Object.defineProperty(Module, prop, {
      configurable: true,
      get() {
        let extra = incoming ? ' (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)' : '';
        abort(`\`Module.${prop}\` has been replaced by \`${newName}\`` + extra);

      }
    });
  }
}

function ignoredModuleProp(prop) {
  if (Object.getOwnPropertyDescriptor(Module, prop)) {
    abort(`\`Module.${prop}\` was supplied but \`${prop}\` not included in INCOMING_MODULE_JS_API`);
  }
}

// forcing the filesystem exports a few things by default
function isExportedByForceFilesystem(name) {
  return name === 'FS_createPath' ||
         name === 'FS_createDataFile' ||
         name === 'FS_createPreloadedFile' ||
         name === 'FS_unlink' ||
         name === 'addRunDependency' ||
         // The old FS has some functionality that WasmFS lacks.
         name === 'FS_createLazyFile' ||
         name === 'FS_createDevice' ||
         name === 'removeRunDependency';
}

/**
 * Intercept access to a global symbol.  This enables us to give informative
 * warnings/errors when folks attempt to use symbols they did not include in
 * their build, or no symbols that no longer exist.
 */
function hookGlobalSymbolAccess(sym, func) {
  if (typeof globalThis != 'undefined' && !Object.getOwnPropertyDescriptor(globalThis, sym)) {
    Object.defineProperty(globalThis, sym, {
      configurable: true,
      get() {
        func();
        return undefined;
      }
    });
  }
}

function missingGlobal(sym, msg) {
  hookGlobalSymbolAccess(sym, () => {
    warnOnce(`\`${sym}\` is not longer defined by emscripten. ${msg}`);
  });
}

missingGlobal('buffer', 'Please use HEAP8.buffer or wasmMemory.buffer');
missingGlobal('asm', 'Please use wasmExports instead');

function missingLibrarySymbol(sym) {
  hookGlobalSymbolAccess(sym, () => {
    // Can't `abort()` here because it would break code that does runtime
    // checks.  e.g. `if (typeof SDL === 'undefined')`.
    var msg = `\`${sym}\` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line`;
    // DEFAULT_LIBRARY_FUNCS_TO_INCLUDE requires the name as it appears in
    // library.js, which means $name for a JS name with no prefix, or name
    // for a JS name like _name.
    var librarySymbol = sym;
    if (!librarySymbol.startsWith('_')) {
      librarySymbol = '$' + sym;
    }
    msg += ` (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE='${librarySymbol}')`;
    if (isExportedByForceFilesystem(sym)) {
      msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
    }
    warnOnce(msg);
  });

  // Any symbol that is not included from the JS library is also (by definition)
  // not exported on the Module object.
  unexportedRuntimeSymbol(sym);
}

function unexportedRuntimeSymbol(sym) {
  if (!Object.getOwnPropertyDescriptor(Module, sym)) {
    Object.defineProperty(Module, sym, {
      configurable: true,
      get() {
        var msg = `'${sym}' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the Emscripten FAQ)`;
        if (isExportedByForceFilesystem(sym)) {
          msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
        }
        abort(msg);
      }
    });
  }
}

// Used by XXXXX_DEBUG settings to output debug messages.
function dbg(...args) {
  // TODO(sbc): Make this configurable somehow.  Its not always convenient for
  // logging to show up as warnings.
  console.warn(...args);
}
// end include: runtime_debug.js
// === Body ===

function wasm_host_update() { if (Module?.cart?.exports?.update) { Module.cart.exports.update(Date.now()); } }
function _wasm_host_copy_from_cart(cartPtr,hostPtr,size) { let i = 0; const mem = new Uint8Array( Module.cart.exports.memory.buffer.slice(cartPtr, cartPtr + size) ); for (i = 0; i < size; i++) { Module.HEAPU8[hostPtr + i] = mem[i]; } }
function cart_strlen(cartPtr) { const MAX_STR_LEN = 1024; let len = 0; const mem = new Uint8Array( Module.cart.exports.memory.buffer.slice(cartPtr, cartPtr + MAX_STR_LEN) ); for (len = 0; len < MAX_STR_LEN; len++) { if (mem[len] === 0) { break; } } if (len === MAX_STR_LEN) { return -1; } return len; }
function copy_to_cart(hostPtr,size) { const cartPtr = Module.cart.exports.malloc(size); const cartBytes = Module.HEAPU8.slice(hostPtr, hostPtr + size); const mem = new Uint8Array(Module.cart.exports.memory.buffer); mem.set(cartBytes, cartPtr); return cartPtr; }
function sapp_js_add_beforeunload_listener() { Module.sokol_beforeunload = (event) => { if (__sapp_html5_get_ask_leave_site() != 0) { event.preventDefault(); event.returnValue = ' '; } }; window.addEventListener('beforeunload', Module.sokol_beforeunload); }
function sapp_js_remove_beforeunload_listener() { window.removeEventListener('beforeunload', Module.sokol_beforeunload); }
function sapp_js_add_clipboard_listener() { Module.sokol_paste = (event) => { const pasted_str = event.clipboardData.getData('text'); withStackSave(() => { const cstr = stringToUTF8OnStack(pasted_str); __sapp_emsc_onpaste(cstr); }); }; window.addEventListener('paste', Module.sokol_paste); }
function sapp_js_remove_clipboard_listener() { window.removeEventListener('paste', Module.sokol_paste); }
function sapp_js_write_clipboard(c_str) { const str = UTF8ToString(c_str); const ta = document.createElement('textarea'); ta.setAttribute('autocomplete', 'off'); ta.setAttribute('autocorrect', 'off'); ta.setAttribute('autocapitalize', 'off'); ta.setAttribute('spellcheck', 'false'); ta.style.left = -100 + 'px'; ta.style.top = -100 + 'px'; ta.style.height = 1; ta.style.width = 1; ta.value = str; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); }
function sapp_js_add_dragndrop_listeners(canvas_name_cstr) { Module.sokol_drop_files = []; const canvas_name = UTF8ToString(canvas_name_cstr); const canvas = document.getElementById(canvas_name); Module.sokol_dragenter = (event) => { event.stopPropagation(); event.preventDefault(); }; Module.sokol_dragleave = (event) => { event.stopPropagation(); event.preventDefault(); }; Module.sokol_dragover = (event) => { event.stopPropagation(); event.preventDefault(); }; Module.sokol_drop = (event) => { event.stopPropagation(); event.preventDefault(); const files = event.dataTransfer.files; Module.sokol_dropped_files = files; __sapp_emsc_begin_drop(files.length); for (let i = 0; i < files.length; i++) { withStackSave(() => { const cstr = stringToUTF8OnStack(files[i].name); __sapp_emsc_drop(i, cstr); }); } let mods = 0; if (event.shiftKey) { mods |= 1; } if (event.ctrlKey) { mods |= 2; } if (event.altKey) { mods |= 4; } if (event.metaKey) { mods |= 8; } __sapp_emsc_end_drop(event.clientX, event.clientY, mods); }; canvas.addEventListener('dragenter', Module.sokol_dragenter, false); canvas.addEventListener('dragleave', Module.sokol_dragleave, false); canvas.addEventListener('dragover', Module.sokol_dragover, false); canvas.addEventListener('drop', Module.sokol_drop, false); }
function sapp_js_dropped_file_size(index) { /** @suppress {missingProperties} */ const files = Module.sokol_dropped_files; if ((index < 0) || (index >= files.length)) { return 0; } else { return files[index].size; } }
function sapp_js_fetch_dropped_file(index,callback,buf_ptr,buf_size,user_data) { const reader = new FileReader(); reader.onload = (loadEvent) => { const content = loadEvent.target.result; if (content.byteLength > buf_size) { __sapp_emsc_invoke_fetch_cb(index, 0, 1, callback, 0, buf_ptr, buf_size, user_data); } else { HEAPU8.set(new Uint8Array(content), buf_ptr); __sapp_emsc_invoke_fetch_cb(index, 1, 0, callback, content.byteLength, buf_ptr, buf_size, user_data); } }; reader.onerror = () => { __sapp_emsc_invoke_fetch_cb(index, 0, 2, callback, 0, buf_ptr, buf_size, user_data); }; /** @suppress {missingProperties} */ const files = Module.sokol_dropped_files; reader.readAsArrayBuffer(files[index]); }
function sapp_js_remove_dragndrop_listeners(canvas_name_cstr) { const canvas_name = UTF8ToString(canvas_name_cstr); const canvas = document.getElementById(canvas_name); canvas.removeEventListener('dragenter', Module.sokol_dragenter); canvas.removeEventListener('dragleave', Module.sokol_dragleave); canvas.removeEventListener('dragover', Module.sokol_dragover); canvas.removeEventListener('drop', Module.sokol_drop); }
function sapp_js_init(c_str_target) { const target_str = UTF8ToString(c_str_target); Module.sapp_emsc_target = document.getElementById(target_str); if (!Module.sapp_emsc_target) { console.log("sokol_app.h: invalid target:" + target_str); } if (!Module.sapp_emsc_target.requestPointerLock) { console.log("sokol_app.h: target doesn't support requestPointerLock:" + target_str); } }
function sapp_js_request_pointerlock() { if (Module.sapp_emsc_target) { if (Module.sapp_emsc_target.requestPointerLock) { Module.sapp_emsc_target.requestPointerLock(); } } }
function sapp_js_exit_pointerlock() { if (document.exitPointerLock) { document.exitPointerLock(); } }
function sapp_js_set_cursor(cursor_type,shown) { if (Module.sapp_emsc_target) { let cursor; if (shown === 0) { cursor = "none"; } else switch (cursor_type) { case 0: cursor = "auto"; break; case 1: cursor = "default"; break; case 2: cursor = "text"; break; case 3: cursor = "crosshair"; break; case 4: cursor = "pointer"; break; case 5: cursor = "ew-resize"; break; case 6: cursor = "ns-resize"; break; case 7: cursor = "nwse-resize"; break; case 8: cursor = "nesw-resize"; break; case 9: cursor = "all-scroll"; break; case 10: cursor = "not-allowed"; break; default: cursor = "auto"; break; } Module.sapp_emsc_target.style.cursor = cursor; } }
function sapp_js_clear_favicon() { const link = document.getElementById('sokol-app-favicon'); if (link) { document.head.removeChild(link); } }
function sapp_js_set_favicon(w,h,pixels) { const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h; const ctx = canvas.getContext('2d'); const img_data = ctx.createImageData(w, h); img_data.data.set(HEAPU8.subarray(pixels, pixels + w*h*4)); ctx.putImageData(img_data, 0, 0); const new_link = document.createElement('link'); new_link.id = 'sokol-app-favicon'; new_link.rel = 'shortcut icon'; new_link.href = canvas.toDataURL(); document.head.appendChild(new_link); }
function slog_js_log(level,c_str) { const str = UTF8ToString(c_str); switch (level) { case 0: console.error(str); break; case 1: console.error(str); break; case 2: console.warn(str); break; default: console.info(str); break; } }

// end include: preamble.js


  /** @constructor */
  function ExitStatus(status) {
      this.name = 'ExitStatus';
      this.message = `Program terminated with exit(${status})`;
      this.status = status;
    }

  var callRuntimeCallbacks = (callbacks) => {
      // Pass the module as the first argument.
      callbacks.forEach((f) => f(Module));
    };

  
    /**
     * @param {number} ptr
     * @param {string} type
     */
  function getValue(ptr, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': return HEAP8[ptr];
      case 'i8': return HEAP8[ptr];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': abort('to do getValue(i64) use WASM_BIGINT');
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      case '*': return HEAPU32[((ptr)>>2)];
      default: abort(`invalid type for getValue: ${type}`);
    }
  }

  var noExitRuntime = Module['noExitRuntime'] || true;

  var ptrToString = (ptr) => {
      assert(typeof ptr === 'number');
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      ptr >>>= 0;
      return '0x' + ptr.toString(16).padStart(8, '0');
    };

  
    /**
     * @param {number} ptr
     * @param {number} value
     * @param {string} type
     */
  function setValue(ptr, value, type = 'i8') {
    if (type.endsWith('*')) type = '*';
    switch (type) {
      case 'i1': HEAP8[ptr] = value; break;
      case 'i8': HEAP8[ptr] = value; break;
      case 'i16': HEAP16[((ptr)>>1)] = value; break;
      case 'i32': HEAP32[((ptr)>>2)] = value; break;
      case 'i64': abort('to do setValue(i64) use WASM_BIGINT');
      case 'float': HEAPF32[((ptr)>>2)] = value; break;
      case 'double': HEAPF64[((ptr)>>3)] = value; break;
      case '*': HEAPU32[((ptr)>>2)] = value; break;
      default: abort(`invalid type for setValue: ${type}`);
    }
  }

  var stackRestore = (val) => __emscripten_stack_restore(val);

  var stackSave = () => _emscripten_stack_get_current();

  var warnOnce = (text) => {
      warnOnce.shown ||= {};
      if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1;
        if (ENVIRONMENT_IS_NODE) text = 'warning: ' + text;
        err(text);
      }
    };

  var UTF8Decoder = typeof TextDecoder != 'undefined' ? new TextDecoder() : undefined;
  
    /**
     * Given a pointer 'idx' to a null-terminated UTF8-encoded string in the given
     * array that contains uint8 values, returns a copy of that string as a
     * Javascript String object.
     * heapOrArray is either a regular array, or a JavaScript typed array view.
     * @param {number=} idx
     * @param {number=} maxBytesToRead
     * @return {string}
     */
  var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead = NaN) => {
      var endIdx = idx + maxBytesToRead;
      var endPtr = idx;
      // TextDecoder needs to know the byte length in advance, it doesn't stop on
      // null terminator by itself.  Also, use the length info to avoid running tiny
      // strings through TextDecoder, since .subarray() allocates garbage.
      // (As a tiny code save trick, compare endPtr against endIdx using a negation,
      // so that undefined/NaN means Infinity)
      while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
  
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
      }
      var str = '';
      // If building with TextDecoder, we have already computed the string length
      // above, so test loop end condition against that
      while (idx < endPtr) {
        // For UTF8 byte structure, see:
        // http://en.wikipedia.org/wiki/UTF-8#Description
        // https://www.ietf.org/rfc/rfc2279.txt
        // https://tools.ietf.org/html/rfc3629
        var u0 = heapOrArray[idx++];
        if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 0xF0) == 0xE0) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
        } else {
          if ((u0 & 0xF8) != 0xF0) warnOnce('Invalid UTF-8 leading byte ' + ptrToString(u0) + ' encountered when deserializing a UTF-8 string in wasm memory to a JS string!');
          u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
        }
  
        if (u0 < 0x10000) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 0x10000;
          str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
        }
      }
      return str;
    };
  
    /**
     * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
     * emscripten HEAP, returns a copy of that string as a Javascript String object.
     *
     * @param {number} ptr
     * @param {number=} maxBytesToRead - An optional length that specifies the
     *   maximum number of bytes to read. You can omit this parameter to scan the
     *   string until the first 0 byte. If maxBytesToRead is passed, and the string
     *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
     *   string will cut short at that byte index (i.e. maxBytesToRead will not
     *   produce a string of exact length [ptr, ptr+maxBytesToRead[) N.B. mixing
     *   frequent uses of UTF8ToString() with and without maxBytesToRead may throw
     *   JS JIT optimizations off, so it is worth to consider consistently using one
     * @return {string}
     */
  var UTF8ToString = (ptr, maxBytesToRead) => {
      assert(typeof ptr == 'number', `UTF8ToString expects a number (got ${typeof ptr})`);
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
    };
  var ___assert_fail = (condition, filename, line, func) => {
      abort(`Assertion failed: ${UTF8ToString(condition)}, at: ` + [filename ? UTF8ToString(filename) : 'unknown filename', line, func ? UTF8ToString(func) : 'unknown function']);
    };

  var __abort_js = () => {
      abort('native code called abort()');
    };

  var __emscripten_memcpy_js = (dest, src, num) => HEAPU8.copyWithin(dest, src, src + num);

  
  var _emscripten_set_main_loop_timing = (mode, value) => {
      MainLoop.timingMode = mode;
      MainLoop.timingValue = value;
  
      if (!MainLoop.func) {
        err('emscripten_set_main_loop_timing: Cannot set timing mode for main loop since a main loop does not exist! Call emscripten_set_main_loop first to set one up.');
        return 1; // Return non-zero on failure, can't set timing mode when there is no main loop.
      }
  
      if (!MainLoop.running) {
        
        MainLoop.running = true;
      }
      if (mode == 0) {
        MainLoop.scheduler = function MainLoop_scheduler_setTimeout() {
          var timeUntilNextTick = Math.max(0, MainLoop.tickStartTime + value - _emscripten_get_now())|0;
          setTimeout(MainLoop.runner, timeUntilNextTick); // doing this each time means that on exception, we stop
        };
        MainLoop.method = 'timeout';
      } else if (mode == 1) {
        MainLoop.scheduler = function MainLoop_scheduler_rAF() {
          MainLoop.requestAnimationFrame(MainLoop.runner);
        };
        MainLoop.method = 'rAF';
      } else if (mode == 2) {
        if (typeof MainLoop.setImmediate == 'undefined') {
          if (typeof setImmediate == 'undefined') {
            // Emulate setImmediate. (note: not a complete polyfill, we don't emulate clearImmediate() to keep code size to minimum, since not needed)
            var setImmediates = [];
            var emscriptenMainLoopMessageId = 'setimmediate';
            /** @param {Event} event */
            var MainLoop_setImmediate_messageHandler = (event) => {
              // When called in current thread or Worker, the main loop ID is structured slightly different to accommodate for --proxy-to-worker runtime listening to Worker events,
              // so check for both cases.
              if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
                event.stopPropagation();
                setImmediates.shift()();
              }
            };
            addEventListener("message", MainLoop_setImmediate_messageHandler, true);
            MainLoop.setImmediate = /** @type{function(function(): ?, ...?): number} */((func) => {
              setImmediates.push(func);
              if (ENVIRONMENT_IS_WORKER) {
                Module['setImmediates'] ??= [];
                Module['setImmediates'].push(func);
                postMessage({target: emscriptenMainLoopMessageId}); // In --proxy-to-worker, route the message via proxyClient.js
              } else postMessage(emscriptenMainLoopMessageId, "*"); // On the main thread, can just send the message to itself.
            });
          } else {
            MainLoop.setImmediate = setImmediate;
          }
        }
        MainLoop.scheduler = function MainLoop_scheduler_setImmediate() {
          MainLoop.setImmediate(MainLoop.runner);
        };
        MainLoop.method = 'immediate';
      }
      return 0;
    };
  
  var _emscripten_get_now = () => performance.now();
  
  
  var runtimeKeepaliveCounter = 0;
  var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
  var _proc_exit = (code) => {
      EXITSTATUS = code;
      if (!keepRuntimeAlive()) {
        Module['onExit']?.(code);
        ABORT = true;
      }
      quit_(code, new ExitStatus(code));
    };
  
  /** @suppress {duplicate } */
  /** @param {boolean|number=} implicit */
  var exitJS = (status, implicit) => {
      EXITSTATUS = status;
  
      checkUnflushedContent();
  
      // if exit() was called explicitly, warn the user if the runtime isn't actually being shut down
      if (keepRuntimeAlive() && !implicit) {
        var msg = `program exited (with status: ${status}), but keepRuntimeAlive() is set (counter=${runtimeKeepaliveCounter}) due to an async operation, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)`;
        readyPromiseReject(msg);
        err(msg);
      }
  
      _proc_exit(status);
    };
  var _exit = exitJS;
  
  var handleException = (e) => {
      // Certain exception types we do not treat as errors since they are used for
      // internal control flow.
      // 1. ExitStatus, which is thrown by exit()
      // 2. "unwind", which is thrown by emscripten_unwind_to_js_event_loop() and others
      //    that wish to return to JS event loop.
      if (e instanceof ExitStatus || e == 'unwind') {
        return EXITSTATUS;
      }
      checkStackCookie();
      if (e instanceof WebAssembly.RuntimeError) {
        if (_emscripten_stack_get_current() <= 0) {
          err('Stack overflow detected.  You can try increasing -sSTACK_SIZE (currently set to 65536)');
        }
      }
      quit_(1, e);
    };
  
  var maybeExit = () => {
      if (!keepRuntimeAlive()) {
        try {
          _exit(EXITSTATUS);
        } catch (e) {
          handleException(e);
        }
      }
    };
  
    /**
     * @param {number=} arg
     * @param {boolean=} noSetTiming
     */
  var setMainLoop = (iterFunc, fps, simulateInfiniteLoop, arg, noSetTiming) => {
      assert(!MainLoop.func, 'emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters.');
      MainLoop.func = iterFunc;
      MainLoop.arg = arg;
  
      var thisMainLoopId = MainLoop.currentlyRunningMainloop;
      function checkIsRunning() {
        if (thisMainLoopId < MainLoop.currentlyRunningMainloop) {
          
          maybeExit();
          return false;
        }
        return true;
      }
  
      // We create the loop runner here but it is not actually running until
      // _emscripten_set_main_loop_timing is called (which might happen a
      // later time).  This member signifies that the current runner has not
      // yet been started so that we can call runtimeKeepalivePush when it
      // gets it timing set for the first time.
      MainLoop.running = false;
      MainLoop.runner = function MainLoop_runner() {
        if (ABORT) return;
        if (MainLoop.queue.length > 0) {
          var start = Date.now();
          var blocker = MainLoop.queue.shift();
          blocker.func(blocker.arg);
          if (MainLoop.remainingBlockers) {
            var remaining = MainLoop.remainingBlockers;
            var next = remaining%1 == 0 ? remaining-1 : Math.floor(remaining);
            if (blocker.counted) {
              MainLoop.remainingBlockers = next;
            } else {
              // not counted, but move the progress along a tiny bit
              next = next + 0.5; // do not steal all the next one's progress
              MainLoop.remainingBlockers = (8*remaining + next)/9;
            }
          }
          MainLoop.updateStatus();
  
          // catches pause/resume main loop from blocker execution
          if (!checkIsRunning()) return;
  
          setTimeout(MainLoop.runner, 0);
          return;
        }
  
        // catch pauses from non-main loop sources
        if (!checkIsRunning()) return;
  
        // Implement very basic swap interval control
        MainLoop.currentFrameNumber = MainLoop.currentFrameNumber + 1 | 0;
        if (MainLoop.timingMode == 1 && MainLoop.timingValue > 1 && MainLoop.currentFrameNumber % MainLoop.timingValue != 0) {
          // Not the scheduled time to render this frame - skip.
          MainLoop.scheduler();
          return;
        } else if (MainLoop.timingMode == 0) {
          MainLoop.tickStartTime = _emscripten_get_now();
        }
  
        if (MainLoop.method === 'timeout' && Module.ctx) {
          warnOnce('Looks like you are rendering without using requestAnimationFrame for the main loop. You should use 0 for the frame rate in emscripten_set_main_loop in order to use requestAnimationFrame, as that can greatly improve your frame rates!');
          MainLoop.method = ''; // just warn once per call to set main loop
        }
  
        MainLoop.runIter(iterFunc);
  
        // catch pauses from the main loop itself
        if (!checkIsRunning()) return;
  
        MainLoop.scheduler();
      }
  
      if (!noSetTiming) {
        if (fps && fps > 0) {
          _emscripten_set_main_loop_timing(0, 1000.0 / fps);
        } else {
          // Do rAF by rendering each frame (no decimating)
          _emscripten_set_main_loop_timing(1, 1);
        }
  
        MainLoop.scheduler();
      }
  
      if (simulateInfiniteLoop) {
        throw 'unwind';
      }
    };
  
  
  var callUserCallback = (func) => {
      if (ABORT) {
        err('user callback triggered after runtime exited or application aborted.  Ignoring.');
        return;
      }
      try {
        func();
        maybeExit();
      } catch (e) {
        handleException(e);
      }
    };
  
  var MainLoop = {
  running:false,
  scheduler:null,
  method:"",
  currentlyRunningMainloop:0,
  func:null,
  arg:0,
  timingMode:0,
  timingValue:0,
  currentFrameNumber:0,
  queue:[],
  preMainLoop:[],
  postMainLoop:[],
  pause() {
        MainLoop.scheduler = null;
        // Incrementing this signals the previous main loop that it's now become old, and it must return.
        MainLoop.currentlyRunningMainloop++;
      },
  resume() {
        MainLoop.currentlyRunningMainloop++;
        var timingMode = MainLoop.timingMode;
        var timingValue = MainLoop.timingValue;
        var func = MainLoop.func;
        MainLoop.func = null;
        // do not set timing and call scheduler, we will do it on the next lines
        setMainLoop(func, 0, false, MainLoop.arg, true);
        _emscripten_set_main_loop_timing(timingMode, timingValue);
        MainLoop.scheduler();
      },
  updateStatus() {
        if (Module['setStatus']) {
          var message = Module['statusMessage'] || 'Please wait...';
          var remaining = MainLoop.remainingBlockers ?? 0;
          var expected = MainLoop.expectedBlockers ?? 0;
          if (remaining) {
            if (remaining < expected) {
              Module['setStatus'](`{message} ({expected - remaining}/{expected})`);
            } else {
              Module['setStatus'](message);
            }
          } else {
            Module['setStatus']('');
          }
        }
      },
  init() {
        Module['preMainLoop'] && MainLoop.preMainLoop.push(Module['preMainLoop']);
        Module['postMainLoop'] && MainLoop.postMainLoop.push(Module['postMainLoop']);
      },
  runIter(func) {
        if (ABORT) return;
        for (var pre of MainLoop.preMainLoop) {
          if (pre() === false) {
            return; // |return false| skips a frame
          }
        }
        callUserCallback(func);
        for (var post of MainLoop.postMainLoop) {
          post();
        }
        checkStackCookie();
      },
  nextRAF:0,
  fakeRequestAnimationFrame(func) {
        // try to keep 60fps between calls to here
        var now = Date.now();
        if (MainLoop.nextRAF === 0) {
          MainLoop.nextRAF = now + 1000/60;
        } else {
          while (now + 2 >= MainLoop.nextRAF) { // fudge a little, to avoid timer jitter causing us to do lots of delay:0
            MainLoop.nextRAF += 1000/60;
          }
        }
        var delay = Math.max(MainLoop.nextRAF - now, 0);
        setTimeout(func, delay);
      },
  requestAnimationFrame(func) {
        if (typeof requestAnimationFrame == 'function') {
          requestAnimationFrame(func);
          return;
        }
        var RAF = MainLoop.fakeRequestAnimationFrame;
        RAF(func);
      },
  };
  var _emscripten_cancel_main_loop = () => {
      MainLoop.pause();
      MainLoop.func = null;
    };

  var _emscripten_get_device_pixel_ratio = () => {
      return (typeof devicePixelRatio == 'number' && devicePixelRatio) || 1.0;
    };

  var JSEvents = {
  removeAllEventListeners() {
        while (JSEvents.eventHandlers.length) {
          JSEvents._removeHandler(JSEvents.eventHandlers.length - 1);
        }
        JSEvents.deferredCalls = [];
      },
  inEventHandler:0,
  deferredCalls:[],
  deferCall(targetFunction, precedence, argsList) {
        function arraysHaveEqualContent(arrA, arrB) {
          if (arrA.length != arrB.length) return false;
  
          for (var i in arrA) {
            if (arrA[i] != arrB[i]) return false;
          }
          return true;
        }
        // Test if the given call was already queued, and if so, don't add it again.
        for (var call of JSEvents.deferredCalls) {
          if (call.targetFunction == targetFunction && arraysHaveEqualContent(call.argsList, argsList)) {
            return;
          }
        }
        JSEvents.deferredCalls.push({
          targetFunction,
          precedence,
          argsList
        });
  
        JSEvents.deferredCalls.sort((x,y) => x.precedence < y.precedence);
      },
  removeDeferredCalls(targetFunction) {
        JSEvents.deferredCalls = JSEvents.deferredCalls.filter((call) => call.targetFunction != targetFunction);
      },
  canPerformEventHandlerRequests() {
        if (navigator.userActivation) {
          // Verify against transient activation status from UserActivation API
          // whether it is possible to perform a request here without needing to defer. See
          // https://developer.mozilla.org/en-US/docs/Web/Security/User_activation#transient_activation
          // and https://caniuse.com/mdn-api_useractivation
          // At the time of writing, Firefox does not support this API: https://bugzilla.mozilla.org/show_bug.cgi?id=1791079
          return navigator.userActivation.isActive;
        }
  
        return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls;
      },
  runDeferredCalls() {
        if (!JSEvents.canPerformEventHandlerRequests()) {
          return;
        }
        var deferredCalls = JSEvents.deferredCalls;
        JSEvents.deferredCalls = [];
        for (var call of deferredCalls) {
          call.targetFunction(...call.argsList);
        }
      },
  eventHandlers:[],
  removeAllHandlersOnTarget:(target, eventTypeString) => {
        for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
          if (JSEvents.eventHandlers[i].target == target &&
            (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i].eventTypeString)) {
             JSEvents._removeHandler(i--);
           }
        }
      },
  _removeHandler(i) {
        var h = JSEvents.eventHandlers[i];
        h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture);
        JSEvents.eventHandlers.splice(i, 1);
      },
  registerOrRemoveHandler(eventHandler) {
        if (!eventHandler.target) {
          err('registerOrRemoveHandler: the target element for event handler registration does not exist, when processing the following event handler registration:');
          console.dir(eventHandler);
          return -4;
        }
        if (eventHandler.callbackfunc) {
          eventHandler.eventListenerFunc = function(event) {
            // Increment nesting count for the event handler.
            ++JSEvents.inEventHandler;
            JSEvents.currentEventHandler = eventHandler;
            // Process any old deferred calls the user has placed.
            JSEvents.runDeferredCalls();
            // Process the actual event, calls back to user C code handler.
            eventHandler.handlerFunc(event);
            // Process any new deferred calls that were placed right now from this event handler.
            JSEvents.runDeferredCalls();
            // Out of event handler - restore nesting count.
            --JSEvents.inEventHandler;
          };
  
          eventHandler.target.addEventListener(eventHandler.eventTypeString,
                                               eventHandler.eventListenerFunc,
                                               eventHandler.useCapture);
          JSEvents.eventHandlers.push(eventHandler);
        } else {
          for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
            if (JSEvents.eventHandlers[i].target == eventHandler.target
             && JSEvents.eventHandlers[i].eventTypeString == eventHandler.eventTypeString) {
               JSEvents._removeHandler(i--);
             }
          }
        }
        return 0;
      },
  getNodeNameForTarget(target) {
        if (!target) return '';
        if (target == window) return '#window';
        if (target == screen) return '#screen';
        return target?.nodeName || '';
      },
  fullscreenEnabled() {
        return document.fullscreenEnabled
        // Safari 13.0.3 on macOS Catalina 10.15.1 still ships with prefixed webkitFullscreenEnabled.
        // TODO: If Safari at some point ships with unprefixed version, update the version check above.
        || document.webkitFullscreenEnabled
         ;
      },
  };
  
  var maybeCStringToJsString = (cString) => {
      // "cString > 2" checks if the input is a number, and isn't of the special
      // values we accept here, EMSCRIPTEN_EVENT_TARGET_* (which map to 0, 1, 2).
      // In other words, if cString > 2 then it's a pointer to a valid place in
      // memory, and points to a C string.
      return cString > 2 ? UTF8ToString(cString) : cString;
    };
  
  /** @type {Object} */
  var specialHTMLTargets = [0, typeof document != 'undefined' ? document : 0, typeof window != 'undefined' ? window : 0];
  var findEventTarget = (target) => {
      target = maybeCStringToJsString(target);
      var domElement = specialHTMLTargets[target] || (typeof document != 'undefined' ? document.querySelector(target) : undefined);
      return domElement;
    };
  
  var getBoundingClientRect = (e) => specialHTMLTargets.indexOf(e) < 0 ? e.getBoundingClientRect() : {'left':0,'top':0};
  var _emscripten_get_element_css_size = (target, width, height) => {
      target = findEventTarget(target);
      if (!target) return -4;
  
      var rect = getBoundingClientRect(target);
      HEAPF64[((width)>>3)] = rect.width;
      HEAPF64[((height)>>3)] = rect.height;
  
      return 0;
    };

  var _emscripten_performance_now = () => performance.now();

  var wasmTableMirror = [];
  
  /** @type {WebAssembly.Table} */
  var wasmTable;
  var getWasmTableEntry = (funcPtr) => {
      var func = wasmTableMirror[funcPtr];
      if (!func) {
        if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
        wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
      }
      assert(wasmTable.get(funcPtr) == func, 'JavaScript-side Wasm function table mirror is out of date!');
      return func;
    };
  var _emscripten_request_animation_frame_loop = (cb, userData) => {
      function tick(timeStamp) {
        if (getWasmTableEntry(cb)(timeStamp, userData)) {
          requestAnimationFrame(tick);
        }
      }
      return requestAnimationFrame(tick);
    };

  var getHeapMax = () =>
      HEAPU8.length;
  
  var alignMemory = (size, alignment) => {
      assert(alignment, "alignment argument is required");
      return Math.ceil(size / alignment) * alignment;
    };
  
  var abortOnCannotGrowMemory = (requestedSize) => {
      abort(`Cannot enlarge memory arrays to size ${requestedSize} bytes (OOM). Either (1) compile with -sINITIAL_MEMORY=X with X higher than the current value ${HEAP8.length}, (2) compile with -sALLOW_MEMORY_GROWTH which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with -sABORTING_MALLOC=0`);
    };
  var _emscripten_resize_heap = (requestedSize) => {
      var oldSize = HEAPU8.length;
      // With CAN_ADDRESS_2GB or MEMORY64, pointers are already unsigned.
      requestedSize >>>= 0;
      abortOnCannotGrowMemory(requestedSize);
    };

  
  
  
  var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
      assert(typeof str === 'string', `stringToUTF8Array expects a string (got ${typeof str})`);
      // Parameter maxBytesToWrite is not optional. Negative values, 0, null,
      // undefined and false each don't write out any bytes.
      if (!(maxBytesToWrite > 0))
        return 0;
  
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description
        // and https://www.ietf.org/rfc/rfc2279.txt
        // and https://tools.ietf.org/html/rfc3629
        var u = str.charCodeAt(i); // possibly a lead surrogate
        if (u >= 0xD800 && u <= 0xDFFF) {
          var u1 = str.charCodeAt(++i);
          u = 0x10000 + ((u & 0x3FF) << 10) | (u1 & 0x3FF);
        }
        if (u <= 0x7F) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 0x7FF) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 0xC0 | (u >> 6);
          heap[outIdx++] = 0x80 | (u & 63);
        } else if (u <= 0xFFFF) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 0xE0 | (u >> 12);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        } else {
          if (outIdx + 3 >= endIdx) break;
          if (u > 0x10FFFF) warnOnce('Invalid Unicode code point ' + ptrToString(u) + ' encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).');
          heap[outIdx++] = 0xF0 | (u >> 18);
          heap[outIdx++] = 0x80 | ((u >> 12) & 63);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        }
      }
      // Null-terminate the pointer to the buffer.
      heap[outIdx] = 0;
      return outIdx - startIdx;
    };
  var stringToUTF8 = (str, outPtr, maxBytesToWrite) => {
      assert(typeof maxBytesToWrite == 'number', 'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
      return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
    };
  
  var registerFocusEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.focusEvent ||= _malloc(256);
  
      var focusEventHandlerFunc = (e = event) => {
        var nodeName = JSEvents.getNodeNameForTarget(e.target);
        var id = e.target.id ? e.target.id : '';
  
        var focusEvent = JSEvents.focusEvent;
        stringToUTF8(nodeName, focusEvent + 0, 128);
        stringToUTF8(id, focusEvent + 128, 128);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, focusEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: findEventTarget(target),
        eventTypeString,
        callbackfunc,
        handlerFunc: focusEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_blur_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerFocusEventCallback(target, userData, useCapture, callbackfunc, 12, "blur", targetThread);

  
  var findCanvasEventTarget = findEventTarget;
  var _emscripten_set_canvas_element_size = (target, width, height) => {
      var canvas = findCanvasEventTarget(target);
      if (!canvas) return -4;
      canvas.width = width;
      canvas.height = height;
      return 0;
    };

  var _emscripten_set_focus_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerFocusEventCallback(target, userData, useCapture, callbackfunc, 13, "focus", targetThread);

  
  
  
  
  var registerKeyEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.keyEvent ||= _malloc(160);
  
      var keyEventHandlerFunc = (e) => {
        assert(e);
  
        var keyEventData = JSEvents.keyEvent;
        HEAPF64[((keyEventData)>>3)] = e.timeStamp;
  
        var idx = ((keyEventData)>>2);
  
        HEAP32[idx + 2] = e.location;
        HEAP8[keyEventData + 12] = e.ctrlKey;
        HEAP8[keyEventData + 13] = e.shiftKey;
        HEAP8[keyEventData + 14] = e.altKey;
        HEAP8[keyEventData + 15] = e.metaKey;
        HEAP8[keyEventData + 16] = e.repeat;
        HEAP32[idx + 5] = e.charCode;
        HEAP32[idx + 6] = e.keyCode;
        HEAP32[idx + 7] = e.which;
        stringToUTF8(e.key || '', keyEventData + 32, 32);
        stringToUTF8(e.code || '', keyEventData + 64, 32);
        stringToUTF8(e.char || '', keyEventData + 96, 32);
        stringToUTF8(e.locale || '', keyEventData + 128, 32);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, keyEventData, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: findEventTarget(target),
        eventTypeString,
        callbackfunc,
        handlerFunc: keyEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_keydown_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerKeyEventCallback(target, userData, useCapture, callbackfunc, 2, "keydown", targetThread);

  var _emscripten_set_keypress_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerKeyEventCallback(target, userData, useCapture, callbackfunc, 1, "keypress", targetThread);

  var _emscripten_set_keyup_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerKeyEventCallback(target, userData, useCapture, callbackfunc, 3, "keyup", targetThread);

  
  var _emscripten_set_main_loop = (func, fps, simulateInfiniteLoop) => {
      var iterFunc = getWasmTableEntry(func);
      setMainLoop(iterFunc, fps, simulateInfiniteLoop);
    };

  
  
  
  var fillMouseEventData = (eventStruct, e, target) => {
      assert(eventStruct % 4 == 0);
      HEAPF64[((eventStruct)>>3)] = e.timeStamp;
      var idx = ((eventStruct)>>2);
      HEAP32[idx + 2] = e.screenX;
      HEAP32[idx + 3] = e.screenY;
      HEAP32[idx + 4] = e.clientX;
      HEAP32[idx + 5] = e.clientY;
      HEAP8[eventStruct + 24] = e.ctrlKey;
      HEAP8[eventStruct + 25] = e.shiftKey;
      HEAP8[eventStruct + 26] = e.altKey;
      HEAP8[eventStruct + 27] = e.metaKey;
      HEAP16[idx*2 + 14] = e.button;
      HEAP16[idx*2 + 15] = e.buttons;
  
      HEAP32[idx + 8] = e["movementX"]
        ;
  
      HEAP32[idx + 9] = e["movementY"]
        ;
  
      // Note: rect contains doubles (truncated to placate SAFE_HEAP, which is the same behaviour when writing to HEAP32 anyway)
      var rect = getBoundingClientRect(target);
      HEAP32[idx + 10] = e.clientX - (rect.left | 0);
      HEAP32[idx + 11] = e.clientY - (rect.top  | 0);
  
    };
  
  
  
  var registerMouseEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.mouseEvent ||= _malloc(64);
      target = findEventTarget(target);
  
      var mouseEventHandlerFunc = (e = event) => {
        // TODO: Make this access thread safe, or this could update live while app is reading it.
        fillMouseEventData(JSEvents.mouseEvent, e, target);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, JSEvents.mouseEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        allowsDeferredCalls: eventTypeString != 'mousemove' && eventTypeString != 'mouseenter' && eventTypeString != 'mouseleave', // Mouse move events do not allow fullscreen/pointer lock requests to be handled in them!
        eventTypeString,
        callbackfunc,
        handlerFunc: mouseEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_mousedown_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 5, "mousedown", targetThread);

  var _emscripten_set_mouseenter_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 33, "mouseenter", targetThread);

  var _emscripten_set_mouseleave_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 34, "mouseleave", targetThread);

  var _emscripten_set_mousemove_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 8, "mousemove", targetThread);

  var _emscripten_set_mouseup_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerMouseEventCallback(target, userData, useCapture, callbackfunc, 6, "mouseup", targetThread);

  
  
  
  var fillPointerlockChangeEventData = (eventStruct) => {
      var pointerLockElement = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement || document.msPointerLockElement;
      var isPointerlocked = !!pointerLockElement;
      // Assigning a boolean to HEAP32 with expected type coercion.
      /** @suppress{checkTypes} */
      HEAP8[eventStruct] = isPointerlocked;
      var nodeName = JSEvents.getNodeNameForTarget(pointerLockElement);
      var id = pointerLockElement?.id || '';
      stringToUTF8(nodeName, eventStruct + 1, 128);
      stringToUTF8(id, eventStruct + 129, 128);
    };
  
  
  
  var registerPointerlockChangeEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.pointerlockChangeEvent ||= _malloc(257);
  
      var pointerlockChangeEventHandlerFunc = (e = event) => {
        var pointerlockChangeEvent = JSEvents.pointerlockChangeEvent;
        fillPointerlockChangeEventData(pointerlockChangeEvent);
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, pointerlockChangeEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        eventTypeString,
        callbackfunc,
        handlerFunc: pointerlockChangeEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  
  
  /** @suppress {missingProperties} */
  var _emscripten_set_pointerlockchange_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
      // TODO: Currently not supported in pthreads or in --proxy-to-worker mode. (In pthreads mode, document object is not defined)
      if (!document || !document.body || (!document.body.requestPointerLock && !document.body.mozRequestPointerLock && !document.body.webkitRequestPointerLock && !document.body.msRequestPointerLock)) {
        return -1;
      }
  
      target = findEventTarget(target);
      if (!target) return -4;
      registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "mozpointerlockchange", targetThread);
      registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "webkitpointerlockchange", targetThread);
      registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "mspointerlockchange", targetThread);
      return registerPointerlockChangeEventCallback(target, userData, useCapture, callbackfunc, 20, "pointerlockchange", targetThread);
    };

  
  
  
  
  var registerPointerlockErrorEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
  
      var pointerlockErrorEventHandlerFunc = (e = event) => {
        if (getWasmTableEntry(callbackfunc)(eventTypeId, 0, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        eventTypeString,
        callbackfunc,
        handlerFunc: pointerlockErrorEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  
  
  /** @suppress {missingProperties} */
  var _emscripten_set_pointerlockerror_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
      // TODO: Currently not supported in pthreads or in --proxy-to-worker mode. (In pthreads mode, document object is not defined)
      if (!document || !document.body.requestPointerLock && !document.body.mozRequestPointerLock && !document.body.webkitRequestPointerLock && !document.body.msRequestPointerLock) {
        return -1;
      }
  
      target = findEventTarget(target);
  
      if (!target) return -4;
      registerPointerlockErrorEventCallback(target, userData, useCapture, callbackfunc, 38, "mozpointerlockerror", targetThread);
      registerPointerlockErrorEventCallback(target, userData, useCapture, callbackfunc, 38, "webkitpointerlockerror", targetThread);
      registerPointerlockErrorEventCallback(target, userData, useCapture, callbackfunc, 38, "mspointerlockerror", targetThread);
      return registerPointerlockErrorEventCallback(target, userData, useCapture, callbackfunc, 38, "pointerlockerror", targetThread);
    };

  
  
  
  var registerUiEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.uiEvent ||= _malloc(36);
  
      target = findEventTarget(target);
  
      var uiEventHandlerFunc = (e = event) => {
        if (e.target != target) {
          // Never take ui events such as scroll via a 'bubbled' route, but always from the direct element that
          // was targeted. Otherwise e.g. if app logs a message in response to a page scroll, the Emscripten log
          // message box could cause to scroll, generating a new (bubbled) scroll message, causing a new log print,
          // causing a new scroll, etc..
          return;
        }
        var b = document.body; // Take document.body to a variable, Closure compiler does not outline access to it on its own.
        if (!b) {
          // During a page unload 'body' can be null, with "Cannot read property 'clientWidth' of null" being thrown
          return;
        }
        var uiEvent = JSEvents.uiEvent;
        HEAP32[((uiEvent)>>2)] = 0; // always zero for resize and scroll
        HEAP32[(((uiEvent)+(4))>>2)] = b.clientWidth;
        HEAP32[(((uiEvent)+(8))>>2)] = b.clientHeight;
        HEAP32[(((uiEvent)+(12))>>2)] = innerWidth;
        HEAP32[(((uiEvent)+(16))>>2)] = innerHeight;
        HEAP32[(((uiEvent)+(20))>>2)] = outerWidth;
        HEAP32[(((uiEvent)+(24))>>2)] = outerHeight;
        HEAP32[(((uiEvent)+(28))>>2)] = pageXOffset | 0; // scroll offsets are float
        HEAP32[(((uiEvent)+(32))>>2)] = pageYOffset | 0;
        if (getWasmTableEntry(callbackfunc)(eventTypeId, uiEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        eventTypeString,
        callbackfunc,
        handlerFunc: uiEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_resize_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerUiEventCallback(target, userData, useCapture, callbackfunc, 10, "resize", targetThread);

  
  
  
  
  var registerTouchEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.touchEvent ||= _malloc(1552);
  
      target = findEventTarget(target);
  
      var touchEventHandlerFunc = (e) => {
        assert(e);
        var t, touches = {}, et = e.touches;
        // To ease marshalling different kinds of touches that browser reports (all touches are listed in e.touches,
        // only changed touches in e.changedTouches, and touches on target at a.targetTouches), mark a boolean in
        // each Touch object so that we can later loop only once over all touches we see to marshall over to Wasm.
  
        for (let t of et) {
          // Browser might recycle the generated Touch objects between each frame (Firefox on Android), so reset any
          // changed/target states we may have set from previous frame.
          t.isChanged = t.onTarget = 0;
          touches[t.identifier] = t;
        }
        // Mark which touches are part of the changedTouches list.
        for (let t of e.changedTouches) {
          t.isChanged = 1;
          touches[t.identifier] = t;
        }
        // Mark which touches are part of the targetTouches list.
        for (let t of e.targetTouches) {
          touches[t.identifier].onTarget = 1;
        }
  
        var touchEvent = JSEvents.touchEvent;
        HEAPF64[((touchEvent)>>3)] = e.timeStamp;
        HEAP8[touchEvent + 12] = e.ctrlKey;
        HEAP8[touchEvent + 13] = e.shiftKey;
        HEAP8[touchEvent + 14] = e.altKey;
        HEAP8[touchEvent + 15] = e.metaKey;
        var idx = touchEvent + 16;
        var targetRect = getBoundingClientRect(target);
        var numTouches = 0;
        for (let t of Object.values(touches)) {
          var idx32 = ((idx)>>2); // Pre-shift the ptr to index to HEAP32 to save code size
          HEAP32[idx32 + 0] = t.identifier;
          HEAP32[idx32 + 1] = t.screenX;
          HEAP32[idx32 + 2] = t.screenY;
          HEAP32[idx32 + 3] = t.clientX;
          HEAP32[idx32 + 4] = t.clientY;
          HEAP32[idx32 + 5] = t.pageX;
          HEAP32[idx32 + 6] = t.pageY;
          HEAP8[idx + 28] = t.isChanged;
          HEAP8[idx + 29] = t.onTarget;
          HEAP32[idx32 + 8] = t.clientX - (targetRect.left | 0);
          HEAP32[idx32 + 9] = t.clientY - (targetRect.top  | 0);
  
          idx += 48;
  
          if (++numTouches > 31) {
            break;
          }
        }
        HEAP32[(((touchEvent)+(8))>>2)] = numTouches;
  
        if (getWasmTableEntry(callbackfunc)(eventTypeId, touchEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        allowsDeferredCalls: eventTypeString == 'touchstart' || eventTypeString == 'touchend',
        eventTypeString,
        callbackfunc,
        handlerFunc: touchEventHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  var _emscripten_set_touchcancel_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerTouchEventCallback(target, userData, useCapture, callbackfunc, 25, "touchcancel", targetThread);

  var _emscripten_set_touchend_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerTouchEventCallback(target, userData, useCapture, callbackfunc, 23, "touchend", targetThread);

  var _emscripten_set_touchmove_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerTouchEventCallback(target, userData, useCapture, callbackfunc, 24, "touchmove", targetThread);

  var _emscripten_set_touchstart_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
      registerTouchEventCallback(target, userData, useCapture, callbackfunc, 22, "touchstart", targetThread);

  
  
  var GLctx;
  
  var webgl_enable_ANGLE_instanced_arrays = (ctx) => {
      // Extension available in WebGL 1 from Firefox 26 and Google Chrome 30 onwards. Core feature in WebGL 2.
      var ext = ctx.getExtension('ANGLE_instanced_arrays');
      // Because this extension is a core function in WebGL 2, assign the extension entry points in place of
      // where the core functions will reside in WebGL 2. This way the calling code can call these without
      // having to dynamically branch depending if running against WebGL 1 or WebGL 2.
      if (ext) {
        ctx['vertexAttribDivisor'] = (index, divisor) => ext['vertexAttribDivisorANGLE'](index, divisor);
        ctx['drawArraysInstanced'] = (mode, first, count, primcount) => ext['drawArraysInstancedANGLE'](mode, first, count, primcount);
        ctx['drawElementsInstanced'] = (mode, count, type, indices, primcount) => ext['drawElementsInstancedANGLE'](mode, count, type, indices, primcount);
        return 1;
      }
    };
  
  var webgl_enable_OES_vertex_array_object = (ctx) => {
      // Extension available in WebGL 1 from Firefox 25 and WebKit 536.28/desktop Safari 6.0.3 onwards. Core feature in WebGL 2.
      var ext = ctx.getExtension('OES_vertex_array_object');
      if (ext) {
        ctx['createVertexArray'] = () => ext['createVertexArrayOES']();
        ctx['deleteVertexArray'] = (vao) => ext['deleteVertexArrayOES'](vao);
        ctx['bindVertexArray'] = (vao) => ext['bindVertexArrayOES'](vao);
        ctx['isVertexArray'] = (vao) => ext['isVertexArrayOES'](vao);
        return 1;
      }
    };
  
  var webgl_enable_WEBGL_draw_buffers = (ctx) => {
      // Extension available in WebGL 1 from Firefox 28 onwards. Core feature in WebGL 2.
      var ext = ctx.getExtension('WEBGL_draw_buffers');
      if (ext) {
        ctx['drawBuffers'] = (n, bufs) => ext['drawBuffersWEBGL'](n, bufs);
        return 1;
      }
    };
  
  var webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance = (ctx) =>
      // Closure is expected to be allowed to minify the '.dibvbi' property, so not accessing it quoted.
      !!(ctx.dibvbi = ctx.getExtension('WEBGL_draw_instanced_base_vertex_base_instance'));
  
  var webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance = (ctx) => {
      // Closure is expected to be allowed to minify the '.mdibvbi' property, so not accessing it quoted.
      return !!(ctx.mdibvbi = ctx.getExtension('WEBGL_multi_draw_instanced_base_vertex_base_instance'));
    };
  
  var webgl_enable_EXT_polygon_offset_clamp = (ctx) => {
      return !!(ctx.extPolygonOffsetClamp = ctx.getExtension('EXT_polygon_offset_clamp'));
    };
  
  var webgl_enable_EXT_clip_control = (ctx) => {
      return !!(ctx.extClipControl = ctx.getExtension('EXT_clip_control'));
    };
  
  var webgl_enable_WEBGL_polygon_mode = (ctx) => {
      return !!(ctx.webglPolygonMode = ctx.getExtension('WEBGL_polygon_mode'));
    };
  
  var webgl_enable_WEBGL_multi_draw = (ctx) => {
      // Closure is expected to be allowed to minify the '.multiDrawWebgl' property, so not accessing it quoted.
      return !!(ctx.multiDrawWebgl = ctx.getExtension('WEBGL_multi_draw'));
    };
  
  var getEmscriptenSupportedExtensions = (ctx) => {
      // Restrict the list of advertised extensions to those that we actually
      // support.
      var supportedExtensions = [
        // WebGL 1 extensions
        'ANGLE_instanced_arrays',
        'EXT_blend_minmax',
        'EXT_disjoint_timer_query',
        'EXT_frag_depth',
        'EXT_shader_texture_lod',
        'EXT_sRGB',
        'OES_element_index_uint',
        'OES_fbo_render_mipmap',
        'OES_standard_derivatives',
        'OES_texture_float',
        'OES_texture_half_float',
        'OES_texture_half_float_linear',
        'OES_vertex_array_object',
        'WEBGL_color_buffer_float',
        'WEBGL_depth_texture',
        'WEBGL_draw_buffers',
        // WebGL 2 extensions
        'EXT_color_buffer_float',
        'EXT_conservative_depth',
        'EXT_disjoint_timer_query_webgl2',
        'EXT_texture_norm16',
        'NV_shader_noperspective_interpolation',
        'WEBGL_clip_cull_distance',
        // WebGL 1 and WebGL 2 extensions
        'EXT_clip_control',
        'EXT_color_buffer_half_float',
        'EXT_depth_clamp',
        'EXT_float_blend',
        'EXT_polygon_offset_clamp',
        'EXT_texture_compression_bptc',
        'EXT_texture_compression_rgtc',
        'EXT_texture_filter_anisotropic',
        'KHR_parallel_shader_compile',
        'OES_texture_float_linear',
        'WEBGL_blend_func_extended',
        'WEBGL_compressed_texture_astc',
        'WEBGL_compressed_texture_etc',
        'WEBGL_compressed_texture_etc1',
        'WEBGL_compressed_texture_s3tc',
        'WEBGL_compressed_texture_s3tc_srgb',
        'WEBGL_debug_renderer_info',
        'WEBGL_debug_shaders',
        'WEBGL_lose_context',
        'WEBGL_multi_draw',
        'WEBGL_polygon_mode'
      ];
      // .getSupportedExtensions() can return null if context is lost, so coerce to empty array.
      return (ctx.getSupportedExtensions() || []).filter(ext => supportedExtensions.includes(ext));
    };
  
  
  var GL = {
  counter:1,
  buffers:[],
  programs:[],
  framebuffers:[],
  renderbuffers:[],
  textures:[],
  shaders:[],
  vaos:[],
  contexts:[],
  offscreenCanvases:{
  },
  queries:[],
  samplers:[],
  transformFeedbacks:[],
  syncs:[],
  stringCache:{
  },
  stringiCache:{
  },
  unpackAlignment:4,
  unpackRowLength:0,
  recordError:(errorCode) => {
        if (!GL.lastError) {
          GL.lastError = errorCode;
        }
      },
  getNewId:(table) => {
        var ret = GL.counter++;
        for (var i = table.length; i < ret; i++) {
          table[i] = null;
        }
        return ret;
      },
  genObject:(n, buffers, createFunction, objectTable
        ) => {
        for (var i = 0; i < n; i++) {
          var buffer = GLctx[createFunction]();
          var id = buffer && GL.getNewId(objectTable);
          if (buffer) {
            buffer.name = id;
            objectTable[id] = buffer;
          } else {
            GL.recordError(0x502 /* GL_INVALID_OPERATION */);
          }
          HEAP32[(((buffers)+(i*4))>>2)] = id;
        }
      },
  getSource:(shader, count, string, length) => {
        var source = '';
        for (var i = 0; i < count; ++i) {
          var len = length ? HEAPU32[(((length)+(i*4))>>2)] : undefined;
          source += UTF8ToString(HEAPU32[(((string)+(i*4))>>2)], len);
        }
        return source;
      },
  createContext:(/** @type {HTMLCanvasElement} */ canvas, webGLContextAttributes) => {
  
        // BUG: Workaround Safari WebGL issue: After successfully acquiring WebGL
        // context on a canvas, calling .getContext() will always return that
        // context independent of which 'webgl' or 'webgl2'
        // context version was passed. See:
        //   https://bugs.webkit.org/show_bug.cgi?id=222758
        // and:
        //   https://github.com/emscripten-core/emscripten/issues/13295.
        // TODO: Once the bug is fixed and shipped in Safari, adjust the Safari
        // version field in above check.
        if (!canvas.getContextSafariWebGL2Fixed) {
          canvas.getContextSafariWebGL2Fixed = canvas.getContext;
          /** @type {function(this:HTMLCanvasElement, string, (Object|null)=): (Object|null)} */
          function fixedGetContext(ver, attrs) {
            var gl = canvas.getContextSafariWebGL2Fixed(ver, attrs);
            return ((ver == 'webgl') == (gl instanceof WebGLRenderingContext)) ? gl : null;
          }
          canvas.getContext = fixedGetContext;
        }
  
        var ctx =
          (webGLContextAttributes.majorVersion > 1)
          ?
            canvas.getContext("webgl2", webGLContextAttributes)
          :
          (canvas.getContext("webgl", webGLContextAttributes)
            // https://caniuse.com/#feat=webgl
            );
  
        if (!ctx) return 0;
  
        var handle = GL.registerContext(ctx, webGLContextAttributes);
  
        return handle;
      },
  registerContext:(ctx, webGLContextAttributes) => {
        // without pthreads a context is just an integer ID
        var handle = GL.getNewId(GL.contexts);
  
        var context = {
          handle,
          attributes: webGLContextAttributes,
          version: webGLContextAttributes.majorVersion,
          GLctx: ctx
        };
  
        // Store the created context object so that we can access the context
        // given a canvas without having to pass the parameters again.
        if (ctx.canvas) ctx.canvas.GLctxObject = context;
        GL.contexts[handle] = context;
        if (typeof webGLContextAttributes.enableExtensionsByDefault == 'undefined' || webGLContextAttributes.enableExtensionsByDefault) {
          GL.initExtensions(context);
        }
  
        return handle;
      },
  makeContextCurrent:(contextHandle) => {
  
        // Active Emscripten GL layer context object.
        GL.currentContext = GL.contexts[contextHandle];
        // Active WebGL context object.
        Module.ctx = GLctx = GL.currentContext?.GLctx;
        return !(contextHandle && !GLctx);
      },
  getContext:(contextHandle) => {
        return GL.contexts[contextHandle];
      },
  deleteContext:(contextHandle) => {
        if (GL.currentContext === GL.contexts[contextHandle]) {
          GL.currentContext = null;
        }
        if (typeof JSEvents == 'object') {
          // Release all JS event handlers on the DOM element that the GL context is
          // associated with since the context is now deleted.
          JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);
        }
        // Make sure the canvas object no longer refers to the context object so
        // there are no GC surprises.
        if (GL.contexts[contextHandle] && GL.contexts[contextHandle].GLctx.canvas) {
          GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined;
        }
        GL.contexts[contextHandle] = null;
      },
  initExtensions:(context) => {
        // If this function is called without a specific context object, init the
        // extensions of the currently active context.
        context ||= GL.currentContext;
  
        if (context.initExtensionsDone) return;
        context.initExtensionsDone = true;
  
        var GLctx = context.GLctx;
  
        // Detect the presence of a few extensions manually, ction GL interop
        // layer itself will need to know if they exist.
  
        // Extensions that are available in both WebGL 1 and WebGL 2
        webgl_enable_WEBGL_multi_draw(GLctx);
        webgl_enable_EXT_polygon_offset_clamp(GLctx);
        webgl_enable_EXT_clip_control(GLctx);
        webgl_enable_WEBGL_polygon_mode(GLctx);
        // Extensions that are only available in WebGL 1 (the calls will be no-ops
        // if called on a WebGL 2 context active)
        webgl_enable_ANGLE_instanced_arrays(GLctx);
        webgl_enable_OES_vertex_array_object(GLctx);
        webgl_enable_WEBGL_draw_buffers(GLctx);
        // Extensions that are available from WebGL >= 2 (no-op if called on a WebGL 1 context active)
        webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(GLctx);
        webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(GLctx);
  
        // On WebGL 2, EXT_disjoint_timer_query is replaced with an alternative
        // that's based on core APIs, and exposes only the queryCounterEXT()
        // entrypoint.
        if (context.version >= 2) {
          GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query_webgl2");
        }
  
        // However, Firefox exposes the WebGL 1 version on WebGL 2 as well and
        // thus we look for the WebGL 1 version again if the WebGL 2 version
        // isn't present. https://bugzilla.mozilla.org/show_bug.cgi?id=1328882
        if (context.version < 2 || !GLctx.disjointTimerQueryExt)
        {
          GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query");
        }
  
        getEmscriptenSupportedExtensions(GLctx).forEach((ext) => {
          // WEBGL_lose_context, WEBGL_debug_renderer_info and WEBGL_debug_shaders
          // are not enabled by default.
          if (!ext.includes('lose_context') && !ext.includes('debug')) {
            // Call .getExtension() to enable that extension permanently.
            GLctx.getExtension(ext);
          }
        });
      },
  };
  
  var registerWebGlEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
  
      var webGlEventHandlerFunc = (e = event) => {
        if (getWasmTableEntry(callbackfunc)(eventTypeId, 0, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target: findEventTarget(target),
        eventTypeString,
        callbackfunc,
        handlerFunc: webGlEventHandlerFunc,
        useCapture
      };
      JSEvents.registerOrRemoveHandler(eventHandler);
    };
  
  var _emscripten_set_webglcontextlost_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
      registerWebGlEventCallback(target, userData, useCapture, callbackfunc, 31, "webglcontextlost", targetThread);
      return 0;
    };

  
  var _emscripten_set_webglcontextrestored_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
      registerWebGlEventCallback(target, userData, useCapture, callbackfunc, 32, "webglcontextrestored", targetThread);
      return 0;
    };

  
  
  
  
  
  var registerWheelEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString, targetThread) => {
      JSEvents.wheelEvent ||= _malloc(96);
  
      // The DOM Level 3 events spec event 'wheel'
      var wheelHandlerFunc = (e = event) => {
        var wheelEvent = JSEvents.wheelEvent;
        fillMouseEventData(wheelEvent, e, target);
        HEAPF64[(((wheelEvent)+(64))>>3)] = e["deltaX"];
        HEAPF64[(((wheelEvent)+(72))>>3)] = e["deltaY"];
        HEAPF64[(((wheelEvent)+(80))>>3)] = e["deltaZ"];
        HEAP32[(((wheelEvent)+(88))>>2)] = e["deltaMode"];
        if (getWasmTableEntry(callbackfunc)(eventTypeId, wheelEvent, userData)) e.preventDefault();
      };
  
      var eventHandler = {
        target,
        allowsDeferredCalls: true,
        eventTypeString,
        callbackfunc,
        handlerFunc: wheelHandlerFunc,
        useCapture
      };
      return JSEvents.registerOrRemoveHandler(eventHandler);
    };
  
  var _emscripten_set_wheel_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
      target = findEventTarget(target);
      if (!target) return -4;
      if (typeof target.onwheel != 'undefined') {
        return registerWheelEventCallback(target, userData, useCapture, callbackfunc, 9, "wheel", targetThread);
      } else {
        return -1;
      }
    };

  
  
  var webglPowerPreferences = ["default","low-power","high-performance"];
  
  
  
  /** @suppress {duplicate } */
  var _emscripten_webgl_do_create_context = (target, attributes) => {
      assert(attributes);
      var attr32 = ((attributes)>>2);
      var powerPreference = HEAP32[attr32 + (8>>2)];
      var contextAttributes = {
        'alpha': !!HEAP8[attributes + 0],
        'depth': !!HEAP8[attributes + 1],
        'stencil': !!HEAP8[attributes + 2],
        'antialias': !!HEAP8[attributes + 3],
        'premultipliedAlpha': !!HEAP8[attributes + 4],
        'preserveDrawingBuffer': !!HEAP8[attributes + 5],
        'powerPreference': webglPowerPreferences[powerPreference],
        'failIfMajorPerformanceCaveat': !!HEAP8[attributes + 12],
        // The following are not predefined WebGL context attributes in the WebGL specification, so the property names can be minified by Closure.
        majorVersion: HEAP32[attr32 + (16>>2)],
        minorVersion: HEAP32[attr32 + (20>>2)],
        enableExtensionsByDefault: HEAP8[attributes + 24],
        explicitSwapControl: HEAP8[attributes + 25],
        proxyContextToMainThread: HEAP32[attr32 + (28>>2)],
        renderViaOffscreenBackBuffer: HEAP8[attributes + 32]
      };
  
      var canvas = findCanvasEventTarget(target);
  
      if (!canvas) {
        return 0;
      }
  
      if (contextAttributes.explicitSwapControl) {
        return 0;
      }
  
      var contextHandle = GL.createContext(canvas, contextAttributes);
      return contextHandle;
    };
  var _emscripten_webgl_create_context = _emscripten_webgl_do_create_context;

  
  
  
  
  
  
  
  
  
  
  var _emscripten_webgl_enable_extension = (contextHandle, extension) => {
      var context = GL.getContext(contextHandle);
      var extString = UTF8ToString(extension);
      if (extString.startsWith('GL_')) extString = extString.substr(3); // Allow enabling extensions both with "GL_" prefix and without.
  
      // Switch-board that pulls in code for all GL extensions, even if those are not used :/
      // Build with -sGL_SUPPORT_SIMPLE_ENABLE_EXTENSIONS=0 to avoid this.
  
      // Obtain function entry points to WebGL 1 extension related functions.
      if (extString == 'ANGLE_instanced_arrays') webgl_enable_ANGLE_instanced_arrays(GLctx);
      if (extString == 'OES_vertex_array_object') webgl_enable_OES_vertex_array_object(GLctx);
      if (extString == 'WEBGL_draw_buffers') webgl_enable_WEBGL_draw_buffers(GLctx);
  
      if (extString == 'WEBGL_draw_instanced_base_vertex_base_instance') webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(GLctx);
      if (extString == 'WEBGL_multi_draw_instanced_base_vertex_base_instance') webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(GLctx);
  
      if (extString == 'WEBGL_multi_draw') webgl_enable_WEBGL_multi_draw(GLctx);
      if (extString == 'EXT_polygon_offset_clamp') webgl_enable_EXT_polygon_offset_clamp(GLctx);
      if (extString == 'EXT_clip_control') webgl_enable_EXT_clip_control(GLctx);
      if (extString == 'WEBGL_polygon_mode') webgl_enable_WEBGL_polygon_mode(GLctx);
  
      var ext = context.GLctx.getExtension(extString);
      return !!ext;
    };

  var _emscripten_webgl_make_context_current = (contextHandle) => {
      var success = GL.makeContextCurrent(contextHandle);
      return success ? 0 : -5;
    };


  var SYSCALLS = {
  varargs:undefined,
  getStr(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },
  };
  var _fd_close = (fd) => {
      abort('fd_close called without SYSCALLS_REQUIRE_FILESYSTEM');
    };

  var convertI32PairToI53Checked = (lo, hi) => {
      assert(lo == (lo >>> 0) || lo == (lo|0)); // lo should either be a i32 or a u32
      assert(hi === (hi|0));                    // hi should be a i32
      return ((hi + 0x200000) >>> 0 < 0x400001 - !!lo) ? (lo >>> 0) + hi * 4294967296 : NaN;
    };
  function _fd_seek(fd,offset_low, offset_high,whence,newOffset) {
    var offset = convertI32PairToI53Checked(offset_low, offset_high);
  
    
      return 70;
    ;
  }

  var printCharBuffers = [null,[],[]];
  
  var printChar = (stream, curr) => {
      var buffer = printCharBuffers[stream];
      assert(buffer);
      if (curr === 0 || curr === 10) {
        (stream === 1 ? out : err)(UTF8ArrayToString(buffer));
        buffer.length = 0;
      } else {
        buffer.push(curr);
      }
    };
  
  var flush_NO_FILESYSTEM = () => {
      // flush anything remaining in the buffers during shutdown
      _fflush(0);
      if (printCharBuffers[1].length) printChar(1, 10);
      if (printCharBuffers[2].length) printChar(2, 10);
    };
  
  
  var _fd_write = (fd, iov, iovcnt, pnum) => {
      // hack to support printf in SYSCALLS_REQUIRE_FILESYSTEM=0
      var num = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov)>>2)];
        var len = HEAPU32[(((iov)+(4))>>2)];
        iov += 8;
        for (var j = 0; j < len; j++) {
          printChar(fd, HEAPU8[ptr+j]);
        }
        num += len;
      }
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    };

  var _glActiveTexture = (x0) => GLctx.activeTexture(x0);

  var _glAttachShader = (program, shader) => {
      GLctx.attachShader(GL.programs[program], GL.shaders[shader]);
    };

  var _glBindBuffer = (target, buffer) => {
  
      if (target == 0x88EB /*GL_PIXEL_PACK_BUFFER*/) {
        // In WebGL 2 glReadPixels entry point, we need to use a different WebGL 2
        // API function call when a buffer is bound to
        // GL_PIXEL_PACK_BUFFER_BINDING point, so must keep track whether that
        // binding point is non-null to know what is the proper API function to
        // call.
        GLctx.currentPixelPackBufferBinding = buffer;
      } else if (target == 0x88EC /*GL_PIXEL_UNPACK_BUFFER*/) {
        // In WebGL 2 gl(Compressed)Tex(Sub)Image[23]D entry points, we need to
        // use a different WebGL 2 API function call when a buffer is bound to
        // GL_PIXEL_UNPACK_BUFFER_BINDING point, so must keep track whether that
        // binding point is non-null to know what is the proper API function to
        // call.
        GLctx.currentPixelUnpackBufferBinding = buffer;
      }
      GLctx.bindBuffer(target, GL.buffers[buffer]);
    };

  var _glBindBufferBase = (target, index, buffer) => {
      GLctx.bindBufferBase(target, index, GL.buffers[buffer]);
    };

  var _glBindFramebuffer = (target, framebuffer) => {
  
      GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer]);
  
    };

  var _glBindRenderbuffer = (target, renderbuffer) => {
      GLctx.bindRenderbuffer(target, GL.renderbuffers[renderbuffer]);
    };

  var _glBindSampler = (unit, sampler) => {
      GLctx.bindSampler(unit, GL.samplers[sampler]);
    };

  var _glBindTexture = (target, texture) => {
      GLctx.bindTexture(target, GL.textures[texture]);
    };

  var _glBindVertexArray = (vao) => {
      GLctx.bindVertexArray(GL.vaos[vao]);
    };

  var _glBlendColor = (x0, x1, x2, x3) => GLctx.blendColor(x0, x1, x2, x3);

  var _glBlendEquationSeparate = (x0, x1) => GLctx.blendEquationSeparate(x0, x1);

  var _glBlendFuncSeparate = (x0, x1, x2, x3) => GLctx.blendFuncSeparate(x0, x1, x2, x3);

  var _glBlitFramebuffer = (x0, x1, x2, x3, x4, x5, x6, x7, x8, x9) => GLctx.blitFramebuffer(x0, x1, x2, x3, x4, x5, x6, x7, x8, x9);

  var _glBufferData = (target, size, data, usage) => {
  
      if (GL.currentContext.version >= 2) {
        // If size is zero, WebGL would interpret uploading the whole input
        // arraybuffer (starting from given offset), which would not make sense in
        // WebAssembly, so avoid uploading if size is zero. However we must still
        // call bufferData to establish a backing storage of zero bytes.
        if (data && size) {
          GLctx.bufferData(target, HEAPU8, usage, data, size);
        } else {
          GLctx.bufferData(target, size, usage);
        }
        return;
      }
      // N.b. here first form specifies a heap subarray, second form an integer
      // size, so the ?: code here is polymorphic. It is advised to avoid
      // randomly mixing both uses in calling code, to avoid any potential JS
      // engine JIT issues.
      GLctx.bufferData(target, data ? HEAPU8.subarray(data, data+size) : size, usage);
    };

  var _glBufferSubData = (target, offset, size, data) => {
      if (GL.currentContext.version >= 2) {
        size && GLctx.bufferSubData(target, offset, HEAPU8, data, size);
        return;
      }
      GLctx.bufferSubData(target, offset, HEAPU8.subarray(data, data+size));
    };

  var _glClearBufferfi = (x0, x1, x2, x3) => GLctx.clearBufferfi(x0, x1, x2, x3);

  var _glClearBufferfv = (buffer, drawbuffer, value) => {
  
      GLctx.clearBufferfv(buffer, drawbuffer, HEAPF32, ((value)>>2));
    };

  var _glClearBufferiv = (buffer, drawbuffer, value) => {
  
      GLctx.clearBufferiv(buffer, drawbuffer, HEAP32, ((value)>>2));
    };

  var _glColorMask = (red, green, blue, alpha) => {
      GLctx.colorMask(!!red, !!green, !!blue, !!alpha);
    };

  var _glCompileShader = (shader) => {
      GLctx.compileShader(GL.shaders[shader]);
    };

  var _glCompressedTexImage2D = (target, level, internalFormat, width, height, border, imageSize, data) => {
      // `data` may be null here, which means "allocate uniniitalized space but
      // don't upload" in GLES parlance, but `compressedTexImage2D` requires the
      // final data parameter, so we simply pass a heap view starting at zero
      // effectively uploading whatever happens to be near address zero.  See
      // https://github.com/emscripten-core/emscripten/issues/19300.
      if (GL.currentContext.version >= 2) {
        if (GLctx.currentPixelUnpackBufferBinding || !imageSize) {
          GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, imageSize, data);
          return;
        }
        GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, HEAPU8, data, imageSize);
        return;
      }
      GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, HEAPU8.subarray((data), data+imageSize));
    };

  var _glCompressedTexImage3D = (target, level, internalFormat, width, height, depth, border, imageSize, data) => {
      if (GLctx.currentPixelUnpackBufferBinding) {
        GLctx.compressedTexImage3D(target, level, internalFormat, width, height, depth, border, imageSize, data);
      } else {
        GLctx.compressedTexImage3D(target, level, internalFormat, width, height, depth, border, HEAPU8, data, imageSize);
      }
    };

  var _glCreateProgram = () => {
      var id = GL.getNewId(GL.programs);
      var program = GLctx.createProgram();
      // Store additional information needed for each shader program:
      program.name = id;
      // Lazy cache results of
      // glGetProgramiv(GL_ACTIVE_UNIFORM_MAX_LENGTH/GL_ACTIVE_ATTRIBUTE_MAX_LENGTH/GL_ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH)
      program.maxUniformLength = program.maxAttributeLength = program.maxUniformBlockNameLength = 0;
      program.uniformIdCounter = 1;
      GL.programs[id] = program;
      return id;
    };

  var _glCreateShader = (shaderType) => {
      var id = GL.getNewId(GL.shaders);
      GL.shaders[id] = GLctx.createShader(shaderType);
  
      return id;
    };

  var _glCullFace = (x0) => GLctx.cullFace(x0);

  var _glDeleteBuffers = (n, buffers) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((buffers)+(i*4))>>2)];
        var buffer = GL.buffers[id];
  
        // From spec: "glDeleteBuffers silently ignores 0's and names that do not
        // correspond to existing buffer objects."
        if (!buffer) continue;
  
        GLctx.deleteBuffer(buffer);
        buffer.name = 0;
        GL.buffers[id] = null;
  
        if (id == GLctx.currentPixelPackBufferBinding) GLctx.currentPixelPackBufferBinding = 0;
        if (id == GLctx.currentPixelUnpackBufferBinding) GLctx.currentPixelUnpackBufferBinding = 0;
      }
    };

  var _glDeleteFramebuffers = (n, framebuffers) => {
      for (var i = 0; i < n; ++i) {
        var id = HEAP32[(((framebuffers)+(i*4))>>2)];
        var framebuffer = GL.framebuffers[id];
        if (!framebuffer) continue; // GL spec: "glDeleteFramebuffers silently ignores 0s and names that do not correspond to existing framebuffer objects".
        GLctx.deleteFramebuffer(framebuffer);
        framebuffer.name = 0;
        GL.framebuffers[id] = null;
      }
    };

  var _glDeleteProgram = (id) => {
      if (!id) return;
      var program = GL.programs[id];
      if (!program) {
        // glDeleteProgram actually signals an error when deleting a nonexisting
        // object, unlike some other GL delete functions.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      GLctx.deleteProgram(program);
      program.name = 0;
      GL.programs[id] = null;
    };

  var _glDeleteRenderbuffers = (n, renderbuffers) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((renderbuffers)+(i*4))>>2)];
        var renderbuffer = GL.renderbuffers[id];
        if (!renderbuffer) continue; // GL spec: "glDeleteRenderbuffers silently ignores 0s and names that do not correspond to existing renderbuffer objects".
        GLctx.deleteRenderbuffer(renderbuffer);
        renderbuffer.name = 0;
        GL.renderbuffers[id] = null;
      }
    };

  var _glDeleteSamplers = (n, samplers) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((samplers)+(i*4))>>2)];
        var sampler = GL.samplers[id];
        if (!sampler) continue;
        GLctx.deleteSampler(sampler);
        sampler.name = 0;
        GL.samplers[id] = null;
      }
    };

  var _glDeleteShader = (id) => {
      if (!id) return;
      var shader = GL.shaders[id];
      if (!shader) {
        // glDeleteShader actually signals an error when deleting a nonexisting
        // object, unlike some other GL delete functions.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      GLctx.deleteShader(shader);
      GL.shaders[id] = null;
    };

  var _glDeleteTextures = (n, textures) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((textures)+(i*4))>>2)];
        var texture = GL.textures[id];
        // GL spec: "glDeleteTextures silently ignores 0s and names that do not
        // correspond to existing textures".
        if (!texture) continue;
        GLctx.deleteTexture(texture);
        texture.name = 0;
        GL.textures[id] = null;
      }
    };

  var _glDeleteVertexArrays = (n, vaos) => {
      for (var i = 0; i < n; i++) {
        var id = HEAP32[(((vaos)+(i*4))>>2)];
        GLctx.deleteVertexArray(GL.vaos[id]);
        GL.vaos[id] = null;
      }
    };

  var _glDepthFunc = (x0) => GLctx.depthFunc(x0);

  var _glDepthMask = (flag) => {
      GLctx.depthMask(!!flag);
    };

  var _glDisable = (x0) => GLctx.disable(x0);

  var _glDisableVertexAttribArray = (index) => {
      GLctx.disableVertexAttribArray(index);
    };

  var _glDrawArrays = (mode, first, count) => {
  
      GLctx.drawArrays(mode, first, count);
  
    };

  var _glDrawArraysInstanced = (mode, first, count, primcount) => {
      GLctx.drawArraysInstanced(mode, first, count, primcount);
    };

  var _glDrawElements = (mode, count, type, indices) => {
  
      GLctx.drawElements(mode, count, type, indices);
  
    };

  var _glDrawElementsInstanced = (mode, count, type, indices, primcount) => {
      GLctx.drawElementsInstanced(mode, count, type, indices, primcount);
    };

  var _glEnable = (x0) => GLctx.enable(x0);

  var _glEnableVertexAttribArray = (index) => {
      GLctx.enableVertexAttribArray(index);
    };

  var _glFrontFace = (x0) => GLctx.frontFace(x0);

  var _glGenBuffers = (n, buffers) => {
      GL.genObject(n, buffers, 'createBuffer', GL.buffers
        );
    };

  var _glGenRenderbuffers = (n, renderbuffers) => {
      GL.genObject(n, renderbuffers, 'createRenderbuffer', GL.renderbuffers
        );
    };

  var _glGenSamplers = (n, samplers) => {
      GL.genObject(n, samplers, 'createSampler', GL.samplers
        );
    };

  var _glGenTextures = (n, textures) => {
      GL.genObject(n, textures, 'createTexture', GL.textures
        );
    };

  var _glGenVertexArrays = (n, arrays) => {
      GL.genObject(n, arrays, 'createVertexArray', GL.vaos
        );
    };

  
  var _glGetAttribLocation = (program, name) => {
      return GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name));
    };

  var _glGetError = () => {
      var error = GLctx.getError() || GL.lastError;
      GL.lastError = 0/*GL_NO_ERROR*/;
      return error;
    };

  var readI53FromI64 = (ptr) => {
      return HEAPU32[((ptr)>>2)] + HEAP32[(((ptr)+(4))>>2)] * 4294967296;
    };
  
  var readI53FromU64 = (ptr) => {
      return HEAPU32[((ptr)>>2)] + HEAPU32[(((ptr)+(4))>>2)] * 4294967296;
    };
  var writeI53ToI64 = (ptr, num) => {
      HEAPU32[((ptr)>>2)] = num;
      var lower = HEAPU32[((ptr)>>2)];
      HEAPU32[(((ptr)+(4))>>2)] = (num - lower)/4294967296;
      var deserialized = (num >= 0) ? readI53FromU64(ptr) : readI53FromI64(ptr);
      var offset = ((ptr)>>2);
      if (deserialized != num) warnOnce(`writeI53ToI64() out of range: serialized JS Number ${num} to Wasm heap as bytes lo=${ptrToString(HEAPU32[offset])}, hi=${ptrToString(HEAPU32[offset+1])}, which deserializes back to ${deserialized} instead!`);
    };
  
  
  var webglGetExtensions = function $webglGetExtensions() {
      var exts = getEmscriptenSupportedExtensions(GLctx);
      exts = exts.concat(exts.map((e) => "GL_" + e));
      return exts;
    };
  
  var emscriptenWebGLGet = (name_, p, type) => {
      // Guard against user passing a null pointer.
      // Note that GLES2 spec does not say anything about how passing a null
      // pointer should be treated.  Testing on desktop core GL 3, the application
      // crashes on glGetIntegerv to a null pointer, but better to report an error
      // instead of doing anything random.
      if (!p) {
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      var ret = undefined;
      switch (name_) { // Handle a few trivial GLES values
        case 0x8DFA: // GL_SHADER_COMPILER
          ret = 1;
          break;
        case 0x8DF8: // GL_SHADER_BINARY_FORMATS
          if (type != 0 && type != 1) {
            GL.recordError(0x500); // GL_INVALID_ENUM
          }
          // Do not write anything to the out pointer, since no binary formats are
          // supported.
          return;
        case 0x87FE: // GL_NUM_PROGRAM_BINARY_FORMATS
        case 0x8DF9: // GL_NUM_SHADER_BINARY_FORMATS
          ret = 0;
          break;
        case 0x86A2: // GL_NUM_COMPRESSED_TEXTURE_FORMATS
          // WebGL doesn't have GL_NUM_COMPRESSED_TEXTURE_FORMATS (it's obsolete
          // since GL_COMPRESSED_TEXTURE_FORMATS returns a JS array that can be
          // queried for length), so implement it ourselves to allow C++ GLES2
          // code get the length.
          var formats = GLctx.getParameter(0x86A3 /*GL_COMPRESSED_TEXTURE_FORMATS*/);
          ret = formats ? formats.length : 0;
          break;
  
        case 0x821D: // GL_NUM_EXTENSIONS
          if (GL.currentContext.version < 2) {
            // Calling GLES3/WebGL2 function with a GLES2/WebGL1 context
            GL.recordError(0x502 /* GL_INVALID_OPERATION */);
            return;
          }
          ret = webglGetExtensions().length;
          break;
        case 0x821B: // GL_MAJOR_VERSION
        case 0x821C: // GL_MINOR_VERSION
          if (GL.currentContext.version < 2) {
            GL.recordError(0x500); // GL_INVALID_ENUM
            return;
          }
          ret = name_ == 0x821B ? 3 : 0; // return version 3.0
          break;
      }
  
      if (ret === undefined) {
        var result = GLctx.getParameter(name_);
        switch (typeof result) {
          case "number":
            ret = result;
            break;
          case "boolean":
            ret = result ? 1 : 0;
            break;
          case "string":
            GL.recordError(0x500); // GL_INVALID_ENUM
            return;
          case "object":
            if (result === null) {
              // null is a valid result for some (e.g., which buffer is bound -
              // perhaps nothing is bound), but otherwise can mean an invalid
              // name_, which we need to report as an error
              switch (name_) {
                case 0x8894: // ARRAY_BUFFER_BINDING
                case 0x8B8D: // CURRENT_PROGRAM
                case 0x8895: // ELEMENT_ARRAY_BUFFER_BINDING
                case 0x8CA6: // FRAMEBUFFER_BINDING or DRAW_FRAMEBUFFER_BINDING
                case 0x8CA7: // RENDERBUFFER_BINDING
                case 0x8069: // TEXTURE_BINDING_2D
                case 0x85B5: // WebGL 2 GL_VERTEX_ARRAY_BINDING, or WebGL 1 extension OES_vertex_array_object GL_VERTEX_ARRAY_BINDING_OES
                case 0x8F36: // COPY_READ_BUFFER_BINDING or COPY_READ_BUFFER
                case 0x8F37: // COPY_WRITE_BUFFER_BINDING or COPY_WRITE_BUFFER
                case 0x88ED: // PIXEL_PACK_BUFFER_BINDING
                case 0x88EF: // PIXEL_UNPACK_BUFFER_BINDING
                case 0x8CAA: // READ_FRAMEBUFFER_BINDING
                case 0x8919: // SAMPLER_BINDING
                case 0x8C1D: // TEXTURE_BINDING_2D_ARRAY
                case 0x806A: // TEXTURE_BINDING_3D
                case 0x8E25: // TRANSFORM_FEEDBACK_BINDING
                case 0x8C8F: // TRANSFORM_FEEDBACK_BUFFER_BINDING
                case 0x8A28: // UNIFORM_BUFFER_BINDING
                case 0x8514: { // TEXTURE_BINDING_CUBE_MAP
                  ret = 0;
                  break;
                }
                default: {
                  GL.recordError(0x500); // GL_INVALID_ENUM
                  return;
                }
              }
            } else if (result instanceof Float32Array ||
                       result instanceof Uint32Array ||
                       result instanceof Int32Array ||
                       result instanceof Array) {
              for (var i = 0; i < result.length; ++i) {
                switch (type) {
                  case 0: HEAP32[(((p)+(i*4))>>2)] = result[i]; break;
                  case 2: HEAPF32[(((p)+(i*4))>>2)] = result[i]; break;
                  case 4: HEAP8[(p)+(i)] = result[i] ? 1 : 0; break;
                }
              }
              return;
            } else {
              try {
                ret = result.name | 0;
              } catch(e) {
                GL.recordError(0x500); // GL_INVALID_ENUM
                err(`GL_INVALID_ENUM in glGet${type}v: Unknown object returned from WebGL getParameter(${name_})! (error: ${e})`);
                return;
              }
            }
            break;
          default:
            GL.recordError(0x500); // GL_INVALID_ENUM
            err(`GL_INVALID_ENUM in glGet${type}v: Native code calling glGet${type}v(${name_}) and it returns ${result} of type ${typeof(result)}!`);
            return;
        }
      }
  
      switch (type) {
        case 1: writeI53ToI64(p, ret); break;
        case 0: HEAP32[((p)>>2)] = ret; break;
        case 2:   HEAPF32[((p)>>2)] = ret; break;
        case 4: HEAP8[p] = ret ? 1 : 0; break;
      }
    };
  
  var _glGetIntegerv = (name_, p) => emscriptenWebGLGet(name_, p, 0);

  var _glGetProgramInfoLog = (program, maxLength, length, infoLog) => {
      var log = GLctx.getProgramInfoLog(GL.programs[program]);
      if (log === null) log = '(unknown error)';
      var numBytesWrittenExclNull = (maxLength > 0 && infoLog) ? stringToUTF8(log, infoLog, maxLength) : 0;
      if (length) HEAP32[((length)>>2)] = numBytesWrittenExclNull;
    };

  var _glGetProgramiv = (program, pname, p) => {
      if (!p) {
        // GLES2 specification does not specify how to behave if p is a null
        // pointer. Since calling this function does not make sense if p == null,
        // issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
  
      if (program >= GL.counter) {
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
  
      program = GL.programs[program];
  
      if (pname == 0x8B84) { // GL_INFO_LOG_LENGTH
        var log = GLctx.getProgramInfoLog(program);
        if (log === null) log = '(unknown error)';
        HEAP32[((p)>>2)] = log.length + 1;
      } else if (pname == 0x8B87 /* GL_ACTIVE_UNIFORM_MAX_LENGTH */) {
        if (!program.maxUniformLength) {
          var numActiveUniforms = GLctx.getProgramParameter(program, 0x8B86/*GL_ACTIVE_UNIFORMS*/);
          for (var i = 0; i < numActiveUniforms; ++i) {
            program.maxUniformLength = Math.max(program.maxUniformLength, GLctx.getActiveUniform(program, i).name.length+1);
          }
        }
        HEAP32[((p)>>2)] = program.maxUniformLength;
      } else if (pname == 0x8B8A /* GL_ACTIVE_ATTRIBUTE_MAX_LENGTH */) {
        if (!program.maxAttributeLength) {
          var numActiveAttributes = GLctx.getProgramParameter(program, 0x8B89/*GL_ACTIVE_ATTRIBUTES*/);
          for (var i = 0; i < numActiveAttributes; ++i) {
            program.maxAttributeLength = Math.max(program.maxAttributeLength, GLctx.getActiveAttrib(program, i).name.length+1);
          }
        }
        HEAP32[((p)>>2)] = program.maxAttributeLength;
      } else if (pname == 0x8A35 /* GL_ACTIVE_UNIFORM_BLOCK_MAX_NAME_LENGTH */) {
        if (!program.maxUniformBlockNameLength) {
          var numActiveUniformBlocks = GLctx.getProgramParameter(program, 0x8A36/*GL_ACTIVE_UNIFORM_BLOCKS*/);
          for (var i = 0; i < numActiveUniformBlocks; ++i) {
            program.maxUniformBlockNameLength = Math.max(program.maxUniformBlockNameLength, GLctx.getActiveUniformBlockName(program, i).length+1);
          }
        }
        HEAP32[((p)>>2)] = program.maxUniformBlockNameLength;
      } else {
        HEAP32[((p)>>2)] = GLctx.getProgramParameter(program, pname);
      }
    };

  
  var _glGetShaderInfoLog = (shader, maxLength, length, infoLog) => {
      var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
      if (log === null) log = '(unknown error)';
      var numBytesWrittenExclNull = (maxLength > 0 && infoLog) ? stringToUTF8(log, infoLog, maxLength) : 0;
      if (length) HEAP32[((length)>>2)] = numBytesWrittenExclNull;
    };

  var _glGetShaderiv = (shader, pname, p) => {
      if (!p) {
        // GLES2 specification does not specify how to behave if p is a null
        // pointer. Since calling this function does not make sense if p == null,
        // issue a GL error to notify user about it.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
        return;
      }
      if (pname == 0x8B84) { // GL_INFO_LOG_LENGTH
        var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
        if (log === null) log = '(unknown error)';
        // The GLES2 specification says that if the shader has an empty info log,
        // a value of 0 is returned. Otherwise the log has a null char appended.
        // (An empty string is falsey, so we can just check that instead of
        // looking at log.length.)
        var logLength = log ? log.length + 1 : 0;
        HEAP32[((p)>>2)] = logLength;
      } else if (pname == 0x8B88) { // GL_SHADER_SOURCE_LENGTH
        var source = GLctx.getShaderSource(GL.shaders[shader]);
        // source may be a null, or the empty string, both of which are falsey
        // values that we report a 0 length for.
        var sourceLength = source ? source.length + 1 : 0;
        HEAP32[((p)>>2)] = sourceLength;
      } else {
        HEAP32[((p)>>2)] = GLctx.getShaderParameter(GL.shaders[shader], pname);
      }
    };

  
  var lengthBytesUTF8 = (str) => {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var c = str.charCodeAt(i); // possibly a lead surrogate
        if (c <= 0x7F) {
          len++;
        } else if (c <= 0x7FF) {
          len += 2;
        } else if (c >= 0xD800 && c <= 0xDFFF) {
          len += 4; ++i;
        } else {
          len += 3;
        }
      }
      return len;
    };
  
  
  var stringToNewUTF8 = (str) => {
      var size = lengthBytesUTF8(str) + 1;
      var ret = _malloc(size);
      if (ret) stringToUTF8(str, ret, size);
      return ret;
    };
  var _glGetStringi = (name, index) => {
      if (GL.currentContext.version < 2) {
        GL.recordError(0x502 /* GL_INVALID_OPERATION */); // Calling GLES3/WebGL2 function with a GLES2/WebGL1 context
        return 0;
      }
      var stringiCache = GL.stringiCache[name];
      if (stringiCache) {
        if (index < 0 || index >= stringiCache.length) {
          GL.recordError(0x501/*GL_INVALID_VALUE*/);
          return 0;
        }
        return stringiCache[index];
      }
      switch (name) {
        case 0x1F03 /* GL_EXTENSIONS */:
          var exts = webglGetExtensions().map(stringToNewUTF8);
          stringiCache = GL.stringiCache[name] = exts;
          if (index < 0 || index >= stringiCache.length) {
            GL.recordError(0x501/*GL_INVALID_VALUE*/);
            return 0;
          }
          return stringiCache[index];
        default:
          GL.recordError(0x500/*GL_INVALID_ENUM*/);
          return 0;
      }
    };

  /** @suppress {checkTypes} */
  var jstoi_q = (str) => parseInt(str);
  
  /** @noinline */
  var webglGetLeftBracePos = (name) => name.slice(-1) == ']' && name.lastIndexOf('[');
  
  var webglPrepareUniformLocationsBeforeFirstUse = (program) => {
      var uniformLocsById = program.uniformLocsById, // Maps GLuint -> WebGLUniformLocation
        uniformSizeAndIdsByName = program.uniformSizeAndIdsByName, // Maps name -> [uniform array length, GLuint]
        i, j;
  
      // On the first time invocation of glGetUniformLocation on this shader program:
      // initialize cache data structures and discover which uniforms are arrays.
      if (!uniformLocsById) {
        // maps GLint integer locations to WebGLUniformLocations
        program.uniformLocsById = uniformLocsById = {};
        // maps integer locations back to uniform name strings, so that we can lazily fetch uniform array locations
        program.uniformArrayNamesById = {};
  
        var numActiveUniforms = GLctx.getProgramParameter(program, 0x8B86/*GL_ACTIVE_UNIFORMS*/);
        for (i = 0; i < numActiveUniforms; ++i) {
          var u = GLctx.getActiveUniform(program, i);
          var nm = u.name;
          var sz = u.size;
          var lb = webglGetLeftBracePos(nm);
          var arrayName = lb > 0 ? nm.slice(0, lb) : nm;
  
          // Assign a new location.
          var id = program.uniformIdCounter;
          program.uniformIdCounter += sz;
          // Eagerly get the location of the uniformArray[0] base element.
          // The remaining indices >0 will be left for lazy evaluation to
          // improve performance. Those may never be needed to fetch, if the
          // application fills arrays always in full starting from the first
          // element of the array.
          uniformSizeAndIdsByName[arrayName] = [sz, id];
  
          // Store placeholder integers in place that highlight that these
          // >0 index locations are array indices pending population.
          for (j = 0; j < sz; ++j) {
            uniformLocsById[id] = j;
            program.uniformArrayNamesById[id++] = arrayName;
          }
        }
      }
    };
  
  
  
  var _glGetUniformLocation = (program, name) => {
  
      name = UTF8ToString(name);
  
      if (program = GL.programs[program]) {
        webglPrepareUniformLocationsBeforeFirstUse(program);
        var uniformLocsById = program.uniformLocsById; // Maps GLuint -> WebGLUniformLocation
        var arrayIndex = 0;
        var uniformBaseName = name;
  
        // Invariant: when populating integer IDs for uniform locations, we must
        // maintain the precondition that arrays reside in contiguous addresses,
        // i.e. for a 'vec4 colors[10];', colors[4] must be at location
        // colors[0]+4.  However, user might call glGetUniformLocation(program,
        // "colors") for an array, so we cannot discover based on the user input
        // arguments whether the uniform we are dealing with is an array. The only
        // way to discover which uniforms are arrays is to enumerate over all the
        // active uniforms in the program.
        var leftBrace = webglGetLeftBracePos(name);
  
        // If user passed an array accessor "[index]", parse the array index off the accessor.
        if (leftBrace > 0) {
          arrayIndex = jstoi_q(name.slice(leftBrace + 1)) >>> 0; // "index]", coerce parseInt(']') with >>>0 to treat "foo[]" as "foo[0]" and foo[-1] as unsigned out-of-bounds.
          uniformBaseName = name.slice(0, leftBrace);
        }
  
        // Have we cached the location of this uniform before?
        // A pair [array length, GLint of the uniform location]
        var sizeAndId = program.uniformSizeAndIdsByName[uniformBaseName];
  
        // If an uniform with this name exists, and if its index is within the
        // array limits (if it's even an array), query the WebGLlocation, or
        // return an existing cached location.
        if (sizeAndId && arrayIndex < sizeAndId[0]) {
          arrayIndex += sizeAndId[1]; // Add the base location of the uniform to the array index offset.
          if ((uniformLocsById[arrayIndex] = uniformLocsById[arrayIndex] || GLctx.getUniformLocation(program, name))) {
            return arrayIndex;
          }
        }
      }
      else {
        // N.b. we are currently unable to distinguish between GL program IDs that
        // never existed vs GL program IDs that have been deleted, so report
        // GL_INVALID_VALUE in both cases.
        GL.recordError(0x501 /* GL_INVALID_VALUE */);
      }
      return -1;
    };

  var tempFixedLengthArray = [];
  var _glInvalidateFramebuffer = (target, numAttachments, attachments) => {
      var list = tempFixedLengthArray[numAttachments];
      for (var i = 0; i < numAttachments; i++) {
        list[i] = HEAP32[(((attachments)+(i*4))>>2)];
      }
  
      GLctx.invalidateFramebuffer(target, list);
    };

  var _glLinkProgram = (program) => {
      program = GL.programs[program];
      GLctx.linkProgram(program);
      // Invalidate earlier computed uniform->ID mappings, those have now become stale
      program.uniformLocsById = 0; // Mark as null-like so that glGetUniformLocation() knows to populate this again.
      program.uniformSizeAndIdsByName = {};
  
    };

  var _glPixelStorei = (pname, param) => {
      if (pname == 3317) {
        GL.unpackAlignment = param;
      } else if (pname == 3314) {
        GL.unpackRowLength = param;
      }
      GLctx.pixelStorei(pname, param);
    };

  var _glPolygonOffset = (x0, x1) => GLctx.polygonOffset(x0, x1);

  var _glReadBuffer = (x0) => GLctx.readBuffer(x0);

  var _glRenderbufferStorageMultisample = (x0, x1, x2, x3, x4) => GLctx.renderbufferStorageMultisample(x0, x1, x2, x3, x4);

  var _glSamplerParameterf = (sampler, pname, param) => {
      GLctx.samplerParameterf(GL.samplers[sampler], pname, param);
    };

  var _glSamplerParameteri = (sampler, pname, param) => {
      GLctx.samplerParameteri(GL.samplers[sampler], pname, param);
    };

  var _glScissor = (x0, x1, x2, x3) => GLctx.scissor(x0, x1, x2, x3);

  var _glShaderSource = (shader, count, string, length) => {
      var source = GL.getSource(shader, count, string, length);
  
      GLctx.shaderSource(GL.shaders[shader], source);
    };

  var _glStencilFunc = (x0, x1, x2) => GLctx.stencilFunc(x0, x1, x2);

  var _glStencilFuncSeparate = (x0, x1, x2, x3) => GLctx.stencilFuncSeparate(x0, x1, x2, x3);

  var _glStencilMask = (x0) => GLctx.stencilMask(x0);

  var _glStencilOp = (x0, x1, x2) => GLctx.stencilOp(x0, x1, x2);

  var _glStencilOpSeparate = (x0, x1, x2, x3) => GLctx.stencilOpSeparate(x0, x1, x2, x3);

  var computeUnpackAlignedImageSize = (width, height, sizePerPixel) => {
      function roundedToNextMultipleOf(x, y) {
        return (x + y - 1) & -y;
      }
      var plainRowSize = (GL.unpackRowLength || width) * sizePerPixel;
      var alignedRowSize = roundedToNextMultipleOf(plainRowSize, GL.unpackAlignment);
      return height * alignedRowSize;
    };
  
  var colorChannelsInGlTextureFormat = (format) => {
      // Micro-optimizations for size: map format to size by subtracting smallest
      // enum value (0x1902) from all values first.  Also omit the most common
      // size value (1) from the list, which is assumed by formats not on the
      // list.
      var colorChannels = {
        // 0x1902 /* GL_DEPTH_COMPONENT */ - 0x1902: 1,
        // 0x1906 /* GL_ALPHA */ - 0x1902: 1,
        5: 3,
        6: 4,
        // 0x1909 /* GL_LUMINANCE */ - 0x1902: 1,
        8: 2,
        29502: 3,
        29504: 4,
        // 0x1903 /* GL_RED */ - 0x1902: 1,
        26917: 2,
        26918: 2,
        // 0x8D94 /* GL_RED_INTEGER */ - 0x1902: 1,
        29846: 3,
        29847: 4
      };
      return colorChannels[format - 0x1902]||1;
    };
  
  var heapObjectForWebGLType = (type) => {
      // Micro-optimization for size: Subtract lowest GL enum number (0x1400/* GL_BYTE */) from type to compare
      // smaller values for the heap, for shorter generated code size.
      // Also the type HEAPU16 is not tested for explicitly, but any unrecognized type will return out HEAPU16.
      // (since most types are HEAPU16)
      type -= 0x1400;
      if (type == 0) return HEAP8;
  
      if (type == 1) return HEAPU8;
  
      if (type == 2) return HEAP16;
  
      if (type == 4) return HEAP32;
  
      if (type == 6) return HEAPF32;
  
      if (type == 5
        || type == 28922
        || type == 28520
        || type == 30779
        || type == 30782
        )
        return HEAPU32;
  
      return HEAPU16;
    };
  
  var toTypedArrayIndex = (pointer, heap) =>
      pointer >>> (31 - Math.clz32(heap.BYTES_PER_ELEMENT));
  
  var emscriptenWebGLGetTexPixelData = (type, format, width, height, pixels, internalFormat) => {
      var heap = heapObjectForWebGLType(type);
      var sizePerPixel = colorChannelsInGlTextureFormat(format) * heap.BYTES_PER_ELEMENT;
      var bytes = computeUnpackAlignedImageSize(width, height, sizePerPixel);
      return heap.subarray(toTypedArrayIndex(pixels, heap), toTypedArrayIndex(pixels + bytes, heap));
    };
  
  
  
  var _glTexImage2D = (target, level, internalFormat, width, height, border, format, type, pixels) => {
      if (GL.currentContext.version >= 2) {
        if (GLctx.currentPixelUnpackBufferBinding) {
          GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels);
          return;
        }
        if (pixels) {
          var heap = heapObjectForWebGLType(type);
          var index = toTypedArrayIndex(pixels, heap);
          GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, heap, index);
          return;
        }
      }
      var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) : null;
      GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixelData);
    };

  
  var _glTexImage3D = (target, level, internalFormat, width, height, depth, border, format, type, pixels) => {
      if (GLctx.currentPixelUnpackBufferBinding) {
        GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, pixels);
      } else if (pixels) {
        var heap = heapObjectForWebGLType(type);
        GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, heap, toTypedArrayIndex(pixels, heap));
      } else {
        GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, null);
      }
    };

  var _glTexParameteri = (x0, x1, x2) => GLctx.texParameteri(x0, x1, x2);

  var _glTexStorage2D = (x0, x1, x2, x3, x4) => GLctx.texStorage2D(x0, x1, x2, x3, x4);

  var _glTexStorage3D = (x0, x1, x2, x3, x4, x5) => GLctx.texStorage3D(x0, x1, x2, x3, x4, x5);

  var webglGetUniformLocation = (location) => {
      var p = GLctx.currentProgram;
  
      if (p) {
        var webglLoc = p.uniformLocsById[location];
        // p.uniformLocsById[location] stores either an integer, or a
        // WebGLUniformLocation.
        // If an integer, we have not yet bound the location, so do it now. The
        // integer value specifies the array index we should bind to.
        if (typeof webglLoc == 'number') {
          p.uniformLocsById[location] = webglLoc = GLctx.getUniformLocation(p, p.uniformArrayNamesById[location] + (webglLoc > 0 ? `[${webglLoc}]` : ''));
        }
        // Else an already cached WebGLUniformLocation, return it.
        return webglLoc;
      } else {
        GL.recordError(0x502/*GL_INVALID_OPERATION*/);
      }
    };
  
  var miniTempWebGLFloatBuffers = [];
  
  var _glUniform1fv = (location, count, value) => {
  
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniform1fv(webglGetUniformLocation(location), HEAPF32, ((value)>>2), count);
        return;
      }
  
      if (count <= 288) {
        // avoid allocation when uploading few enough uniforms
        var view = miniTempWebGLFloatBuffers[count];
        for (var i = 0; i < count; ++i) {
          view[i] = HEAPF32[(((value)+(4*i))>>2)];
        }
      } else
      {
        var view = HEAPF32.subarray((((value)>>2)), ((value+count*4)>>2));
      }
      GLctx.uniform1fv(webglGetUniformLocation(location), view);
    };

  
  var _glUniform1i = (location, v0) => {
      GLctx.uniform1i(webglGetUniformLocation(location), v0);
    };

  
  var miniTempWebGLIntBuffers = [];
  
  var _glUniform1iv = (location, count, value) => {
  
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniform1iv(webglGetUniformLocation(location), HEAP32, ((value)>>2), count);
        return;
      }
  
      if (count <= 288) {
        // avoid allocation when uploading few enough uniforms
        var view = miniTempWebGLIntBuffers[count];
        for (var i = 0; i < count; ++i) {
          view[i] = HEAP32[(((value)+(4*i))>>2)];
        }
      } else
      {
        var view = HEAP32.subarray((((value)>>2)), ((value+count*4)>>2));
      }
      GLctx.uniform1iv(webglGetUniformLocation(location), view);
    };

  
  
  var _glUniform2fv = (location, count, value) => {
  
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniform2fv(webglGetUniformLocation(location), HEAPF32, ((value)>>2), count*2);
        return;
      }
  
      if (count <= 144) {
        // avoid allocation when uploading few enough uniforms
        count *= 2;
        var view = miniTempWebGLFloatBuffers[count];
        for (var i = 0; i < count; i += 2) {
          view[i] = HEAPF32[(((value)+(4*i))>>2)];
          view[i+1] = HEAPF32[(((value)+(4*i+4))>>2)];
        }
      } else
      {
        var view = HEAPF32.subarray((((value)>>2)), ((value+count*8)>>2));
      }
      GLctx.uniform2fv(webglGetUniformLocation(location), view);
    };

  
  
  var _glUniform2iv = (location, count, value) => {
  
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniform2iv(webglGetUniformLocation(location), HEAP32, ((value)>>2), count*2);
        return;
      }
  
      if (count <= 144) {
        // avoid allocation when uploading few enough uniforms
        count *= 2;
        var view = miniTempWebGLIntBuffers[count];
        for (var i = 0; i < count; i += 2) {
          view[i] = HEAP32[(((value)+(4*i))>>2)];
          view[i+1] = HEAP32[(((value)+(4*i+4))>>2)];
        }
      } else
      {
        var view = HEAP32.subarray((((value)>>2)), ((value+count*8)>>2));
      }
      GLctx.uniform2iv(webglGetUniformLocation(location), view);
    };

  
  
  var _glUniform3fv = (location, count, value) => {
  
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniform3fv(webglGetUniformLocation(location), HEAPF32, ((value)>>2), count*3);
        return;
      }
  
      if (count <= 96) {
        // avoid allocation when uploading few enough uniforms
        count *= 3;
        var view = miniTempWebGLFloatBuffers[count];
        for (var i = 0; i < count; i += 3) {
          view[i] = HEAPF32[(((value)+(4*i))>>2)];
          view[i+1] = HEAPF32[(((value)+(4*i+4))>>2)];
          view[i+2] = HEAPF32[(((value)+(4*i+8))>>2)];
        }
      } else
      {
        var view = HEAPF32.subarray((((value)>>2)), ((value+count*12)>>2));
      }
      GLctx.uniform3fv(webglGetUniformLocation(location), view);
    };

  
  
  var _glUniform3iv = (location, count, value) => {
  
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniform3iv(webglGetUniformLocation(location), HEAP32, ((value)>>2), count*3);
        return;
      }
  
      if (count <= 96) {
        // avoid allocation when uploading few enough uniforms
        count *= 3;
        var view = miniTempWebGLIntBuffers[count];
        for (var i = 0; i < count; i += 3) {
          view[i] = HEAP32[(((value)+(4*i))>>2)];
          view[i+1] = HEAP32[(((value)+(4*i+4))>>2)];
          view[i+2] = HEAP32[(((value)+(4*i+8))>>2)];
        }
      } else
      {
        var view = HEAP32.subarray((((value)>>2)), ((value+count*12)>>2));
      }
      GLctx.uniform3iv(webglGetUniformLocation(location), view);
    };

  
  
  var _glUniform4fv = (location, count, value) => {
  
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniform4fv(webglGetUniformLocation(location), HEAPF32, ((value)>>2), count*4);
        return;
      }
  
      if (count <= 72) {
        // avoid allocation when uploading few enough uniforms
        var view = miniTempWebGLFloatBuffers[4*count];
        // hoist the heap out of the loop for size and for pthreads+growth.
        var heap = HEAPF32;
        value = ((value)>>2);
        count *= 4;
        for (var i = 0; i < count; i += 4) {
          var dst = value + i;
          view[i] = heap[dst];
          view[i + 1] = heap[dst + 1];
          view[i + 2] = heap[dst + 2];
          view[i + 3] = heap[dst + 3];
        }
      } else
      {
        var view = HEAPF32.subarray((((value)>>2)), ((value+count*16)>>2));
      }
      GLctx.uniform4fv(webglGetUniformLocation(location), view);
    };

  
  
  var _glUniform4iv = (location, count, value) => {
  
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniform4iv(webglGetUniformLocation(location), HEAP32, ((value)>>2), count*4);
        return;
      }
  
      if (count <= 72) {
        // avoid allocation when uploading few enough uniforms
        count *= 4;
        var view = miniTempWebGLIntBuffers[count];
        for (var i = 0; i < count; i += 4) {
          view[i] = HEAP32[(((value)+(4*i))>>2)];
          view[i+1] = HEAP32[(((value)+(4*i+4))>>2)];
          view[i+2] = HEAP32[(((value)+(4*i+8))>>2)];
          view[i+3] = HEAP32[(((value)+(4*i+12))>>2)];
        }
      } else
      {
        var view = HEAP32.subarray((((value)>>2)), ((value+count*16)>>2));
      }
      GLctx.uniform4iv(webglGetUniformLocation(location), view);
    };

  
  
  var _glUniformMatrix4fv = (location, count, transpose, value) => {
  
      if (GL.currentContext.version >= 2) {
        count && GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, HEAPF32, ((value)>>2), count*16);
        return;
      }
  
      if (count <= 18) {
        // avoid allocation when uploading few enough uniforms
        var view = miniTempWebGLFloatBuffers[16*count];
        // hoist the heap out of the loop for size and for pthreads+growth.
        var heap = HEAPF32;
        value = ((value)>>2);
        count *= 16;
        for (var i = 0; i < count; i += 16) {
          var dst = value + i;
          view[i] = heap[dst];
          view[i + 1] = heap[dst + 1];
          view[i + 2] = heap[dst + 2];
          view[i + 3] = heap[dst + 3];
          view[i + 4] = heap[dst + 4];
          view[i + 5] = heap[dst + 5];
          view[i + 6] = heap[dst + 6];
          view[i + 7] = heap[dst + 7];
          view[i + 8] = heap[dst + 8];
          view[i + 9] = heap[dst + 9];
          view[i + 10] = heap[dst + 10];
          view[i + 11] = heap[dst + 11];
          view[i + 12] = heap[dst + 12];
          view[i + 13] = heap[dst + 13];
          view[i + 14] = heap[dst + 14];
          view[i + 15] = heap[dst + 15];
        }
      } else
      {
        var view = HEAPF32.subarray((((value)>>2)), ((value+count*64)>>2));
      }
      GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, view);
    };

  var _glUseProgram = (program) => {
      program = GL.programs[program];
      GLctx.useProgram(program);
      // Record the currently active program so that we can access the uniform
      // mapping table of that program.
      GLctx.currentProgram = program;
    };

  var _glVertexAttribDivisor = (index, divisor) => {
      GLctx.vertexAttribDivisor(index, divisor);
    };

  var _glVertexAttribPointer = (index, size, type, normalized, stride, ptr) => {
      GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr);
    };

  var _glViewport = (x0, x1, x2, x3) => GLctx.viewport(x0, x1, x2, x3);



  
  
  var stackAlloc = (sz) => __emscripten_stack_alloc(sz);
  var stringToUTF8OnStack = (str) => {
      var size = lengthBytesUTF8(str) + 1;
      var ret = stackAlloc(size);
      stringToUTF8(str, ret, size);
      return ret;
    };

  
  var withStackSave = (f) => {
      var stack = stackSave();
      var ret = f();
      stackRestore(stack);
      return ret;
    };


      Module["requestAnimationFrame"] = MainLoop.requestAnimationFrame;
      Module["pauseMainLoop"] = MainLoop.pause;
      Module["resumeMainLoop"] = MainLoop.resume;
      MainLoop.init();;
for (var i = 0; i < 32; ++i) tempFixedLengthArray.push(new Array(i));;
var miniTempWebGLFloatBuffersStorage = new Float32Array(288);
  // Create GL_POOL_TEMP_BUFFERS_SIZE+1 temporary buffers, for uploads of size 0 through GL_POOL_TEMP_BUFFERS_SIZE inclusive
  for (/**@suppress{duplicate}*/var i = 0; i <= 288; ++i) {
    miniTempWebGLFloatBuffers[i] = miniTempWebGLFloatBuffersStorage.subarray(0, i);
  };
var miniTempWebGLIntBuffersStorage = new Int32Array(288);
  // Create GL_POOL_TEMP_BUFFERS_SIZE+1 temporary buffers, for uploads of size 0 through GL_POOL_TEMP_BUFFERS_SIZE inclusive
  for (/**@suppress{duplicate}*/var i = 0; i <= 288; ++i) {
    miniTempWebGLIntBuffers[i] = miniTempWebGLIntBuffersStorage.subarray(0, i);
  };
function checkIncomingModuleAPI() {
  ignoredModuleProp('fetchSettings');
}
var wasmImports = {
  /** @export */
  __assert_fail: ___assert_fail,
  /** @export */
  _abort_js: __abort_js,
  /** @export */
  _emscripten_memcpy_js: __emscripten_memcpy_js,
  /** @export */
  _wasm_host_copy_from_cart,
  /** @export */
  cart_strlen,
  /** @export */
  copy_to_cart,
  /** @export */
  emscripten_cancel_main_loop: _emscripten_cancel_main_loop,
  /** @export */
  emscripten_get_device_pixel_ratio: _emscripten_get_device_pixel_ratio,
  /** @export */
  emscripten_get_element_css_size: _emscripten_get_element_css_size,
  /** @export */
  emscripten_performance_now: _emscripten_performance_now,
  /** @export */
  emscripten_request_animation_frame_loop: _emscripten_request_animation_frame_loop,
  /** @export */
  emscripten_resize_heap: _emscripten_resize_heap,
  /** @export */
  emscripten_set_blur_callback_on_thread: _emscripten_set_blur_callback_on_thread,
  /** @export */
  emscripten_set_canvas_element_size: _emscripten_set_canvas_element_size,
  /** @export */
  emscripten_set_focus_callback_on_thread: _emscripten_set_focus_callback_on_thread,
  /** @export */
  emscripten_set_keydown_callback_on_thread: _emscripten_set_keydown_callback_on_thread,
  /** @export */
  emscripten_set_keypress_callback_on_thread: _emscripten_set_keypress_callback_on_thread,
  /** @export */
  emscripten_set_keyup_callback_on_thread: _emscripten_set_keyup_callback_on_thread,
  /** @export */
  emscripten_set_main_loop: _emscripten_set_main_loop,
  /** @export */
  emscripten_set_mousedown_callback_on_thread: _emscripten_set_mousedown_callback_on_thread,
  /** @export */
  emscripten_set_mouseenter_callback_on_thread: _emscripten_set_mouseenter_callback_on_thread,
  /** @export */
  emscripten_set_mouseleave_callback_on_thread: _emscripten_set_mouseleave_callback_on_thread,
  /** @export */
  emscripten_set_mousemove_callback_on_thread: _emscripten_set_mousemove_callback_on_thread,
  /** @export */
  emscripten_set_mouseup_callback_on_thread: _emscripten_set_mouseup_callback_on_thread,
  /** @export */
  emscripten_set_pointerlockchange_callback_on_thread: _emscripten_set_pointerlockchange_callback_on_thread,
  /** @export */
  emscripten_set_pointerlockerror_callback_on_thread: _emscripten_set_pointerlockerror_callback_on_thread,
  /** @export */
  emscripten_set_resize_callback_on_thread: _emscripten_set_resize_callback_on_thread,
  /** @export */
  emscripten_set_touchcancel_callback_on_thread: _emscripten_set_touchcancel_callback_on_thread,
  /** @export */
  emscripten_set_touchend_callback_on_thread: _emscripten_set_touchend_callback_on_thread,
  /** @export */
  emscripten_set_touchmove_callback_on_thread: _emscripten_set_touchmove_callback_on_thread,
  /** @export */
  emscripten_set_touchstart_callback_on_thread: _emscripten_set_touchstart_callback_on_thread,
  /** @export */
  emscripten_set_webglcontextlost_callback_on_thread: _emscripten_set_webglcontextlost_callback_on_thread,
  /** @export */
  emscripten_set_webglcontextrestored_callback_on_thread: _emscripten_set_webglcontextrestored_callback_on_thread,
  /** @export */
  emscripten_set_wheel_callback_on_thread: _emscripten_set_wheel_callback_on_thread,
  /** @export */
  emscripten_webgl_create_context: _emscripten_webgl_create_context,
  /** @export */
  emscripten_webgl_enable_extension: _emscripten_webgl_enable_extension,
  /** @export */
  emscripten_webgl_make_context_current: _emscripten_webgl_make_context_current,
  /** @export */
  exit: _exit,
  /** @export */
  fd_close: _fd_close,
  /** @export */
  fd_seek: _fd_seek,
  /** @export */
  fd_write: _fd_write,
  /** @export */
  glActiveTexture: _glActiveTexture,
  /** @export */
  glAttachShader: _glAttachShader,
  /** @export */
  glBindBuffer: _glBindBuffer,
  /** @export */
  glBindBufferBase: _glBindBufferBase,
  /** @export */
  glBindFramebuffer: _glBindFramebuffer,
  /** @export */
  glBindRenderbuffer: _glBindRenderbuffer,
  /** @export */
  glBindSampler: _glBindSampler,
  /** @export */
  glBindTexture: _glBindTexture,
  /** @export */
  glBindVertexArray: _glBindVertexArray,
  /** @export */
  glBlendColor: _glBlendColor,
  /** @export */
  glBlendEquationSeparate: _glBlendEquationSeparate,
  /** @export */
  glBlendFuncSeparate: _glBlendFuncSeparate,
  /** @export */
  glBlitFramebuffer: _glBlitFramebuffer,
  /** @export */
  glBufferData: _glBufferData,
  /** @export */
  glBufferSubData: _glBufferSubData,
  /** @export */
  glClearBufferfi: _glClearBufferfi,
  /** @export */
  glClearBufferfv: _glClearBufferfv,
  /** @export */
  glClearBufferiv: _glClearBufferiv,
  /** @export */
  glColorMask: _glColorMask,
  /** @export */
  glCompileShader: _glCompileShader,
  /** @export */
  glCompressedTexImage2D: _glCompressedTexImage2D,
  /** @export */
  glCompressedTexImage3D: _glCompressedTexImage3D,
  /** @export */
  glCreateProgram: _glCreateProgram,
  /** @export */
  glCreateShader: _glCreateShader,
  /** @export */
  glCullFace: _glCullFace,
  /** @export */
  glDeleteBuffers: _glDeleteBuffers,
  /** @export */
  glDeleteFramebuffers: _glDeleteFramebuffers,
  /** @export */
  glDeleteProgram: _glDeleteProgram,
  /** @export */
  glDeleteRenderbuffers: _glDeleteRenderbuffers,
  /** @export */
  glDeleteSamplers: _glDeleteSamplers,
  /** @export */
  glDeleteShader: _glDeleteShader,
  /** @export */
  glDeleteTextures: _glDeleteTextures,
  /** @export */
  glDeleteVertexArrays: _glDeleteVertexArrays,
  /** @export */
  glDepthFunc: _glDepthFunc,
  /** @export */
  glDepthMask: _glDepthMask,
  /** @export */
  glDisable: _glDisable,
  /** @export */
  glDisableVertexAttribArray: _glDisableVertexAttribArray,
  /** @export */
  glDrawArrays: _glDrawArrays,
  /** @export */
  glDrawArraysInstanced: _glDrawArraysInstanced,
  /** @export */
  glDrawElements: _glDrawElements,
  /** @export */
  glDrawElementsInstanced: _glDrawElementsInstanced,
  /** @export */
  glEnable: _glEnable,
  /** @export */
  glEnableVertexAttribArray: _glEnableVertexAttribArray,
  /** @export */
  glFrontFace: _glFrontFace,
  /** @export */
  glGenBuffers: _glGenBuffers,
  /** @export */
  glGenRenderbuffers: _glGenRenderbuffers,
  /** @export */
  glGenSamplers: _glGenSamplers,
  /** @export */
  glGenTextures: _glGenTextures,
  /** @export */
  glGenVertexArrays: _glGenVertexArrays,
  /** @export */
  glGetAttribLocation: _glGetAttribLocation,
  /** @export */
  glGetError: _glGetError,
  /** @export */
  glGetIntegerv: _glGetIntegerv,
  /** @export */
  glGetProgramInfoLog: _glGetProgramInfoLog,
  /** @export */
  glGetProgramiv: _glGetProgramiv,
  /** @export */
  glGetShaderInfoLog: _glGetShaderInfoLog,
  /** @export */
  glGetShaderiv: _glGetShaderiv,
  /** @export */
  glGetStringi: _glGetStringi,
  /** @export */
  glGetUniformLocation: _glGetUniformLocation,
  /** @export */
  glInvalidateFramebuffer: _glInvalidateFramebuffer,
  /** @export */
  glLinkProgram: _glLinkProgram,
  /** @export */
  glPixelStorei: _glPixelStorei,
  /** @export */
  glPolygonOffset: _glPolygonOffset,
  /** @export */
  glReadBuffer: _glReadBuffer,
  /** @export */
  glRenderbufferStorageMultisample: _glRenderbufferStorageMultisample,
  /** @export */
  glSamplerParameterf: _glSamplerParameterf,
  /** @export */
  glSamplerParameteri: _glSamplerParameteri,
  /** @export */
  glScissor: _glScissor,
  /** @export */
  glShaderSource: _glShaderSource,
  /** @export */
  glStencilFunc: _glStencilFunc,
  /** @export */
  glStencilFuncSeparate: _glStencilFuncSeparate,
  /** @export */
  glStencilMask: _glStencilMask,
  /** @export */
  glStencilOp: _glStencilOp,
  /** @export */
  glStencilOpSeparate: _glStencilOpSeparate,
  /** @export */
  glTexImage2D: _glTexImage2D,
  /** @export */
  glTexImage3D: _glTexImage3D,
  /** @export */
  glTexParameteri: _glTexParameteri,
  /** @export */
  glTexStorage2D: _glTexStorage2D,
  /** @export */
  glTexStorage3D: _glTexStorage3D,
  /** @export */
  glUniform1fv: _glUniform1fv,
  /** @export */
  glUniform1i: _glUniform1i,
  /** @export */
  glUniform1iv: _glUniform1iv,
  /** @export */
  glUniform2fv: _glUniform2fv,
  /** @export */
  glUniform2iv: _glUniform2iv,
  /** @export */
  glUniform3fv: _glUniform3fv,
  /** @export */
  glUniform3iv: _glUniform3iv,
  /** @export */
  glUniform4fv: _glUniform4fv,
  /** @export */
  glUniform4iv: _glUniform4iv,
  /** @export */
  glUniformMatrix4fv: _glUniformMatrix4fv,
  /** @export */
  glUseProgram: _glUseProgram,
  /** @export */
  glVertexAttribDivisor: _glVertexAttribDivisor,
  /** @export */
  glVertexAttribPointer: _glVertexAttribPointer,
  /** @export */
  glViewport: _glViewport,
  /** @export */
  sapp_js_add_beforeunload_listener,
  /** @export */
  sapp_js_add_clipboard_listener,
  /** @export */
  sapp_js_add_dragndrop_listeners,
  /** @export */
  sapp_js_clear_favicon,
  /** @export */
  sapp_js_init,
  /** @export */
  sapp_js_remove_beforeunload_listener,
  /** @export */
  sapp_js_remove_clipboard_listener,
  /** @export */
  sapp_js_remove_dragndrop_listeners,
  /** @export */
  sapp_js_request_pointerlock,
  /** @export */
  sapp_js_set_favicon,
  /** @export */
  slog_js_log,
  /** @export */
  wasm_host_update
};
var wasmExports = createWasm();
var ___wasm_call_ctors = createExportWrapper('__wasm_call_ctors', 0);
var _malloc = createExportWrapper('malloc', 1);
var _test_string_in = Module['_test_string_in'] = createExportWrapper('test_string_in', 1);
var _test_string_out = Module['_test_string_out'] = createExportWrapper('test_string_out', 0);
var _test_bytes_in = Module['_test_bytes_in'] = createExportWrapper('test_bytes_in', 2);
var _test_bytes_out = Module['_test_bytes_out'] = createExportWrapper('test_bytes_out', 1);
var _test_struct_in = Module['_test_struct_in'] = createExportWrapper('test_struct_in', 1);
var _test_struct_out = Module['_test_struct_out'] = createExportWrapper('test_struct_out', 0);
var _push_transform = Module['_push_transform'] = createExportWrapper('push_transform', 0);
var _pop_transform = Module['_pop_transform'] = createExportWrapper('pop_transform', 0);
var _reset_transform = Module['_reset_transform'] = createExportWrapper('reset_transform', 0);
var _translate = Module['_translate'] = createExportWrapper('translate', 2);
var _rotate = Module['_rotate'] = createExportWrapper('rotate', 1);
var _rotate_at = Module['_rotate_at'] = createExportWrapper('rotate_at', 3);
var _scale = Module['_scale'] = createExportWrapper('scale', 2);
var _scale_at = Module['_scale_at'] = createExportWrapper('scale_at', 4);
var _set_blend_mode = Module['_set_blend_mode'] = createExportWrapper('set_blend_mode', 1);
var _reset_blend_mode = Module['_reset_blend_mode'] = createExportWrapper('reset_blend_mode', 0);
var _set_color = Module['_set_color'] = createExportWrapper('set_color', 4);
var _reset_color = Module['_reset_color'] = createExportWrapper('reset_color', 0);
var _set_image = Module['_set_image'] = createExportWrapper('set_image', 2);
var _unset_image = Module['_unset_image'] = createExportWrapper('unset_image', 1);
var _reset_image = Module['_reset_image'] = createExportWrapper('reset_image', 1);
var _viewport = Module['_viewport'] = createExportWrapper('viewport', 4);
var _reset_viewport = Module['_reset_viewport'] = createExportWrapper('reset_viewport', 0);
var _scissor = Module['_scissor'] = createExportWrapper('scissor', 4);
var _reset_scissor = Module['_reset_scissor'] = createExportWrapper('reset_scissor', 0);
var _reset_state = Module['_reset_state'] = createExportWrapper('reset_state', 0);
var _clear = Module['_clear'] = createExportWrapper('clear', 0);
var _draw_points = Module['_draw_points'] = createExportWrapper('draw_points', 2);
var _draw_point = Module['_draw_point'] = createExportWrapper('draw_point', 2);
var _draw_lines = Module['_draw_lines'] = createExportWrapper('draw_lines', 2);
var _draw_line = Module['_draw_line'] = createExportWrapper('draw_line', 4);
var _draw_lines_strip = Module['_draw_lines_strip'] = createExportWrapper('draw_lines_strip', 2);
var _draw_filled_triangles = Module['_draw_filled_triangles'] = createExportWrapper('draw_filled_triangles', 2);
var _draw_filled_triangle = Module['_draw_filled_triangle'] = createExportWrapper('draw_filled_triangle', 6);
var _draw_filled_triangles_strip = Module['_draw_filled_triangles_strip'] = createExportWrapper('draw_filled_triangles_strip', 2);
var _draw_filled_rects = Module['_draw_filled_rects'] = createExportWrapper('draw_filled_rects', 2);
var _draw_filled_rect = Module['_draw_filled_rect'] = createExportWrapper('draw_filled_rect', 4);
var _draw_textured_rects = Module['_draw_textured_rects'] = createExportWrapper('draw_textured_rects', 3);
var _draw_textured_rect = Module['_draw_textured_rect'] = createExportWrapper('draw_textured_rect', 3);
var _draw_outline_circle = Module['_draw_outline_circle'] = createExportWrapper('draw_outline_circle', 3);
var _draw_filled_circle = Module['_draw_filled_circle'] = createExportWrapper('draw_filled_circle', 3);
var __sapp_emsc_onpaste = Module['__sapp_emsc_onpaste'] = createExportWrapper('_sapp_emsc_onpaste', 1);
var __sapp_html5_get_ask_leave_site = Module['__sapp_html5_get_ask_leave_site'] = createExportWrapper('_sapp_html5_get_ask_leave_site', 0);
var __sapp_emsc_begin_drop = Module['__sapp_emsc_begin_drop'] = createExportWrapper('_sapp_emsc_begin_drop', 1);
var __sapp_emsc_drop = Module['__sapp_emsc_drop'] = createExportWrapper('_sapp_emsc_drop', 2);
var __sapp_emsc_end_drop = Module['__sapp_emsc_end_drop'] = createExportWrapper('_sapp_emsc_end_drop', 3);
var __sapp_emsc_invoke_fetch_cb = Module['__sapp_emsc_invoke_fetch_cb'] = createExportWrapper('_sapp_emsc_invoke_fetch_cb', 8);
var _main = Module['_main'] = createExportWrapper('__main_argc_argv', 2);
var _fflush = createExportWrapper('fflush', 1);
var _emscripten_stack_init = () => (_emscripten_stack_init = wasmExports['emscripten_stack_init'])();
var _emscripten_stack_get_free = () => (_emscripten_stack_get_free = wasmExports['emscripten_stack_get_free'])();
var _emscripten_stack_get_base = () => (_emscripten_stack_get_base = wasmExports['emscripten_stack_get_base'])();
var _emscripten_stack_get_end = () => (_emscripten_stack_get_end = wasmExports['emscripten_stack_get_end'])();
var __emscripten_stack_restore = (a0) => (__emscripten_stack_restore = wasmExports['_emscripten_stack_restore'])(a0);
var __emscripten_stack_alloc = (a0) => (__emscripten_stack_alloc = wasmExports['_emscripten_stack_alloc'])(a0);
var _emscripten_stack_get_current = () => (_emscripten_stack_get_current = wasmExports['emscripten_stack_get_current'])();
var dynCall_jiji = Module['dynCall_jiji'] = createExportWrapper('dynCall_jiji', 5);


// include: postamble.js
// === Auto-generated postamble setup entry stuff ===

var missingLibrarySymbols = [
  'writeI53ToI64Clamped',
  'writeI53ToI64Signaling',
  'writeI53ToU64Clamped',
  'writeI53ToU64Signaling',
  'convertI32PairToI53',
  'convertU32PairToI53',
  'getTempRet0',
  'setTempRet0',
  'zeroMemory',
  'growMemory',
  'strError',
  'inetPton4',
  'inetNtop4',
  'inetPton6',
  'inetNtop6',
  'readSockaddr',
  'writeSockaddr',
  'initRandomFill',
  'randomFill',
  'emscriptenLog',
  'readEmAsmArgs',
  'getExecutableName',
  'listenOnce',
  'autoResumeAudioContext',
  'dynCallLegacy',
  'getDynCaller',
  'dynCall',
  'runtimeKeepalivePush',
  'runtimeKeepalivePop',
  'asmjsMangle',
  'asyncLoad',
  'mmapAlloc',
  'HandleAllocator',
  'getNativeTypeSize',
  'STACK_SIZE',
  'STACK_ALIGN',
  'POINTER_SIZE',
  'ASSERTIONS',
  'getCFunc',
  'ccall',
  'cwrap',
  'uleb128Encode',
  'sigToWasmTypes',
  'generateFuncType',
  'convertJsFunctionToWasm',
  'getEmptyTableSlot',
  'updateTableMap',
  'getFunctionAddress',
  'addFunction',
  'removeFunction',
  'reallyNegative',
  'unSign',
  'strLen',
  'reSign',
  'formatString',
  'intArrayFromString',
  'intArrayToString',
  'AsciiToString',
  'stringToAscii',
  'UTF16ToString',
  'stringToUTF16',
  'lengthBytesUTF16',
  'UTF32ToString',
  'stringToUTF32',
  'lengthBytesUTF32',
  'writeArrayToMemory',
  'fillDeviceOrientationEventData',
  'registerDeviceOrientationEventCallback',
  'fillDeviceMotionEventData',
  'registerDeviceMotionEventCallback',
  'screenOrientation',
  'fillOrientationChangeEventData',
  'registerOrientationChangeEventCallback',
  'fillFullscreenChangeEventData',
  'registerFullscreenChangeEventCallback',
  'JSEvents_requestFullscreen',
  'JSEvents_resizeCanvasForFullscreen',
  'registerRestoreOldStyle',
  'hideEverythingExceptGivenElement',
  'restoreHiddenElements',
  'setLetterbox',
  'softFullscreenResizeWebGLRenderTarget',
  'doRequestFullscreen',
  'requestPointerLock',
  'fillVisibilityChangeEventData',
  'registerVisibilityChangeEventCallback',
  'fillGamepadEventData',
  'registerGamepadEventCallback',
  'registerBeforeUnloadEventCallback',
  'fillBatteryEventData',
  'battery',
  'registerBatteryEventCallback',
  'setCanvasElementSize',
  'getCanvasElementSize',
  'jsStackTrace',
  'getCallstack',
  'convertPCtoSourceLocation',
  'getEnvStrings',
  'checkWasiClock',
  'wasiRightsToMuslOFlags',
  'wasiOFlagsToMuslOFlags',
  'createDyncallWrapper',
  'safeSetTimeout',
  'setImmediateWrapped',
  'clearImmediateWrapped',
  'polyfillSetImmediate',
  'registerPostMainLoop',
  'registerPreMainLoop',
  'getPromise',
  'makePromise',
  'idsToPromises',
  'makePromiseCallback',
  'ExceptionInfo',
  'findMatchingCatch',
  'Browser_asyncPrepareDataCounter',
  'safeRequestAnimationFrame',
  'isLeapYear',
  'ydayFromDate',
  'arraySum',
  'addDays',
  'getSocketFromFD',
  'getSocketAddress',
  'emscriptenWebGLGetUniform',
  'emscriptenWebGLGetVertexAttrib',
  '__glGetActiveAttribOrUniform',
  'writeGLArray',
  'runAndAbortIfError',
  'emscriptenWebGLGetIndexed',
  'ALLOC_NORMAL',
  'ALLOC_STACK',
  'allocate',
  'writeStringToMemory',
  'writeAsciiToMemory',
  'setErrNo',
  'demangle',
  'stackTrace',
];
missingLibrarySymbols.forEach(missingLibrarySymbol)

var unexportedSymbols = [
  'run',
  'addOnPreRun',
  'addOnInit',
  'addOnPreMain',
  'addOnExit',
  'addOnPostRun',
  'addRunDependency',
  'removeRunDependency',
  'out',
  'err',
  'callMain',
  'abort',
  'wasmMemory',
  'wasmExports',
  'writeStackCookie',
  'checkStackCookie',
  'intArrayFromBase64',
  'tryParseAsDataURI',
  'writeI53ToI64',
  'readI53FromI64',
  'readI53FromU64',
  'convertI32PairToI53Checked',
  'stackSave',
  'stackRestore',
  'stackAlloc',
  'ptrToString',
  'exitJS',
  'getHeapMax',
  'abortOnCannotGrowMemory',
  'ENV',
  'ERRNO_CODES',
  'DNS',
  'Protocols',
  'Sockets',
  'timers',
  'warnOnce',
  'readEmAsmArgsArray',
  'jstoi_q',
  'jstoi_s',
  'handleException',
  'keepRuntimeAlive',
  'callUserCallback',
  'maybeExit',
  'alignMemory',
  'wasmTable',
  'noExitRuntime',
  'freeTableIndexes',
  'functionsInTableMap',
  'setValue',
  'getValue',
  'PATH',
  'PATH_FS',
  'UTF8Decoder',
  'UTF8ArrayToString',
  'UTF8ToString',
  'stringToUTF8Array',
  'stringToUTF8',
  'lengthBytesUTF8',
  'UTF16Decoder',
  'stringToNewUTF8',
  'stringToUTF8OnStack',
  'JSEvents',
  'registerKeyEventCallback',
  'specialHTMLTargets',
  'maybeCStringToJsString',
  'findEventTarget',
  'findCanvasEventTarget',
  'getBoundingClientRect',
  'fillMouseEventData',
  'registerMouseEventCallback',
  'registerWheelEventCallback',
  'registerUiEventCallback',
  'registerFocusEventCallback',
  'currentFullscreenStrategy',
  'restoreOldWindowedStyle',
  'fillPointerlockChangeEventData',
  'registerPointerlockChangeEventCallback',
  'registerPointerlockErrorEventCallback',
  'registerTouchEventCallback',
  'UNWIND_CACHE',
  'ExitStatus',
  'flush_NO_FILESYSTEM',
  'promiseMap',
  'uncaughtExceptionCount',
  'exceptionLast',
  'exceptionCaught',
  'Browser',
  'getPreloadedImageData__data',
  'wget',
  'MONTH_DAYS_REGULAR',
  'MONTH_DAYS_LEAP',
  'MONTH_DAYS_REGULAR_CUMULATIVE',
  'MONTH_DAYS_LEAP_CUMULATIVE',
  'SYSCALLS',
  'tempFixedLengthArray',
  'miniTempWebGLFloatBuffers',
  'miniTempWebGLIntBuffers',
  'heapObjectForWebGLType',
  'toTypedArrayIndex',
  'webgl_enable_ANGLE_instanced_arrays',
  'webgl_enable_OES_vertex_array_object',
  'webgl_enable_WEBGL_draw_buffers',
  'webgl_enable_WEBGL_multi_draw',
  'webgl_enable_EXT_polygon_offset_clamp',
  'webgl_enable_EXT_clip_control',
  'webgl_enable_WEBGL_polygon_mode',
  'GL',
  'emscriptenWebGLGet',
  'computeUnpackAlignedImageSize',
  'colorChannelsInGlTextureFormat',
  'emscriptenWebGLGetTexPixelData',
  'webglGetUniformLocation',
  'webglPrepareUniformLocationsBeforeFirstUse',
  'webglGetLeftBracePos',
  'registerWebGlEventCallback',
  'AL',
  'GLUT',
  'EGL',
  'GLEW',
  'IDBStore',
  'SDL',
  'SDL_gfx',
  'webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance',
  'webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance',
  'allocateUTF8',
  'allocateUTF8OnStack',
  'print',
  'printErr',
];
unexportedSymbols.forEach(unexportedRuntimeSymbol);



var calledRun;
var calledPrerun;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!calledRun) run();
  if (!calledRun) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
};

function callMain(args = []) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])');
  assert(calledPrerun, 'cannot call main without calling preRun first');

  var entryFunction = _main;

  args.unshift(thisProgram);

  var argc = args.length;
  var argv = stackAlloc((argc + 1) * 4);
  var argv_ptr = argv;
  args.forEach((arg) => {
    HEAPU32[((argv_ptr)>>2)] = stringToUTF8OnStack(arg);
    argv_ptr += 4;
  });
  HEAPU32[((argv_ptr)>>2)] = 0;

  try {

    var ret = entryFunction(argc, argv);

    // if we're not running an evented main loop, it's time to exit
    exitJS(ret, /* implicit = */ true);
    return ret;
  }
  catch (e) {
    return handleException(e);
  }
}

function stackCheckInit() {
  // This is normally called automatically during __wasm_call_ctors but need to
  // get these values before even running any of the ctors so we call it redundantly
  // here.
  _emscripten_stack_init();
  // TODO(sbc): Move writeStackCookie to native to to avoid this.
  writeStackCookie();
}

function run(args = arguments_) {

  if (runDependencies > 0) {
    return;
  }

  stackCheckInit();

  if (!calledPrerun) {
    calledPrerun = 1;
    preRun();

    // a preRun added a dependency, run will be called later
    if (runDependencies > 0) {
      return;
    }
  }

  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    if (calledRun) return;
    calledRun = 1;
    Module['calledRun'] = 1;

    if (ABORT) return;

    initRuntime();

    preMain();

    readyPromiseResolve(Module);
    Module['onRuntimeInitialized']?.();

    if (shouldRunNow) callMain(args);

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(() => {
      setTimeout(() => Module['setStatus'](''), 1);
      doRun();
    }, 1);
  } else
  {
    doRun();
  }
  checkStackCookie();
}

function checkUnflushedContent() {
  // Compiler settings do not allow exiting the runtime, so flushing
  // the streams is not possible. but in ASSERTIONS mode we check
  // if there was something to flush, and if so tell the user they
  // should request that the runtime be exitable.
  // Normally we would not even include flush() at all, but in ASSERTIONS
  // builds we do so just for this check, and here we see if there is any
  // content to flush, that is, we check if there would have been
  // something a non-ASSERTIONS build would have not seen.
  // How we flush the streams depends on whether we are in SYSCALLS_REQUIRE_FILESYSTEM=0
  // mode (which has its own special function for this; otherwise, all
  // the code is inside libc)
  var oldOut = out;
  var oldErr = err;
  var has = false;
  out = err = (x) => {
    has = true;
  }
  try { // it doesn't matter if it fails
    flush_NO_FILESYSTEM();
  } catch(e) {}
  out = oldOut;
  err = oldErr;
  if (has) {
    warnOnce('stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the Emscripten FAQ), or make sure to emit a newline when you printf etc.');
    warnOnce('(this may also be due to not including full filesystem support - try building with -sFORCE_FILESYSTEM)');
  }
}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;

if (Module['noInitialRun']) shouldRunNow = false;

run();

// end include: postamble.js

// include: postamble_modularize.js
// In MODULARIZE mode we wrap the generated code in a factory function
// and return either the Module itself, or a promise of the module.
//
// We assign to the `moduleRtn` global here and configure closure to see
// this as and extern so it won't get minified.

moduleRtn = readyPromise;

// Assertion for attempting to access module properties on the incoming
// moduleArg.  In the past we used this object as the prototype of the module
// and assigned properties to it, but now we return a distinct object.  This
// keeps the instance private until it is ready (i.e the promise has been
// resolved).
for (const prop of Object.keys(Module)) {
  if (!(prop in moduleArg)) {
    Object.defineProperty(moduleArg, prop, {
      configurable: true,
      get() {
        abort(`Access to module property ('${prop}') is no longer possible via the module constructor argument; Instead, use the result of the module constructor.`)
      }
    });
  }
}
// end include: postamble_modularize.js



  return moduleRtn;
}
);
})();
export default Module;
