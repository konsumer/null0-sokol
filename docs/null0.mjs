
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
    var f = 'data:application/octet-stream;base64,AGFzbQEAAAABvAIuYAF/AGABfwF/YAAAYAJ/fwBgAn9/AX9gAAF/YAN/f38AYAN/f38Bf2AEf39/fwBgBX9/f39/AX9gBX9/f39/AGAEfX19fQBgAn19AGADfX19AGADf35/AX5gBH9/f38Bf2AHf39/f39/fwBgAn98AGABfQF9YAABfGAGf39/f39/AGAIf39/f39/f38AYAl/f39/f39/f38AYAp/f39/f39/f39/AGABfQBgBn19fX19fQBgB39/f39/f38Bf2ABfAF9YAJ8fwF8YAZ/fH9/f38Bf2ACfn8Bf2AEf35+fwBgA39/fQBgBH9/fX8AYAJ+fgF/YAJ+fgF+YAZ/f39/f38Bf2ACfH8Bf2ABfwF8YAJ9fwF/YAF8AXxgA35/fwF/YAF8AX5gAn5+AXxgBH9/fn8BfmAEf35/fwF/ApAgkQEDZW52GV93YXNtX2hvc3RfY29weV9mcm9tX2NhcnQABgNlbnYLY2FydF9zdHJsZW4AAQNlbnYMY29weV90b19jYXJ0AAQDZW52BGV4aXQAAANlbnYQd2FzbV9ob3N0X3VwZGF0ZQACA2Vudg1fX2Fzc2VydF9mYWlsAAgDZW52DHNhcHBfanNfaW5pdAAAA2Vudh9lbXNjcmlwdGVuX2dldF9lbGVtZW50X2Nzc19zaXplAAcDZW52KGVtc2NyaXB0ZW5fc2V0X3Jlc2l6ZV9jYWxsYmFja19vbl90aHJlYWQACQNlbnYhZW1zY3JpcHRlbl9nZXRfZGV2aWNlX3BpeGVsX3JhdGlvABMDZW52ImVtc2NyaXB0ZW5fc2V0X2NhbnZhc19lbGVtZW50X3NpemUABwNlbnYYZW1zY3JpcHRlbl9zZXRfbWFpbl9sb29wAAYDZW52J2Vtc2NyaXB0ZW5fcmVxdWVzdF9hbmltYXRpb25fZnJhbWVfbG9vcAADA2VudhVzYXBwX2pzX2NsZWFyX2Zhdmljb24AAgNlbnYTc2FwcF9qc19zZXRfZmF2aWNvbgAGA2VudgtzbG9nX2pzX2xvZwADA2VudgpnbEdldEVycm9yAAUDZW52EWdsR2VuVmVydGV4QXJyYXlzAAMDZW52EWdsQmluZFZlcnRleEFycmF5AAADZW52DWdsUGl4ZWxTdG9yZWkAAwNlbnYNZ2xHZXRJbnRlZ2VydgADA2VudgxnbEdldFN0cmluZ2kABANlbnYaZ2xEaXNhYmxlVmVydGV4QXR0cmliQXJyYXkAAANlbnYIZ2xFbmFibGUAAANlbnYLZ2xEZXB0aEZ1bmMAAANlbnYLZ2xEZXB0aE1hc2sAAANlbnYJZ2xEaXNhYmxlAAADZW52DWdsU3RlbmNpbEZ1bmMABgNlbnYLZ2xTdGVuY2lsT3AABgNlbnYNZ2xTdGVuY2lsTWFzawAAA2VudhNnbEJsZW5kRnVuY1NlcGFyYXRlAAgDZW52F2dsQmxlbmRFcXVhdGlvblNlcGFyYXRlAAMDZW52DGdsQmxlbmRDb2xvcgALA2VudgtnbENvbG9yTWFzawAIA2Vudg9nbFBvbHlnb25PZmZzZXQADANlbnYLZ2xGcm9udEZhY2UAAANlbnYKZ2xDdWxsRmFjZQAAA2VudgxnbEJpbmRCdWZmZXIAAwNlbnYQZ2xCaW5kQnVmZmVyQmFzZQAGA2Vudg9nbEFjdGl2ZVRleHR1cmUAAANlbnYNZ2xCaW5kVGV4dHVyZQADA2Vudg1nbEJpbmRTYW1wbGVyAAMDZW52D2dsRGVsZXRlQnVmZmVycwADA2VudhBnbERlbGV0ZVRleHR1cmVzAAMDZW52FWdsRGVsZXRlUmVuZGVyYnVmZmVycwADA2VudhBnbERlbGV0ZVNhbXBsZXJzAAMDZW52D2dsRGVsZXRlUHJvZ3JhbQAAA2VudgxnbFVzZVByb2dyYW0AAANlbnYUZ2xEZWxldGVGcmFtZWJ1ZmZlcnMAAwNlbnYUZ2xEZWxldGVWZXJ0ZXhBcnJheXMAAwNlbnYMZ2xHZW5CdWZmZXJzAAMDZW52DGdsQnVmZmVyRGF0YQAIA2Vudg9nbEJ1ZmZlclN1YkRhdGEACANlbnYSZ2xHZW5SZW5kZXJidWZmZXJzAAMDZW52EmdsQmluZFJlbmRlcmJ1ZmZlcgADA2VudiBnbFJlbmRlcmJ1ZmZlclN0b3JhZ2VNdWx0aXNhbXBsZQAKA2Vudg1nbEdlblRleHR1cmVzAAMDZW52D2dsVGV4UGFyYW1ldGVyaQAGA2Vudg5nbFRleFN0b3JhZ2UyRAAKA2Vudg5nbFRleFN0b3JhZ2UzRAAUA2VudhZnbENvbXByZXNzZWRUZXhJbWFnZTJEABUDZW52DGdsVGV4SW1hZ2UyRAAWA2VudhZnbENvbXByZXNzZWRUZXhJbWFnZTNEABYDZW52DGdsVGV4SW1hZ2UzRAAXA2Vudg1nbEdlblNhbXBsZXJzAAMDZW52E2dsU2FtcGxlclBhcmFtZXRlcmkABgNlbnYTZ2xTYW1wbGVyUGFyYW1ldGVyZgAgA2Vudg9nbENyZWF0ZVByb2dyYW0ABQNlbnYOZ2xBdHRhY2hTaGFkZXIAAwNlbnYNZ2xMaW5rUHJvZ3JhbQAAA2Vudg5nbERlbGV0ZVNoYWRlcgAAA2Vudg5nbEdldFByb2dyYW1pdgAGA2VudhNnbEdldFByb2dyYW1JbmZvTG9nAAgDZW52FGdsR2V0VW5pZm9ybUxvY2F0aW9uAAQDZW52C2dsVW5pZm9ybTFpAAMDZW52DmdsQ3JlYXRlU2hhZGVyAAEDZW52DmdsU2hhZGVyU291cmNlAAgDZW52D2dsQ29tcGlsZVNoYWRlcgAAA2Vudg1nbEdldFNoYWRlcml2AAYDZW52EmdsR2V0U2hhZGVySW5mb0xvZwAIA2VudhNnbEdldEF0dHJpYkxvY2F0aW9uAAQDZW52EWdsQmluZEZyYW1lYnVmZmVyAAMDZW52CmdsVmlld3BvcnQACANlbnYJZ2xTY2lzc29yAAgDZW52D2dsQ2xlYXJCdWZmZXJmdgAGA2Vudg9nbENsZWFyQnVmZmVyZmkAIQNlbnYPZ2xDbGVhckJ1ZmZlcml2AAYDZW52FWdsU3RlbmNpbEZ1bmNTZXBhcmF0ZQAIA2VudhNnbFN0ZW5jaWxPcFNlcGFyYXRlAAgDZW52FWdsVmVydGV4QXR0cmliUG9pbnRlcgAUA2VudhVnbFZlcnRleEF0dHJpYkRpdmlzb3IAAwNlbnYZZ2xFbmFibGVWZXJ0ZXhBdHRyaWJBcnJheQAAA2VudgxnbFVuaWZvcm0xZnYABgNlbnYMZ2xVbmlmb3JtMmZ2AAYDZW52DGdsVW5pZm9ybTNmdgAGA2VudgxnbFVuaWZvcm00ZnYABgNlbnYMZ2xVbmlmb3JtMWl2AAYDZW52DGdsVW5pZm9ybTJpdgAGA2VudgxnbFVuaWZvcm0zaXYABgNlbnYMZ2xVbmlmb3JtNGl2AAYDZW52EmdsVW5pZm9ybU1hdHJpeDRmdgAIA2VudhdnbERyYXdFbGVtZW50c0luc3RhbmNlZAAKA2Vudg5nbERyYXdFbGVtZW50cwAIA2VudhVnbERyYXdBcnJheXNJbnN0YW5jZWQACANlbnYMZ2xEcmF3QXJyYXlzAAYDZW52DGdsUmVhZEJ1ZmZlcgAAA2VudhFnbEJsaXRGcmFtZWJ1ZmZlcgAXA2VudhdnbEludmFsaWRhdGVGcmFtZWJ1ZmZlcgAGA2Vudh9lbXNjcmlwdGVuX3dlYmdsX2NyZWF0ZV9jb250ZXh0AAQDZW52JWVtc2NyaXB0ZW5fd2ViZ2xfbWFrZV9jb250ZXh0X2N1cnJlbnQAAQNlbnYhZW1zY3JpcHRlbl93ZWJnbF9lbmFibGVfZXh0ZW5zaW9uAAQDZW52K2Vtc2NyaXB0ZW5fc2V0X21vdXNlZG93bl9jYWxsYmFja19vbl90aHJlYWQACQNlbnYpZW1zY3JpcHRlbl9zZXRfbW91c2V1cF9jYWxsYmFja19vbl90aHJlYWQACQNlbnYrZW1zY3JpcHRlbl9zZXRfbW91c2Vtb3ZlX2NhbGxiYWNrX29uX3RocmVhZAAJA2VudixlbXNjcmlwdGVuX3NldF9tb3VzZWVudGVyX2NhbGxiYWNrX29uX3RocmVhZAAJA2VudixlbXNjcmlwdGVuX3NldF9tb3VzZWxlYXZlX2NhbGxiYWNrX29uX3RocmVhZAAJA2VudidlbXNjcmlwdGVuX3NldF93aGVlbF9jYWxsYmFja19vbl90aHJlYWQACQNlbnYpZW1zY3JpcHRlbl9zZXRfa2V5ZG93bl9jYWxsYmFja19vbl90aHJlYWQACQNlbnYnZW1zY3JpcHRlbl9zZXRfa2V5dXBfY2FsbGJhY2tfb25fdGhyZWFkAAkDZW52KmVtc2NyaXB0ZW5fc2V0X2tleXByZXNzX2NhbGxiYWNrX29uX3RocmVhZAAJA2VudixlbXNjcmlwdGVuX3NldF90b3VjaHN0YXJ0X2NhbGxiYWNrX29uX3RocmVhZAAJA2VuditlbXNjcmlwdGVuX3NldF90b3VjaG1vdmVfY2FsbGJhY2tfb25fdGhyZWFkAAkDZW52KmVtc2NyaXB0ZW5fc2V0X3RvdWNoZW5kX2NhbGxiYWNrX29uX3RocmVhZAAJA2Vudi1lbXNjcmlwdGVuX3NldF90b3VjaGNhbmNlbF9jYWxsYmFja19vbl90aHJlYWQACQNlbnYzZW1zY3JpcHRlbl9zZXRfcG9pbnRlcmxvY2tjaGFuZ2VfY2FsbGJhY2tfb25fdGhyZWFkAAkDZW52MmVtc2NyaXB0ZW5fc2V0X3BvaW50ZXJsb2NrZXJyb3JfY2FsbGJhY2tfb25fdGhyZWFkAAkDZW52J2Vtc2NyaXB0ZW5fc2V0X2ZvY3VzX2NhbGxiYWNrX29uX3RocmVhZAAJA2VudiZlbXNjcmlwdGVuX3NldF9ibHVyX2NhbGxiYWNrX29uX3RocmVhZAAJA2VudiFzYXBwX2pzX2FkZF9iZWZvcmV1bmxvYWRfbGlzdGVuZXIAAgNlbnYec2FwcF9qc19hZGRfY2xpcGJvYXJkX2xpc3RlbmVyAAIDZW52H3NhcHBfanNfYWRkX2RyYWduZHJvcF9saXN0ZW5lcnMAAANlbnYyZW1zY3JpcHRlbl9zZXRfd2ViZ2xjb250ZXh0bG9zdF9jYWxsYmFja19vbl90aHJlYWQACQNlbnY2ZW1zY3JpcHRlbl9zZXRfd2ViZ2xjb250ZXh0cmVzdG9yZWRfY2FsbGJhY2tfb25fdGhyZWFkAAkDZW52GmVtc2NyaXB0ZW5fcGVyZm9ybWFuY2Vfbm93ABMDZW52G2Vtc2NyaXB0ZW5fY2FuY2VsX21haW5fbG9vcAACA2VudhtzYXBwX2pzX3JlcXVlc3RfcG9pbnRlcmxvY2sAAgNlbnYkc2FwcF9qc19yZW1vdmVfYmVmb3JldW5sb2FkX2xpc3RlbmVyAAIDZW52IXNhcHBfanNfcmVtb3ZlX2NsaXBib2FyZF9saXN0ZW5lcgACA2VudiJzYXBwX2pzX3JlbW92ZV9kcmFnbmRyb3BfbGlzdGVuZXJzAAADZW52CV9hYm9ydF9qcwACA2VudhVfZW1zY3JpcHRlbl9tZW1jcHlfanMABhZ3YXNpX3NuYXBzaG90X3ByZXZpZXcxCGZkX2Nsb3NlAAEWd2FzaV9zbmFwc2hvdF9wcmV2aWV3MQhmZF93cml0ZQAPA2VudhZlbXNjcmlwdGVuX3Jlc2l6ZV9oZWFwAAEWd2FzaV9zbmFwc2hvdF9wcmV2aWV3MQdmZF9zZWVrAAkDngScBAINDQEBAgQBAAUDAQAFAgICDBgNDAsAAgsCAwAACAIIAgICAwwDCwMDGQMDCwYGDQ0GAgICAAMDAwAAAwEAAgACAgAAAAAAAAACAAAFBQEBBwQPBAgFAQcFBQUFBAAEAQMABAAEBAAEBAAEBAAEBAQDAwEDBAMDAQMEAwMBAwQDAwEDBAMDAQEDBwQAAAAAAAAAAAAAAQEBAQEBAQEBAQAAAAAAAAMBAAMCBAQBBQAKCgoKCgoAAQAAAAEBAQYHBgYGBgYCAgICAgICAgQiBAYjBgEQAAABAgUEARoFBQMDBgIGAgYCAgICDBgNDAsAAgMCAAILAgMAAAgBBQIIAgICAQokBQUGAwYMAwsDAxkDAwgLBgMGAAcFAAEDBQACAwEIBhUEAAAHAgIAAiUFBQUFBQIBBAMBAQ8FBQUFBQUFBQUFBQUFBQAAEAcHAgIABgACAgICAgIAAAAAAAAAAAAABAAAAAAAAAADAAAABAEBAAMAAQEEAQEBAQAIAQEABAQBAQEHBwQEAwQBBwEBAQEBBAQBAQEBAQEGBAMABwcHBwcHBwcHEQICAgIBAAAAAQIBAQEBARECAgABJhEBAQACGxsJJxIHBwcoBwUAAAcEAQAFAgEHDwQEARIcEgEBBw4OAQ4EAQcHBAQHBAQEBAQEBRwJGgYBCCkeHgoHHQMqAQUFBQIHBAUBAQcAHx8rAAUCBQUFAQABBSwJLQQFAXABGBgFBgEB7gXuBQbGAR1/AUGAgAQLfwFBAAt/AUEAC38BQQALfwBBuO8HC38AQZHwBwt/AEGA8gcLfwBBq/QHC38AQb2jCAt/AEGz9gcLfwBBkvgHC38AQef4Bwt/AEHr+gcLfwBBsvsHC38AQZn/Bwt/AEGDiQgLfwBBwooIC38AQZyQCAt/AEGjkwgLfwBBmZYIC38AQaqXCAt/AEH2lwgLfwBB7JwIC38AQeSdCAt/AEHToQgLfwBBuO8HC38AQb2jCAt/AEG9owgLfwBB4aMICwe0D1YGbWVtb3J5AgARX193YXNtX2NhbGxfY3RvcnMAkQEGbWFsbG9jAJoFDnRlc3Rfc3RyaW5nX2luAJkBD3Rlc3Rfc3RyaW5nX291dACaAQ10ZXN0X2J5dGVzX2luAJsBDnRlc3RfYnl0ZXNfb3V0AJwBDnRlc3Rfc3RydWN0X2luAJ0BD3Rlc3Rfc3RydWN0X291dACeAQ5wdXNoX3RyYW5zZm9ybQCfAQ1wb3BfdHJhbnNmb3JtAKABD3Jlc2V0X3RyYW5zZm9ybQChAQl0cmFuc2xhdGUAogEGcm90YXRlAKMBCXJvdGF0ZV9hdACkAQVzY2FsZQClAQhzY2FsZV9hdACmAQ5zZXRfYmxlbmRfbW9kZQCnARByZXNldF9ibGVuZF9tb2RlAKgBCXNldF9jb2xvcgCpAQtyZXNldF9jb2xvcgCqAQlzZXRfaW1hZ2UAqwELdW5zZXRfaW1hZ2UArAELcmVzZXRfaW1hZ2UArQEIdmlld3BvcnQArgEOcmVzZXRfdmlld3BvcnQArwEHc2Npc3NvcgCwAQ1yZXNldF9zY2lzc29yALEBC3Jlc2V0X3N0YXRlALIBBWNsZWFyALMBC2RyYXdfcG9pbnRzALQBCmRyYXdfcG9pbnQAtQEKZHJhd19saW5lcwC2AQlkcmF3X2xpbmUAtwEQZHJhd19saW5lc19zdHJpcAC4ARVkcmF3X2ZpbGxlZF90cmlhbmdsZXMAuQEUZHJhd19maWxsZWRfdHJpYW5nbGUAugEbZHJhd19maWxsZWRfdHJpYW5nbGVzX3N0cmlwALsBEWRyYXdfZmlsbGVkX3JlY3RzALwBEGRyYXdfZmlsbGVkX3JlY3QAvQETZHJhd190ZXh0dXJlZF9yZWN0cwC+ARJkcmF3X3RleHR1cmVkX3JlY3QAvwETZHJhd19vdXRsaW5lX2NpcmNsZQDAARJkcmF3X2ZpbGxlZF9jaXJjbGUAwQEZX19lbV9qc19fd2FzbV9ob3N0X3VwZGF0ZQMEIl9fZW1fanNfX193YXNtX2hvc3RfY29weV9mcm9tX2NhcnQDBRRfX2VtX2pzX19jYXJ0X3N0cmxlbgMGFV9fZW1fanNfX2NvcHlfdG9fY2FydAMHGV9faW5kaXJlY3RfZnVuY3Rpb25fdGFibGUBABJfc2FwcF9lbXNjX29ucGFzdGUApwMeX3NhcHBfaHRtbDVfZ2V0X2Fza19sZWF2ZV9zaXRlAK0DFV9zYXBwX2Vtc2NfYmVnaW5fZHJvcACuAw9fc2FwcF9lbXNjX2Ryb3AAsAMTX3NhcHBfZW1zY19lbmRfZHJvcACzAxpfc2FwcF9lbXNjX2ludm9rZV9mZXRjaF9jYgC0AxBfX21haW5fYXJnY19hcmd2ALUDF19fZW1fbGliX2RlcHNfc29rb2xfYXBwAwgqX19lbV9qc19fc2FwcF9qc19hZGRfYmVmb3JldW5sb2FkX2xpc3RlbmVyAwktX19lbV9qc19fc2FwcF9qc19yZW1vdmVfYmVmb3JldW5sb2FkX2xpc3RlbmVyAwonX19lbV9qc19fc2FwcF9qc19hZGRfY2xpcGJvYXJkX2xpc3RlbmVyAwsqX19lbV9qc19fc2FwcF9qc19yZW1vdmVfY2xpcGJvYXJkX2xpc3RlbmVyAwwgX19lbV9qc19fc2FwcF9qc193cml0ZV9jbGlwYm9hcmQDDShfX2VtX2pzX19zYXBwX2pzX2FkZF9kcmFnbmRyb3BfbGlzdGVuZXJzAw4iX19lbV9qc19fc2FwcF9qc19kcm9wcGVkX2ZpbGVfc2l6ZQMPI19fZW1fanNfX3NhcHBfanNfZmV0Y2hfZHJvcHBlZF9maWxlAxArX19lbV9qc19fc2FwcF9qc19yZW1vdmVfZHJhZ25kcm9wX2xpc3RlbmVycwMRFV9fZW1fanNfX3NhcHBfanNfaW5pdAMSJF9fZW1fanNfX3NhcHBfanNfcmVxdWVzdF9wb2ludGVybG9jawMTIV9fZW1fanNfX3NhcHBfanNfZXhpdF9wb2ludGVybG9jawMUG19fZW1fanNfX3NhcHBfanNfc2V0X2N1cnNvcgMVHl9fZW1fanNfX3NhcHBfanNfY2xlYXJfZmF2aWNvbgMWHF9fZW1fanNfX3NhcHBfanNfc2V0X2Zhdmljb24DFxRfX2VtX2pzX19zbG9nX2pzX2xvZwMYBmZmbHVzaACmBRVlbXNjcmlwdGVuX3N0YWNrX2luaXQAogUZZW1zY3JpcHRlbl9zdGFja19nZXRfZnJlZQCjBRllbXNjcmlwdGVuX3N0YWNrX2dldF9iYXNlAKQFGGVtc2NyaXB0ZW5fc3RhY2tfZ2V0X2VuZAClBRlfZW1zY3JpcHRlbl9zdGFja19yZXN0b3JlAKcFF19lbXNjcmlwdGVuX3N0YWNrX2FsbG9jAKgFHGVtc2NyaXB0ZW5fc3RhY2tfZ2V0X2N1cnJlbnQAqQUNX19zdGFydF9lbV9qcwMZDF9fc3RvcF9lbV9qcwMaE19fc3RhcnRfZW1fbGliX2RlcHMDGxJfX3N0b3BfZW1fbGliX2RlcHMDHAxkeW5DYWxsX2ppamkAqwUJNAEAQQELF8MBxAHFAdoDuAO8A70D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ALugENIEjCEEDAILIAC7IQUCQCACQX9KDQAgBUQYLURU+yH5P6AQ0wQhBAwCC0QYLURU+yH5PyAFoRDTBCEEDAELAkAgA0HV44iHBEsNAAJAIANB4Nu/hQRJDQBEGC1EVPshGUBEGC1EVPshGcAgAkEASBsgALugENIEIQQMAgsCQCACQX9KDQBE0iEzf3zZEsAgALuhENMEIQQMAgsgALtE0iEzf3zZEsCgENMEIQQMAQsCQCADQYCAgPwHSQ0AIAAgAJMhBAwBCyAAIAFBCGoQ1QQhAyABKwMIIQUCQAJAAkACQCADQQNxDgQAAQIDAAsgBRDSBCEEDAMLIAWaENMEIQQMAgsgBRDSBIwhBAwBCyAFENMEIQQLIAFBEGokACAEC5EEAQN/AkAgAkGABEkNACAAIAEgAhCMASAADwsgACACaiEDAkACQCABIABzQQNxDQACQAJAIABBA3ENACAAIQIMAQsCQCACDQAgACECDAELIAAhAgNAIAIgAS0AADoAACABQQFqIQEgAkEBaiICQQNxRQ0BIAIgA0kNAAsLIANBfHEhBAJAIANBwABJDQAgAiAEQUBqIgVLDQADQCACIAEoAgA2AgAgAiABKAIENgIEIAIgASgCCDYCCCACIAEoAgw2AgwgAiABKAIQNgIQIAIgASgCFDYCFCACIAEoAhg2AhggAiABKAIcNgIcIAIgASgCIDYCICACIAEoAiQ2AiQgAiABKAIoNgIoIAIgASgCLDYCLCACIAEoAjA2AjAgAiABKAI0NgI0IAIgASgCODYCOCACIAEoAjw2AjwgAUHAAGohASACQcAAaiICIAVNDQALCyACIARPDQEDQCACIAEoAgA2AgAgAUEEaiEBIAJBBGoiAiAESQ0ADAILAAsCQCADQQRPDQAgACECDAELAkAgACADQXxqIgRNDQAgACECDAELIAAhAgNAIAIgAS0AADoAACACIAEtAAE6AAEgAiABLQACOgACIAIgAS0AAzoAAyABQQRqIQEgAkEEaiICIARNDQALCwJAIAIgA08NAANAIAIgAS0AADoAACABQQFqIQEgAkEBaiICIANHDQALCyAAC/cCAQJ/AkAgACABRg0AAkAgASACIABqIgNrQQAgAkEBdGtLDQAgACABIAIQ1wQPCyABIABzQQNxIQQCQAJAAkAgACABTw0AAkAgBEUNACAAIQMMAwsCQCAAQQNxDQAgACEDDAILIAAhAwNAIAJFDQQgAyABLQAAOgAAIAFBAWohASACQX9qIQIgA0EBaiIDQQNxRQ0CDAALAAsCQCAEDQACQCADQQNxRQ0AA0AgAkUNBSAAIAJBf2oiAmoiAyABIAJqLQAAOgAAIANBA3ENAAsLIAJBA00NAANAIAAgAkF8aiICaiABIAJqKAIANgIAIAJBA0sNAAsLIAJFDQIDQCAAIAJBf2oiAmogASACai0AADoAACACDQAMAwsACyACQQNNDQADQCADIAEoAgA2AgAgAUEEaiEBIANBBGohAyACQXxqIgJBA0sNAAsLIAJFDQADQCADIAEtAAA6AAAgA0EBaiEDIAFBAWohASACQX9qIgINAAsLIAAL8gICA38BfgJAIAJFDQAgACABOgAAIAAgAmoiA0F/aiABOgAAIAJBA0kNACAAIAE6AAIgACABOgABIANBfWogAToAACADQX5qIAE6AAAgAkEHSQ0AIAAgAToAAyADQXxqIAE6AAAgAkEJSQ0AIABBACAAa0EDcSIEaiIDIAFB/wFxQYGChAhsIgE2AgAgAyACIARrQXxxIgRqIgJBfGogATYCACAEQQlJDQAgAyABNgIIIAMgATYCBCACQXhqIAE2AgAgAkF0aiABNgIAIARBGUkNACADIAE2AhggAyABNgIUIAMgATYCECADIAE2AgwgAkFwaiABNgIAIAJBbGogATYCACACQWhqIAE2AgAgAkFkaiABNgIAIAQgA0EEcUEYciIFayICQSBJDQAgAa1CgYCAgBB+IQYgAyAFaiEBA0AgASAGNwMYIAEgBjcDECABIAY3AwggASAGNwMAIAFBIGohASACQWBqIgJBH0sNAAsLIAALBQAgAJwLKAEBfyMAQRBrIgMkACADIAI2AgwgACABIAIQjQUhAiADQRBqJAAgAgsEAEEBCwIACwIAC4cBAQJ/AkACQAJAIAJBBEkNACABIAByQQNxDQEDQCAAKAIAIAEoAgBHDQIgAUEEaiEBIABBBGohACACQXxqIgJBA0sNAAsLIAJFDQELAkADQCAALQAAIgMgAS0AACIERw0BIAFBAWohASAAQQFqIQAgAkF/aiICRQ0CDAALAAsgAyAEaw8LQQALKgEBfyMAQRBrIgIkACACIAE2AgxBoO4HIAAgARCNBSEB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CyAAIAAoAiwiATYCHCAAIAE2AhQgACABIAAoAjBqNgIQIAIhAQwBC0EAIQEgAEEANgIcIABCADcDECAAIAAoAgBBIHI2AgAgB0ECRg0AIAIgBSgCBGshAQsgA0EgaiQAIAELOQEBfyMAQRBrIgMkACAAIAEgAkH/AXEgA0EIahCsBRCRBSECIAMpAwghASADQRBqJABCfyABIAIbCw4AIAAoAjwgASACEPEECwQAQQALBABCAAtZAQJ/IAEtAAAhAgJAIAAtAAAiA0UNACADIAJB/wFxRw0AA0AgAS0AASECIAAtAAEiA0UNASABQQFqIQEgAEEBaiEAIAMgAkH/AXFGDQALCyADIAJB/wFxawuIAQEDfyAAIQECQAJAIABBA3FFDQACQCAALQAADQAgACAAaw8LIAAhAQNAIAFBAWoiAUEDcUUNASABLQAADQAMAgsACwNAIAEiAkEEaiEBQYCChAggAigCACIDayADckGAgYKEeHFBgIGChHhGDQALA0AgAiIBQQFqIQIgAS0AAA0ACwsgASAAawuBAgEBfwJAAkACQAJAIAEgAHNBA3ENACACQQBHIQMCQCABQQNxRQ0AIAJFDQADQCAAIAEtAAAiAzoAACADRQ0FIABBAWohACACQX9qIgJBAEchAyABQQFqIgFBA3FFDQEgAg0ACwsgA0UNAiABLQAARQ0DIAJBBEkNAANAQYCChAggASgCACIDayADckGAgYKEeHFBgIGChHhHDQIgACADNgIAIABBBGohACABQQRqIQEgAkF8aiICQQNLDQALCyACRQ0BCwNAIAAgAS0AACIDOgAAIANFDQIgAEEBaiEAIAFBAWohASACQX9qIgINAAsLQQAhAgsgAEEAIAIQ2QQaIAALDgAgACABIAIQ9wQaIAAL+QEBA38CQAJAAkACQCABQf8BcSICRQ0AAkAgAEEDcUUNACABQf8BcSEDA0AgAC0AACIERQ0FIAQgA0YNBSAAQQFqIgBBA3ENAAsLQYCChAggACgCACIDayADckGAgYKEeHFBgIGChHhHDQEgAkGBgoQIbCECA0BBgIKECCADIAJzIgRrIARyQYCBgoR4cUGAgYKEeEcNAiAAKAIEIQMgAEEEaiIEIQAgA0GAgoQIIANrckGAgYKEeHFBgIGChHhGDQAMAwsACyAAIAAQ9gRqDwsgACEECwNA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IABCPIggB0IEhoRCgICAgICAgASEIQBC/w8hBwwBCwJAIANB/ocBTQ0AQv8PIQdCACEADAELAkBBgPgAQYH4ACAIUCIEGyIFIANrIgZB8ABMDQBCACEAQgAhBwwBCyACQRBqIAAgByAHQoCAgICAgMAAhCAEGyIHQYABIAZrEJ0FIAIgACAHIAYQngUgAikDACIHQjyIIAJBCGopAwBCBIaEIQACQAJAIAdC//////////8PgyAFIANHIAIpAxAgAkEQakEIaikDAIRCAFJxrYQiB0KBgICAgICAgAhUDQAgAEIBfCEADAELIAdCgICAgICAgIAIUg0AIABCAYMgAHwhAAsgAEKAgICAgICACIUgACAAQv////////8HViIDGyEAIAOtIQcLIAJBIGokACAHQjSGIAFCgICAgICAgICAf4OEIACEvwsGACAAJAELBAAjAQsSAEGAgAQkA0EAQQ9qQXBxJAILBwAjACMCawsEACMDCwQAIwILyAIBA38CQCAADQBBACEBAkBBACgCsO8HRQ0AQQAoArDvBxCmBSEBCwJAQQAoApjuB0UNAEEAKAKY7gcQpgUgAXIhAQsCQBDjBCgCACIARQ0AA0ACQAJAIAAoAkxBAE4NAEEBIQIMAQsgABDhBEUhAgsCQCAAKAIUIAAoAhxGDQAgABCmBSABciEBCwJAIAINACAAEOIECyAAKAI4IgANAAsLEOQEIAEPCwJAAkAgACgCTEEATg0AQQEhAgwBCyAAEOEERSECCwJAAkACQCAAKAIUIAAoAhxGDQAgAEEAQQAgACgCJBEHABogACgCFA0AQX8hASACRQ0BDAILAkAgACgCBCIBIAAoAggiA0YNACAAIAEgA2usQQEgACgCKBEOABoLQQAhASAAQQA2AhwgAEIANwMQIABCADcCBCACDQELIAAQ4gQLIAELBgAgACQACxIBAn8jACAAa0FwcSIBJAAgAQsEACMACw0AIAEgAiADIAARDgALJQEBfiAAIAEgAq0gA61CIIaEIAQQqgUhBSAFQiCIpxCgBSAFpwsUACAAIAGnIAFCIIinIAIgAxCQAQsLgqQEBABBgIAEC5DaA0FORFJPSURfTkFUSVZFX0FDVElWSVRZX09OTE9XTUVNT1JZOiBOYXRpdmVBY3Rpdml0eSBvbkxvd01lbW9yeQBfc2FwcF9zdHJjcHkAX3NnX3N0cmNweQBBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTkRFU1RST1k6IE5hdGl2ZUFjdGl2aXR5IG9uRGVzdHJveQBOdW1wYWRNdWx0aXBseQBfc2dfc2xvdF9pbmRleABwb29sLT5mcmVlX3F1ZXVlW2ldICE9IHNsb3RfaW5kZXgAKDApICE9IHNsb3RfaW5kZXgAYnVmLT5jbW4udXBkYXRlX2ZyYW1lX2luZGV4ICE9IF9zZy5mcmFtZV9pbmRleABfc2dfcG9vbF9mcmVlX2luZGV4AF9zZ19nbF9zdG9yYWdlYnVmZmVyX2JpbmRfaW5kZXgAX3NnX3Bvb2xfYWxsb2NfaW5kZXgAX3NnLmdsLmNhY2hlLmN1cl9waXBlbGluZS0+c2hhZGVyLT5jbW4uc3RhZ2Vbc3RhZ2VfaW5kZXhdLm51bV91bmlmb3JtX2Jsb2NrcyA+IHViX2luZGV4AC0rICAgMFgweAAtMFgrMFggMFgtMHgrMHggMHgAc2dfcXVlcnlfYnVmZmVyX292ZXJmbG93AFNHUCB2ZXJ0aWNlcyBidWZmZXIgb3ZlcmZsb3cAU0dQIHRyYW5zZm9ybSBzdGFjayBvdmVyZmxvdwBTR1Agc3RhdGUgc3RhY2sgb3ZlcmZsb3cAU0dQIHRyYW5zZm9ybSBzdGFjayB1bmRlcmZsb3cAU0dQIHN0YXRlIHN0YWNrIHVuZGVyZmxvdwBXSU4zMl9DUkVBVEVfSEVMUEVSX1dJTkRPV19GQUlMRUQ6IGZhaWxlZCB0byBjcmVhdGUgaGVscGVyIHdpbmRvdwBzYXBwX3dncHVfZ2V0X3JlbmRlcl92aWV3AHNhcHBfZDNkMTFfZ2V0X3JlbmRlcl92aWV3AHNhcHBfd2dwdV9nZXRfZGVwdGhfc3RlbmNpbF92aWV3AHNhcHBfZDNkMTFfZ2V0X2RlcHRoX3N0ZW5jaWxfdmlldwBzYXBwX3dncHVfZ2V0X3Jlc29sdmVfdmlldwBzYXBwX2QzZDExX2dldF9yZXNvbHZlX3ZpZXcAX3NnX2dsX2RyYXcAc2dfZHJhdwBzYXBwX2QzZDExX2dldF9kZXZpY2VfY29udGV4dABXSU4zMl9EVU1NWV9DT05URVhUX1NFVF9QSVhFTEZPUk1BVF9GQUlMRUQ6IGZhaWxlZCB0byBzZXQgcGl4ZWwgZm9ybWF0IGZvciBkdW1teSBHTCBjb250ZXh0AFdJTjMyX0NSRUFURV9EVU1NWV9DT05URVhUX0ZBSUxFRDogZmFpbGVkIHRvIGNyZWF0ZSBkdW1teSBHTCBjb250ZXh0AF9zYXBwX3RpbWluZ19wdXQAVkFMSURBVEVfU0hBREVSREVTQ19VQl9TVEQxNDBfQVJSQVlfVFlQRTogdW5pZm9ybSBhcnJheXMgb25seSBhbGxvd2VkIGZvciBGTE9BVDQsIElOVDQsIE1BVDQgaW4gc3RkMTQwIGxheW91dABkc3QAc2dfYXBwbHlfdmlld3BvcnQAc2dwX3Jlc2V0X3ZpZXdwb3J0AHNncF92aWV3cG9ydABJbnNlcnQAX3NnX3Jlc2V0X3Nsb3QAVkFMSURBVEVfQVVCX05PX1VCX0FUX1NMT1Q6IHNnX2FwcGx5X3VuaWZvcm1zOiBubyB1bmlmb3JtIGJsb2NrIGRlY2xhcmF0aW9uIGF0IHRoaXMgc2hhZGVyIHN0YWdlIFVCIHNsb3QAX3NncF9nZXRfcGlwZWxpbmVfdW5pZm9ybV9jb3VudABWQUxJREFURV9BUElQX1NBTVBMRV9DT1VOVDogc2dfYXBwbHlfcGlwZWxpbmU6IHBpcGVsaW5lIE1TQUEgc2FtcGxlIGNvdW50IGRvZXNuJ3QgbWF0Y2ggcmVuZGVyIHBhc3MgYXR0YWNobWVudCBzYW1wbGUgY291bnQAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0RFUFRIX0lNQUdFX1NBTVBMRV9DT1VOVDogcGFzcyBkZXB0aCBhdHRhY2htZW50IHNhbXBsZSBjb3VudCBtdXN0IG1hdGNoIGNvbG9yIGF0dGFjaG1lbnQgc2FtcGxlIGNvdW50AFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19JTUFHRV9TQU1QTEVfQ09VTlRTOiBhbGwgcGFzcyBhdHRhY2htZW50cyBtdXN0IGhhdmUgdGhlIHNhbWUgc2FtcGxlIGNvdW50AFdJTjMyX0RVTU1ZX0NPTlRFWFRfTUFLRV9DVVJSRU5UX0ZBSUxFRDogZmFpbGVkIHRvIG1ha2UgZHVtbXkgR0wgY29udGV4dCBjdXJyZW50AF9zZ191bmlmb3JtX2FsaWdubWVudABfc2dfc2hhZGVyX2NvbW1vbl9pbml0AF9zZ19waXBlbGluZV9jb21tb25faW5pdABzZ19jb21taXQAQXJyb3dSaWdodABBbHRSaWdodABTaGlmdFJpZ2h0AEJyYWNrZXRSaWdodABDb250cm9sUmlnaHQATWV0YVJpZ2h0AEFycm93TGVmdABBbHRMZWZ0AFNoaWZ0TGVmdABCcmFja2V0TGVmdABDb250cm9sTGVmdABNZXRhTGVmdABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0VYUEVDVF9DT0xPUkZPUk1BVF9OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLmNvbG9yX2Zvcm1hdCB0byBiZSB1bnNldABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0VYUEVDVF9ERVBUSEZPUk1BVF9OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLmRlcHRoX2Zvcm1hdCB0byBiZSB1bnNldAB1Yl9kZXNjLT5zaXplID09IChzaXplX3QpY3VyX3VuaWZvcm1fb2Zmc2V0AF9zZ19nbF9idWZmZXJfdGFyZ2V0AF9zZ19nbF90ZXh0dXJlX3RhcmdldABfc2dfZ2xfY3ViZWZhY2VfdGFyZ2V0AHNnX2FwcGx5X3NjaXNzb3JfcmVjdABzZ3BfZHJhd190ZXh0dXJlZF9yZWN0AHNncF9kcmF3X2ZpbGxlZF9yZWN0AHNncF9yZXNldF9wcm9qZWN0AFdJTjMyX0QzRDExX0dFVF9JRFhHSUZBQ1RPUllfRkFJTEVEOiBjb3VsZCBub3Qgb2J0YWluIElEWEdJRmFjdG9yeSBvYmplY3QAV0lOMzJfRDNEMTFfR0VUX0lEWEdJQURBUFRFUl9GQUlMRUQ6IGNvdWxkIG5vdCBvYnRhaW4gSURYR0lBZGFwdGVyIG9iamVjdABXR1BVX1NXQVBDSEFJTl9DUkVBVEVfU1dBUENIQUlOX0ZBSUxFRDogd2dwdTogZmFpbGVkIHRvIGNyZWF0ZSBzd2FwY2hhaW4gb2JqZWN0AE51bXBhZFN1YnRyYWN0AF9jb2xvcl9idWZmZXJfZmxvYXQAX2NvbG9yX2J1ZmZlcl9oYWxmX2Zsb2F0AF9zZ19nbF90ZXhpbWFnZV9pbnRlcm5hbF9mb3JtYXQAX3NnX2lzX3ZhbGlkX3JlbmRlcnRhcmdldF9kZXB0aF9mb3JtYXQAX3NnX2dsX3N1cHBvcnRlZF90ZXh0dXJlX2Zvcm1hdABfc2dfZ2xfdGV4aW1hZ2VfZm9ybWF0AFZBTElEQVRFX0FQSVBfQ09MT1JfRk9STUFUOiBzZ19hcHBseV9waXBlbGluZTogcGlwZWxpbmUgY29sb3IgYXR0YWNobWVudCBwaXhlbCBmb3JtYXQgZG9lc24ndCBtYXRjaCBwYXNzIGNvbG9yIGF0dGFjaG1lbnQgcGl4ZWwgZm9ybWF0AFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19SRVNPTFZFX0lNQUdFX0ZPUk1BVDogcGFzcyByZXNvbHZlIGF0dGFjaG1lbnQgcGl4ZWwgZm9ybWF0IG11c3QgbWF0Y2ggY29sb3IgYXR0YWNobWVudCBwaXhlbCBmb3JtYXQAVkFMSURBVEVfQVBJUF9ERVBUSF9GT1JNQVQ6IHNnX2FwcGx5X3BpcGVsaW5lOiBwaXBlbGluZSBkZXB0aCBwaXhlbF9mb3JtYXQgZG9lc24ndCBtYXRjaCBwYXNzIGRlcHRoIGF0dGFjaG1lbnQgcGl4ZWwgZm9ybWF0AFZBTElEQVRFX0lNQUdFREVTQ19OT19NU0FBX1JUX1NVUFBPUlQ6IE1TQUEgbm90IHN1cHBvcnRlZCBmb3IgdGhpcyBwaXhlbCBmb3JtYXQAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0NPTE9SX0lOVl9QSVhFTEZPUk1BVDogcGFzcyBjb2xvci1hdHRhY2htZW50IGltYWdlcyBtdXN0IGJlIHJlbmRlcmFibGUgY29sb3IgcGl4ZWwgZm9ybWF0AFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19ERVBUSF9JTlZfUElYRUxGT1JNQVQ6IHBhc3MgZGVwdGgtYXR0YWNobWVudCBpbWFnZSBtdXN0IGJlIGRlcHRoIG9yIGRlcHRoLXN0ZW5jaWwgcGl4ZWwgZm9ybWF0AFdJTjMyX1dHTF9TRVRfUElYRUxGT1JNQVRfRkFJTEVEOiBmYWlsZWQgdG8gc2V0IHNlbGVjdGVkIHBpeGVsIGZvcm1hdABXSU4zMl9XR0xfRklORF9QSVhFTEZPUk1BVF9GQUlMRUQ6IGZhaWxlZCB0byBmaW5kIG1hdGNoaW5nIFdHTCBwaXhlbCBmb3JtYXQAVkFMSURBVEVfSU1BR0VERVNDX0RFUFRIXzNEX0lNQUdFOiAzRCBpbWFnZXMgY2Fubm90IGhhdmUgYSBkZXB0aC9zdGVuY2lsIGltYWdlIGZvcm1hdABfc2dfYXR0YWNobWVudHNfYXQAX3NnX3NhbXBsZXJfYXQAX3NnX2J1ZmZlcl9hdABfc2dfc2hhZGVyX2F0AHNncF9yb3RhdGVfYXQAX3NnX3BpcGVsaW5lX2F0AHNncF9zY2FsZV9hdABfc2dfaW1hZ2VfYXQAVkFMSURBVEVfUElQRUxJTkVERVNDX05PX0NPTlRfQVRUUlM6IHNnX3BpcGVsaW5lX2Rlc2MubGF5b3V0LmF0dHJzIGlzIG5vdCBjb250aW51b3VzAE1pbnVzAFZBTElEQVRFX0FCTkRfVkJTOiBzZ19hcHBseV9iaW5kaW5nczogbnVtYmVyIG9mIHZlcnRleCBidWZmZXJzIGRvZXNuJ3QgbWF0Y2ggbnVtYmVyIG9mIHBpcGVsaW5lIHZlcnRleCBsYXlvdXRzAGF0dHMAQkVHSU5QQVNTX0FUVEFDSE1FTlRfSU5WQUxJRDogc2dfYmVnaW5fcGFzczogYW4gYXR0YWNobWVudCB3YXMgcHJvdmlkZWQgdGhhdCBubyBsb25nZXIgZXhpc3RzAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19OT19DT05UX0NPTE9SX0FUVFM6IGNvbG9yIGF0dGFjaG1lbnRzIG11c3Qgb2NjdXB5IGNvbnRpbnVvdXMgc2xvdHMAVkFMSURBVEVfU0hBREVSREVTQ19OT19DT05UX1VCX01FTUJFUlM6IHVuaWZvcm0gYmxvY2sgbWVtYmVycyBtdXN0IG9jY3VweSBjb250aW51b3VzIHNsb3RzAFZBTElEQVRFX1NIQURFUkRFU0NfTk9fQ09OVF9VQlM6IHNoYWRlciB1bmlmb3JtIGJsb2NrcyBtdXN0IG9jY3VweSBjb250aW51b3VzIHNsb3RzAExJTlVYX0dMWF9MT0FEX0VOVFJZX1BPSU5UU19GQUlMRUQ6IGZhaWxlZCB0byBsb2FkIEdMWCBlbnRyeSBwb2ludHMAX3NnX2xvb2t1cF9hdHRhY2htZW50cwBfc2dfZ2xfZGlzY2FyZF9hdHRhY2htZW50cwBWQUxJREFURV9BUElQX0FUVF9DT1VOVDogc2dfYXBwbHlfcGlwZWxpbmU6IG51bWJlciBvZiBwaXBlbGluZSBjb2xvciBhdHRhY2htZW50cyBkb2Vzbid0IG1hdGNoIG51bWJlciBvZiBwYXNzIGNvbG9yIGF0dGFjaG1lbnRzAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19OT19BVFRBQ0hNRU5UUzogc2dfYXR0YWNobWVudHNfZGVzYyBubyBjb2xvciBvciBkZXB0aC1zdGVuY2lsIGF0dGFjaG1lbnRzAFdHUFVfQVRUQUNITUVOVFNfQ1JFQVRFX1RFWFRVUkVfVklFV19GQUlMRUQ6IHdncHVUZXh0dXJlQ3JlYXRlVmlldygpIGZhaWxlZCBpbiBjcmVhdGUgYXR0YWNobWVudHMAX3NnX3Bhc3NfYWN0aW9uX2RlZmF1bHRzAF9zYXBwX2Rlc2NfZGVmYXVsdHMAX3NnX3BpcGVsaW5lX2Rlc2NfZGVmYXVsdHMAX3NnX2dsX2luaXRfbGltaXRzAHNncF9kcmF3X3RleHR1cmVkX3JlY3RzAHNncF9kcmF3X2ZpbGxlZF9yZWN0cwBfc2dfZ2xfYmVnaW5fcGFzcwBzZ19iZWdpbl9wYXNzACFfc2cuY3VyX3Bhc3MuaW5fcGFzcwBfc2dfZ2xfZW5kX3Bhc3MAc2dfZW5kX3Bhc3MAYXR0cl9sb2MgPCAoR0xpbnQpX3NnLmxpbWl0cy5tYXhfdmVydGV4X2F0dHJzAHBvb2wgJiYgcG9vbC0+Z2VuX2N0cnMAVkFMSURBVEVfQUJORF9WU19FWFBFQ1RFRF9OT05GSUxURVJJTkdfU0FNUExFUjogc2dfYXBwbHlfYmluZGluZ3M6IHNoYWRlciBleHBlY3RlZCBTR19TQU1QTEVSVFlQRV9OT05GSUxURVJJTkcgb24gdmVydGV4IHN0YWdlLCBidXQgc2FtcGxlciBoYXMgU0dfRklMVEVSX0xJTkVBUiBmaWx0ZXJzAFZBTElEQVRFX0FCTkRfRlNfRVhQRUNURURfTk9ORklMVEVSSU5HX1NBTVBMRVI6IHNnX2FwcGx5X2JpbmRpbmdzOiBzaGFkZXIgZXhwZWN0ZWQgU0dfU0FNUExFUlRZUEVfTk9ORklMVEVSSU5HIG9uIGZyYWdtZW50IHN0YWdlLCBidXQgc2FtcGxlciBoYXMgU0dfRklMVEVSX0xJTkVBUiBmaWx0ZXJzAF9zZ19ub3RpZnlfY29tbWl0X2xpc3RlbmVycwBfc2dfc2V0dXBfY29tbWl0X2xpc3RlbmVycwBfc2dfZGlzY2FyZF9jb21taXRfbGlzdGVuZXJzAG51bV9zbXBzID09IHN0YWdlLT5udW1fc2FtcGxlcnMAU0dQIGZhaWxlZCB0byBhbGxvY2F0ZSBidWZmZXJzAHNtcF9pbmRleCA8IG51bV9zbXBzAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19NSVBMRVZFTDogcGFzcyBhdHRhY2htZW50IG1pcCBsZXZlbCBpcyBiaWdnZXIgdGhhbiBpbWFnZSBoYXMgbWlwbWFwcwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfREVQVEhfTUlQTEVWRUw6IHBhc3MgZGVwdGggYXR0YWNobWVudCBtaXAgbGV2ZWwgaXMgYmlnZ2VyIHRoYW4gaW1hZ2UgaGFzIG1pcG1hcHMAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfTUlQTEVWRUw6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50IG1pcCBsZXZlbCBpcyBiaWdnZXIgdGhhbiBpbWFnZSBoYXMgbWlwbWFwcwBWQUxJREFURV9TSEFERVJERVNDX05PX1VCX01FTUJFUlM6IEdMIGJhY2tlbmQgcmVxdWlyZXMgdW5pZm9ybSBibG9jayBtZW1iZXIgZGVjbGFyYXRpb25zAF9zZ19nbF9hcHBseV91bmlmb3JtcwBzZ19hcHBseV91bmlmb3JtcwBfc2dfdmFsaWRhdGVfYXBwbHlfdW5pZm9ybXMAMCA9PSBfc2cuY29tbWl0X2xpc3RlbmVycy5pdGVtcwAwICE9IF9zZy5jb21taXRfbGlzdGVuZXJzLml0ZW1zAF9zZ19zZXR1cF9wb29scwBfc2dfZGlzY2FyZF9wb29scwAwID09IF9zYXBwLmRlZmF1bHRfaWNvbl9waXhlbHMAMCAhPSBfc2FwcC5kZWZhdWx0X2ljb25fcGl4ZWxzAF9zZ19nbF9hcHBseV9iaW5kaW5ncwBzZ19hcHBseV9iaW5kaW5ncwBfc2dfdmFsaWRhdGVfYXBwbHlfYmluZGluZ3MAX3NnX2dsX2NhY2hlX2NsZWFyX3RleHR1cmVfc2FtcGxlcl9iaW5kaW5ncwBEUkFXX1dJVEhPVVRfQklORElOR1M6IGF0dGVtcHRpbmcgdG8gZHJhdyB3aXRob3V0IHJlc291cmNlIGJpbmRpbmdzAGltZ19pbmRleCA8IG51bV9pbWdzAExJTlVYX0dMWF9OT19HTFhGQkNPTkZJR1M6IGdsWEdldEZCQ29uZmlncygpIHJldHVybmVkIG5vIGNvbmZpZ3MATElOVVhfRUdMX05PX0NPTkZJR1M6IGVnbENob29zZUNvbmZpZygpIHJldHVybmVkIG5vIGNvbmZpZ3MAX3NhcHAuZHJvcC5udW1fZmlsZXMgPD0gX3NhcHAuZHJvcC5tYXhfZmlsZXMAbnVtX2ltZ3MgPT0gc3RhZ2UtPm51bV9pbWFnZXMAYXR0ci0+dmJfaW5kZXggPCBibmQtPm51bV92YnMAY2FudmFzAF9zYXBwX2Ryb3BwZWRfZmlsZV9wYXRoX3B0cgBidWYgJiYgZGF0YSAmJiBkYXRhLT5wdHIAZGVzYy0+ZGF0YS5wdHIAV0lOMzJfV0dMX0RFU0NSSUJFX1BJWEVMRk9STUFUX0ZBSUxFRDogZmFpbGVkIHRvIGdldCBwaXhlbCBmb3JtYXQgZGVzY3JpcHRvcgBfc2dfZ2xfYmxlbmRfZmFjdG9yAHNncF9yZXNldF9zY2lzc29yAHNncF9zY2lzc29yAF9zZ3Bfc2V0X2Vycm9yAE5vIGVycm9yAHNncF9yZXNldF9jb2xvcgBzZ3Bfc2V0X2NvbG9yAEVudGVyAF9zZ19nbF9taW5fZmlsdGVyADAgPT0gX3NnLmNvbW1pdF9saXN0ZW5lcnMudXBwZXIASURFTlRJQ0FMX0NPTU1JVF9MSVNURU5FUjogYXR0ZW1wdGluZyB0byBhZGQgaWRlbnRpY2FsIGNvbW1pdCBsaXN0ZW5lcgBzZ19kZXN0cm95X3NhbXBsZXIAX3NnX3VuaW5pdF9zYW1wbGVyAF9zZ19pbml0X3NhbXBsZXIAX3NnX2dsX2NyZWF0ZV9zYW1wbGVyAF9zZ19nbF9jYWNoZV9pbnZhbGlkYXRlX3RleHR1cmVfc2FtcGxlcgBfc2dfZ2xfY2FjaGVfYmluZF90ZXh0dXJlX3NhbXBsZXIAc2dfbWFrZV9zYW1wbGVyAF9zZ19nbF9kaXNjYXJkX3NhbXBsZXIAX3NnX2RlYWxsb2Nfc2FtcGxlcgBzZ3AtbmVhcmVzdC1zYW1wbGVyAFNHUCBmYWlsZWQgdG8gY3JlYXRlIG5lYXJlc3Qgc2FtcGxlcgBWQUxJREFURV9TSEFERVJERVNDX0NPTVBBUklTT05fU0FNUExFUl9SRVFVSVJFRDogc2hhZGVyIHN0YWdlOiBpbWFnZSBzYW1wbGUgdHlwZSBERVBUSCBjYW4gb25seSBiZSB1c2VkIHdpdGggQ09NUEFSSVNPTiBzYW1wbGVyAFZBTElEQVRFX1NIQURFUkRFU0NfTk9ORklMVEVSSU5HX1NBTVBMRVJfUkVRVUlSRUQ6IHNoYWRlciBzdGFnZTogaW1hZ2Ugc2FtcGxlIHR5cGUgVU5GSUxURVJBQkxFX0ZMT0FULCBVSU5ULCBTSU5UIGNhbiBvbmx5IGJlIHVzZWQgd2l0aCBOT05GSUxURVJJTkcgc2FtcGxlcgBzYXBwX2dsX2dldF9mcmFtZWJ1ZmZlcgBzZ19kZXN0cm95X2J1ZmZlcgBfc2dfdW5pbml0X2J1ZmZlcgBfc2dfaW5pdF9idWZmZXIAX3NhcHBfY2xlYXJfZHJvcF9idWZmZXIAX3NnX2dsX2NyZWF0ZV9idWZmZXIAc2dfbWFrZV9idWZmZXIAX3NnX2dsX2NhY2hlX2JpbmRfc3RvcmFnZV9idWZmZXIAX3NnX2dsX2Rpc2NhcmRfYnVmZmVyAF9zZ19nbF9jYWNoZV9iaW5kX2J1ZmZlcgBfc2dfZ2xfYXBwZW5kX2J1ZmZlcgBzZ19hcHBlbmRfYnVmZmVyAF9zZ192YWxpZGF0ZV9hcHBlbmRfYnVmZmVyAF9zZ19kZWFsbG9jX2J1ZmZlcgBfc2FwcC5kcm9wLmJ1ZmZlcgBfc2FwcC5jbGlwYm9hcmQuYnVmZmVyAFNHUCBmYWlsZWQgdG8gY3JlYXRlIHZlcnRleCBidWZmZXIAVkFMSURBVEVfQVBQRU5EQlVGX1VTQUdFOiBzZ19hcHBlbmRfYnVmZmVyOiBjYW5ub3QgYXBwZW5kIHRvIGltbXV0YWJsZSBidWZmZXIAVkFMSURBVEVfVVBEQVRFQlVGX1VTQUdFOiBzZ191cGRhdGVfYnVmZmVyOiBjYW5ub3QgdXBkYXRlIGltbXV0YWJsZSBidWZmZXIAVkFMSURBVEVfQUJORF9WU19TVE9SQUdFQlVGRkVSX0JJTkRJTkdfQlVGRkVSVFlQRTogc2dfYXBwbHlfYmluZGluZ3M6IGJ1ZmZlciBib3VuZCB0byB2ZXJ0ZXggc3RhZ2Ugc3RvcmFnZSBidWZmZXIgc2xvdCBpcyBub3Qgb2YgdHlwZSBzdG9yYWdlIGJ1ZmZlcgBWQUxJREFURV9BQk5EX0ZTX1NUT1JBR0VCVUZGRVJfQklORElOR19CVUZGRVJUWVBFOiBzZ19hcHBseV9iaW5kaW5nczogYnVmZmVyIGJvdW5kIHRvIGZyYWhtZW50IHN0YWdlIHN0b3JhZ2UgYnVmZmVyIHNsb3QgaXMgbm90IG9mIHR5cGUgc3RvcmFnZSBidWZmZXIAQ0xJUEJPQVJEX1NUUklOR19UT09fQklHOiBjbGlwYm9hcmQgc3RyaW5nIGRpZG4ndCBmaXQgaW50byBjbGlwYm9hcmQgYnVmZmVyAHNnX2Rlc3Ryb3lfc2hhZGVyAF9zZ191bmluaXRfc2hhZGVyAF9zZ19pbml0X3NoYWRlcgBfc2dfbG9va3VwX3NoYWRlcgBfc2dfZ2xfY3JlYXRlX3NoYWRlcgBfc2dfZ2xfY29tcGlsZV9zaGFkZXIAc2dfbWFrZV9zaGFkZXIAX3NnX2dsX2Rpc2NhcmRfc2hhZGVyAF9zZ19kZWFsbG9jX3NoYWRlcgBwaXAtPnNoYWRlcgBTR1AgZmFpbGVkIHRvIGNyZWF0ZSB0aGUgY29tbW9uIHNoYWRlcgBWQUxJREFURV9QSVBFTElORURFU0NfQVRUUl9TRU1BTlRJQ1M6IEQzRDExIG1pc3NpbmcgdmVydGV4IGF0dHJpYnV0ZSBzZW1hbnRpY3MgaW4gc2hhZGVyAF90ZXh0dXJlX2Zsb2F0X2xpbmVhcgBfc2FwcF9jbGVhcgBzZ3BfY2xlYXIAX3NnX2NsZWFyAHNncF9zZXR1cABzZ19zZXR1cABzYXBwAHNva29sX2FwcABfc2FwcF9lbXNjX2Ryb3AAX3NnX2dsX3N0ZW5jaWxfb3AAX3NnX2dsX2JsZW5kX29wAHNtcC0+Z2wuc21wAF9zZ3BfZHJhd19zb2xpZF9waXAAYm5kLT5waXAAX3NnX2dsX3dyYXAAQXJyb3dVcABQYWdlVXAAaW5mbwBWQUxJREFURV9BQk5EX1ZCX09WRVJGTE9XOiBzZ19hcHBseV9iaW5kaW5nczogYnVmZmVyIGluIHZlcnRleCBidWZmZXIgc2xvdCBpcyBvdmVyZmxvd24AVkFMSURBVEVfQUJORF9JQl9PVkVSRkxPVzogc2dfYXBwbHlfYmluZGluZ3M6IGJ1ZmZlciBpbiBpbmRleCBidWZmZXIgc2xvdCBpcyBvdmVyZmxvd24Ac2dwX3NodXRkb3duAEFycm93RG93bgBQYWdlRG93bgBXSU4zMl9XR0xfQ1JFQVRFX0NPTlRFWFRfQVRUUklCU19GQUlMRURfT1RIRVI6IENyZWF0ZUNvbnRleHRBdHRyaWJzQVJCIGZhaWxlZCBmb3Igb3RoZXIgcmVhc29uAFNlbWljb2xvbgBMSU5VWF9YMTFfRkFJTEVEX1RPX0JFQ09NRV9PV05FUl9PRl9DTElQQk9BUkQ6IFgxMTogRmFpbGVkIHRvIGJlY29tZSBvd25lciBvZiBjbGlwYm9hcmQgc2VsZWN0aW9uAGFjdGlvbgBMSU5VWF9HTFhfUVVFUllfVkVSU0lPTl9GQUlMRUQ6IGZhaWxlZCB0byBxdWVyeSBHTFggdmVyc2lvbgBfc2FwcF9zZXR1cF9kZWZhdWx0X2ljb24Ac2FwcF9zZXRfaWNvbgBfc2FwcF9lbXNjX3NldF9pY29uAHNncF9iZWdpbgBtYWluAFdHUFVfU1dBUENIQUlOX0NSRUFURV9ERVBUSF9TVEVOQ0lMX1RFWFRVUkVfRkFJTEVEOiB3Z3B1OiBmYWlsZWQgdG8gY3JlYXRlIGRlcHRoLXN0ZW5jaWwgdGV4dHVyZSBmb3Igc3dhcGNoYWluAFdHUFVfU1dBUENIQUlOX0NSRUFURV9NU0FBX1RFWFRVUkVfRkFJTEVEOiB3Z3B1OiBmYWlsZWQgdG8gY3JlYXRlIG1zYWEgdGV4dHVyZSBmb3Igc3dhcGNoYWluAFdHUFVfU1dBUENIQUlOX0NSRUFURV9TVVJGQUNFX0ZBSUxFRDogd2dwdTogZmFpbGVkIHRvIGNyZWF0ZSBzdXJmYWNlIGZvciBzd2FwY2hhaW4AUHJpbnRTY3JlZW4AbmFuADAgPT0gX3NnLmNvbW1pdF9saXN0ZW5lcnMubnVtAHNncF9yZXNldF90cmFuc2Zvcm0Ac2dwX3BvcF90cmFuc2Zvcm0Ac2dwX3B1c2hfdHJhbnNmb3JtAHNncF9yZXNldF91bmlmb3JtAHNncF9zZXRfdW5pZm9ybQBfc2dfaW5pdF9wb29sAF9zZ19kaXNjYXJkX3Bvb2wAQ09NTUlUX0xJU1RFTkVSX0FSUkFZX0ZVTEw6IGNvbW1pdCBsaXN0ZW5lciBhcnJheSBmdWxsAFNHUCB2ZXJ0aWNlcyBidWZmZXIgaXMgZnVsbABTR1AgdW5pZm9ybSBidWZmZXIgaXMgZnVsbABTR1AgY29tbWFuZCBidWZmZXIgaXMgZnVsbABXSU4zMl9MT0FEX09QRU5HTDMyX0RMTF9GQUlMRUQ6IGZhaWxlZCBsb2FkaW5nIG9wZW5nbDMyLmRsbABFcXVhbABOdW1wYWREZWNpbWFsAENhcHNMb2NrAE51bUxvY2sAU2Nyb2xsTG9jawBPSzogT2sAc2dwX2ZsdXNoAEJhY2tzbGFzaABTbGFzaAAvVXNlcnMva29uc3VtZXIvRGVza3RvcC9vdGhlcmRldi9udWxsMC1zb2tvbC93YnVpbGQvX2RlcHMvc29rb2wtc3JjL3Nva29sX2dmeC5oAC9Vc2Vycy9rb25zdW1lci9EZXNrdG9wL290aGVyZGV2L251bGwwLXNva29sL3didWlsZC9fZGVwcy9zb2tvbC1zcmMvc29rb2xfYXBwLmgAL1VzZXJzL2tvbnN1bWVyL0Rlc2t0b3Avb3RoZXJkZXYvbnVsbDAtc29rb2wvd2J1aWxkL19kZXBzL3Nva29sX2dwLXNyYy9zb2tvbF9ncC5oAEFORFJPSURfV1JJVEVfTVNHX0ZBSUxFRDogZmFpbGVkIHRvIHdyaXRlIG1lc3NhZ2UgaW4gX3NhcHBfYW5kcm9pZF9tc2cAIXNoZC0+Z2wucHJvZwBWQUxJREFURV9TSEFERVJERVNDX1VCX01FTUJFUl9OQU1FOiB1bmlmb3JtIGJsb2NrIG1lbWJlciBuYW1lIG1pc3NpbmcATElOVVhfR0xYX1JFUVVJUkVEX0VYVEVOU0lPTlNfTUlTU0lORzogR0xYIGV4dGVuc2lvbnMgQVJCX2NyZWF0ZV9jb250ZXh0IGFuZCBBUkJfY3JlYXRlX2NvbnRleHRfcHJvZmlsZSBtaXNzaW5nAHdhcm5pbmcAX3NnX2dsX2NhY2hlX3Jlc3RvcmVfdGV4dHVyZV9zYW1wbGVyX2JpbmRpbmcAX3NnX2dsX2NhY2hlX3N0b3JlX3RleHR1cmVfc2FtcGxlcl9iaW5kaW5nAF9zZ19nbF9jYWNoZV9yZXN0b3JlX2J1ZmZlcl9iaW5kaW5nAF9zZ19nbF9jYWNoZV9zdG9yZV9idWZmZXJfYmluZGluZwBpbWcATElOVVhfR0xYX05PX1NVSVRBQkxFX0dMWEZCQ09ORklHOiBmYWlsZWQgdG8gZmluZCBhIHN1aXRhYmxlIEdMWEZCQ29uZmlnAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19SRVNPTFZFX0xBWUVSOiBwYXNzIHJlc29sdmUgYXR0YWNobWVudCBpcyBhcnJheSB0ZXh0dXJlLCBidXQgbGF5ZXIgaW5kZXggaXMgdG9vIGJpZwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfTEFZRVI6IHBhc3MgYXR0YWNobWVudCBpbWFnZSBpcyBhcnJheSB0ZXh0dXJlLCBidXQgbGF5ZXIgaW5kZXggaXMgdG9vIGJpZwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfREVQVEhfTEFZRVI6IHBhc3MgZGVwdGggYXR0YWNobWVudCBpbWFnZSBpcyBhcnJheSB0ZXh0dXJlLCBidXQgbGF5ZXIgaW5kZXggaXMgdG9vIGJpZwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfUkVTT0xWRV9GQUNFOiBwYXNzIHJlc29sdmUgYXR0YWNobWVudCBpcyBjdWJlbWFwLCBidXQgZmFjZSBpbmRleCBpcyB0b28gYmlnAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19GQUNFOiBwYXNzIGF0dGFjaG1lbnQgaW1hZ2UgaXMgY3ViZW1hcCwgYnV0IGZhY2UgaW5kZXggaXMgdG9vIGJpZwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfREVQVEhfRkFDRTogcGFzcyBkZXB0aCBhdHRhY2htZW50IGltYWdlIGlzIGN1YmVtYXAsIGJ1dCBmYWNlIGluZGV4IGlzIHRvbyBiaWcAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfU0xJQ0U6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50IGlzIDNkIHRleHR1cmUsIGJ1dCBzbGljZSB2YWx1ZSBpcyB0b28gYmlnAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19TTElDRTogcGFzcyBhdHRhY2htZW50IGltYWdlIGlzIDNkIHRleHR1cmUsIGJ1dCBzbGljZSB2YWx1ZSBpcyB0b28gYmlnAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19ERVBUSF9TTElDRTogcGFzcyBkZXB0aCBhdHRhY2htZW50IGltYWdlIGlzIDNkIHRleHR1cmUsIGJ1dCBzbGljZSB2YWx1ZSBpcyB0b28gYmlnAGdsX2J1ZgBpbmYAX3NnX3ZlcnRleGZvcm1hdF9ieXRlc2l6ZQBfc2dfcGl4ZWxmb3JtYXRfYnl0ZXNpemUAX3NnX2dsX3ZlcnRleGZvcm1hdF9zaXplAF9zZ191bmlmb3JtX3NpemUAb2Zmc2V0IDwgX3NhcHAuZHJvcC5idWZfc2l6ZQBfc2dwX3F1ZXJ5X2ltYWdlX3NpemUAcG9vbC0+cXVldWVfdG9wIDwgcG9vbC0+c2l6ZQBfc2cuZ2wuY2FjaGUuY3VyX3BpcGVsaW5lLT5zaGFkZXItPmNtbi5zdGFnZVtzdGFnZV9pbmRleF0udW5pZm9ybV9ibG9ja3NbdWJfaW5kZXhdLnNpemUgPT0gZGF0YS0+c2l6ZQBWQUxJREFURV9VUERBVEVCVUZfU0laRTogc2dfdXBkYXRlX2J1ZmZlcjogdXBkYXRlIHNpemUgaXMgYmlnZ2VyIHRoYW4gYnVmZmVyIHNpemUAVkFMSURBVEVfQVBQRU5EQlVGX1NJWkU6IHNnX2FwcGVuZF9idWZmZXI6IG92ZXJhbGwgYXBwZW5kZWQgc2l6ZSBpcyBiaWdnZXIgdGhhbiBidWZmZXIgc2l6ZQBWQUxJREFURV9CVUZGRVJERVNDX0RBVEFfU0laRTogaW1tdXRhYmxlIGJ1ZmZlciBkYXRhIHNpemUgZGlmZmVycyBmcm9tIGJ1ZmZlciBzaXplAFZBTElEQVRFX1NIQURFUkRFU0NfVUJfU0laRV9NSVNNQVRDSDogc2l6ZSBvZiB1bmlmb3JtIGJsb2NrIG1lbWJlcnMgZG9lc24ndCBtYXRjaCB1bmlmb3JtIGJsb2NrIHNpemUAVkFMSURBVEVfQVVCX1NJWkU6IHNnX2FwcGx5X3VuaWZvcm1zOiBkYXRhIHNpemUgZG9lc24ndCBtYXRjaCBkZWNsYXJlZCB1bmlmb3JtIGJsb2NrIHNpemUAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0lNQUdFX1NJWkVTOiBhbGwgcGFzcyBhdHRhY2htZW50cyBtdXN0IGhhdmUgdGhlIHNhbWUgc2l6ZQBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfUkVTT0xWRV9JTUFHRV9TSVpFUzogcGFzcyByZXNvbHZlIGF0dGFjaG1lbnQgc2l6ZSBtdXN0IG1hdGNoIGNvbG9yIGF0dGFjaG1lbnQgaW1hZ2Ugc2l6ZQBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfREVQVEhfSU1BR0VfU0laRVM6IHBhc3MgZGVwdGggYXR0YWNobWVudCBpbWFnZSBzaXplIG11c3QgbWF0Y2ggY29sb3IgYXR0YWNobWVudCBpbWFnZSBzaXplAFZBTElEQVRFX0lNQUdFREFUQV9EQVRBX1NJWkU6IHNnX2ltYWdlX2RhdGE6IGRhdGEgc2l6ZSBkb2Vzbid0IG1hdGNoIGV4cGVjdGVkIHN1cmZhY2Ugc2l6ZQBWQUxJREFURV9CRUdJTlBBU1NfQVRUQUNITUVOVFNfRVhJU1RTOiBzZ19iZWdpbl9wYXNzOiBhdHRhY2htZW50cyBvYmplY3Qgbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FQSVBfU0hBREVSX0VYSVNUUzogc2dfYXBwbHlfcGlwZWxpbmU6IHNoYWRlciBvYmplY3Qgbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FCTkRfUElQRUxJTkVfRVhJU1RTOiBzZ19hcHBseV9iaW5kaW5nczogY3VycmVudGx5IGFwcGxpZWQgcGlwZWxpbmUgb2JqZWN0IG5vIGxvbmdlciBhbGl2ZQBWQUxJREFURV9BUElQX1BJUEVMSU5FX0VYSVNUUzogc2dfYXBwbHlfcGlwZWxpbmU6IHBpcGVsaW5lIG9iamVjdCBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQVBJUF9DVVJQQVNTX0FUVEFDSE1FTlRTX0VYSVNUUzogc2dfYXBwbHlfcGlwZWxpbmU6IGN1cnJlbnQgcGFzcyBhdHRhY2htZW50cyBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQUJORF9WQl9FWElTVFM6IHNnX2FwcGx5X2JpbmRpbmdzOiB2ZXJ0ZXggYnVmZmVyIG5vIGxvbmdlciBhbGl2ZQBWQUxJREFURV9BQk5EX0lCX0VYSVNUUzogc2dfYXBwbHlfYmluZGluZ3M6IGluZGV4IGJ1ZmZlciBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQUJORF9WU19TTVBfRVhJU1RTOiBzZ19hcHBseV9iaW5kaW5nczogc2FtcGxlciBib3VuZCB0byB2ZXJ0ZXggc3RhZ2Ugbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FCTkRfVlNfU1RPUkFHRUJVRkZFUl9FWElTVFM6IHNnX2FwcGx5X2JpbmRpbmdzOiBzdG9yYWdlIGJ1ZmZlciBib3VuZCB0byB2ZXJ0ZXggc3RhZ2Ugbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FCTkRfVlNfSU1HX0VYSVNUUzogc2dfYXBwbHlfYmluZGluZ3M6IGltYWdlIGJvdW5kIHRvIHZlcnRleCBzdGFnZSBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQUJORF9GU19TTVBfRVhJU1RTOiBzZ19hcHBseV9iaW5kaW5nczogc2FtcGxlciBib3VuZCB0byBmcmFnbWVudCBzdGFnZSBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQUJORF9GU19TVE9SQUdFQlVGRkVSX0VYSVNUUzogc2dfYXBwbHlfYmluZGluZ3M6IHN0b3JhZ2UgYnVmZmVyIGJvdW5kIHRvIGZyYWdtZW50IHN0YWdlIG5vIGxvbmdlciBhbGl2ZQBWQUxJREFURV9BQk5EX0ZTX0lNR19FWElTVFM6IHNnX2FwcGx5X2JpbmRpbmdzOiBpbWFnZSBib3VuZCB0byBmcmFnbWVudCBzdGFnZSBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfSU1BR0VfTk9fUlQ6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50IGltYWdlIG11c3QgaGF2ZSByZW5kZXJfdGFyZ2V0PXRydWUAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0lNQUdFX05PX1JUOiBwYXNzIGF0dGFjaG1lbnQgaW1hZ2UgbXVzdCBiZSBoYXZlIHJlbmRlcl90YXJnZXQ9dHJ1ZQBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfREVQVEhfSU1BR0VfTk9fUlQ6IHBhc3MgZGVwdGggYXR0YWNobWVudCBpbWFnZSBtdXN0IGJlIGhhdmUgcmVuZGVyX3RhcmdldD10cnVlAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfU0FNUExFUl9QQUlSX0hBU19OQU1FX0JVVF9OT1RfVVNFRDogc2hhZGVyIHN0YWdlOiBpbWFnZS1zYW1wbGVyLXBhaXIgaGFzIG5hbWUgYnV0IC51c2VkIGZpZWxkIG5vdCB0cnVlAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfU0FNUExFUl9QQUlSX0hBU19TQU1QTEVSX0JVVF9OT1RfVVNFRDogc2hhZGVyIHN0YWdlOiBpbWFnZS1zYW1wbGVyLXBhaXIgLnNhbXBsZXJfc2xvdCAhPSAwIGJ1dCAudXNlZCBmaWVsZCBub3QgdHJ1ZQBWQUxJREFURV9TSEFERVJERVNDX0lNQUdFX1NBTVBMRVJfUEFJUl9IQVNfSU1BR0VfQlVUX05PVF9VU0VEOiBzaGFkZXIgc3RhZ2U6IGltYWdlLXNhbXBsZXItcGFpciBoYXMgLmltYWdlX3Nsb3QgIT0gMCBidXQgLnVzZWQgZmllbGQgbm90IHRydWUAX3NhcHBfcmluZ19lbnF1ZXVlAF9zYXBwX3JpbmdfZGVxdWV1ZQBwb29sLT5mcmVlX3F1ZXVlAFdJTjMyX0dFVF9QSVhFTEZPUk1BVF9BVFRSSUJfRkFJTEVEOiBmYWlsZWQgdG8gZ2V0IFdHTCBwaXhlbCBmb3JtYXQgYXR0cmlidXRlAEJhY2txdW90ZQBRdW90ZQBEZWxldGUAX3NhcHBfaW5pdF9zdGF0ZQBzZ3BfcmVzZXRfc3RhdGUAc2dfcXVlcnlfc2FtcGxlcl9zdGF0ZQBzZ19xdWVyeV9idWZmZXJfc3RhdGUAc2dfcXVlcnlfc2hhZGVyX3N0YXRlAHNnX3F1ZXJ5X3BpcGVsaW5lX3N0YXRlAHNnX3F1ZXJ5X2ltYWdlX3N0YXRlAF9zYXBwX2Rpc2NhcmRfc3RhdGUAX3NncF9ibGVuZF9zdGF0ZQBfc2dfcmVzZXRfc2FtcGxlcl90b19hbGxvY19zdGF0ZQBfc2dfcmVzZXRfYnVmZmVyX3RvX2FsbG9jX3N0YXRlAF9zZ19yZXNldF9zaGFkZXJfdG9fYWxsb2Nfc3RhdGUAX3NnX3Jlc2V0X3BpcGVsaW5lX3RvX2FsbG9jX3N0YXRlAF9zZ19yZXNldF9pbWFnZV90b19hbGxvY19zdGF0ZQBWQUxJREFURV9BUElQX1NIQURFUl9WQUxJRDogc2dfYXBwbHlfcGlwZWxpbmU6IHNoYWRlciBvYmplY3Qgbm90IGluIHZhbGlkIHN0YXRlAFZBTElEQVRFX0FCTkRfUElQRUxJTkVfVkFMSUQ6IHNnX2FwcGx5X2JpbmRpbmdzOiBjdXJyZW50bHkgYXBwbGllZCBwaXBlbGluZSBvYmplY3Qgbm90IGluIHZhbGlkIHN0YXRlAFZBTElEQVRFX0FQSVBfUElQRUxJTkVfVkFMSUQ6IHNnX2FwcGx5X3BpcGVsaW5lOiBwaXBlbGluZSBvYmplY3Qgbm90IGluIHZhbGlkIHN0YXRlAFZBTElEQVRFX0FQSVBfQ1VSUEFTU19BVFRBQ0hNRU5UU19WQUxJRDogc2dfYXBwbHlfcGlwZWxpbmU6IGN1cnJlbnQgcGFzcyBhdHRhY2htZW50cyBub3QgaW4gdmFsaWQgc3RhdGUAREVBTExPQ19TQU1QTEVSX0lOVkFMSURfU1RBVEU6IHNnX2RlYWxsb2Nfc2FtcGxlcigpOiBzYW1wbGVyIG11c3QgYmUgaW4gYWxsb2Mgc3RhdGUAREVBTExPQ19JTUFHRV9JTlZBTElEX1NUQVRFOiBzZ19kZWFsbG9jX2ltYWdlKCk6IGltYWdlIG11c3QgYmUgaW4gYWxsb2Mgc3RhdGUAVU5JTklUX0FUVEFDSE1FTlRTX0lOVkFMSURfU1RBVEU6IHNnX3VuaW5pdF9hdHRhY2htZW50cygpOiBhdHRhY2htZW50cyBtdXN0IGJlIGluIFZBTElEIG9yIEZBSUxFRCBzdGF0ZQBVTklOSVRfU0FNUExFUl9JTlZBTElEX1NUQVRFOiBzZ191bmluaXRfc2FtcGxlcigpOiBzYW1wbGVyIG11c3QgYmUgaW4gVkFMSUQgb3IgRkFJTEVEIHN0YXRlAFVOSU5JVF9CVUZGRVJfSU5WQUxJRF9TVEFURTogc2dfdW5pbml0X2J1ZmZlcigpOiBidWZmZXIgbXVzdCBiZSBpbiBWQUxJRCBvciBGQUlMRUQgc3RhdGUAVU5JTklUX1NIQURFUl9JTlZBTElEX1NUQVRFOiBzZ191bmluaXRfc2hhZGVyKCk6IHNoYWRlciBtdXN0IGJlIGluIFZBTElEIG9yIEZBSUxFRCBzdGF0ZQBVTklOSVRfUElQRUxJTkVfSU5WQUxJRF9TVEFURTogc2dfdW5pbml0X3BpcGVsaW5lKCk6IHBpcGVsaW5lIG11c3QgYmUgaW4gVkFMSUQgb3IgRkFJTEVEIHN0YXRlAFVOSU5JVF9JTUFHRV9JTlZBTElEX1NUQVRFOiBzZ191bmluaXRfaW1hZ2UoKTogaW1hZ2UgbXVzdCBiZSBpbiBWQUxJRCBvciBGQUlMRUQgc3RhdGUARkFJTF9BVFRBQ0hNRU5UU19JTlZBTElEX1NUQVRFOiBzZ19mYWlsX2F0dGFjaG1lbnRzKCk6IGF0dGFjaG1lbnRzIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUAREVBTExPQ19BVFRBQ0hNRU5UU19JTlZBTElEX1NUQVRFOiBzZ19kZWFsbG9jX2F0dGFjaG1lbnRzKCk6IGF0dGFjaG1lbnRzIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUASU5JVF9BVFRBQ0hNRU5UU19JTlZBTElEX1NUQVRFOiBzZ19pbml0X2F0dGFjaG1lbnRzKCk6IHBhc3MgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBJTklUX1NBTVBMRVJfSU5WQUxJRF9TVEFURTogc2dfaW5pdF9zYW1wbGVyKCk6IHNhbXBsZXIgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBGQUlMX1NBTVBMRVJfSU5WQUxJRF9TVEFURTogc2dfZmFpbF9zYW1wbGVyKCk6IHNhbXBsZXIgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBJTklUX0JVRkZFUl9JTlZBTElEX1NUQVRFOiBzZ19pbml0X2J1ZmZlcigpOiBidWZmZXIgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBGQUlMX0JVRkZFUl9JTlZBTElEX1NUQVRFOiBzZ19mYWlsX2J1ZmZlcigpOiBidWZmZXIgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBERUFMTE9DX0JVRkZFUl9JTlZBTElEX1NUQVRFOiBzZ19kZWFsbG9jX2J1ZmZlcigpOiBidWZmZXIgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBJTklUX1NIQURFUl9JTlZBTElEX1NUQVRFOiBzZ19pbml0X3NoYWRlcigpOiBzaGFkZXIgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBGQUlMX1NIQURFUl9JTlZBTElEX1NUQVRFOiBzZ19mYWlsX3NoYWRlcigpOiBzaGFkZXIgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBERUFMTE9DX1NIQURFUl9JTlZBTElEX1NUQVRFOiBzZ19kZWFsbG9jX3NoYWRlcigpOiBzaGFkZXIgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBJTklUX1BJUEVMSU5FX0lOVkFMSURfU1RBVEU6IHNnX2luaXRfcGlwZWxpbmUoKTogcGlwZWxpbmUgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBGQUlMX1BJUEVMSU5FX0lOVkFMSURfU1RBVEU6IHNnX2ZhaWxfcGlwZWxpbmUoKTogcGlwZWxpbmUgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBERUFMTE9DX1BJUEVMSU5FX0lOVkFMSURfU1RBVEU6IHNnX2RlYWxsb2NfcGlwZWxpbmUoKTogcGlwZWxpbmUgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBJTklUX0lNQUdFX0lOVkFMSURfU1RBVEU6IHNnX2luaXRfaW1hZ2UoKTogaW1hZ2UgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBGQUlMX0lNQUdFX0lOVkFMSURfU1RBVEU6IHNnX2ZhaWxfaW1hZ2UoKTogaW1hZ2UgbXVzdCBiZSBpbiBBTExPQyBzdGF0ZQBzZ3Bfcm90YXRlAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OU0FWRUlOU1RBTkNFU1RBVEU6IE5hdGl2ZUFjdGl2aXR5IG9uU2F2ZUluc3RhbmNlU3RhdGUAc2dwX3RyYW5zbGF0ZQBBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTkNSRUFURTogTmF0aXZlQWN0aXZpdHkgb25DcmVhdGUAX3NhcHBfaW1hZ2VfdmFsaWRhdGUAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05QQVVTRTogTmF0aXZlQWN0aXZpdHkgb25QYXVzZQBzYXBwX21ldGFsX2dldF9tc2FhX2NvbG9yX3RleHR1cmUAc2FwcF9tZXRhbF9nZXRfZGVwdGhfc3RlbmNpbF90ZXh0dXJlAF9zZ19nbF9jYWNoZV9hY3RpdmVfdGV4dHVyZQBzZ3Atd2hpdGUtdGV4dHVyZQBXR1BVX1NXQVBDSEFJTl9DUkVBVEVfREVQVEhfU1RFTkNJTF9WSUVXX0ZBSUxFRDogd2dwdTogZmFpbGVkIHRvIGNyZWF0ZSB2aWV3IG9iamVjdCBmb3Igc3dhcGNoYWluIGRlcHRoLXN0ZW5jaWwgdGV4dHVyZQBXR1BVX1NXQVBDSEFJTl9DUkVBVEVfTVNBQV9WSUVXX0ZBSUxFRDogd2dwdTogZmFpbGVkIHRvIGNyZWF0ZSB2aWV3IG9iamVjdCBmb3Igc3dhcGNoYWluIG1zYWEgdGV4dHVyZQBfc2dfZ2xfaW5kZXhfdHlwZQBfc2dfZ2xfdmVydGV4Zm9ybWF0X3R5cGUAX3NnX2dsX3ByaW1pdGl2ZV90eXBlAF9zZ19nbF90ZXhpbWFnZV90eXBlAEFORFJPSURfQ1JFQVRFX1RIUkVBRF9QSVBFX0ZBSUxFRDogZmFpbGVkIHRvIGNyZWF0ZSB0aHJlYWQgcGlwZQBFc2NhcGUAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfRE9ORTogTmF0aXZlQWN0aXZpdHkgZG9uZQBBTkRST0lEX0xPT1BfVEhSRUFEX0RPTkU6IGxvb3AgdGhyZWFkIGRvbmUAc2dfZGVzdHJveV9waXBlbGluZQBfc2dfZ2xfYXBwbHlfcGlwZWxpbmUAVkFMSURBVEVfQUJORF9QSVBFTElORTogc2dfYXBwbHlfYmluZGluZ3M6IG11c3QgYmUgY2FsbGVkIGFmdGVyIHNnX2FwcGx5X3BpcGVsaW5lAF9zZ192YWxpZGF0ZV9hcHBseV9waXBlbGluZQBfc2dfdW5pbml0X3BpcGVsaW5lAF9zZ19pbml0X3BpcGVsaW5lAHNncF9yZXNldF9waXBlbGluZQBzZ3Bfc2V0X3BpcGVsaW5lAF9zZy5nbC5jYWNoZS5jdXJfcGlwZWxpbmUAX3NnX2xvb2t1cF9waXBlbGluZQBfc2dfZ2xfY3JlYXRlX3BpcGVsaW5lAHNnX21ha2VfcGlwZWxpbmUAX3NnX2dsX2Rpc2NhcmRfcGlwZWxpbmUAX3NnX2RlYWxsb2NfcGlwZWxpbmUAU0dQIGZhaWxlZCB0byBjcmVhdGUgdGhlIGNvbW1vbiBwaXBlbGluZQBBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTlJFU1VNRTogTmF0aXZlQWN0aXZpdHkgb25SZXN1bWUASG9tZQBWQUxJREFURV9BUFBFTkRCVUZfVVBEQVRFOiBzZ19hcHBlbmRfYnVmZmVyOiBjYW5ub3QgY2FsbCBzZ19hcHBlbmRfYnVmZmVyIGFuZCBzZ191cGRhdGVfYnVmZmVyIGluIHNhbWUgZnJhbWUAVkFMSURBVEVfVVBEQVRFQlVGX0FQUEVORDogc2dfdXBkYXRlX2J1ZmZlcjogY2Fubm90IGNhbGwgc2dfdXBkYXRlX2J1ZmZlciBhbmQgc2dfYXBwZW5kX2J1ZmZlciBpbiBzYW1lIGZyYW1lAFZBTElEQVRFX1VQREFURUJVRl9PTkNFOiBzZ191cGRhdGVfYnVmZmVyOiBvbmx5IG9uZSB1cGRhdGUgYWxsb3dlZCBwZXIgYnVmZmVyIGFuZCBmcmFtZQBWQUxJREFURV9VUERJTUdfT05DRTogc2dfdXBkYXRlX2ltYWdlOiBvbmx5IG9uZSB1cGRhdGUgYWxsb3dlZCBwZXIgaW1hZ2UgYW5kIGZyYW1lAGltZ19zbXBfZGVzYy0+Z2xzbF9uYW1lAHNhcHBfbWV0YWxfZ2V0X2N1cnJlbnRfZHJhd2FibGUAVkFMSURBVEVfSU1BR0VERVNDX0NPTVBSRVNTRURfSU1NVVRBQkxFOiBjb21wcmVzc2VkIGltYWdlcyBtdXN0IGJlIGltbXV0YWJsZQBzZ3Bfc2NhbGUAX3NnX2dsX3Jlc2V0X3N0YXRlX2NhY2hlAF9zZ19nbF9zaGFkZXJfc3RhZ2UAVkFMSURBVEVfQUJORF9WU19JTUFHRV9NU0FBOiBzZ19hcHBseV9iaW5kaW5nczogY2Fubm90IGJpbmQgaW1hZ2Ugd2l0aCBzYW1wbGVfY291bnQ+MSB0byB2ZXJ0ZXggc3RhZ2UAVkFMSURBVEVfQUJORF9WU19VTkVYUEVDVEVEX1NBTVBMRVJfQklORElORzogc2dfYXBwbHlfYmluZGluZ3M6IHVuZXhwZWN0ZWQgc2FtcGxlciBiaW5kaW5nIG9uIHZlcnRleCBzdGFnZQBWQUxJREFURV9BQk5EX1ZTX1VORVhQRUNURURfU1RPUkFHRUJVRkZFUl9CSU5ESU5HOiBzZ19hcHBseV9iaW5kaW5nczogdW5leHBlY3RlZCBzdG9yYWdlIGJ1ZmZlciBiaW5kaW5nIG9uIHZlcnRleCBzdGFnZQBWQUxJREFURV9BQk5EX1ZTX1VORVhQRUNURURfSU1BR0VfQklORElORzogc2dfYXBwbHlfYmluZGluZ3M6IHVuZXhwZWN0ZWQgaW1hZ2UgYmluZGluZyBvbiB2ZXJ0ZXggc3RhZ2UAVkFMSURBVEVfQUJORF9WU19FWFBFQ1RFRF9ERVBUSF9JTUFHRTogc2dfYXBwbHlfYmluZGluZ3M6IGRlcHRoIGltYWdlIGV4cGVjdGVkIG9uIHZlcnRleCBzdGFnZQBWQUxJREFURV9BQk5EX1ZTX0VYUEVDVEVEX0ZJTFRFUkFCTEVfSU1BR0U6IHNnX2FwcGx5X2JpbmRpbmdzOiBmaWx0ZXJhYmxlIGltYWdlIGV4cGVjdGVkIG9uIHZlcnRleCBzdGFnZQBWQUxJREFURV9BQk5EX0ZTX0lNQUdFX01TQUE6IHNnX2FwcGx5X2JpbmRpbmdzOiBjYW5ub3QgYmluZCBpbWFnZSB3aXRoIHNhbXBsZV9jb3VudD4xIHRvIGZyYWdtZW50IHN0YWdlAFZBTElEQVRFX0FCTkRfRlNfVU5FWFBFQ1RFRF9TQU1QTEVSX0JJTkRJTkc6IHNnX2FwcGx5X2JpbmRpbmdzOiB1bmV4cGVjdGVkIHNhbXBsZXIgYmluZGluZyBvbiBmcmFnbWVudCBzdGFnZQBWQUxJREFURV9BQk5EX0ZTX1VORVhQRUNURURfU1RPUkFHRUJVRkZFUl9CSU5ESU5HOiBzZ19hcHBseV9iaW5kaW5nczogdW5leHBlY3RlZCBzdG9yYWdlIGJ1ZmZlciBiaW5kaW5nIG9uIGZyYWdtZW50IHN0YWdlAFZBTElEQVRFX0FCTkRfRlNfVU5FWFBFQ1RFRF9JTUFHRV9CSU5ESU5HOiBzZ19hcHBseV9iaW5kaW5nczogdW5leHBlY3RlZCBpbWFnZSBiaW5kaW5nIG9uIGZyYWdtZW50IHN0YWdlAFZBTElEQVRFX0FCTkRfRlNfRVhQRUNURURfREVQVEhfSU1BR0U6IHNnX2FwcGx5X2JpbmRpbmdzOiBkZXB0aCBpbWFnZSBleHBlY3RlZCBvbiBmcmFnbWVudCBzdGFnZQBWQUxJREFURV9BQk5EX0ZTX0VYUEVDVEVEX0ZJTFRFUkFCTEVfSU1BR0U6IHNnX2FwcGx5X2JpbmRpbmdzOiBmaWx0ZXJhYmxlIGltYWdlIGV4cGVjdGVkIG9uIGZyYWdtZW50IHN0YWdlAF9zZ19nbF91c2FnZQBzZ19kZXN0cm95X2ltYWdlAF9zZ191bmluaXRfaW1hZ2UAX3NnX2luaXRfaW1hZ2UAc2dwX3Vuc2V0X2ltYWdlAHNncF9yZXNldF9pbWFnZQBzZ3Bfc2V0X2ltYWdlAF9zZ19nbF9hdHRhY2htZW50c19kc19pbWFnZQBfc2dfZ2xfYXR0YWNobWVudHNfY29sb3JfaW1hZ2UAX3NnX2dsX2F0dGFjaG1lbnRzX3Jlc29sdmVfaW1hZ2UAX3NnX2dsX2NyZWF0ZV9pbWFnZQBzZ19tYWtlX2ltYWdlAF9zZ19nbF9kaXNjYXJkX2ltYWdlAF9zZ19kZWFsbG9jX2ltYWdlAFZBTElEQVRFX0lNQUdFREVTQ19OT05SVF9QSVhFTEZPUk1BVDogaW52YWxpZCBwaXhlbCBmb3JtYXQgZm9yIG5vbi1yZW5kZXItdGFyZ2V0IGltYWdlAFZBTElEQVRFX0lNQUdFREVTQ19SVF9QSVhFTEZPUk1BVDogaW52YWxpZCBwaXhlbCBmb3JtYXQgZm9yIHJlbmRlci10YXJnZXQgaW1hZ2UAU0dQIGZhaWxlZCB0byBjcmVhdGUgd2hpdGUgaW1hZ2UAVkFMSURBVEVfVVBESU1HX1VTQUdFOiBzZ191cGRhdGVfaW1hZ2U6IGNhbm5vdCB1cGRhdGUgaW1tdXRhYmxlIGltYWdlAHNncF9yZXNldF9ibGVuZF9tb2RlAHNncF9zZXRfYmxlbmRfbW9kZQBJbnZhbGlkIGVycm9yIGNvZGUATnVtcGFkRGl2aWRlAFdHUFVfQ1JFQVRFX0lOU1RBTkNFX0ZBSUxFRDogd2dwdTogZmFpbGVkIHRvIGNyZWF0ZSBpbnN0YW5jZQBzYXBwX3dncHVfZ2V0X2RldmljZQBzYXBwX21ldGFsX2dldF9kZXZpY2UAc2FwcF9kM2QxMV9nZXRfZGV2aWNlAEJhY2tzcGFjZQBTcGFjZQBXSU4zMl9EM0QxMV9RVUVSWV9JTlRFUkZBQ0VfSURYR0lERVZJQ0UxX0ZBSUxFRDogY291bGQgbm90IG9idGFpbiBJRFhHSURldmljZTEgaW50ZXJmYWNlAGNvb3JkAFBlcmlvZABMSU5VWF9HTFhfRVhURU5TSU9OX05PVF9GT1VORDogR0xYIGV4dGVuc2lvbiBub3QgZm91bmQAX2Zsb2F0X2JsZW5kAHNnX3F1ZXJ5X2JhY2tlbmQAX3NnX2dsX3NldHVwX2JhY2tlbmQAX3NnX2dsX2Rpc2NhcmRfYmFja2VuZABkc3QgPT0gZHN0X2VuZABkc3QgPCBkc3RfZW5kAHNncF9lbmQAYm5kAF9zZ3BfbWVyZ2VfYmF0Y2hfY29tbWFuZABFbmQAVkFMSURBVEVfQUJORF9WU19FWFBFQ1RFRF9TQU1QTEVSX0JJTkRJTkc6IHNnX2FwcGx5X2JpbmRpbmdzOiBzYW1wbGVyIGJpbmRpbmcgb24gdmVydGV4IHN0YWdlIGlzIG1pc3Npbmcgb3IgdGhlIHNhbXBsZXIgaGFuZGxlIGlzIGludmFsaWQAVkFMSURBVEVfQUJORF9GU19FWFBFQ1RFRF9TQU1QTEVSX0JJTkRJTkc6IHNnX2FwcGx5X2JpbmRpbmdzOiBzYW1wbGVyIGJpbmRpbmcgb24gZnJhZ21lbnQgc3RhZ2UgaXMgbWlzc2luZyBvciB0aGUgc2FtcGxlciBoYW5kbGUgaXMgaW52YWxpZABWQUxJREFURV9BQk5EX1ZTX0VYUEVDVEVEX1NUT1JBR0VCVUZGRVJfQklORElORzogc2dfYXBwbHlfYmluZGluZ3M6IHN0b3JhZ2UgYnVmZmVyIGJpbmRpbmcgb24gdmVydGV4IHN0YWdlIGlzIG1pc3Npbmcgb3IgdGhlIGJ1ZmZlciBoYW5kbGUgaXMgaW52YWxpZABWQUxJREFURV9BQk5EX0ZTX0VYUEVDVEVEX1NUT1JBR0VCVUZGRVJfQklORElORzogc2dfYXBwbHlfYmluZGluZ3M6IHN0b3JhZ2UgYnVmZmVyIGJpbmRpbmcgb24gZnJhZ21lbnQgc3RhZ2UgaXMgbWlzc2luZyBvciB0aGUgYnVmZmVyIGhhbmRsZSBpcyBpbnZhbGlkAFZBTElEQVRFX0FCTkRfVlNfRVhQRUNURURfSU1BR0VfQklORElORzogc2dfYXBwbHlfYmluZGluZ3M6IGltYWdlIGJpbmRpbmcgb24gdmVydGV4IHN0YWdlIGlzIG1pc3Npbmcgb3IgdGhlIGltYWdlIGhhbmRsZSBpcyBpbnZhbGlkAFZBTElEQVRFX0FCTkRfRlNfRVhQRUNURURfSU1BR0VfQklORElORzogc2dfYXBwbHlfYmluZGluZ3M6IGltYWdlIGJpbmRpbmcgb24gZnJhZ21lbnQgc3RhZ2UgaXMgbWlzc2luZyBvciB0aGUgaW1hZ2UgaGFuZGxlIGlzIGludmFsaWQAVkFMSURBVEVfUElQRUxJTkVERVNDX1NIQURFUjogc2dfcGlwZWxpbmVfZGVzYy5zaGFkZXIgbWlzc2luZyBvciBpbnZhbGlkACFfc2cuY3VyX3Bhc3MudmFsaWQAX3NhcHAudmFsaWQAX3NnLmdsLnZhbGlkAF9zZy52YWxpZABWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfSU1BR0U6IHBhc3MgYXR0YWNobWVudCBpbWFnZSBpcyBub3QgdmFsaWQAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0RFUFRIX0lNQUdFOiBwYXNzIGRlcHRoIGF0dGFjaG1lbnQgaW1hZ2UgaXMgbm90IHZhbGlkAFZBTElEQVRFX0JFR0lOUEFTU19DT0xPUl9BVFRBQ0hNRU5UX0lNQUdFOiBzZ19iZWdpbl9wYXNzOiBvbmUgb3IgbW9yZSBjb2xvciBhdHRhY2htZW50IGltYWdlcyBhcmUgbm90IHZhbGlkAFZBTElEQVRFX0JFR0lOUEFTU19ERVBUSFNURU5DSUxfQVRUQUNITUVOVF9JTUFHRTogc2dfYmVnaW5fcGFzczogb25lIG9yIG1vcmUgZGVwdGgtc3RlbmNpbCBhdHRhY2htZW50IGltYWdlcyBhcmUgbm90IHZhbGlkAFZBTElEQVRFX0JFR0lOUEFTU19SRVNPTFZFX0FUVEFDSE1FTlRfSU1BR0U6IHNnX2JlZ2luX3Bhc3M6IG9uZSBvciBtb3JlIHJlc29sdmUgYXR0YWNobWVudCBpbWFnZXMgYXJlIG5vdCB2YWxpZABWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfUkVTT0xWRV9JTUFHRTogcGFzcyByZXNvbHZlIGF0dGFjaG1lbnQgaW1hZ2Ugbm90IHZhbGlkAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRVhQRUNUX0NPTE9SRk9STUFUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5jb2xvcl9mb3JtYXQgdG8gYmUgdmFsaWQAZGVzYy0+c2hhZGVyLmlkID09IHNoZC0+c2xvdC5pZABhdHRzLT5zbG90LmlkID09IF9zZy5jdXJfcGFzcy5hdHRzX2lkLmlkAF9zZy5nbC5jYWNoZS5jdXJfcGlwZWxpbmUtPnNoYWRlci0+c2xvdC5pZCA9PSBfc2cuZ2wuY2FjaGUuY3VyX3BpcGVsaW5lLT5jbW4uc2hhZGVyX2lkLmlkAF9zZy5nbC5jYWNoZS5jdXJfcGlwZWxpbmUtPnNsb3QuaWQgPT0gX3NnLmdsLmNhY2hlLmN1cl9waXBlbGluZV9pZC5pZABzaGQAVkFMSURBVEVfQkVHSU5QQVNTX0NBTkFSWTogc2dfYmVnaW5fcGFzczogcGFzcyBzdHJ1Y3Qgbm90IGluaXRpYWxpemVkAFNva29sIGlzIG5vdCBpbml0aWFsaXplZABWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfQ0FOQVJZOiBzZ19hdHRhY2htZW50c19kZXNjIG5vdCBpbml0aWFsaXplZABWQUxJREFURV9TQU1QTEVSREVTQ19DQU5BUlk6IHNnX3NhbXBsZXJfZGVzYyBub3QgaW5pdGlhbGl6ZWQAVkFMSURBVEVfQlVGRkVSREVTQ19DQU5BUlk6IHNnX2J1ZmZlcl9kZXNjIG5vdCBpbml0aWFsaXplZABWQUxJREFURV9TSEFERVJERVNDX0NBTkFSWTogc2dfc2hhZGVyX2Rlc2Mgbm90IGluaXRpYWxpemVkAFZBTElEQVRFX1BJUEVMSU5FREVTQ19DQU5BUlk6IHNnX3BpcGVsaW5lX2Rlc2Mgbm90IGluaXRpYWxpemVkAFZBTElEQVRFX0lNQUdFREVTQ19DQU5BUlk6IHNnX2ltYWdlX2Rlc2Mgbm90IGluaXRpYWxpemVkAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OTkFUSVZFV0lORE9XREVTVFJPWUVEOiBOYXRpdmVBY3Rpdml0eSBvbk5hdGl2ZVdpbmRvd0Rlc3Ryb3llZABBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTklOUFVUUVVFVUVERVNUUk9ZRUQ6IE5hdGl2ZUFjdGl2aXR5IG9uSW5wdXRRdWV1ZURlc3Ryb3llZABBTkRST0lEX1VOS05PV05fTVNHOiB1bmtub3duIG1zZyB0eXBlIHJlY2VpdmVkAFBBU1NfUE9PTF9FWEhBVVNURUQ6IHBhc3MgcG9vbCBleGhhdXN0ZWQAU0FNUExFUl9QT09MX0VYSEFVU1RFRDogc2FtcGxlciBwb29sIGV4aGF1c3RlZABCVUZGRVJfUE9PTF9FWEhBVVNURUQ6IGJ1ZmZlciBwb29sIGV4aGF1c3RlZABTSEFERVJfUE9PTF9FWEhBVVNURUQ6IHNoYWRlciBwb29sIGV4aGF1c3RlZABQSVBFTElORV9QT09MX0VYSEFVU1RFRDogcGlwZWxpbmUgcG9vbCBleGhhdXN0ZWQASU1BR0VfUE9PTF9FWEhBVVNURUQ6IGltYWdlIHBvb2wgZXhoYXVzdGVkAEFORFJPSURfTE9PUF9USFJFQURfU1RBUlRFRDogbG9vcCB0aHJlYWQgc3RhcnRlZABBTkRST0lEX05BVElWRV9BQ1RJVklUWV9DUkVBVEVfU1VDQ0VTUzogTmF0aXZlQWN0aXZpdHkgc3VjY2Vzc2Z1bGx5IGNyZWF0ZWQAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05OQVRJVkVXSU5ET1dDUkVBVEVEOiBOYXRpdmVBY3Rpdml0eSBvbk5hdGl2ZVdpbmRvd0NyZWF0ZWQAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05JTlBVVFFVRVVFQ1JFQVRFRDogTmF0aXZlQWN0aXZpdHkgb25JbnB1dFF1ZXVlQ3JlYXRlZABXSU4zMl9XR0xfQVJCX0NSRUFURV9DT05URVhUX1JFUVVJUkVEOiBBUkJfY3JlYXRlX2NvbnRleHQgcmVxdWlyZWQAV0lOMzJfV0dMX0FSQl9DUkVBVEVfQ09OVEVYVF9QUk9GSUxFX1JFUVVJUkVEOiBBUkJfY3JlYXRlX2NvbnRleHRfcHJvZmlsZSByZXF1aXJlZABWQUxJREFURV9TSEFERVJERVNDX1NPVVJDRV9PUl9CWVRFQ09ERTogc2hhZGVyIHNvdXJjZSBvciBieXRlIGNvZGUgcmVxdWlyZWQAVkFMSURBVEVfU0hBREVSREVTQ19CWVRFQ09ERTogc2hhZGVyIGJ5dGUgY29kZSByZXF1aXJlZABWQUxJREFURV9TSEFERVJERVNDX1NPVVJDRTogc2hhZGVyIHNvdXJjZSBjb2RlIHJlcXVpcmVkAFZBTElEQVRFX1NIQURFUkRFU0NfTk9fQllURUNPREVfU0laRTogc2hhZGVyIGJ5dGUgY29kZSBsZW5ndGggKGluIGJ5dGVzKSByZXF1aXJlZABUUkFDRV9IT09LU19OT1RfRU5BQkxFRDogc2dfaW5zdGFsbF90cmFjZV9ob29rcygpIGNhbGxlZCwgYnV0IFNPS09MX1RSQUNFX0hPT0tTIGlzIG5vdCBkZWZpbmVkAFZBTElEQVRFX0lNQUdFREVTQ19NU0FBX0JVVF9OT19SVDogbm9uLXJlbmRlci10YXJnZXQgaW1hZ2VzIGNhbm5vdCBiZSBtdWx0aXNhbXBsZWQAVkFMSURBVElPTl9GQUlMRUQ6IHZhbGlkYXRpb24gbGF5ZXIgY2hlY2tzIGZhaWxlZABXR1BVX0NSRUFURUJJTkRHUk9VUF9GQUlMRUQ6IHdncHVEZXZpY2VDcmVhdGVCaW5kR3JvdXAgZmFpbGVkAE1BTExPQ19GQUlMRUQ6IG1lbW9yeSBhbGxvY2F0aW9uIGZhaWxlZABMSU5VWF9HTFhfR0VUX1ZJU1VBTF9GUk9NX0ZCQ09ORklHX0ZBSUxFRDogZ2xYR2V0VmlzdWFsRnJvbUZCQ29uZmlnIGZhaWxlZABXR1BVX1NIQURFUl9DUkVBVEVfQklOREdST1VQX0xBWU9VVF9GQUlMRUQ6IHdncHVEZXZpY2VDcmVhdGVCaW5kR3JvdXBMYXlvdXQoKSBmb3Igc2hhZGVyIHN0YWdlIGZhaWxlZABMSU5VWF9FR0xfTk9fTkFUSVZFX1ZJU1VBTDogZWdsR2V0Q29uZmlnQXR0cmliKCkgZm9yIEVHTF9OQVRJVkVfVklTVUFMX0lEIGZhaWxlZABMSU5VWF9FR0xfQklORF9PUEVOR0xfRVNfQVBJX0ZBSUxFRDogZWdsQmluZEFQSShFR0xfT1BFTkdMX0VTX0FQSSkgZmFpbGVkAExJTlVYX0VHTF9CSU5EX09QRU5HTF9BUElfRkFJTEVEOiBlZ2xCaW5kQVBJKEVHTF9PUEVOR0xfQVBJKSBmYWlsZWQATElOVVhfRUdMX0dFVF9ESVNQTEFZX0ZBSUxFRDogZWdsR2V0RGlzcGxheSgpIGZhaWxlZABMSU5VWF9YMTFfT1BFTl9ESVNQTEFZX0ZBSUxFRDogWE9wZW5EaXNwbGF5KCkgZmFpbGVkAExJTlVYX0dMWF9DUkVBVEVfV0lORE9XX0ZBSUxFRDogZ2xYQ3JlYXRlV2luZG93KCkgZmFpbGVkAExJTlVYX1gxMV9DUkVBVEVfV0lORE9XX0ZBSUxFRDogWENyZWF0ZVdpbmRvdygpIGZhaWxlZABXR1BVX0NSRUFURV9URVhUVVJFX1ZJRVdfRkFJTEVEOiB3Z3B1VGV4dHVyZUNyZWF0ZVZpZXcoKSBmYWlsZWQATElOVVhfRUdMX0NSRUFURV9DT05URVhUX0ZBSUxFRDogZWdsQ3JlYXRlQ29udGV4dCgpIGZhaWxlZABXR1BVX0NSRUFURV9QSVBFTElORV9MQVlPVVRfRkFJTEVEOiB3Z3B1RGV2aWNlQ3JlYXRlUGlwZWxpbmVMYXlvdXQoKSBmYWlsZWQATElOVVhfRUdMX01BS0VfQ1VSUkVOVF9GQUlMRUQ6IGVnbE1ha2VDdXJyZW50KCkgZmFpbGVkAFdHUFVfQ1JFQVRFX1NBTVBMRVJfRkFJTEVEOiB3Z3B1RGV2aWNlQ3JlYXRlU2FtcGxlcigpIGZhaWxlZABXR1BVX0NSRUFURV9CVUZGRVJfRkFJTEVEOiB3Z3B1RGV2aWNlQ3JlYXRlQnVmZmVyKCkgZmFpbGVkAExJTlVYX0VHTF9HRVRfVklTVUFMX0lORk9fRkFJTEVEOiBYR2V0VmlzdWFsSW5mbygpIGZhaWxlZABMSU5VWF9FR0xfSU5JVElBTElaRV9GQUlMRUQ6IGVnbEluaXRpYWxpemUoKSBmYWlsZWQAV0dQVV9DUkVBVEVfVEVYVFVSRV9GQUlMRUQ6IHdncHVEZXZpY2VDcmVhdGVUZXh0dXJlKCkgZmFpbGVkAFdHUFVfQ1JFQVRFX1JFTkRFUl9QSVBFTElORV9GQUlMRUQ6IHdncHVEZXZpY2VDcmVhdGVSZW5kZXJQaXBlbGluZSgpIGZhaWxlZABXR1BVX0NSRUFURV9TSEFERVJfTU9EVUxFX0ZBSUxFRDogd2dwdURldmljZUNyZWF0ZVNoYWRlck1vZHVsZSgpIGZhaWxlZABMSU5VWF9FR0xfQ1JFQVRFX1dJTkRPV19TVVJGQUNFX0ZBSUxFRDogZWdsQ3JlYXRlV2luZG93U3VyZmFjZSgpIGZhaWxlZABXSU4zMl9HRVRfUkFXX0lOUFVUX0RBVEFfRkFJTEVEOiBHZXRSYXdJbnB1dERhdGEoKSBmYWlsZWQAX3NhcHBfZW1zY19zaXplX2NoYW5nZWQAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05XSU5ET1dGT0NVU0NIQU5HRUQ6IE5hdGl2ZUFjdGl2aXR5IG9uV2luZG93Rm9jdXNDaGFuZ2VkAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OQ09ORklHVVJBVElPTkNIQU5HRUQ6IE5hdGl2ZUFjdGl2aXR5IG9uQ29uZmlndXJhdGlvbkNoYW5nZWQAVkFMSURBVEVfQUJORF9JQjogc2dfYXBwbHlfYmluZGluZ3M6IHBpcGVsaW5lIG9iamVjdCBkZWZpbmVzIG5vbi1pbmRleGVkIHJlbmRlcmluZywgYnV0IGluZGV4IGJ1ZmZlciBwcm92aWRlZABWQUxJREFURV9BQk5EX05PX0lCOiBzZ19hcHBseV9iaW5kaW5nczogcGlwZWxpbmUgb2JqZWN0IGRlZmluZXMgaW5kZXhlZCByZW5kZXJpbmcsIGJ1dCBubyBpbmRleCBidWZmZXIgcHJvdmlkZWQAVkFMSURBVEVfQVBJUF9QSVBFTElORV9WQUxJRF9JRDogc2dfYXBwbHlfcGlwZWxpbmU6IGludmFsaWQgcGlwZWxpbmUgaWQgcHJvdmlkZWQATnVtcGFkQWRkAF9jb21wcmVzc2VkX3RleHR1cmVfYXN0YwBfdGV4dHVyZV9jb21wcmVzc2lvbl9wdnJ0YwBXRUJLSVRfV0VCR0xfY29tcHJlc3NlZF90ZXh0dXJlX3B2cnRjAF90ZXh0dXJlX2NvbXByZXNzaW9uX2JwdGMAX3RleHR1cmVfY29tcHJlc3Npb25fcmd0YwBfY29tcHJlc3NlZF90ZXh0dXJlX2V0YwBfdGV4dHVyZV9jb21wcmVzc2lvbl9zM3RjAF9jb21wcmVzc2VkX3RleHR1cmVfczN0YwBfc2dfdmFsaWRhdGVfc2FtcGxlcl9kZXNjAF9zZ192YWxpZGF0ZV9idWZmZXJfZGVzYwBfc2dfdmFsaWRhdGVfc2hhZGVyX2Rlc2MAX3NhcHBfdmFsaWRhdGVfaWNvbl9kZXNjAF9zZ192YWxpZGF0ZV9waXBlbGluZV9kZXNjAF9zZ192YWxpZGF0ZV9pbWFnZV9kZXNjAFZBTElEQVRFX0FCTkRfVlNfSU1BR0VfVFlQRV9NSVNNQVRDSDogc2dfYXBwbHlfYmluZGluZ3M6IHR5cGUgb2YgaW1hZ2UgYm91bmQgdG8gdmVydGV4IHN0YWdlIGRvZXNuJ3QgbWF0Y2ggc2hhZGVyIGRlc2MAVkFMSURBVEVfQUJORF9GU19JTUFHRV9UWVBFX01JU01BVENIOiBzZ19hcHBseV9iaW5kaW5nczogdHlwZSBvZiBpbWFnZSBib3VuZCB0byBmcmFnbWVudCBzdGFnZSBkb2Vzbid0IG1hdGNoIHNoYWRlciBkZXNjAHNtcCAmJiBkZXNjAGltZyAmJiBkZXNjAGJ1ZiAmJiBkZXNjAHBpcCAmJiBzaGQgJiYgZGVzYwBzcmMAX3NhcHBfbWFsbG9jAF9zZ19tYWxsb2MAX3NnX3Nsb3RfYWxsb2MAX3NnX2dsX2NvbXBhcmVfZnVuYwBfdGV4dHVyZV9maWx0ZXJfYW5pc290cm9waWMAcGFuaWMAdmIAYXR0cy0+Z2wuZmIAVGFiAFZBTElEQVRFX0JVRkZFUkRFU0NfTk9fREFUQTogZHluYW1pYy9zdHJlYW0gdXNhZ2UgYnVmZmVycyBjYW5ub3QgYmUgaW5pdGlhbGl6ZWQgd2l0aCBkYXRhAFZBTElEQVRFX0lNQUdFREVTQ19JTkpFQ1RFRF9OT19EQVRBOiBpbWFnZXMgd2l0aCBpbmplY3RlZCB0ZXh0dXJlcyBjYW5ub3QgYmUgaW5pdGlhbGl6ZWQgd2l0aCBkYXRhAFZBTElEQVRFX0lNQUdFREVTQ19SVF9OT19EQVRBOiByZW5kZXIgdGFyZ2V0IGltYWdlcyBjYW5ub3QgYmUgaW5pdGlhbGl6ZWQgd2l0aCBkYXRhAFZBTElEQVRFX0lNQUdFREVTQ19EWU5BTUlDX05PX0RBVEE6IGR5bmFtaWMvc3RyZWFtIGltYWdlcyBjYW5ub3QgYmUgaW5pdGlhbGl6ZWQgd2l0aCBkYXRhAENvbW1hAGltZy0+Z2wudGV4W3Nsb3RdAGRlc2MtPmdsX2J1ZmZlcnNbc2xvdF0AZGVzYy0+Z2xfdGV4dHVyZXNbc2xvdF0AWwBLZXlaAEtleVkAQU5EUk9JRF9NU0dfREVTVFJPWTogTVNHX0RFU1RST1kAS2V5WABLZXlXAEFORFJPSURfTVNHX1NFVF9OQVRJVkVfV0lORE9XOiBNU0dfU0VUX05BVElWRV9XSU5ET1cAS2V5VgBLZXlVAEtleVQAS2V5UwBBTkRST0lEX01TR19OT19GT0NVUzogTVNHX05PX0ZPQ1VTAEFORFJPSURfTVNHX0ZPQ1VTOiBNU0dfRk9DVVMAYV9zdGF0ZS0+YnVmZmVyX2luZGV4IDwgU0dfTUFYX1ZFUlRFWF9CVUZGRVJTAGJ1Zi0+Y21uLmFjdGl2ZV9zbG90IDwgU0dfTlVNX0lORkxJR0hUX0ZSQU1FUwBudW1faW1hZ2VzIDw9IFNBUFBfTUFYX0lDT05JTUFHRVMAS2V5UgBWQUxJREFURV9BQk5EX1ZTX1VORVhQRUNURURfU0FNUExFUl9DT01QQVJFX05FVkVSOiBzZ19hcHBseV9iaW5kaW5nczogc2hhZGVyIGV4cGVjdHMgU0dfU0FNUExFUlRZUEVfQ09NUEFSSVNPTiBvbiB2ZXJ0ZXggc3RhZ2UgYnV0IHNhbXBsZXIgaGFzIFNHX0NPTVBBUkVGVU5DX05FVkVSAFZBTElEQVRFX0FCTkRfRlNfVU5FWFBFQ1RFRF9TQU1QTEVSX0NPTVBBUkVfTkVWRVI6IHNnX2FwcGx5X2JpbmRpbmdzOiBzaGFkZXIgZXhwZWN0cyBTR19TQU1QTEVSVFlQRV9DT01QQVJJU09OIG9uIGZyYWdtZW50IHN0YWdlIGJ1dCBzYW1wbGVyIGhhcyBTR19DT01QQVJFRlVOQ19ORVZFUgBWQUxJREFURV9BQk5EX1ZTX0VYUEVDVEVEX1NBTVBMRVJfQ09NUEFSRV9ORVZFUjogc2dfYXBwbHlfYmluZGluZ3M6IHNoYWRlciBleHBlY3RzIFNHX1NBTVBMRVJUWVBFX0ZJTFRFUklORyBvciBTR19TQU1QTEVSVFlQRV9OT05GSUxURVJJTkcgb24gdmVydGV4IHN0YWdlIGJ1dCBzYW1wbGVyIGRvZXNuJ3QgaGF2ZSBTR19DT01QQVJFRlVOQ19ORVZFUgBWQUxJREFURV9BQk5EX0ZTX0VYUEVDVEVEX1NBTVBMRVJfQ09NUEFSRV9ORVZFUjogc2dfYXBwbHlfYmluZGluZ3M6IHNoYWRlciBleHBlY3RzIFNHX1NBTVBMRVJUWVBFX0ZJTFRFUklORyBvbiBmcmFnbWVudCBzdGFnZSBidXQgc2FtcGxlciBkb2Vzbid0IGhhdmUgU0dfQ09NUEFSRUZVTkNfTkVWRVIAVkFMSURBVEVfQUJORF9WQl9UWVBFOiBzZ19hcHBseV9iaW5kaW5nczogYnVmZmVyIGluIHZlcnRleCBidWZmZXIgc2xvdCBpcyBub3QgYSBTR19CVUZGRVJUWVBFX1ZFUlRFWEJVRkZFUgBWQUxJREFURV9BQk5EX0lCX1RZUEU6IHNnX2FwcGx5X2JpbmRpbmdzOiBidWZmZXIgaW4gaW5kZXggYnVmZmVyIHNsb3QgaXMgbm90IGEgU0dfQlVGRkVSVFlQRV9JTkRFWEJVRkZFUgBWQUxJREFURV9TQU1QTEVSREVTQ19BTklTVFJPUElDX1JFUVVJUkVTX0xJTkVBUl9GSUxURVJJTkc6IHNnX3NhbXBsZXJfZGVzYy5tYXhfYW5pc290cm9weSA+IDEgcmVxdWlyZXMgbWluL21hZy9taXBtYXBfZmlsdGVyIHRvIGJlIFNHX0ZJTFRFUl9MSU5FQVIAS2V5UQBLZXlQAEtleU8AS2V5TgBOQU4AS2V5TQBLZXlMAExJTlVYX0dMWF9MT0FEX0xJQkdMX0ZBSUxFRDogZmFpbGVkIHRvIGxvYWQgbGliR0wAc2xvdC0+c3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9JTklUSUFMAHNtcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0lOSVRJQUwAcGlwLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfSU5JVElBTABpbWctPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9JTklUSUFMAGJ1Zi0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0lOSVRJQUwAc2hkLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfSU5JVElBTABLZXlLAEtleUoAS2V5SQBLZXlIAEtleUcAS2V5RgBJTkYAS2V5RQBBTkRST0lEX01TR19TRVRfSU5QVVRfUVVFVUU6IE1TR19TRVRfSU5QVVRfUVVFVUUAQU5EUk9JRF9NU0dfQ1JFQVRFOiBNU0dfQ1JFQVRFAEFORFJPSURfTVNHX1BBVVNFOiBNU0dfUEFVU0UAcGFzc19kZWYuc3dhcGNoYWluLmNvbG9yX2Zvcm1hdCA+IFNHX1BJWEVMRk9STUFUX05PTkUAQU5EUk9JRF9NU0dfUkVTVU1FOiBNU0dfUkVTVU1FAFZBTElEQVRFX0lNQUdFREVTQ19SVF9JTU1VVEFCTEU6IHJlbmRlciB0YXJnZXQgaW1hZ2VzIG11c3QgYmUgU0dfVVNBR0VfSU1NVVRBQkxFAF9zZ3AuaW5pdF9jb29raWUgPT0gX1NHUF9JTklUX0NPT0tJRQBLZXlEAFRFWENPT1JEAHNsb3QtPmlkID09IFNHX0lOVkFMSURfSUQAX3NncC5zdGF0ZS5waXBlbGluZS5pZCAhPSBTR19JTlZBTElEX0lEAHUtPnR5cGUgIT0gU0dfVU5JRk9STVRZUEVfSU5WQUxJRABWQUxJREFURV9CRUdJTlBBU1NfQVRUQUNITUVOVFNfVkFMSUQ6IHNnX2JlZ2luX3Bhc3M6IGF0dGFjaG1lbnRzIG9iamVjdCBub3QgaW4gcmVzb3VyY2Ugc3RhdGUgVkFMSUQAS2V5QwBzbXAtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9BTExPQwBwaXAtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9BTExPQwBpbWctPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9BTExPQwBidWYtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9BTExPQwBzaGQtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9BTExPQwBXSU4zMl9IRUxQRVJfV0lORE9XX0dFVERDX0ZBSUxFRDogZmFpbGVkIHRvIGdldCBoZWxwZXIgd2luZG93IERDAEtleUIATElOVVhfR0xYX0NSRUFURV9DT05URVhUX0ZBSUxFRDogRmFpbGVkIHRvIGNyZWF0ZSBHTCBjb250ZXh0IHZpYSBnbFhDcmVhdGVDb250ZXh0QXR0cmlic0FSQgBXSU4zMl9XR0xfSU5DT01QQVRJQkxFX0RFVklDRV9DT05URVhUOiBDcmVhdGVDb250ZXh0QXR0cmlic0FSQiBmYWlsZWQgd2l0aCBFUlJPUl9JTkNPTVBBVElCTEVfREVWSUNFX0NPTlRFWFRTX0FSQgBLZXlBADxmYDwGZjwAW2xpbmU6AFtpZDoARGlnaXQ5AE51bXBhZDkARjkARGlnaXQ4AE51bXBhZDgARjgARGlnaXQ3AE51bXBhZDcARjcARGlnaXQ2AE51bXBhZDYARjYARGlnaXQ1AE51bXBhZDUARjUARGlnaXQ0AE51bXBhZDQARjQAVkFMSURBVEVfUElQRUxJTkVERVNDX0xBWU9VVF9TVFJJREU0OiBzZ19waXBlbGluZV9kZXNjLmxheW91dC5idWZmZXJzW10uc3RyaWRlIG11c3QgYmUgbXVsdGlwbGUgb2YgNABWQUxJREFURV9CVUZGRVJERVNDX1NUT1JBR0VCVUZGRVJfU0laRV9NVUxUSVBMRV80OiBzaXplIG9mIHN0b3JhZ2UgYnVmZmVycyBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNABjaGFubmVsID49IDAgJiYgY2hhbm5lbCA8IDQAc2l6ZSA8PSBzaXplb2YoZmxvYXQpICogNABEaWdpdDMATnVtcGFkMwBGMwBEaWdpdDIATnVtcGFkMgBGMgBfc2dfYWxpZ25fdTMyAEYxMgBEaWdpdDEATnVtcGFkMQBGMQBGMTEAZ2xfYXR0ci0+dmJfaW5kZXggPT0gLTEAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfU0FNUExFX0NPVU5UOiBwYXNzIHJlc29sdmUgYXR0YWNobWVudCBpbWFnZSBzYW1wbGUgY291bnQgbXVzdCBiZSAxAFZBTElEQVRFX0lNQUdFREVTQ19NU0FBXzNEX0lNQUdFOiAzRCBpbWFnZXMgY2Fubm90IGhhdmUgYSBzYW1wbGVfY291bnQgPiAxAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19SRVNPTFZFX0NPTE9SX0lNQUdFX01TQUE6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50cyBtdXN0IGhhdmUgYSBjb2xvciBhdHRhY2htZW50IGltYWdlIHdpdGggc2FtcGxlIGNvdW50ID4gMQBWQUxJREFURV9TSEFERVJERVNDX1VCX0FSUkFZX0NPVU5UOiB1bmlmb3JtIGFycmF5IGNvdW50IG11c3QgYmUgPj0gMQBWQUxJREFURV9JTUFHRURFU0NfTVNBQV9OVU1fTUlQTUFQUzogTVNBQSBpbWFnZXMgbXVzdCBoYXZlIG51bV9taXBtYXBzID09IDEARGlnaXQwAG1haW4wAG51bGwwAGlUZXhDaGFubmVsMF9pU21wQ2hhbm5lbDAATnVtcGFkMAB2c180XzAAcHNfNF8wAEYxMABMSU5VWF9YMTFfUVVFUllfU1lTVEVNX0RQSV9GQUlMRUQ6IGZhaWxlZCB0byBxdWVyeSBzeXN0ZW0gZHBpIHZhbHVlLCBhc3N1bWluZyBkZWZhdWx0IDk2LjAAVkFMSURBVEVfQlVGRkVSREVTQ19TSVpFOiBzZ19idWZmZXJfZGVzYy5zaXplIGFuZCAuZGF0YS5zaXplIGNhbm5vdCBib3RoIGJlIDAAYXJyYXlfY291bnQgPiAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRVhQRUNUX1NBTVBMRUNPVU5UOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5zYW1wbGVfY291bnQgPiAwAHBhc3NfZGVmLnN3YXBjaGFpbi5zYW1wbGVfY291bnQgPiAwAGludGVyX2NtZF9jb3VudCA+IDAAZGVzYy0+aGVpZ2h0ID4gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0VYUEVDVF9IRUlHSFQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLmhlaWdodCA+IDAAcGFzc19kZWYuc3dhcGNoYWluLmhlaWdodCA+IDAAZGVzYy0+bWF4X2NvbW1pdF9saXN0ZW5lcnMgPiAwAHQtPm51bSA+IDAAZGVzYy0+d2lkdGggPiAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRVhQRUNUX1dJRFRIOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi53aWR0aCA+IDAAcGFzc19kZWYuc3dhcGNoYWluLndpZHRoID4gMAB1Yl9kZXNjLT5zaXplID4gMABkZXNjLT5waXhlbHMuc2l6ZSA+IDAAX3NncC5jdXJfc3RhdGUgPiAwAGxfc3RhdGUtPnN0cmlkZSA+IDAAVkFMSURBVEVfSU1BR0VERVNDX0hFSUdIVDogc2dfaW1hZ2VfZGVzYy5oZWlnaHQgbXVzdCBiZSA+IDAAVkFMSURBVEVfSU1BR0VERVNDX1dJRFRIOiBzZ19pbWFnZV9kZXNjLndpZHRoIG11c3QgYmUgPiAwAGRlc2MtPnNhbXBsZV9jb3VudCA+PSAwAGJhc2VfZWxlbWVudCA+PSAwAGRlc2MtPmhlaWdodCA+PSAwAG51bV9lbGVtZW50cyA+PSAwAGRlc2MtPm1heF9kcm9wcGVkX2ZpbGVzID49IDAAbnVtX2luc3RhbmNlcyA+PSAwAGRlc2MtPnN3YXBfaW50ZXJ2YWwgPj0gMABkZXNjLT5tYXhfZHJvcHBlZF9maWxlX3BhdGhfbGVuZ3RoID49IDAAZGVzYy0+d2lkdGggPj0gMABkZXNjLT5jbGlwYm9hcmRfc2l6ZSA+PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fV0dQVV9FWFBFQ1RfUkVOREVSVklFV19OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLndncHUucmVuZGVyX3ZpZXcgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0QzRDExX0VYUEVDVF9SRU5ERVJWSUVXX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uZDNkMTEucmVuZGVyX3ZpZXcgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX1dHUFVfRVhQRUNUX0RFUFRIU1RFTkNJTFZJRVdfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi53Z3B1LmRlcHRoX3N0ZW5jaWxfdmlldyA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRDNEMTFfRVhQRUNUX0RFUFRIU1RFTkNJTFZJRVdfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5kM2QxMS5kZXB0aF9zdGVuY2lsX3ZpZXcgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX1dHUFVfRVhQRUNUX1JFU09MVkVWSUVXX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ud2dwdS5yZXNvbHZlX3ZpZXcgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0QzRDExX0VYUEVDVF9SRVNPTFZFVklFV19OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLmQzZDExLnJlc29sdmVfdmlldyA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRVhQRUNUX1NBTVBMRUNPVU5UX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uc2FtcGxlX2NvdW50ID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9FWFBFQ1RfSEVJR0hUX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uaGVpZ2h0ID09IDAAX3NnLmN1cl9wYXNzLmF0dHMgPT0gMABzdGFnZS0+bnVtX3NhbXBsZXJzID09IDAAc3RhZ2UtPm51bV9pbWFnZV9zYW1wbGVycyA9PSAwAHN0YWdlLT5udW1fc3RvcmFnZV9idWZmZXJzID09IDAAdWItPm51bV91bmlmb3JtcyA9PSAwAHN0YWdlLT5udW1fdW5pZm9ybV9ibG9ja3MgPT0gMABzdGFnZS0+bnVtX2ltYWdlcyA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fR0xfRVhQRUNUX0ZSQU1FQlVGRkVSX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uZ2wuZnJhbWVidWZmZXIgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0VYUEVDVF9XSURUSF9OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLndpZHRoID09IDAAX3NncC5jdXJfc3RhdGUgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX01FVEFMX0VYUEVDVF9NU0FBQ09MT1JURVhUVVJFX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ubWV0YWwubXNhYV9jb2xvcl90ZXh0dXJlID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9NRVRBTF9FWFBFQ1RfREVQVEhTVEVOQ0lMVEVYVFVSRV9OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLm1ldGFsLmRlcHRoX3N0ZW5jaWxfdGV4dHVyZSA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fTUVUQUxfRVhQRUNUX0NVUlJFTlREUkFXQUJMRV9OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLm1ldGFsLmN1cnJlbnRfZHJhd2FibGUgPT0gMABfc2dwLmluaXRfY29va2llID09IDAAKGRpbSAlIDgpID09IDAAZ2xHZXRFcnJvcigpID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9XR1BVX0VYUEVDVF9SRU5ERVJWSUVXOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi53Z3B1LnJlbmRlcl92aWV3ICE9IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9EM0QxMV9FWFBFQ1RfUkVOREVSVklFVzogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uZDNkMTEucmVuZGVyX3ZpZXcgIT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX1dHUFVfRVhQRUNUX0RFUFRIU1RFTkNJTFZJRVc6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLndncHUuZGVwdGhfc3RlbmNpbF92aWV3ICE9IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9EM0QxMV9FWFBFQ1RfREVQVEhTVEVOQ0lMVklFVzogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uZDNkMTEuZGVwdGhfc3RlbmNpbF92aWV3ICE9IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9XR1BVX0VYUEVDVF9SRVNPTFZFVklFVzogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ud2dwdS5yZXNvbHZlX3ZpZXcgIT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0QzRDExX0VYUEVDVF9SRVNPTFZFVklFVzogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uZDNkMTEucmVzb2x2ZV92aWV3ICE9IDAAc2xvdC0+dGFyZ2V0ICE9IDAAZGVzYy0+cGl4ZWxzLnB0ciAhPSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fTUVUQUxfRVhQRUNUX01TQUFDT0xPUlRFWFRVUkU6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLm1ldGFsLm1zYWFfY29sb3JfdGV4dHVyZSAhPSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fTUVUQUxfRVhQRUNUX0RFUFRIU1RFTkNJTFRFWFRVUkU6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLm1ldGFsLmRlcHRoX3N0ZW5jaWxfdGV4dHVyZSAhPSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fTUVUQUxfRVhQRUNUX0NVUlJFTlREUkFXQUJMRTogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ubWV0YWwuY3VycmVudF9kcmF3YWJsZSAhPSAwAFdJTjMyX0QzRDExX0NSRUFURV9ERVZJQ0VfQU5EX1NXQVBDSEFJTl9XSVRIX0RFQlVHX0ZBSUxFRDogRDNEMTFDcmVhdGVEZXZpY2VBbmRTd2FwQ2hhaW4oKSB3aXRoIEQzRDExX0NSRUFURV9ERVZJQ0VfREVCVUcgZmFpbGVkLCByZXRyeWluZyB3aXRob3V0IGRlYnVnIGZsYWcuAFZBTElEQVRFX1NIQURFUkRFU0NfU1RPUkFHRUJVRkZFUl9SRUFET05MWTogc2hhZGVyIHN0YWdlIHN0b3JhZ2UgYnVmZmVycyBtdXN0IGJlIHJlYWRvbmx5IChzZ19zaGFkZXJfZGVzYy52c3xmcy5zdG9yYWdlX2J1ZmZlcnNbXS5yZWFkb25seSkAV0dQVV9TSEFERVJfVE9PX01BTllfU0FNUExFUlM6IHNoYWRlciB1c2VzIHRvbyBtYW55IHNhbXBsZXJzIG9uIHNoYWRlciBzdGFnZSAod2dwdSkAV0dQVV9TSEFERVJfVE9PX01BTllfU1RPUkFHRUJVRkZFUlM6IHNoYWRlciB1c2VzIHRvbyBtYW55IHN0b3JhZ2UgYnVmZmVyIGJpbmRpbmdzIG9uIHNoYWRlciBzdGFnZSAod2dwdSkAV0dQVV9TSEFERVJfVE9PX01BTllfSU1BR0VTOiBzaGFkZXIgdXNlcyB0b28gbWFueSBzYW1wbGVkIGltYWdlcyBvbiBzaGFkZXIgc3RhZ2UgKHdncHUpAFdHUFVfQklOREdST1VQU0NBQ0hFX1NJWkVfUE9XMjogc2dfZGVzYy53Z3B1X2JpbmRncm91cHNfY2FjaGVfc2l6ZSBtdXN0IGJlIGEgcG93ZXIgb2YgMiAod2dwdSkAV0dQVV9CSU5ER1JPVVBTQ0FDSEVfU0laRV9HUkVBVEVSX09ORTogc2dfZGVzYy53Z3B1X2JpbmRncm91cHNfY2FjaGVfc2l6ZSBtdXN0IGJlID4gMSAod2dwdSkAV0dQVV9CSU5ER1JPVVBTX1BPT0xfRVhIQVVTVEVEOiBiaW5kZ3JvdXBzIHBvb2wgZXhoYXVzdGVkIChpbmNyZWFzZSBzZ19kZXNjLmJpbmRncm91cHNfY2FjaGVfc2l6ZSkgKHdncHUpAFZBTElEQVRFX1NIQURFUkRFU0NfU0FNUExFUl9OT1RfUkVGRVJFTkNFRF9CWV9JTUFHRV9TQU1QTEVSX1BBSVJTOiBzaGFkZXIgc3RhZ2U6IG9uZSBvciBtb3JlIHNhbXBsZXJzIGFyZSBub3QgcmVmZXJlbmNlZCBieSBpbWFnZS1zYW1wbGVyLXBhaXJzIChzZ19zaGFkZXJfZGVzYy52c3xmcy5pbWFnZV9zYW1wbGVyX3BhaXJzW10uc2FtcGxlcl9zbG90KQBWQUxJREFURV9TSEFERVJERVNDX0lNQUdFX1NBTVBMRVJfUEFJUl9TQU1QTEVSX1NMT1RfT1VUX09GX1JBTkdFOiBzaGFkZXIgc3RhZ2U6IGltYWdlLXNhbXBsZXItcGFpciBpbWFnZSBzbG90IGluZGV4IGlzIG91dCBvZiByYW5nZSAoc2dfc2hhZGVyX2Rlc2MudnN8ZnMuaW1hZ2Vfc2FtcGxlcl9wYWlyc1tdLnNhbXBsZXJfc2xvdCkAVkFMSURBVEVfU0hBREVSREVTQ19JTUFHRV9TQU1QTEVSX1BBSVJfSU1BR0VfU0xPVF9PVVRfT0ZfUkFOR0U6IHNoYWRlciBzdGFnZTogaW1hZ2Utc2FtcGxlci1wYWlyIGltYWdlIHNsb3QgaW5kZXggaXMgb3V0IG9mIHJhbmdlIChzZ19zaGFkZXJfZGVzYy52c3xmcy5pbWFnZV9zYW1wbGVyX3BhaXJzW10uaW1hZ2Vfc2xvdCkAVkFMSURBVEVfU0hBREVSREVTQ19JTUFHRV9OT1RfUkVGRVJFTkNFRF9CWV9JTUFHRV9TQU1QTEVSX1BBSVJTOiBzaGFkZXIgc3RhZ2U6IG9uZSBvciBtb3JlIGltYWdlcyBhcmUgbm90ZSByZWZlcmVuY2VkIGJ5ICAoc2dfc2hhZGVyX2Rlc2MudnN8ZnMuaW1hZ2Vfc2FtcGxlcl9wYWlyc1tdLmltYWdlX3Nsb3QpACgweDg4OTIgPT0gdGFyZ2V0KSB8fCAoMHg4ODkzID09IHRhcmdldCkgfHwgKDB4OTBEMiA9PSB0YXJnZXQpAChpbWdfc21wX2Rlc2MtPnNhbXBsZXJfc2xvdCA+PSAwKSAmJiAoaW1nX3NtcF9kZXNjLT5zYW1wbGVyX3Nsb3QgPCBzdGFnZS0+bnVtX3NhbXBsZXJzKQBJTUFHRV9EQVRBX1NJWkVfTUlTTUFUQ0g6IGltYWdlIGRhdGEgc2l6ZSBtaXNtYXRjaCAobXVzdCBiZSB3aWR0aCpoZWlnaHQqNCBieXRlcykAKGluZGV4ID49IDApICYmIChpbmRleCA8PSBfc2FwcC5kcm9wLm1heF9maWxlcykAKGltZ19zbXBfZGVzYy0+aW1hZ2Vfc2xvdCA+PSAwKSAmJiAoaW1nX3NtcF9kZXNjLT5pbWFnZV9zbG90IDwgc3RhZ2UtPm51bV9pbWFnZXMpAHNncF9nZXRfZXJyb3JfbWVzc2FnZShlcnJvcikAVkFMSURBVEVfSU1BR0VEQVRBX05PREFUQTogc2dfaW1hZ2VfZGF0YTogbm8gZGF0YSAoLnB0ciBhbmQvb3IgLnNpemUgaXMgemVybykAKGRlc2MtPmFsbG9jYXRvci5hbGxvY19mbiAmJiBkZXNjLT5hbGxvY2F0b3IuZnJlZV9mbikgfHwgKCFkZXNjLT5hbGxvY2F0b3IuYWxsb2NfZm4gJiYgIWRlc2MtPmFsbG9jYXRvci5mcmVlX2ZuKQAobnVsbCkAR0xfVkVSVEVYX0FUVFJJQlVURV9OT1RfRk9VTkRfSU5fU0hBREVSOiB2ZXJ0ZXggYXR0cmlidXRlIG5vdCBmb3VuZCBpbiBzaGFkZXIgKGdsKQBHTF9URVhUVVJFX05BTUVfTk9UX0ZPVU5EX0lOX1NIQURFUjogdGV4dHVyZSBuYW1lIG5vdCBmb3VuZCBpbiBzaGFkZXIgKGdsKQBHTF9URVhUVVJFX0ZPUk1BVF9OT1RfU1VQUE9SVEVEOiBwaXhlbCBmb3JtYXQgbm90IHN1cHBvcnRlZCBmb3IgdGV4dHVyZSAoZ2wpAEdMX0FSUkFZX1RFWFRVUkVTX05PVF9TVVBQT1JURUQ6IGFycmF5IHRleHR1cmVzIG5vdCBzdXBwb3J0ZWQgKGdsKQBHTF8zRF9URVhUVVJFU19OT1RfU1VQUE9SVEVEOiAzZCB0ZXh0dXJlcyBub3Qgc3VwcG9ydGVkIChnbCkAR0xfU0hBREVSX0NPTVBJTEFUSU9OX0ZBSUxFRDogc2hhZGVyIGNvbXBpbGF0aW9uIGZhaWxlZCAoZ2wpAEdMX1NIQURFUl9MSU5LSU5HX0ZBSUxFRDogc2hhZGVyIGxpbmtpbmcgZmFpbGVkIChnbCkAR0xfRlJBTUVCVUZGRVJfU1RBVFVTX0lOQ09NUExFVEVfTUlTU0lOR19BVFRBQ0hNRU5UOiBmcmFtZWJ1ZmZlciBjb21wbGV0ZW5lc3MgY2hlY2sgZmFpbGVkIHdpdGggR0xfRlJBTUVCVUZGRVJfSU5DT01QTEVURV9NSVNTSU5HX0FUVEFDSE1FTlQgKGdsKQBHTF9GUkFNRUJVRkZFUl9TVEFUVVNfSU5DT01QTEVURV9BVFRBQ0hNRU5UOiBmcmFtZWJ1ZmZlciBjb21wbGV0ZW5lc3MgY2hlY2sgZmFpbGVkIHdpdGggR0xfRlJBTUVCVUZGRVJfSU5DT01QTEVURV9BVFRBQ0hNRU5UIChnbCkAR0xfRlJBTUVCVUZGRVJfU1RBVFVTX0lOQ09NUExFVEVfTVVMVElTQU1QTEU6IGZyYW1lYnVmZmVyIGNvbXBsZXRlbmVzcyBjaGVjayBmYWlsZWQgd2l0aCBHTF9GUkFNRUJVRkZFUl9JTkNPTVBMRVRFX01VTFRJU0FNUExFIChnbCkAR0xfRlJBTUVCVUZGRVJfU1RBVFVTX1VOU1VQUE9SVEVEOiBmcmFtZWJ1ZmZlciBjb21wbGV0ZW5lc3MgY2hlY2sgZmFpbGVkIHdpdGggR0xfRlJBTUVCVUZGRVJfVU5TVVBQT1JURUQgKGdsKQBHTF9GUkFNRUJVRkZFUl9TVEFUVVNfVU5ERUZJTkVEOiBmcmFtZWJ1ZmZlciBjb21wbGV0ZW5lc3MgY2hlY2sgZmFpbGVkIHdpdGggR0xfRlJBTUVCVUZGRVJfVU5ERUZJTkVEIChnbCkAR0xfRlJBTUVCVUZGRVJfU1RBVFVTX1VOS05PV046IGZyYW1lYnVmZmVyIGNvbXBsZXRlbmVzcyBjaGVjayBmYWlsZWQgKHVua25vd24gcmVhc29uKSAoZ2wpAE1FVEFMX0NSRUFURV9TQU1QTEVSX0ZBSUxFRDogZmFpbGVkIHRvIGNyZWF0ZSBzYW1wbGVyIG9iamVjdCAobWV0YWwpAE1FVEFMX0NSRUFURV9CVUZGRVJfRkFJTEVEOiBmYWlsZWQgdG8gY3JlYXRlIGJ1ZmZlciBvYmplY3QgKG1ldGFsKQBNRVRBTF9DUkVBVEVfVEVYVFVSRV9GQUlMRUQ6IGZhaWxlZCB0byBjcmVhdGUgdGV4dHVyZSBvYmplY3QgKG1ldGFsKQBNRVRBTF9DUkVBVEVfRFNTX0ZBSUxFRDogZmFpbGVkIHRvIGNyZWF0ZSBkZXB0aCBzdGVuY2lsIHN0YXRlIChtZXRhbCkATUVUQUxfQ1JFQVRFX1JQU19GQUlMRUQ6IGZhaWxlZCB0byBjcmVhdGUgcmVuZGVyIHBpcGVsaW5lIHN0YXRlIChtZXRhbCkATUVUQUxfVEVYVFVSRV9GT1JNQVRfTk9UX1NVUFBPUlRFRDogcGl4ZWwgZm9ybWF0IG5vdCBzdXBwb3J0ZWQgZm9yIHRleHR1cmUgKG1ldGFsKQBNRVRBTF9GUkFHTUVOVF9TSEFERVJfRU5UUllfTk9UX0ZPVU5EOiBmcmFnbWVudCBzaGFkZXIgZW50cnkgbm90IGZvdW5kIChtZXRhbCkATUVUQUxfVkVSVEVYX1NIQURFUl9FTlRSWV9OT1RfRk9VTkQ6IHZlcnRleCBzaGFkZXIgZW50cnkgZnVuY3Rpb24gbm90IGZvdW5kIChtZXRhbCkATUVUQUxfU0hBREVSX0NPTVBJTEFUSU9OX0ZBSUxFRDogc2hhZGVyIGNvbXBpbGF0aW9uIGZhaWxlZCAobWV0YWwpAE1FVEFMX1NIQURFUl9DUkVBVElPTl9GQUlMRUQ6IHNoYWRlciBjcmVhdGlvbiBmYWlsZWQgKG1ldGFsKQBXSU4zMl9SRUdJU1RFUl9SQVdfSU5QVVRfREVWSUNFU19GQUlMRURfTU9VU0VfVU5MT0NLOiBSZWdpc3RlclJhd0lucHV0RGV2aWNlcygpIGZhaWxlZCAob24gbW91c2UgdW5sb2NrKQBXSU4zMl9SRUdJU1RFUl9SQVdfSU5QVVRfREVWSUNFU19GQUlMRURfTU9VU0VfTE9DSzogUmVnaXN0ZXJSYXdJbnB1dERldmljZXMoKSBmYWlsZWQgKG9uIG1vdXNlIGxvY2spAERST1BQRURfRklMRV9QQVRIX1RPT19MT05HOiBkcm9wcGVkIGZpbGUgcGF0aCB0b28gbG9uZyAoc2FwcF9kZXNjLm1heF9kcm9wcGVkX2ZpbGVkX3BhdGhfbGVuZ3RoKQAhX3NhcHBfcmluZ19lbXB0eShyaW5nKQAhX3NhcHBfcmluZ19mdWxsKHJpbmcpAChzbG90X2luZGV4ID4gMCkgJiYgKHNsb3RfaW5kZXggPCBwb29sLT5zaXplKQAoc2xvdF9pbmRleCA+ICgwKSkgJiYgKHNsb3RfaW5kZXggPCBwb29sLT5zaXplKQAoc2xvdF9pbmRleCA+ICgwKSkgJiYgKHNsb3RfaW5kZXggPCBwLT5hdHRhY2htZW50c19wb29sLnNpemUpAChzbG90X2luZGV4ID4gKDApKSAmJiAoc2xvdF9pbmRleCA8IHAtPnNhbXBsZXJfcG9vbC5zaXplKQAoc2xvdF9pbmRleCA+ICgwKSkgJiYgKHNsb3RfaW5kZXggPCBwLT5idWZmZXJfcG9vbC5zaXplKQAoc2xvdF9pbmRleCA+ICgwKSkgJiYgKHNsb3RfaW5kZXggPCBwLT5zaGFkZXJfcG9vbC5zaXplKQAoc2xvdF9pbmRleCA+ICgwKSkgJiYgKHNsb3RfaW5kZXggPCBwLT5waXBlbGluZV9wb29sLnNpemUpAChzbG90X2luZGV4ID4gKDApKSAmJiAoc2xvdF9pbmRleCA8IHAtPmltYWdlX3Bvb2wuc2l6ZSkAVkFMSURBVEVfQlVGRkVSREVTQ19EQVRBOiBpbW11dGFibGUgYnVmZmVycyBtdXN0IGJlIGluaXRpYWxpemVkIHdpdGggZGF0YSAoc2dfYnVmZmVyX2Rlc2MuZGF0YS5wdHIgYW5kIHNnX2J1ZmZlcl9kZXNjLmRhdGEuc2l6ZSkAVkFMSURBVEVfU0hBREVSREVTQ19JTUFHRV9TQU1QTEVSX1BBSVJfTkFNRV9SRVFVSVJFRF9GT1JfR0w6IHNoYWRlciBzdGFnZTogaW1hZ2Utc2FtcGxlci1wYWlycyBtdXN0IGJlIG5hbWVkIGluIEdMIChzZ19zaGFkZXJfZGVzYy52c3xmcy5pbWFnZV9zYW1wbGVyX3BhaXJzW10ubmFtZSkAcCAmJiAoU0dfSU5WQUxJRF9JRCAhPSBhdHRzX2lkKQBwICYmIChTR19JTlZBTElEX0lEICE9IHNtcF9pZCkAcCAmJiAoU0dfSU5WQUxJRF9JRCAhPSBwaXBfaWQpAHAgJiYgKFNHX0lOVkFMSURfSUQgIT0gaW1nX2lkKQBwICYmIChTR19JTlZBTElEX0lEICE9IGJ1Zl9pZCkAcCAmJiAoU0dfSU5WQUxJRF9JRCAhPSBzaGRfaWQpAHBpcC0+c2hhZGVyICYmIChwaXAtPmNtbi5zaGFkZXJfaWQuaWQgPT0gcGlwLT5zaGFkZXItPnNsb3QuaWQpAHBpcCAmJiAocGlwLT5zbG90LmlkID09IF9zZy5jdXJfcGlwZWxpbmUuaWQpAHBpcC0+c2hhZGVyICYmIChwaXAtPnNoYWRlci0+c2xvdC5pZCA9PSBwaXAtPmNtbi5zaGFkZXJfaWQuaWQpAFZBTElEQVRFX1NIQURFUkRFU0NfTk9fQ09OVF9JTUFHRV9TQU1QTEVSX1BBSVJTOiBzaGFkZXIgc3RhZ2UgaW1hZ2Utc2FtcGxlci1wYWlycyBtdXN0IG9jY3VweSBjb250aW51b3VzIHNsb3RzIChzZ19zaGFkZXJfZGVzYy52c3xmcy5pbWFnZV9zYW1wbGVyc1tdKQBWQUxJREFURV9TSEFERVJERVNDX05PX0NPTlRfU0FNUExFUlM6IHNoYWRlciBzdGFnZSBzYW1wbGVycyBtdXN0IG9jY3VweSBjb250aW51b3VzIHNsb3RzIChzZ19zaGFkZXJfZGVzYy52c3xmcy5zYW1wbGVyc1tdKQBWQUxJREFURV9TSEFERVJERVNDX05PX0NPTlRfU1RPUkFHRUJVRkZFUlM6IHNoYWRlciBzdGFnZSBzdG9yYWdlIGJ1ZmZlcnMgbXVzdCBvY2N1cHkgY29udGludW91cyBzbG90cyAoc2dfc2hhZGVyX2Rlc2MudnN8ZnMuc3RvcmFnZV9idWZmZXJzW10pAFZBTElEQVRFX1NIQURFUkRFU0NfTk9fQ09OVF9JTUFHRVM6IHNoYWRlciBzdGFnZSBpbWFnZXMgbXVzdCBvY2N1cHkgY29udGludW91cyBzbG90cyAoc2dfc2hhZGVyX2Rlc2MudnN8ZnMuaW1hZ2VzW10pAChkZXNjLT5jb2xvcl9jb3VudCA+PSAwKSAmJiAoZGVzYy0+Y29sb3JfY291bnQgPD0gU0dfTUFYX0NPTE9SX0FUVEFDSE1FTlRTKQBhdHRzICYmIChpbmRleCA+PSAwKSAmJiAoaW5kZXggPCBTR19NQVhfQ09MT1JfQVRUQUNITUVOVFMpAChzbG90ID49IDApICYmIChzbG90IDwgU0dfTUFYX1NIQURFUlNUQUdFX1NUT1JBR0VCVUZGRVJTKQAoc3RhZ2VfaW5kZXggPT0gU0dfU0hBREVSU1RBR0VfVlMpIHx8IChzdGFnZV9pbmRleCA9PSBTR19TSEFERVJTVEFHRV9GUykAKHN0YWdlID09IFNHX1NIQURFUlNUQUdFX1ZTKSB8fCAoc3RhZ2UgPT0gU0dfU0hBREVSU1RBR0VfRlMpAChzdGFnZSA+PSAwKSAmJiAoc3RhZ2UgPCBTR19OVU1fU0hBREVSX1NUQUdFUykAKG51bV9pbWFnZXMgPiAwKSAmJiAobnVtX2ltYWdlcyA8PSBTQVBQX01BWF9JQ09OSU1BR0VTKQAodWJfaW5kZXggPj0gMCkgJiYgKHViX2luZGV4IDwgU0dfTUFYX1NIQURFUlNUQUdFX1VCUykAKGZtdF9pbmRleCA+IFNHX1BJWEVMRk9STUFUX05PTkUpICYmIChmbXRfaW5kZXggPCBfU0dfUElYRUxGT1JNQVRfTlVNKQAoZm10X2luZGV4ID49IDApICYmIChmbXRfaW5kZXggPCBfU0dfUElYRUxGT1JNQVRfTlVNKQAoKGludClmbXQgPj0gMCkgJiYgKChpbnQpZm10IDwgX1NHX1BJWEVMRk9STUFUX05VTSkAKGRlc2MtPmF0dGFjaG1lbnRzX3Bvb2xfc2l6ZSA+IDApICYmIChkZXNjLT5hdHRhY2htZW50c19wb29sX3NpemUgPCBfU0dfTUFYX1BPT0xfU0laRSkAKGRlc2MtPnNhbXBsZXJfcG9vbF9zaXplID4gMCkgJiYgKGRlc2MtPnNhbXBsZXJfcG9vbF9zaXplIDwgX1NHX01BWF9QT09MX1NJWkUpAChkZXNjLT5idWZmZXJfcG9vbF9zaXplID4gMCkgJiYgKGRlc2MtPmJ1ZmZlcl9wb29sX3NpemUgPCBfU0dfTUFYX1BPT0xfU0laRSkAKGRlc2MtPnNoYWRlcl9wb29sX3NpemUgPiAwKSAmJiAoZGVzYy0+c2hhZGVyX3Bvb2xfc2l6ZSA8IF9TR19NQVhfUE9PTF9TSVpFKQAoZGVzYy0+cGlwZWxpbmVfcG9vbF9zaXplID4gMCkgJiYgKGRlc2MtPnBpcGVsaW5lX3Bvb2xfc2l6ZSA8IF9TR19NQVhfUE9PTF9TSVpFKQAoZGVzYy0+aW1hZ2VfcG9vbF9zaXplID4gMCkgJiYgKGRlc2MtPmltYWdlX3Bvb2xfc2l6ZSA8IF9TR19NQVhfUE9PTF9TSVpFKQBzbXAgJiYgKHNtcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0FMTE9DKSAmJiAoc21wLT5zbG90LmlkICE9IFNHX0lOVkFMSURfSUQpAHBpcCAmJiAocGlwLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfQUxMT0MpICYmIChwaXAtPnNsb3QuaWQgIT0gU0dfSU5WQUxJRF9JRCkAaW1nICYmIChpbWctPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9BTExPQykgJiYgKGltZy0+c2xvdC5pZCAhPSBTR19JTlZBTElEX0lEKQBidWYgJiYgKGJ1Zi0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0FMTE9DKSAmJiAoYnVmLT5zbG90LmlkICE9IFNHX0lOVkFMSURfSUQpAHNoZCAmJiAoc2hkLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfQUxMT0MpICYmIChzaGQtPnNsb3QuaWQgIT0gU0dfSU5WQUxJRF9JRCkAKHBpcC0+c2hhZGVyID09IDApICYmIChwaXAtPmNtbi5zaGFkZXJfaWQuaWQgIT0gU0dfSU5WQUxJRF9JRCkAKHNtcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX1ZBTElEKXx8KHNtcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0ZBSUxFRCkAKHNtcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX1ZBTElEKSB8fCAoc21wLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfRkFJTEVEKQAocGlwLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfVkFMSUQpfHwocGlwLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfRkFJTEVEKQAocGlwLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfVkFMSUQpIHx8IChwaXAtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9GQUlMRUQpAChpbWctPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9WQUxJRCl8fChpbWctPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9GQUlMRUQpAChpbWctPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9WQUxJRCkgfHwgKGltZy0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0ZBSUxFRCkAKGJ1Zi0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX1ZBTElEKXx8KGJ1Zi0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0ZBSUxFRCkAKGJ1Zi0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX1ZBTElEKSB8fCAoYnVmLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfRkFJTEVEKQAoc2hkLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfVkFMSUQpfHwoc2hkLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfRkFJTEVEKQAoc2hkLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfVkFMSUQpIHx8IChzaGQtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9GQUlMRUQpAHNtcCAmJiAoc21wLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfQUxMT0MpAHBpcCAmJiAocGlwLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfQUxMT0MpAGltZyAmJiAoaW1nLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfQUxMT0MpAGJ1ZiAmJiAoYnVmLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfQUxMT0MpAHNoZCAmJiAoc2hkLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfQUxMT0MpAFdJTjMyX1dHTF9PUEVOR0xfVkVSU0lPTl9OT1RfU1VQUE9SVEVEOiByZXF1ZXN0ZWQgT3BlbkdMIHZlcnNpb24gbm90IHN1cHBvcnRlZCBieSBHTCBkcml2ZXIgKEVSUk9SX0lOVkFMSURfVkVSU0lPTl9BUkIpAFdJTjMyX1dHTF9PUEVOR0xfUFJPRklMRV9OT1RfU1VQUE9SVEVEOiByZXF1ZXN0ZWQgT3BlbkdMIHByb2ZpbGUgbm90IHN1cHBvcnQgYnkgR0wgZHJpdmVyIChFUlJPUl9JTlZBTElEX1BST0ZJTEVfQVJCKQBWQUxJREFURV9TSEFERVJERVNDX0FUVFJfU1RSSU5HX1RPT19MT05HOiB2ZXJ0ZXggYXR0cmlidXRlIG5hbWUvc2VtYW50aWMgc3RyaW5nIHRvbyBsb25nIChtYXggbGVuIDE2KQBfc2dfbXVsdGlwbGVfdTY0KCh1aW50NjRfdClzdGFydF9wb3MsIDQpAFZBTElEQVRFX0JVRkZFUkRFU0NfU1RPUkFHRUJVRkZFUl9TVVBQT1JURUQ6IHN0b3JhZ2UgYnVmZmVycyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBiYWNrZW5kIDNEIEFQSSAocmVxdWlyZXMgT3BlbkdMID49IDQuMykATElOVVhfR0xYX1ZFUlNJT05fVE9PX0xPVzogR0xYIHZlcnNpb24gdG9vIGxvdyAobmVlZCBhdCBsZWFzdCAxLjMpAEQzRDExX0NSRUFURV9DT05TVEFOVF9CVUZGRVJfRkFJTEVEOiBDcmVhdGVCdWZmZXIoKSBmYWlsZWQgZm9yIHVuaWZvcm0gY29uc3RhbnQgYnVmZmVyIChkM2QxMSkARDNEMTFfTUFQX0ZPUl9BUFBFTkRfQlVGRkVSX0ZBSUxFRDogTWFwKCkgZmFpbGVkIHdoZW4gYXBwZW5kaW5nIHRvIGJ1ZmZlciAoZDNkMTEpAEQzRDExX01BUF9GT1JfVVBEQVRFX0JVRkZFUl9GQUlMRUQ6IE1hcCgpIGZhaWxlZCB3aGVuIHVwZGF0aW5nIGJ1ZmZlciAoZDNkMTEpAEQzRDExX0NSRUFURV9CVUZGRVJfU1JWX0ZBSUxFRDogQ3JlYXRlU2hhZGVyUmVzb3VyY2VWaWV3KCkgZmFpbGVkIGZvciBzdG9yYWdlIGJ1ZmZlciAoZDNkMTEpAEQzRDExX0NSRUFURV8yRF9URVhUVVJFX1VOU1VQUE9SVEVEX1BJWEVMX0ZPUk1BVDogcGl4ZWwgZm9ybWF0IG5vdCBzdXBwb3J0ZWQgZm9yIDJkLSwgY3ViZS0gb3IgYXJyYXktdGV4dHVyZSAoZDNkMTEpAEQzRDExX0NSRUFURV8yRF9TUlZfRkFJTEVEOiBDcmVhdGVTaGFkZXJSZXNvdXJjZVZpZXcoKSBmYWlsZWQgZm9yIDJkLSwgY3ViZS0gb3IgYXJyYXktdGV4dHVyZSAoZDNkMTEpAEQzRDExX0NSRUFURV8yRF9URVhUVVJFX0ZBSUxFRDogQ3JlYXRlVGV4dHVyZTJEKCkgZmFpbGVkIGZvciAyZC0sIGN1YmUtIG9yIGFycmF5LXRleHR1cmUgKGQzZDExKQBEM0QxMV9DUkVBVEVfTVNBQV9URVhUVVJFX0ZBSUxFRDogQ3JlYXRlVGV4dHVyZTJEKCkgZmFpbGVkIGZvciBNU0FBIHJlbmRlciB0YXJnZXQgdGV4dHVyZSAoZDNkMTEpAEQzRDExX0NSRUFURV9ERVBUSF9URVhUVVJFX1VOU1VQUE9SVEVEX1BJWEVMX0ZPUk1BVDogcGl4ZWwgZm9ybWF0IG5vdCBzdXBwb3J0ZWQgZm9yIGRlcHRoLXN0ZW5jaWwgdGV4dHVyZSAoZDNkMTEpAEQzRDExX0NSRUFURV9ERVBUSF9URVhUVVJFX0ZBSUxFRDogQ3JlYXRlVGV4dHVyZTJEKCkgZmFpbGVkIGZvciBkZXB0aC1zdGVuY2lsIHRleHR1cmUgKGQzZDExKQBEM0QxMV9DUkVBVEVfM0RfU1JWX0ZBSUxFRDogQ3JlYXRlU2hhZGVyUmVzb3VyY2VWaWV3KCkgZmFpbGVkIGZvciAzZCB0ZXh0dXJlIChkM2QxMSkARDNEMTFfQ1JFQVRFXzNEX1RFWFRVUkVfVU5TVVBQT1JURURfUElYRUxfRk9STUFUOiBwaXhlbCBmb3JtYXQgbm90IHN1cHBvcnRlZCBmb3IgM0QgdGV4dHVyZSAoZDNkMTEpAEQzRDExX01BUF9GT1JfVVBEQVRFX0lNQUdFX0ZBSUxFRDogTWFwKCkgZmFpbGVkIHdoZW4gdXBkYXRpbmcgaW1hZ2UgKGQzZDExKQBEM0QxMV9TSEFERVJfQ09NUElMQVRJT05fRkFJTEVEOiBzaGFkZXIgY29tcGlsYXRpb24gZmFpbGVkIChkM2QxMSkARDNEMTFfTE9BRF9EM0RDT01QSUxFUl80N19ETExfRkFJTEVEOiBsb2FkaW5nIGQzZGNvbXBpbGVyXzQ3LmRsbCBmYWlsZWQgKGQzZDExKQBEM0QxMV9DUkVBVEVfUlRWX0ZBSUxFRDogQ3JlYXRlUmVuZGVyVGFyZ2V0VmlldygpIGZhaWxlZCAoZDNkMTEpAEQzRDExX0NSRUFURV9EU1ZfRkFJTEVEOiBDcmVhdGVEZXB0aFN0ZW5jaWxWaWV3KCkgZmFpbGVkIChkM2QxMSkARDNEMTFfQ1JFQVRFX0lOUFVUX0xBWU9VVF9GQUlMRUQ6IENyZWF0ZUlucHV0TGF5b3V0KCkgZmFpbGVkIChkM2QxMSkARDNEMTFfQ1JFQVRFX0JVRkZFUl9GQUlMRUQ6IENyZWF0ZUJ1ZmZlcigpIGZhaWxlZCAoZDNkMTEpAEQzRDExX0NSRUFURV9SQVNURVJJWkVSX1NUQVRFX0ZBSUxFRDogQ3JlYXRlUmFzdGVyaXplclN0YXRlKCkgZmFpbGVkIChkM2QxMSkARDNEMTFfQ1JFQVRFX1NBTVBMRVJfU1RBVEVfRkFJTEVEOiBDcmVhdGVTYW1wbGVyU3RhdGUoKSBmYWlsZWQgKGQzZDExKQBEM0QxMV9DUkVBVEVfREVQVEhfU1RFTkNJTF9TVEFURV9GQUlMRUQ6IENyZWF0ZURlcHRoU3RlbmNpbFN0YXRlKCkgZmFpbGVkIChkM2QxMSkARDNEMTFfQ1JFQVRFX0JMRU5EX1NUQVRFX0ZBSUxFRDogQ3JlYXRlQmxlbmRTdGF0ZSgpIGZhaWxlZCAoZDNkMTEpAEQzRDExX0NSRUFURV8zRF9URVhUVVJFX0ZBSUxFRDogQ3JlYXRlVGV4dHVyZTNEKCkgZmFpbGVkIChkM2QxMSkATUFDT1NfSU5WQUxJRF9OU09QRU5HTF9QUk9GSUxFOiBtYWNvczogaW52YWxpZCBOU09wZW5HTFByb2ZpbGUgKHZhbGlkIGNob2ljZXMgYXJlIDEuMCBhbmQgNC4xKQBwb29sLT5xdWV1ZV90b3AgPD0gKHBvb2wtPnNpemUtMSkAcG9vbCAmJiAobnVtID49IDEpAChiaW5kaW5ncy0+X3N0YXJ0X2NhbmFyeSA9PSAwKSAmJiAoYmluZGluZ3MtPl9lbmRfY2FuYXJ5PT0wKQAoX3NhcHAuZnJhbWVidWZmZXJfd2lkdGggPiAwKSAmJiAoX3NhcHAuZnJhbWVidWZmZXJfaGVpZ2h0ID4gMCkAc3JjICYmIGRzdCAmJiAobWF4X2xlbiA+IDApAGJ1ZiAmJiBkYXRhICYmIGRhdGEtPnB0ciAmJiAoZGF0YS0+c2l6ZSA+IDApAHB0ciAmJiAoc2l6ZSA+IDApAChwYXNzLT5fc3RhcnRfY2FuYXJ5ID09IDApICYmIChwYXNzLT5fZW5kX2NhbmFyeSA9PSAwKQAoZGVzYy0+X3N0YXJ0X2NhbmFyeSA9PSAwKSAmJiAoZGVzYy0+X2VuZF9jYW5hcnkgPT0gMCkAKGFsaWduID4gMCkgJiYgKChhbGlnbiAmIChhbGlnbiAtIDEpKSA9PSAwKQAoc2xvdF9pbmRleCA+PSAwKSAmJiAoc2xvdF9pbmRleCA8IChTR19NQVhfU0hBREVSU1RBR0VfSU1BR0VTQU1QTEVSUEFJUlMgKiBTR19OVU1fU0hBREVSX1NUQUdFUykpAHNtcCAmJiAoKHNtcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX1ZBTElEKSB8fCAoc21wLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfRkFJTEVEKSkAcGlwICYmICgocGlwLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfVkFMSUQpIHx8IChwaXAtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9GQUlMRUQpKQBpbWcgJiYgKChpbWctPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9WQUxJRCkgfHwgKGltZy0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0ZBSUxFRCkpAGJ1ZiAmJiAoKGJ1Zi0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX1ZBTElEKSB8fCAoYnVmLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfRkFJTEVEKSkAc2hkICYmICgoc2hkLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfVkFMSUQpIHx8IChzaGQtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9GQUlMRUQpKQBBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTlNUQVJUOiBOYXRpdmVBY3Rpdml0eSBvblN0YXJ0KCkAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05TVE9QOiBOYXRpdmVBY3Rpdml0eSBvblN0b3AoKQBWQUxJREFURV9BVUJfTk9fUElQRUxJTkU6IHNnX2FwcGx5X3VuaWZvcm1zOiBtdXN0IGJlIGNhbGxlZCBhZnRlciBzZ19hcHBseV9waXBlbGluZSgpAEFORFJPSURfVU5TVVBQT1JURURfSU5QVVRfRVZFTlRfSU5QVVRfQ0I6IHVuc3VwcG9ydGVkIGlucHV0IGV2ZW50IGVuY291bnRlcmVkIGluIF9zYXBwX2FuZHJvaWRfaW5wdXRfY2IoKQBBTkRST0lEX1JFQURfTVNHX0ZBSUxFRDogZmFpbGVkIHRvIHJlYWQgbWVzc2FnZSBpbiBfc2FwcF9hbmRyb2lkX21haW5fY2IoKQBBTkRST0lEX1VOU1VQUE9SVEVEX0lOUFVUX0VWRU5UX01BSU5fQ0I6IHVuc3VwcG9ydGVkIGlucHV0IGV2ZW50IGVuY291bnRlcmVkIGluIF9zYXBwX2FuZHJvaWRfbWFpbl9jYigpAFdHUFVfUkVRVUVTVF9BREFQVEVSX1NUQVRVU19FUlJPUjogd2dwdTogcmVxdWVzdGluZyBhZGFwdGVyIGZhaWxlZCB3aXRoIHN0YXR1cyAnZXJyb3InAFdHUFVfUkVRVUVTVF9ERVZJQ0VfU1RBVFVTX0VSUk9SOiB3Z3B1OiByZXF1ZXN0aW5nIGRldmljZSBmYWlsZWQgd2l0aCBzdGF0dXMgJ2Vycm9yJwBXR1BVX1JFUVVFU1RfQURBUFRFUl9TVEFUVVNfVU5LTk9XTjogd2dwdTogcmVxdWVzdGluZyBhZGFwdGVyIGZhaWxlZCB3aXRoIHN0YXR1cyAndW5rbm93bicAV0dQVV9SRVFVRVNUX0RFVklDRV9TVEFUVVNfVU5LTk9XTjogd2dwdTogcmVxdWVzdGluZyBkZXZpY2UgZmFpbGVkIHdpdGggc3RhdHVzICd1bmtub3duJwBXR1BVX1JFUVVFU1RfQURBUFRFUl9TVEFUVVNfVU5BVkFJTEFCTEU6IHdncHU6IHJlcXVlc3RpbmcgYWRhcHRlciBmYWlsZWQgd2l0aCAndW5hdmFpbGFibGUnAExJTlVYX1gxMV9EUk9QUEVEX0ZJTEVfVVJJX1dST05HX1NDSEVNRTogZHJvcHBlZCBmaWxlIFVSTCBkb2Vzbid0IHN0YXJ0IHdpdGggJ2ZpbGU6Ly8nAGhlbGxvIQBdIABNRVRBTF9DUkVBVEVfUlBTX09VVFBVVDogAE1FVEFMX1NIQURFUl9DT01QSUxBVElPTl9PVVRQVVQ6IABEM0QxMV9TSEFERVJfQ09NUElMQVRJT05fT1VUUFVUOiAAOjA6IABob3N0OiB0ZXN0X3N0cnVjdF9pbiAtICV1eCV1CgBob3N0OiB0ZXN0X2J5dGVzX2luICgldSkgLSAldSAldSAldSAldQoARmFpbGVkIHRvIGNyZWF0ZSBncmFwaGljcyBjb250ZXh0OiAlcwoAaG9zdDogdGVzdF9zdHJpbmdfaW4gLSAlcwoAQUJPUlRJTkcgYmVjYXVzZSBvZiBbcGFuaWNdCgBGYWlsZWQgdG8gY3JlYXRlIGdyYXBoaWNzIGNvbnRleHQhCgAKCgAKCQAAAQIDAADIAAAAZAAAAAAAgD8AAAAAAAAAAAAAAAAAAIA/AAAAAP////8AAIC/AACAvwAAgD8AAIC/AACAPwAAgD8AAIC/AACAPwAAgL8AAIC/AACAPwAAgD///39///9/f///f////3//AAAAAAAAgD8AAIA/AACAPwAAgD8AAAAAAAAAAAAAAAD//39///9/f///f////3//I3ZlcnNpb24gNDEwCgpsYXlvdXQobG9jYXRpb24gPSAwKSBpbiB2ZWM0IGNvb3JkOwpsYXlvdXQobG9jYXRpb24gPSAwKSBvdXQgdmVjMiB0ZXhVVjsKbGF5b3V0KGxvY2F0aW9uID0gMSkgb3V0IHZlYzQgaUNvbG9yOwpsYXlvdXQobG9jYXRpb24gPSAxKSBpbiB2ZWM0IGNvbG9yOwoKdm9pZCBtYWluKCkKewogICAgZ2xfUG9zaXRpb24gPSB2ZWM0KGNvb3JkLnh5LCAwLjAsIDEuMCk7CiAgICB0ZXhVViA9IGNvb3JkLnp3OwogICAgaUNvbG9yID0gY29sb3I7Cn0KCgAAAAAAAAAjdmVyc2lvbiA0MTAKCnVuaWZvcm0gc2FtcGxlcjJEIGlUZXhDaGFubmVsMF9pU21wQ2hhbm5lbDA7CgpsYXlvdXQobG9jYXRpb24gPSAwKSBvdXQgdmVjNCBmcmFnQ29sb3I7CmxheW91dChsb2NhdGlvbiA9IDApIGluIHZlYzIgdGV4VVY7CmxheW91dChsb2NhdGlvbiA9IDEpIGluIHZlYzQgaUNvbG9yOwoKdm9pZCBtYWluKCkKewogICAgZnJhZ0NvbG9yID0gdGV4dHVyZShpVGV4Q2hhbm5lbDBfaVNtcENoYW5uZWwwLCB0ZXhVVikgKiBpQ29sb3I7Cn0KCgAAAAAAAAAAAAAAACN2ZXJzaW9uIDMwMCBlcwoKbGF5b3V0KGxvY2F0aW9uID0gMCkgaW4gdmVjNCBjb29yZDsKb3V0IHZlYzIgdGV4VVY7Cm91dCB2ZWM0IGlDb2xvcjsKbGF5b3V0KGxvY2F0aW9uID0gMSkgaW4gdmVjNCBjb2xvcjsKCnZvaWQgbWFpbigpCnsKICAgIGdsX1Bvc2l0aW9uID0gdmVjNChjb29yZC54eSwgMC4wLCAxLjApOwogICAgdGV4VVYgPSBjb29yZC56dzsKICAgIGlDb2xvciA9IGNvbG9yOwp9CgoAAAAAAAAAAAAAAAAAACN2ZXJzaW9uIDMwMCBlcwpwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDsKcHJlY2lzaW9uIGhpZ2hwIGludDsKCnVuaWZvcm0gaGlnaHAgc2FtcGxlcjJEIGlUZXhDaGFubmVsMF9pU21wQ2hhbm5lbDA7CgpsYXlvdXQobG9jYXRpb24gPSAwKSBvdXQgaGlnaHAgdmVjNCBmcmFnQ29sb3I7CmluIGhpZ2hwIHZlYzIgdGV4VVY7CmluIGhpZ2hwIHZlYzQgaUNvbG9yOwoKdm9pZCBtYWluKCkKewogICAgZnJhZ0NvbG9yID0gdGV4dHVyZShpVGV4Q2hhbm5lbDBfaVNtcENoYW5uZWwwLCB0ZXhVVikgKiBpQ29sb3I7Cn0KCgAAAAAAAAAAAAAAAABzdGF0aWMgZmxvYXQ0IGdsX1Bvc2l0aW9uOwpzdGF0aWMgZmxvYXQ0IGNvb3JkOwpzdGF0aWMgZmxvYXQyIHRleFVWOwpzdGF0aWMgZmxvYXQ0IGlDb2xvcjsKc3RhdGljIGZsb2F0NCBjb2xvcjsKCnN0cnVjdCBTUElSVl9Dcm9zc19JbnB1dAp7CiAgICBmbG9hdDQgY29vcmQgOiBURVhDT09SRDA7CiAgICBmbG9hdDQgY29sb3IgOiBURVhDT09SRDE7Cn07CgpzdHJ1Y3QgU1BJUlZfQ3Jvc3NfT3V0cHV0CnsKICAgIGZsb2F0MiB0ZXhVViA6IFRFWENPT1JEMDsKICAgIGZsb2F0NCBpQ29sb3IgOiBURVhDT09SRDE7CiAgICBmbG9hdDQgZ2xfUG9zaXRpb24gOiBTVl9Qb3NpdGlvbjsKfTsKCnZvaWQgdmVydF9tYWluKCkKewogICAgZ2xfUG9zaXRpb24gPSBmbG9hdDQoY29vcmQueHksIDAuMGYsIDEuMGYpOwogICAgdGV4VVYgPSBjb29yZC56dzsKICAgIGlDb2xvciA9IGNvbG9yOwp9CgpTUElSVl9Dcm9zc19PdXRwdXQgbWFpbihTUElSVl9Dcm9zc19JbnB1dCBzdGFnZV9pbnB1dCkKewogICAgY29vcmQgPSBzdGFnZV9pbnB1dC5jb29yZDsKICAgIGNvbG9yID0gc3RhZ2VfaW5wdXQuY29sb3I7CiAgICB2ZXJ0X21haW4oKTsKICAgIFNQSVJWX0Nyb3NzX091dHB1dCBzdGFnZV9vdXRwdXQ7CiAgICBzdGFnZV9vdXRwdXQuZ2xfUG9zaXRpb24gPSBnbF9Qb3NpdGlvbjsKICAgIHN0YWdlX291dHB1dC50ZXhVViA9IHRleFVWOwogICAgc3RhZ2Vfb3V0cHV0LmlDb2xvciA9IGlDb2xvcjsKICAgIHJldHVybiBzdGFnZV9vdXRwdXQ7Cn0KAAAAAAAAAAAAAABUZXh0dXJlMkQ8ZmxvYXQ0PiBpVGV4Q2hhbm5lbDAgOiByZWdpc3Rlcih0MCk7ClNhbXBsZXJTdGF0ZSBpU21wQ2hhbm5lbDAgOiByZWdpc3RlcihzMCk7CgpzdGF0aWMgZmxvYXQ0IGZyYWdDb2xvcjsKc3RhdGljIGZsb2F0MiB0ZXhVVjsKc3RhdGljIGZsb2F0NCBpQ29sb3I7CgpzdHJ1Y3QgU1BJUlZfQ3Jvc3NfSW5wdXQKewogICAgZmxvYXQyIHRleFVWIDogVEVYQ09PUkQwOwogICAgZmxvYXQ0IGlDb2xvciA6IFRFWENPT1JEMTsKfTsKCnN0cnVjdCBTUElSVl9Dcm9zc19PdXRwdXQKewogICAgZmxvYXQ0IGZyYWdDb2xvciA6IFNWX1RhcmdldDA7Cn07Cgp2b2lkIGZyYWdfbWFpbigpCnsKICAgIGZyYWdDb2xvciA9IGlUZXhDaGFubmVsMC5TYW1wbGUoaVNtcENoYW5uZWwwLCB0ZXhVVikgKiBpQ29sb3I7Cn0KClNQSVJWX0Nyb3NzX091dHB1dCBtYWluKFNQSVJWX0Nyb3NzX0lucHV0IHN0YWdlX2lucHV0KQp7CiAgICB0ZXhVViA9IHN0YWdlX2lucHV0LnRleFVWOwogICAgaUNvbG9yID0gc3RhZ2VfaW5wdXQuaUNvbG9yOwogICAgZnJhZ19tYWluKCk7CiAgICBTUElSVl9Dcm9zc19PdXRwdXQgc3RhZ2Vfb3V0cHV0OwogICAgc3RhZ2Vfb3V0cHV0LmZyYWdDb2xvciA9IGZyYWdDb2xvcjsKICAgIHJldHVybiBzdGFnZV9vdXRwdXQ7Cn0KAAAAAAAAACNpbmNsdWRlIDxtZXRhbF9zdGRsaWI+CiNpbmNsdWRlIDxzaW1kL3NpbWQuaD4KCnVzaW5nIG5hbWVzcGFjZSBtZXRhbDsKCnN0cnVjdCBtYWluMF9vdXQKewogICAgZmxvYXQyIHRleFVWIFtbdXNlcihsb2NuMCldXTsKICAgIGZsb2F0NCBpQ29sb3IgW1t1c2VyKGxvY24xKV1dOwogICAgZmxvYXQ0IGdsX1Bvc2l0aW9uIFtbcG9zaXRpb25dXTsKfTsKCnN0cnVjdCBtYWluMF9pbgp7CiAgICBmbG9hdDQgY29vcmQgW1thdHRyaWJ1dGUoMCldXTsKICAgIGZsb2F0NCBjb2xvciBbW2F0dHJpYnV0ZSgxKV1dOwp9OwoKdmVydGV4IG1haW4wX291dCBtYWluMChtYWluMF9pbiBpbiBbW3N0YWdlX2luXV0pCnsKICAgIG1haW4wX291dCBvdXQgPSB7fTsKICAgIG91dC5nbF9Qb3NpdGlvbiA9IGZsb2F0NChpbi5jb29yZC54eSwgMC4wLCAxLjApOwogICAgb3V0LnRleFVWID0gaW4uY29vcmQuenc7CiAgICBvdXQuaUNvbG9yID0gaW4uY29sb3I7CiAgICByZXR1cm4gb3V0Owp9CgoAAAAAAAAAAAAAAAAAAAAAI2luY2x1ZGUgPG1ldGFsX3N0ZGxpYj4KI2luY2x1ZGUgPHNpbWQvc2ltZC5oPgoKdXNpbmcgbmFtZXNwYWNlIG1ldGFsOwoKc3RydWN0IG1haW4wX291dAp7CiAgICBmbG9hdDQgZnJhZ0NvbG9yIFtbY29sb3IoMCldXTsKfTsKCnN0cnVjdCBtYWluMF9pbgp7CiAgICBmbG9hdDIgdGV4VVYgW1t1c2VyKGxvY24wKV1dOwogICAgZmxvYXQ0IGlDb2xvciBbW3VzZXIobG9jbjEpXV07Cn07CgpmcmFnbWVudCBtYWluMF9vdXQgbWFpbjAobWFpbjBfaW4gaW4gW1tzdGFnZV9pbl1dLCB0ZXh0dXJlMmQ8ZmxvYXQ+IGlUZXhDaGFubmVsMCBbW3RleHR1cmUoMCldXSwgc2FtcGxlciBpU21wQ2hhbm5lbDAgW1tzYW1wbGVyKDApXV0pCnsKICAgIG1haW4wX291dCBvdXQgPSB7fTsKICAgIG91dC5mcmFnQ29sb3IgPSBpVGV4Q2hhbm5lbDAuc2FtcGxlKGlTbXBDaGFubmVsMCwgaW4udGV4VVYpICogaW4uaUNvbG9yOwogICAgcmV0dXJuIG91dDsKfQoKAAAAI2luY2x1ZGUgPG1ldGFsX3N0ZGxpYj4KI2luY2x1ZGUgPHNpbWQvc2ltZC5oPgoKdXNpbmcgbmFtZXNwYWNlIG1ldGFsOwoKc3RydWN0IG1haW4wX291dAp7CiAgICBmbG9hdDIgdGV4VVYgW1t1c2VyKGxvY24wKV1dOwogICAgZmxvYXQ0IGlDb2xvciBbW3VzZXIobG9jbjEpXV07CiAgICBmbG9hdDQgZ2xfUG9zaXRpb24gW1twb3NpdGlvbl1dOwp9OwoKc3RydWN0IG1haW4wX2luCnsKICAgIGZsb2F0NCBjb29yZCBbW2F0dHJpYnV0ZSgwKV1dOwogICAgZmxvYXQ0IGNvbG9yIFtbYXR0cmlidXRlKDEpXV07Cn07Cgp2ZXJ0ZXggbWFpbjBfb3V0IG1haW4wKG1haW4wX2luIGluIFtbc3RhZ2VfaW5dXSkKewogICAgbWFpbjBfb3V0IG91dCA9IHt9OwogICAgb3V0LmdsX1Bvc2l0aW9uID0gZmxvYXQ0KGluLmNvb3JkLnh5LCAwLjAsIDEuMCk7CiAgICBvdXQudGV4VVYgPSBpbi5jb29yZC56dzsKICAgIG91dC5pQ29sb3IgPSBpbi5jb2xvcjsKICAgIHJldHVybiBvdXQ7Cn0KCgAAAAAAAAAAAAAAAAAAAAAjaW5jbHVkZSA8bWV0YWxfc3RkbGliPgojaW5jbHVkZSA8c2ltZC9zaW1kLmg+Cgp1c2luZyBuYW1lc3BhY2UgbWV0YWw7CgpzdHJ1Y3QgbWFpbjBfb3V0CnsKICAgIGZsb2F0NCBmcmFnQ29sb3IgW1tjb2xvcigwKV1dOwp9OwoKc3RydWN0IG1haW4wX2luCnsKICAgIGZsb2F0MiB0ZXhVViBbW3VzZXIobG9jbjApXV07CiAgICBmbG9hdDQgaUNvbG9yIFtbdXNlcihsb2NuMSldXTsKfTsKCmZyYWdtZW50IG1haW4wX291dCBtYWluMChtYWluMF9pbiBpbiBbW3N0YWdlX2luXV0sIHRleHR1cmUyZDxmbG9hdD4gaVRleENoYW5uZWwwIFtbdGV4dHVyZSgwKV1dLCBzYW1wbGVyIGlTbXBDaGFubmVsMCBbW3NhbXBsZXIoMCldXSkKewogICAgbWFpbjBfb3V0IG91dCA9IHt9OwogICAgb3V0LmZyYWdDb2xvciA9IGlUZXhDaGFubmVsMC5zYW1wbGUoaVNtcENoYW5uZWwwLCBpbi50ZXhVVikgKiBpbi5pQ29sb3I7CiAgICByZXR1cm4gb3V0Owp9CgoAAABkaWFnbm9zdGljKG9mZiwgZGVyaXZhdGl2ZV91bmlmb3JtaXR5KTsKCnZhcjxwcml2YXRlPiBjb29yZCA6IHZlYzRmOwoKdmFyPHByaXZhdGU+IHRleFVWIDogdmVjMmY7Cgp2YXI8cHJpdmF0ZT4gaUNvbG9yIDogdmVjNGY7Cgp2YXI8cHJpdmF0ZT4gY29sb3IgOiB2ZWM0ZjsKCnZhcjxwcml2YXRlPiBnbF9Qb3NpdGlvbiA6IHZlYzRmOwoKZm4gbWFpbl8xKCkgewogIGxldCB4XzE5IDogdmVjNGYgPSBjb29yZDsKICBsZXQgeF8yMCA6IHZlYzJmID0gdmVjMmYoeF8xOS54LCB4XzE5LnkpOwogIGdsX1Bvc2l0aW9uID0gdmVjNGYoeF8yMC54LCB4XzIwLnksIDAuMGYsIDEuMGYpOwogIGxldCB4XzMwIDogdmVjNGYgPSBjb29yZDsKICB0ZXhVViA9IHZlYzJmKHhfMzAueiwgeF8zMC53KTsKICBsZXQgeF8zNCA6IHZlYzRmID0gY29sb3I7CiAgaUNvbG9yID0geF8zNDsKICByZXR1cm47Cn0KCnN0cnVjdCBtYWluX291dCB7CiAgQGJ1aWx0aW4ocG9zaXRpb24pCiAgZ2xfUG9zaXRpb24gOiB2ZWM0ZiwKICBAbG9jYXRpb24oMCkKICB0ZXhVVl8xIDogdmVjMmYsCiAgQGxvY2F0aW9uKDEpCiAgaUNvbG9yXzEgOiB2ZWM0ZiwKfQoKQHZlcnRleApmbiBtYWluKEBsb2NhdGlvbigwKSBjb29yZF9wYXJhbSA6IHZlYzRmLCBAbG9jYXRpb24oMSkgY29sb3JfcGFyYW0gOiB2ZWM0ZikgLT4gbWFpbl9vdXQgewogIGNvb3JkID0gY29vcmRfcGFyYW07CiAgY29sb3IgPSBjb2xvcl9wYXJhbTsKICBtYWluXzEoKTsKICByZXR1cm4gbWFpbl9vdXQoZ2xfUG9zaXRpb24sIHRleFVWLCBpQ29sb3IpOwp9CgoAAAAAAAAAAAAAAGRpYWdub3N0aWMob2ZmLCBkZXJpdmF0aXZlX3VuaWZvcm1pdHkpOwoKdmFyPHByaXZhdGU+IGZyYWdDb2xvciA6IHZlYzRmOwoKQGdyb3VwKDEpIEBiaW5kaW5nKDQ4KSB2YXIgaVRleENoYW5uZWwwIDogdGV4dHVyZV8yZDxmMzI+OwoKQGdyb3VwKDEpIEBiaW5kaW5nKDY0KSB2YXIgaVNtcENoYW5uZWwwIDogc2FtcGxl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IChtZW1bbGVuXSA9PT0gMCkgeyBicmVhazsgfSB9IGlmIChsZW4gPT09IE1BWF9TVFJfTEVOKSB7IHJldHVybiAtMTsgfSByZXR1cm4gbGVuOyB9ACh2b2lkKiBob3N0UHRyLCB1bnNpZ25lZCBpbnQgc2l6ZSk8Ojo+eyBjb25zdCBjYXJ0UHRyID0gTW9kdWxlLmNhcnQuZXhwb3J0cy5tYWxsb2Moc2l6ZSk7IGNvbnN0IGNhcnRCeXRlcyA9IE1vZHVsZS5IRUFQVTguc2xpY2UoaG9zdFB0ciwgaG9zdFB0ciArIHNpemUpOyBjb25zdCBtZW0gPSBuZXcgVWludDhBcnJheShNb2R1bGUuY2FydC5leHBvcnRzLm1lbW9yeS5idWZmZXIpOyBtZW0uc2V0KGNhcnRCeXRlcywgY2FydFB0cik7IHJldHVybiBjYXJ0UHRyOyB9ACh2b2lkKTw6Oj57IE1vZHVsZS5zb2tvbF9iZWZvcmV1bmxvYWQgPSAoZXZlbnQpID0+IHsgaWYgKF9fc2FwcF9odG1sNV9nZXRfYXNrX2xlYXZlX3NpdGUoKSAhPSAwKSB7IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IGV2ZW50LnJldHVyblZhbHVlID0gJyAnOyB9IH07IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCBNb2R1bGUuc29rb2xfYmVmb3JldW5sb2FkKTsgfQAodm9pZCk8Ojo+eyB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgTW9kdWxlLnNva29sX2JlZm9yZXVubG9hZCk7IH0AKHZvaWQpPDo6PnsgTW9kdWxlLnNva29sX3Bhc3RlID0gKGV2ZW50KSA9PiB7IGNvbnN0IHBhc3RlZF9zdHIgPSBldmVudC5jbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQnKTsgd2l0aFN0YWNrU2F2ZSgoKSA9PiB7IGNvbnN0IGNzdHIgPSBzdHJpbmdUb1VURjhPblN0YWNrKHBhc3RlZF9zdHIpOyBfX3NhcHBfZW1zY19vbnBhc3RlKGNzdHIpOyB9KTsgfTsgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Bhc3RlJywgTW9kdWxlLnNva29sX3Bhc3RlKTsgfQAodm9pZCk8Ojo+eyB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncGFzdGUnLCBNb2R1bGUuc29rb2xfcGFzdGUpOyB9AChjb25zdCBjaGFyKiBjX3N0cik8Ojo+eyBjb25zdCBzdHIgPSBVVEY4VG9TdHJpbmcoY19zdHIpOyBjb25zdCB0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7IHRhLnNldEF0dHJpYnV0ZSgnYXV0b2NvbXBsZXRlJywgJ29mZicpOyB0YS5zZXRBdHRyaWJ1dGUoJ2F1dG9jb3JyZWN0JywgJ29mZicpOyB0YS5zZXRBdHRyaWJ1dGUoJ2F1dG9jYXBpdGFsaXplJywgJ29mZicpOyB0YS5zZXRBdHRyaWJ1dGUoJ3NwZWxsY2hlY2snLCAnZmFsc2UnKTsgdGEuc3R5bGUubGVmdCA9IC0xMDAgKyAncHgnOyB0YS5zdHlsZS50b3AgPSAtMTAwICsgJ3B4JzsgdGEuc3R5bGUuaGVpZ2h0ID0gMTsgdGEuc3R5bGUud2lkdGggPSAxOyB0YS52YWx1ZSA9IHN0cjsgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0YSk7IHRhLnNlbGVjdCgpOyBkb2N1bWVudC5leGVjQ29tbWFuZCgnY29weScpOyBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRhKTsgfQAoY29uc3QgY2hhciogY2FudmFzX25hbWVfY3N0cik8Ojo+eyBNb2R1bGUuc29rb2xfZHJvcF9maWxlcyA9IFtdOyBjb25zdCBjYW52YXNfbmFtZSA9IFVURjhUb1N0cmluZyhjYW52YXNfbmFtZV9jc3RyKTsgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2FudmFzX25hbWUpOyBNb2R1bGUuc29rb2xfZHJhZ2VudGVyID0gKGV2ZW50KSA9PiB7IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyB9OyBNb2R1bGUuc29rb2xfZHJhZ2xlYXZlID0gKGV2ZW50KSA9PiB7IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyB9OyBNb2R1bGUuc29rb2xfZHJhZ292ZXIgPSAoZXZlbnQpID0+IHsgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7IGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IH07IE1vZHVsZS5zb2tvbF9kcm9wID0gKGV2ZW50KSA9PiB7IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyBjb25zdCBmaWxlcyA9IGV2ZW50LmRhdGFUcmFuc2Zlci5maWxlczsgTW9kdWxlLnNva29sX2Ryb3BwZWRfZmlsZXMgPSBmaWxlczsgX19zYXBwX2Vtc2NfYmVnaW5fZHJvcChmaWxlcy5sZW5ndGgpOyBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7IHdpdGhTdGFja1NhdmUoKCkgPT4geyBjb25zdCBjc3RyID0gc3RyaW5nVG9VVEY4T25TdGFjayhmaWxlc1tpXS5uYW1lKTsgX19zYXBwX2Vtc2NfZHJvcChpLCBjc3RyKTsgfSk7IH0gbGV0IG1vZHMgPSAwOyBpZiAoZXZlbnQuc2hpZnRLZXkpIHsgbW9kcyB8PSAxOyB9IGlmIChldmVudC5jdHJsS2V5KSB7IG1vZHMgfD0gMjsgfSBpZiAoZXZlbnQuYWx0S2V5KSB7IG1vZHMgfD0gNDsgfSBpZiAoZXZlbnQubWV0YUtleSkgeyBtb2RzIHw9IDg7IH0gX19zYXBwX2Vtc2NfZW5kX2Ryb3AoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSwgbW9kcyk7IH07IGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBNb2R1bGUuc29rb2xfZHJhZ2VudGVyLCBmYWxzZSk7IGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBNb2R1bGUuc29rb2xfZHJhZ2xlYXZlLCBmYWxzZSk7IGNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIE1vZHVsZS5zb2tvbF9kcmFnb3ZlciwgZmFsc2UpOyBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIE1vZHVsZS5zb2tvbF9kcm9wLCBmYWxzZSk7IH0AKGludCBpbmRleCk8Ojo+eyAvKiogQHN1cHByZXNzIHttaXNzaW5nUHJvcGVydGllc30gKi8gY29uc3QgZmlsZXMgPSBNb2R1bGUuc29rb2xfZHJvcHBlZF9maWxlczsgaWYgKChpbmRleCA8IDApIHx8IChpbmRleCA+PSBmaWxlcy5sZW5ndGgpKSB7IHJldHVybiAwOyB9IGVsc2UgeyByZXR1cm4gZmlsZXNbaW5kZXhdLnNpemU7IH0gfQAoaW50IGluZGV4LCBfc2FwcF9odG1sNV9mZXRjaF9jYWxsYmFjayBjYWxsYmFjaywgdm9pZCogYnVmX3B0ciwgdWludDMyX3QgYnVmX3NpemUsIHZvaWQqIHVzZXJfZGF0YSk8Ojo+eyBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpOyByZWFkZXIub25sb2FkID0gKGxvYWRFdmVudCkgPT4geyBjb25zdCBjb250ZW50ID0gbG9hZEV2ZW50LnRhcmdldC5yZXN1bHQ7IGlmIChjb250ZW50LmJ5dGVMZW5ndGggPiBidWZfc2l6ZSkgeyBfX3NhcHBfZW1zY19pbnZva2VfZmV0Y2hfY2IoaW5kZXgsIDAsIDEsIGNhbGxiYWNrLCAwLCBidWZfcHRyLCBidWZfc2l6ZSwgdXNlcl9kYXRhKTsgfSBlbHNlIHsgSEVBUFU4LnNldChuZXcgVWludDhBcnJheShjb250ZW50KSwgYnVmX3B0cik7IF9fc2FwcF9lbXNjX2ludm9rZV9mZXRjaF9jYihpbmRleCwgMSwgMCwgY2FsbGJhY2ssIGNvbnRlbnQuYnl0ZUxlbmd0aCwgYnVmX3B0ciwgYnVmX3NpemUsIHVzZXJfZGF0YSk7IH0gfTsgcmVhZGVyLm9uZXJyb3IgPSAoKSA9PiB7IF9fc2FwcF9lbXNjX2ludm9rZV9mZXRjaF9jYihpbmRleCwgMCwgMiwgY2FsbGJhY2ssIDAsIGJ1Zl9wdHIsIGJ1Zl9zaXplLCB1c2VyX2RhdGEpOyB9OyAvKiogQHN1cHByZXNzIHttaXNzaW5nUHJvcGVydGllc30gKi8gY29uc3QgZmlsZXMgPSBNb2R1bGUuc29rb2xfZHJvcHBlZF9maWxlczsgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGVzW2luZGV4XSk7IH0AKGNvbnN0IGNoYXIqIGNhbnZhc19uYW1lX2NzdHIpPDo6PnsgY29uc3QgY2FudmFzX25hbWUgPSBVVEY4VG9TdHJpbmcoY2FudmFzX25hbWVfY3N0cik7IGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc19uYW1lKTsgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIE1vZHVsZS5zb2tvbF9kcmFnZW50ZXIpOyBjYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgTW9kdWxlLnNva29sX2RyYWdsZWF2ZSk7IGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIE1vZHVsZS5zb2tvbF9kcmFnb3Zlcik7IGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdkcm9wJywgTW9kdWxlLnNva29sX2Ryb3ApOyB9AChjb25zdCBjaGFyKiBjX3N0cl90YXJnZXQpPDo6PnsgY29uc3QgdGFyZ2V0X3N0ciA9IFVURjhUb1N0cmluZyhjX3N0cl90YXJnZXQpOyBNb2R1bGUuc2FwcF9lbXNjX3RhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldF9zdHIpOyBpZiAoIU1vZHVsZS5zYXBwX2Vtc2NfdGFyZ2V0KSB7IGNvbnNvbGUubG9nKCJzb2tvbF9hcHAuaDogaW52YWxpZCB0YXJnZXQ6IiArIHRhcmdldF9zdHIpOyB9IGlmICghTW9kdWxlLnNhcHBfZW1zY190YXJnZXQucmVxdWVzdFBvaW50ZXJMb2NrKSB7IGNvbnNvbGUubG9nKCJzb2tvbF9hcHAuaDogdGFyZ2V0IGRvZXNuJ3Qgc3VwcG9ydCByZXF1ZXN0UG9pbnRlckxvY2s6IiArIHRhcmdldF9zdHIpOyB9IH0AKHZvaWQpPDo6PnsgaWYgKE1vZHVsZS5zYXBwX2Vtc2NfdGFyZ2V0KSB7IGlmIChNb2R1bGUuc2FwcF9lbXNjX3RhcmdldC5yZXF1ZXN0UG9pbnRlckxvY2spIHsgTW9kdWxlLnNhcHBfZW1zY190YXJnZXQucmVxdWVzdFBvaW50ZXJMb2NrKCk7IH0gfSB9ACh2b2lkKTw6Oj57IGlmIChkb2N1bWVudC5leGl0UG9pbnRlckxvY2spIHsgZG9jdW1lbnQuZXhpdFBvaW50ZXJMb2NrKCk7IH0gfQAoaW50IGN1cnNvcl90eXBlLCBpbnQgc2hvd24pPDo6PnsgaWYgKE1vZHVsZS5zYXBwX2Vtc2NfdGFyZ2V0KSB7IGxldCBjdXJzb3I7IGlmIChzaG93biA9PT0gMCkgeyBjdXJzb3IgPSAibm9uZSI7IH0gZWxzZSBzd2l0Y2ggKGN1cnNvcl90eXBlKSB7IGNhc2UgMDogY3Vyc29yID0gImF1dG8iOyBicmVhazsgY2FzZSAxOiBjdXJzb3IgPSAiZGVmYXVsdCI7IGJyZWFrOyBjYXNlIDI6IGN1cnNvciA9ICJ0ZXh0IjsgYnJlYWs7IGNhc2UgMzogY3Vyc29yID0gImNyb3NzaGFpciI7IGJyZWFrOyBjYXNlIDQ6IGN1cnNvciA9ICJwb2ludGVyIjsgYnJlYWs7IGNhc2UgNTogY3Vyc29yID0gImV3LXJlc2l6ZSI7IGJyZWFrOyBjYXNlIDY6IGN1cnNvciA9ICJucy1yZXNpemUiOyBicmVhazsgY2FzZSA3OiBjdXJzb3IgPSAibndzZS1yZXNpemUiOyBicmVhazsgY2FzZSA4OiBjdXJzb3IgPSAibmVzdy1yZXNpemUiOyBicmVhazsgY2FzZSA5OiBjdXJzb3IgPSAiYWxsLXNjcm9sbCI7IGJyZWFrOyBjYXNlIDEwOiBjdXJzb3IgPSAibm90LWFsbG93ZWQiOyBicmVhazsgZGVmYXVsdDogY3Vyc29yID0gImF1dG8iOyBicmVhazsgfSBNb2R1bGUuc2FwcF9lbXNjX3RhcmdldC5zdHlsZS5jdXJzb3IgPSBjdXJzb3I7IH0gfQAodm9pZCk8Ojo+eyBjb25zdCBsaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Nva29sLWFwcC1mYXZpY29uJyk7IGlmIChsaW5rKSB7IGRvY3VtZW50LmhlYWQucmVtb3ZlQ2hpbGQobGluayk7IH0gfQAoaW50IHcsIGludCBoLCBjb25zdCB1aW50OF90KiBwaXhlbHMpPDo6PnsgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7IGNhbnZhcy53aWR0aCA9IHc7IGNhbnZhcy5oZWlnaHQgPSBoOyBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTsgY29uc3QgaW1nX2RhdGEgPSBjdHguY3JlYXRlSW1hZ2VEYXRhKHcsIGgpOyBpbWdfZGF0YS5kYXRhLnNldChIRUFQVTguc3ViYXJyYXkocGl4ZWxzLCBwaXhlbHMgKyB3KmgqNCkpOyBjdHgucHV0SW1hZ2VEYXRhKGltZ19kYXRhLCAwLCAwKTsgY29uc3QgbmV3X2xpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7IG5ld19saW5rLmlkID0gJ3Nva29sLWFwcC1mYXZpY29uJzsgbmV3X2xpbmsucmVsID0gJ3Nob3J0Y3V0IGljb24nOyBuZXdfbGluay5ocmVmID0gY2FudmFzLnRvRGF0YVVSTCgpOyBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKG5ld19saW5rKTsgfQAodWludDMyX3QgbGV2ZWwsIGNvbnN0IGNoYXIqIGNfc3RyKTw6Oj57IGNvbnN0IHN0ciA9IFVURjhUb1N0cmluZyhjX3N0cik7IHN3aXRjaCAobGV2ZWwpIHsgY2FzZSAwOiBjb25zb2xlLmVycm9yKHN0cik7IGJyZWFrOyBjYXNlIDE6IGNvbnNvbGUuZXJyb3Ioc3RyKTsgYnJlYWs7IGNhc2UgMjogY29uc29sZS53YXJuKHN0cik7IGJyZWFrOyBkZWZhdWx0OiBjb25zb2xlLmluZm8oc3RyKTsgYnJlYWs7IH0gfQAAQb2jCAskJHdpdGhTdGFja1NhdmUsJHN0cmluZ1RvVVRGOE9uU3RhY2sA';
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
