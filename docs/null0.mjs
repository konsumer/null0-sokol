
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
    var f = 'data:application/octet-stream;base64,AGFzbQEAAAABvAIuYAF/AGABfwF/YAAAYAJ/fwBgAn9/AX9gAAF/YAN/f38AYAN/f38Bf2AEf39/fwBgBX9/f39/AX9gBX9/f39/AGAEfX19fQBgAn19AGADfX19AGADf35/AX5gBH9/f38Bf2AHf39/f39/fwBgAn98AGABfQF9YAABfGAGf39/f39/AGAIf39/f39/f38AYAl/f39/f39/f38AYAp/f39/f39/f39/AGABfQBgBn19fX19fQBgB39/f39/f38Bf2ABfAF9YAJ8fwF8YAZ/fH9/f38Bf2ACfn8Bf2AEf35+fwBgA39/fQBgBH9/fX8AYAJ+fgF/YAJ+fgF+YAZ/f39/f38Bf2ACfH8Bf2ABfwF8YAJ9fwF/YAF8AXxgA35/fwF/YAF8AX5gAn5+AXxgBH9/fn8BfmAEf35/fwF/ApAgkQEDZW52GV93YXNtX2hvc3RfY29weV9mcm9tX2NhcnQABgNlbnYLY2FydF9zdHJsZW4AAQNlbnYMY29weV90b19jYXJ0AAQDZW52BGV4aXQAAANlbnYQd2FzbV9ob3N0X3VwZGF0ZQACA2Vudg1fX2Fzc2VydF9mYWlsAAgDZW52DHNhcHBfanNfaW5pdAAAA2Vudh9lbXNjcmlwdGVuX2dldF9lbGVtZW50X2Nzc19zaXplAAcDZW52KGVtc2NyaXB0ZW5fc2V0X3Jlc2l6ZV9jYWxsYmFja19vbl90aHJlYWQACQNlbnYhZW1zY3JpcHRlbl9nZXRfZGV2aWNlX3BpeGVsX3JhdGlvABMDZW52ImVtc2NyaXB0ZW5fc2V0X2NhbnZhc19lbGVtZW50X3NpemUABwNlbnYYZW1zY3JpcHRlbl9zZXRfbWFpbl9sb29wAAYDZW52J2Vtc2NyaXB0ZW5fcmVxdWVzdF9hbmltYXRpb25fZnJhbWVfbG9vcAADA2VudhVzYXBwX2pzX2NsZWFyX2Zhdmljb24AAgNlbnYTc2FwcF9qc19zZXRfZmF2aWNvbgAGA2VudgtzbG9nX2pzX2xvZwADA2VudgpnbEdldEVycm9yAAUDZW52EWdsR2VuVmVydGV4QXJyYXlzAAMDZW52EWdsQmluZFZlcnRleEFycmF5AAADZW52DWdsUGl4ZWxTdG9yZWkAAwNlbnYNZ2xHZXRJbnRlZ2VydgADA2VudgxnbEdldFN0cmluZ2kABANlbnYaZ2xEaXNhYmxlVmVydGV4QXR0cmliQXJyYXkAAANlbnYIZ2xFbmFibGUAAANlbnYLZ2xEZXB0aEZ1bmMAAANlbnYLZ2xEZXB0aE1hc2sAAANlbnYJZ2xEaXNhYmxlAAADZW52DWdsU3RlbmNpbEZ1bmMABgNlbnYLZ2xTdGVuY2lsT3AABgNlbnYNZ2xTdGVuY2lsTWFzawAAA2VudhNnbEJsZW5kRnVuY1NlcGFyYXRlAAgDZW52F2dsQmxlbmRFcXVhdGlvblNlcGFyYXRlAAMDZW52DGdsQmxlbmRDb2xvcgALA2VudgtnbENvbG9yTWFzawAIA2Vudg9nbFBvbHlnb25PZmZzZXQADANlbnYLZ2xGcm9udEZhY2UAAANlbnYKZ2xDdWxsRmFjZQAAA2VudgxnbEJpbmRCdWZmZXIAAwNlbnYQZ2xCaW5kQnVmZmVyQmFzZQAGA2Vudg9nbEFjdGl2ZVRleHR1cmUAAANlbnYNZ2xCaW5kVGV4dHVyZQADA2Vudg1nbEJpbmRTYW1wbGVyAAMDZW52D2dsRGVsZXRlQnVmZmVycwADA2VudhBnbERlbGV0ZVRleHR1cmVzAAMDZW52FWdsRGVsZXRlUmVuZGVyYnVmZmVycwADA2VudhBnbERlbGV0ZVNhbXBsZXJzAAMDZW52D2dsRGVsZXRlUHJvZ3JhbQAAA2VudgxnbFVzZVByb2dyYW0AAANlbnYUZ2xEZWxldGVGcmFtZWJ1ZmZlcnMAAwNlbnYUZ2xEZWxldGVWZXJ0ZXhBcnJheXMAAwNlbnYMZ2xHZW5CdWZmZXJzAAMDZW52DGdsQnVmZmVyRGF0YQAIA2Vudg9nbEJ1ZmZlclN1YkRhdGEACANlbnYSZ2xHZW5SZW5kZXJidWZmZXJzAAMDZW52EmdsQmluZFJlbmRlcmJ1ZmZlcgADA2VudiBnbFJlbmRlcmJ1ZmZlclN0b3JhZ2VNdWx0aXNhbXBsZQAKA2Vudg1nbEdlblRleHR1cmVzAAMDZW52D2dsVGV4UGFyYW1ldGVyaQAGA2Vudg5nbFRleFN0b3JhZ2UyRAAKA2Vudg5nbFRleFN0b3JhZ2UzRAAUA2VudhZnbENvbXByZXNzZWRUZXhJbWFnZTJEABUDZW52DGdsVGV4SW1hZ2UyRAAWA2VudhZnbENvbXByZXNzZWRUZXhJbWFnZTNEABYDZW52DGdsVGV4SW1hZ2UzRAAXA2Vudg1nbEdlblNhbXBsZXJzAAMDZW52E2dsU2FtcGxlclBhcmFtZXRlcmkABgNlbnYTZ2xTYW1wbGVyUGFyYW1ldGVyZgAgA2Vudg9nbENyZWF0ZVByb2dyYW0ABQNlbnYOZ2xBdHRhY2hTaGFkZXIAAwNlbnYNZ2xMaW5rUHJvZ3JhbQAAA2Vudg5nbERlbGV0ZVNoYWRlcgAAA2Vudg5nbEdldFByb2dyYW1pdgAGA2VudhNnbEdldFByb2dyYW1JbmZvTG9nAAgDZW52FGdsR2V0VW5pZm9ybUxvY2F0aW9uAAQDZW52C2dsVW5pZm9ybTFpAAMDZW52DmdsQ3JlYXRlU2hhZGVyAAEDZW52DmdsU2hhZGVyU291cmNlAAgDZW52D2dsQ29tcGlsZVNoYWRlcgAAA2Vudg1nbEdldFNoYWRlcml2AAYDZW52EmdsR2V0U2hhZGVySW5mb0xvZwAIA2VudhNnbEdldEF0dHJpYkxvY2F0aW9uAAQDZW52EWdsQmluZEZyYW1lYnVmZmVyAAMDZW52CmdsVmlld3BvcnQACANlbnYJZ2xTY2lzc29yAAgDZW52D2dsQ2xlYXJCdWZmZXJmdgAGA2Vudg9nbENsZWFyQnVmZmVyZmkAIQNlbnYPZ2xDbGVhckJ1ZmZlcml2AAYDZW52FWdsU3RlbmNpbEZ1bmNTZXBhcmF0ZQAIA2VudhNnbFN0ZW5jaWxPcFNlcGFyYXRlAAgDZW52FWdsVmVydGV4QXR0cmliUG9pbnRlcgAUA2VudhVnbFZlcnRleEF0dHJpYkRpdmlzb3IAAwNlbnYZZ2xFbmFibGVWZXJ0ZXhBdHRyaWJBcnJheQAAA2VudgxnbFVuaWZvcm0xZnYABgNlbnYMZ2xVbmlmb3JtMmZ2AAYDZW52DGdsVW5pZm9ybTNmdgAGA2VudgxnbFVuaWZvcm00ZnYABgNlbnYMZ2xVbmlmb3JtMWl2AAYDZW52DGdsVW5pZm9ybTJpdgAGA2VudgxnbFVuaWZvcm0zaXYABgNlbnYMZ2xVbmlmb3JtNGl2AAYDZW52EmdsVW5pZm9ybU1hdHJpeDRmdgAIA2VudhdnbERyYXdFbGVtZW50c0luc3RhbmNlZAAKA2Vudg5nbERyYXdFbGVtZW50cwAIA2VudhVnbERyYXdBcnJheXNJbnN0YW5jZWQACANlbnYMZ2xEcmF3QXJyYXlzAAYDZW52DGdsUmVhZEJ1ZmZlcgAAA2VudhFnbEJsaXRGcmFtZWJ1ZmZlcgAXA2VudhdnbEludmFsaWRhdGVGcmFtZWJ1ZmZlcgAGA2Vudh9lbXNjcmlwdGVuX3dlYmdsX2NyZWF0ZV9jb250ZXh0AAQDZW52JWVtc2NyaXB0ZW5fd2ViZ2xfbWFrZV9jb250ZXh0X2N1cnJlbnQAAQNlbnYhZW1zY3JpcHRlbl93ZWJnbF9lbmFibGVfZXh0ZW5zaW9uAAQDZW52K2Vtc2NyaXB0ZW5fc2V0X21vdXNlZG93bl9jYWxsYmFja19vbl90aHJlYWQACQNlbnYpZW1zY3JpcHRlbl9zZXRfbW91c2V1cF9jYWxsYmFja19vbl90aHJlYWQACQNlbnYrZW1zY3JpcHRlbl9zZXRfbW91c2Vtb3ZlX2NhbGxiYWNrX29uX3RocmVhZAAJA2VudixlbXNjcmlwdGVuX3NldF9tb3VzZWVudGVyX2NhbGxiYWNrX29uX3RocmVhZAAJA2VudixlbXNjcmlwdGVuX3NldF9tb3VzZWxlYXZlX2NhbGxiYWNrX29uX3RocmVhZAAJA2VudidlbXNjcmlwdGVuX3NldF93aGVlbF9jYWxsYmFja19vbl90aHJlYWQACQNlbnYpZW1zY3JpcHRlbl9zZXRfa2V5ZG93bl9jYWxsYmFja19vbl90aHJlYWQACQNlbnYnZW1zY3JpcHRlbl9zZXRfa2V5dXBfY2FsbGJhY2tfb25fdGhyZWFkAAkDZW52KmVtc2NyaXB0ZW5fc2V0X2tleXByZXNzX2NhbGxiYWNrX29uX3RocmVhZAAJA2VudixlbXNjcmlwdGVuX3NldF90b3VjaHN0YXJ0X2NhbGxiYWNrX29uX3RocmVhZAAJA2VuditlbXNjcmlwdGVuX3NldF90b3VjaG1vdmVfY2FsbGJhY2tfb25fdGhyZWFkAAkDZW52KmVtc2NyaXB0ZW5fc2V0X3RvdWNoZW5kX2NhbGxiYWNrX29uX3RocmVhZAAJA2Vudi1lbXNjcmlwdGVuX3NldF90b3VjaGNhbmNlbF9jYWxsYmFja19vbl90aHJlYWQACQNlbnYzZW1zY3JpcHRlbl9zZXRfcG9pbnRlcmxvY2tjaGFuZ2VfY2FsbGJhY2tfb25fdGhyZWFkAAkDZW52MmVtc2NyaXB0ZW5fc2V0X3BvaW50ZXJsb2NrZXJyb3JfY2FsbGJhY2tfb25fdGhyZWFkAAkDZW52J2Vtc2NyaXB0ZW5fc2V0X2ZvY3VzX2NhbGxiYWNrX29uX3RocmVhZAAJA2VudiZlbXNjcmlwdGVuX3NldF9ibHVyX2NhbGxiYWNrX29uX3RocmVhZAAJA2VudiFzYXBwX2pzX2FkZF9iZWZvcmV1bmxvYWRfbGlzdGVuZXIAAgNlbnYec2FwcF9qc19hZGRfY2xpcGJvYXJkX2xpc3RlbmVyAAIDZW52H3NhcHBfanNfYWRkX2RyYWduZHJvcF9saXN0ZW5lcnMAAANlbnYyZW1zY3JpcHRlbl9zZXRfd2ViZ2xjb250ZXh0bG9zdF9jYWxsYmFja19vbl90aHJlYWQACQNlbnY2ZW1zY3JpcHRlbl9zZXRfd2ViZ2xjb250ZXh0cmVzdG9yZWRfY2FsbGJhY2tfb25fdGhyZWFkAAkDZW52GmVtc2NyaXB0ZW5fcGVyZm9ybWFuY2Vfbm93ABMDZW52G2Vtc2NyaXB0ZW5fY2FuY2VsX21haW5fbG9vcAACA2VudhtzYXBwX2pzX3JlcXVlc3RfcG9pbnRlcmxvY2sAAgNlbnYkc2FwcF9qc19yZW1vdmVfYmVmb3JldW5sb2FkX2xpc3RlbmVyAAIDZW52IXNhcHBfanNfcmVtb3ZlX2NsaXBib2FyZF9saXN0ZW5lcgACA2VudiJzYXBwX2pzX3JlbW92ZV9kcmFnbmRyb3BfbGlzdGVuZXJzAAADZW52CV9hYm9ydF9qcwACA2VudhVfZW1zY3JpcHRlbl9tZW1jcHlfanMABhZ3YXNpX3NuYXBzaG90X3ByZXZpZXcxCGZkX2Nsb3NlAAEWd2FzaV9zbmFwc2hvdF9wcmV2aWV3MQhmZF93cml0ZQAPA2VudhZlbXNjcmlwdGVuX3Jlc2l6ZV9oZWFwAAEWd2FzaV9zbmFwc2hvdF9wcmV2aWV3MQdmZF9zZWVrAAkDngScBAINDQEBAgQBAAUDAQAFAgICDBgNDAsAAgsCAwAACAIIAgICAwwDCwMDGQMDCwYGDQ0GAgICAAMDAwAAAwEAAgACAgAAAAAAAAACAAAFBQEBBwQPBAgFAQcFBQUFBAAEAQMABAAEBAAEBAAEBAAEBAQDAwEDBAMDAQMEAwMBAwQDAwEDBAMDAQEDBwQAAAAAAAAAAAAAAQEBAQEBAQEBAQAAAAAAAAMBAAMCBAQBBQAKCgoKCgoAAQAAAAEBAQYHBgYGBgYCAgICAgICAgQiBAYjBgEQAAABAgUEARoFBQMDBgIGAgYCAgICDBgNDAsAAgMCAAILAgMAAAgBBQIIAgICAQokBQUGAwYMAwsDAxkDAwgLBgMGAAcFAAEDBQACAwEIBhUEAAAHAgIAAiUFBQUFBQIBBAMBAQ8FBQUFBQUFBQUFBQUFBQAAEAcHAgIABgACAgICAgIAAAAAAAAAAAAABAAAAAAAAAADAAAABAEBAAMAAQEEAQEBAQAIAQEABAQBAQEHBwQEAwQBBwEBAQEBBAQBAQEBAQEGBAMABwcHBwcHBwcHEQICAgIBAAAAAQIBAQEBARECAgABJhEBAQACGxsJJxIHBwcoBwUAAAcEAQAFAgEHDwQEARIcEgEBBw4OAQ4EAQcHBAQHBAQEBAQEBRwJGgYBCCkeHgoHHQMqAQUFBQIHBAUBAQcAHx8rAAUCBQUFAQABBSwJLQQFAXABGBgFBgEB7gXuBQbGAR1/AUGAgAQLfwFBAAt/AUEAC38BQQALfwBBuO8HC38AQZHwBwt/AEGA8gcLfwBBq/QHC38AQb2jCAt/AEGz9gcLfwBBkvgHC38AQef4Bwt/AEHr+gcLfwBBsvsHC38AQZn/Bwt/AEGDiQgLfwBBwooIC38AQZyQCAt/AEGjkwgLfwBBmZYIC38AQaqXCAt/AEH2lwgLfwBB7JwIC38AQeSdCAt/AEHToQgLfwBBuO8HC38AQb2jCAt/AEG9owgLfwBB4aMICwe0D1YGbWVtb3J5AgARX193YXNtX2NhbGxfY3RvcnMAkQEGbWFsbG9jAJoFDnRlc3Rfc3RyaW5nX2luAJkBD3Rlc3Rfc3RyaW5nX291dACaAQ10ZXN0X2J5dGVzX2luAJsBDnRlc3RfYnl0ZXNfb3V0AJwBDnRlc3Rfc3RydWN0X2luAJ0BD3Rlc3Rfc3RydWN0X291dACeAQ5wdXNoX3RyYW5zZm9ybQCfAQ1wb3BfdHJhbnNmb3JtAKABD3Jlc2V0X3RyYW5zZm9ybQChAQl0cmFuc2xhdGUAogEGcm90YXRlAKMBCXJvdGF0ZV9hdACkAQVzY2FsZQClAQhzY2FsZV9hdACmAQ5zZXRfYmxlbmRfbW9kZQCnARByZXNldF9ibGVuZF9tb2RlAKgBCXNldF9jb2xvcgCpAQtyZXNldF9jb2xvcgCqAQlzZXRfaW1hZ2UAqwELdW5zZXRfaW1hZ2UArAELcmVzZXRfaW1hZ2UArQEIdmlld3BvcnQArgEOcmVzZXRfdmlld3BvcnQArwEHc2Npc3NvcgCwAQ1yZXNldF9zY2lzc29yALEBC3Jlc2V0X3N0YXRlALIBBWNsZWFyALMBC2RyYXdfcG9pbnRzALQBCmRyYXdfcG9pbnQAtQEKZHJhd19saW5lcwC2AQlkcmF3X2xpbmUAtwEQZHJhd19saW5lc19zdHJpcAC4ARVkcmF3X2ZpbGxlZF90cmlhbmdsZXMAuQEUZHJhd19maWxsZWRfdHJpYW5nbGUAugEbZHJhd19maWxsZWRfdHJpYW5nbGVzX3N0cmlwALsBEWRyYXdfZmlsbGVkX3JlY3RzALwBEGRyYXdfZmlsbGVkX3JlY3QAvQETZHJhd190ZXh0dXJlZF9yZWN0cwC+ARJkcmF3X3RleHR1cmVkX3JlY3QAvwETZHJhd19vdXRsaW5lX2NpcmNsZQDAARJkcmF3X2ZpbGxlZF9jaXJjbGUAwQEZX19lbV9qc19fd2FzbV9ob3N0X3VwZGF0ZQMEIl9fZW1fanNfX193YXNtX2hvc3RfY29weV9mcm9tX2NhcnQDBRRfX2VtX2pzX19jYXJ0X3N0cmxlbgMGFV9fZW1fanNfX2NvcHlfdG9fY2FydAMHGV9faW5kaXJlY3RfZnVuY3Rpb25fdGFibGUBABJfc2FwcF9lbXNjX29ucGFzdGUApwMeX3NhcHBfaHRtbDVfZ2V0X2Fza19sZWF2ZV9zaXRlAK0DFV9zYXBwX2Vtc2NfYmVnaW5fZHJvcACuAw9fc2FwcF9lbXNjX2Ryb3AAsAMTX3NhcHBfZW1zY19lbmRfZHJvcACzAxpfc2FwcF9lbXNjX2ludm9rZV9mZXRjaF9jYgC0AxBfX21haW5fYXJnY19hcmd2ALUDF19fZW1fbGliX2RlcHNfc29rb2xfYXBwAwgqX19lbV9qc19fc2FwcF9qc19hZGRfYmVmb3JldW5sb2FkX2xpc3RlbmVyAwktX19lbV9qc19fc2FwcF9qc19yZW1vdmVfYmVmb3JldW5sb2FkX2xpc3RlbmVyAwonX19lbV9qc19fc2FwcF9qc19hZGRfY2xpcGJvYXJkX2xpc3RlbmVyAwsqX19lbV9qc19fc2FwcF9qc19yZW1vdmVfY2xpcGJvYXJkX2xpc3RlbmVyAwwgX19lbV9qc19fc2FwcF9qc193cml0ZV9jbGlwYm9hcmQDDShfX2VtX2pzX19zYXBwX2pzX2FkZF9kcmFnbmRyb3BfbGlzdGVuZXJzAw4iX19lbV9qc19fc2FwcF9qc19kcm9wcGVkX2ZpbGVfc2l6ZQMPI19fZW1fanNfX3NhcHBfanNfZmV0Y2hfZHJvcHBlZF9maWxlAxArX19lbV9qc19fc2FwcF9qc19yZW1vdmVfZHJhZ25kcm9wX2xpc3RlbmVycwMRFV9fZW1fanNfX3NhcHBfanNfaW5pdAMSJF9fZW1fanNfX3NhcHBfanNfcmVxdWVzdF9wb2ludGVybG9jawMTIV9fZW1fanNfX3NhcHBfanNfZXhpdF9wb2ludGVybG9jawMUG19fZW1fanNfX3NhcHBfanNfc2V0X2N1cnNvcgMVHl9fZW1fanNfX3NhcHBfanNfY2xlYXJfZmF2aWNvbgMWHF9fZW1fanNfX3NhcHBfanNfc2V0X2Zhdmljb24DFxRfX2VtX2pzX19zbG9nX2pzX2xvZwMYBmZmbHVzaACmBRVlbXNjcmlwdGVuX3N0YWNrX2luaXQAogUZZW1zY3JpcHRlbl9zdGFja19nZXRfZnJlZQCjBRllbXNjcmlwdGVuX3N0YWNrX2dldF9iYXNlAKQFGGVtc2NyaXB0ZW5fc3RhY2tfZ2V0X2VuZAClBRlfZW1zY3JpcHRlbl9zdGFja19yZXN0b3JlAKcFF19lbXNjcmlwdGVuX3N0YWNrX2FsbG9jAKgFHGVtc2NyaXB0ZW5fc3RhY2tfZ2V0X2N1cnJlbnQAqQUNX19zdGFydF9lbV9qcwMZDF9fc3RvcF9lbV9qcwMaE19fc3RhcnRfZW1fbGliX2RlcHMDGxJfX3N0b3BfZW1fbGliX2RlcHMDHAxkeW5DYWxsX2ppamkAqwUJNAEAQQELF8MBxAHFAdoDuAO8A70D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DQAgAUHAACADa62IIAIgA60iBIaEIQIgASAEhiEBCyAAIAE3AwAgACACNwMIC1MBAX4CQAJAIANBwABxRQ0AIAIgA0FAaq2IIQFCACECDAELIANFDQAgAkHAACADa62GIAEgA60iBIiEIQEgAiAEiCECCyAAIAE3AwAgACACNwMIC5AEAgV/An4jAEEgayICJAAgAUL///////8/gyEHAkACQCABQjCIQv//AYMiCKciA0H/h39qQf0PSw0AIABCPIggB0IEhoQhByADQYCIf2qtIQgCQAJAIABC//////////8PgyIAQoGAgICAgICACFQNACAHQgF8IQcMAQsgAEKAgICAgICAgAhSDQAgB0IBgyAHfCEHC0IAIAcgB0L/////////B1YiAxshACADrSAIfCEHDAELAkAgACAHhFANACAIQv//AVINACAAQjyIIAdCBIaEQoCAgICAgIAEhCEAQv8PIQcMAQsCQCADQf6HAU0NAEL/DyEHQgAhAAwBCwJAQYD4AEGB+AAgCFAiBBsiBSADayIGQfAATA0AQgAhAEIAIQcMAQsgAkEQaiAAIAcgB0KAgICAgIDAAIQgBBsiB0GAASAGaxCdBSACIAAgByAGEJ4FIAIpAwAiB0I8iCACQQhqKQMAQgSGhCEAAkACQCAHQv//////////D4MgBSADRyACKQMQIAJBEGpBCGopAwCEQgBSca2EIgdCgYCAgICAgIAIVA0AIABCAXwhAAwBCyAHQoCAgICAgICACFINACAAQgGDIAB8IQALIABCgICAgICAgAiFIAAgAEL/////////B1YiAxshACADrSEHCyACQSBqJAAgB0I0hiABQoCAgICAgICAgH+DhCAAhL8LBgAgACQBCwQAIwELEgBBgIAEJANBAEEPakFwcSQCCwcAIwAjAmsLBAAjAwsEACMCC8gCAQN/AkAgAA0AQQAhAQJAQQAoArDvB0UNAEEAKAKw7wcQpgUhAQsCQEEAKAKY7gdFDQBBACgCmO4HEKYFIAFyIQELAkAQ4wQoAgAiAEUNAANAAkACQCAAKAJMQQBODQBBASECDAELIAAQ4QRFIQILAkAgACgCFCAAKAIcRg0AIAAQpgUgAXIhAQsCQCACDQAgABDiBAsgACgCOCIADQALCxDkBCABDwsCQAJAIAAoAkxBAE4NAEEBIQIMAQsgABDhBEUhAgsCQAJAAkAgACgCFCAAKAIcRg0AIABBAEEAIAAoAiQRBwAaIAAoAhQNAEF/IQEgAkUNAQwCCwJAIAAoAgQiASAAKAIIIgNGDQAgACABIANrrEEBIAAoAigRDgAaC0EAIQEgAEEANgIcIABCADcDECAAQgA3AgQgAg0BCyAAEOIECyABCwYAIAAkAAsSAQJ/IwAgAGtBcHEiASQAIAELBAAjAAsNACABIAIgAyAAEQ4ACyUBAX4gACABIAKtIAOtQiCGhCAEEKoFIQUgBUIgiKcQoAUgBacLFAAgACABpyABQiCIpyACIAMQkAELC4KkBAQAQYCABAuQ2gNBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTkxPV01FTU9SWTogTmF0aXZlQWN0aXZpdHkgb25Mb3dNZW1vcnkAX3NhcHBfc3RyY3B5AF9zZ19zdHJjcHkAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05ERVNUUk9ZOiBOYXRpdmVBY3Rpdml0eSBvbkRlc3Ryb3kATnVtcGFkTXVsdGlwbHkAX3NnX3Nsb3RfaW5kZXgAcG9vbC0+ZnJlZV9xdWV1ZVtpXSAhPSBzbG90X2luZGV4ACgwKSAhPSBzbG90X2luZGV4AGJ1Zi0+Y21uLnVwZGF0ZV9mcmFtZV9pbmRleCAhPSBfc2cuZnJhbWVfaW5kZXgAX3NnX3Bvb2xfZnJlZV9pbmRleABfc2dfZ2xfc3RvcmFnZWJ1ZmZlcl9iaW5kX2luZGV4AF9zZ19wb29sX2FsbG9jX2luZGV4AF9zZy5nbC5jYWNoZS5jdXJfcGlwZWxpbmUtPnNoYWRlci0+Y21uLnN0YWdlW3N0YWdlX2luZGV4XS5udW1fdW5pZm9ybV9ibG9ja3MgPiB1Yl9pbmRleAAtKyAgIDBYMHgALTBYKzBYIDBYLTB4KzB4IDB4AHNnX3F1ZXJ5X2J1ZmZlcl9vdmVyZmxvdwBTR1AgdmVydGljZXMgYnVmZmVyIG92ZXJmbG93AFNHUCB0cmFuc2Zvcm0gc3RhY2sgb3ZlcmZsb3cAU0dQIHN0YXRlIHN0YWNrIG92ZXJmbG93AFNHUCB0cmFuc2Zvcm0gc3RhY2sgdW5kZXJmbG93AFNHUCBzdGF0ZSBzdGFjayB1bmRlcmZsb3cAV0lOMzJfQ1JFQVRFX0hFTFBFUl9XSU5ET1dfRkFJTEVEOiBmYWlsZWQgdG8gY3JlYXRlIGhlbHBlciB3aW5kb3cAc2FwcF93Z3B1X2dldF9yZW5kZXJfdmlldwBzYXBwX2QzZDExX2dldF9yZW5kZXJfdmlldwBzYXBwX3dncHVfZ2V0X2RlcHRoX3N0ZW5jaWxfdmlldwBzYXBwX2QzZDExX2dldF9kZXB0aF9zdGVuY2lsX3ZpZXcAc2FwcF93Z3B1X2dldF9yZXNvbHZlX3ZpZXcAc2FwcF9kM2QxMV9nZXRfcmVzb2x2ZV92aWV3AF9zZ19nbF9kcmF3AHNnX2RyYXcAc2FwcF9kM2QxMV9nZXRfZGV2aWNlX2NvbnRleHQAV0lOMzJfRFVNTVlfQ09OVEVYVF9TRVRfUElYRUxGT1JNQVRfRkFJTEVEOiBmYWlsZWQgdG8gc2V0IHBpeGVsIGZvcm1hdCBmb3IgZHVtbXkgR0wgY29udGV4dABXSU4zMl9DUkVBVEVfRFVNTVlfQ09OVEVYVF9GQUlMRUQ6IGZhaWxlZCB0byBjcmVhdGUgZHVtbXkgR0wgY29udGV4dABfc2FwcF90aW1pbmdfcHV0AFZBTElEQVRFX1NIQURFUkRFU0NfVUJfU1REMTQwX0FSUkFZX1RZUEU6IHVuaWZvcm0gYXJyYXlzIG9ubHkgYWxsb3dlZCBmb3IgRkxPQVQ0LCBJTlQ0LCBNQVQ0IGluIHN0ZDE0MCBsYXlvdXQAZHN0AHNnX2FwcGx5X3ZpZXdwb3J0AHNncF9yZXNldF92aWV3cG9ydABzZ3Bfdmlld3BvcnQASW5zZXJ0AF9zZ19yZXNldF9zbG90AFZBTElEQVRFX0FVQl9OT19VQl9BVF9TTE9UOiBzZ19hcHBseV91bmlmb3Jtczogbm8gdW5pZm9ybSBibG9jayBkZWNsYXJhdGlvbiBhdCB0aGlzIHNoYWRlciBzdGFnZSBVQiBzbG90AF9zZ3BfZ2V0X3BpcGVsaW5lX3VuaWZvcm1fY291bnQAVkFMSURBVEVfQVBJUF9TQU1QTEVfQ09VTlQ6IHNnX2FwcGx5X3BpcGVsaW5lOiBwaXBlbGluZSBNU0FBIHNhbXBsZSBjb3VudCBkb2Vzbid0IG1hdGNoIHJlbmRlciBwYXNzIGF0dGFjaG1lbnQgc2FtcGxlIGNvdW50AFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19ERVBUSF9JTUFHRV9TQU1QTEVfQ09VTlQ6IHBhc3MgZGVwdGggYXR0YWNobWVudCBzYW1wbGUgY291bnQgbXVzdCBtYXRjaCBjb2xvciBhdHRhY2htZW50IHNhbXBsZSBjb3VudABWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfSU1BR0VfU0FNUExFX0NPVU5UUzogYWxsIHBhc3MgYXR0YWNobWVudHMgbXVzdCBoYXZlIHRoZSBzYW1lIHNhbXBsZSBjb3VudABXSU4zMl9EVU1NWV9DT05URVhUX01BS0VfQ1VSUkVOVF9GQUlMRUQ6IGZhaWxlZCB0byBtYWtlIGR1bW15IEdMIGNvbnRleHQgY3VycmVudABfc2dfdW5pZm9ybV9hbGlnbm1lbnQAX3NnX3NoYWRlcl9jb21tb25faW5pdABfc2dfcGlwZWxpbmVfY29tbW9uX2luaXQAc2dfY29tbWl0AEFycm93UmlnaHQAQWx0UmlnaHQAU2hpZnRSaWdodABCcmFja2V0UmlnaHQAQ29udHJvbFJpZ2h0AE1ldGFSaWdodABBcnJvd0xlZnQAQWx0TGVmdABTaGlmdExlZnQAQnJhY2tldExlZnQAQ29udHJvbExlZnQATWV0YUxlZnQAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9FWFBFQ1RfQ09MT1JGT1JNQVRfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5jb2xvcl9mb3JtYXQgdG8gYmUgdW5zZXQAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9FWFBFQ1RfREVQVEhGT1JNQVRfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5kZXB0aF9mb3JtYXQgdG8gYmUgdW5zZXQAdWJfZGVzYy0+c2l6ZSA9PSAoc2l6ZV90KWN1cl91bmlmb3JtX29mZnNldABfc2dfZ2xfYnVmZmVyX3RhcmdldABfc2dfZ2xfdGV4dHVyZV90YXJnZXQAX3NnX2dsX2N1YmVmYWNlX3RhcmdldABzZ19hcHBseV9zY2lzc29yX3JlY3QAc2dwX2RyYXdfdGV4dHVyZWRfcmVjdABzZ3BfZHJhd19maWxsZWRfcmVjdABzZ3BfcmVzZXRfcHJvamVjdABXSU4zMl9EM0QxMV9HRVRfSURYR0lGQUNUT1JZX0ZBSUxFRDogY291bGQgbm90IG9idGFpbiBJRFhHSUZhY3Rvcnkgb2JqZWN0AFdJTjMyX0QzRDExX0dFVF9JRFhHSUFEQVBURVJfRkFJTEVEOiBjb3VsZCBub3Qgb2J0YWluIElEWEdJQWRhcHRlciBvYmplY3QAV0dQVV9TV0FQQ0hBSU5fQ1JFQVRFX1NXQVBDSEFJTl9GQUlMRUQ6IHdncHU6IGZhaWxlZCB0byBjcmVhdGUgc3dhcGNoYWluIG9iamVjdABOdW1wYWRTdWJ0cmFjdABfY29sb3JfYnVmZmVyX2Zsb2F0AF9jb2xvcl9idWZmZXJfaGFsZl9mbG9hdABfc2dfZ2xfdGV4aW1hZ2VfaW50ZXJuYWxfZm9ybWF0AF9zZ19pc192YWxpZF9yZW5kZXJ0YXJnZXRfZGVwdGhfZm9ybWF0AF9zZ19nbF9zdXBwb3J0ZWRfdGV4dHVyZV9mb3JtYXQAX3NnX2dsX3RleGltYWdlX2Zvcm1hdABWQUxJREFURV9BUElQX0NPTE9SX0ZPUk1BVDogc2dfYXBwbHlfcGlwZWxpbmU6IHBpcGVsaW5lIGNvbG9yIGF0dGFjaG1lbnQgcGl4ZWwgZm9ybWF0IGRvZXNuJ3QgbWF0Y2ggcGFzcyBjb2xvciBhdHRhY2htZW50IHBpeGVsIGZvcm1hdABWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfUkVTT0xWRV9JTUFHRV9GT1JNQVQ6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50IHBpeGVsIGZvcm1hdCBtdXN0IG1hdGNoIGNvbG9yIGF0dGFjaG1lbnQgcGl4ZWwgZm9ybWF0AFZBTElEQVRFX0FQSVBfREVQVEhfRk9STUFUOiBzZ19hcHBseV9waXBlbGluZTogcGlwZWxpbmUgZGVwdGggcGl4ZWxfZm9ybWF0IGRvZXNuJ3QgbWF0Y2ggcGFzcyBkZXB0aCBhdHRhY2htZW50IHBpeGVsIGZvcm1hdABWQUxJREFURV9JTUFHRURFU0NfTk9fTVNBQV9SVF9TVVBQT1JUOiBNU0FBIG5vdCBzdXBwb3J0ZWQgZm9yIHRoaXMgcGl4ZWwgZm9ybWF0AFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19DT0xPUl9JTlZfUElYRUxGT1JNQVQ6IHBhc3MgY29sb3ItYXR0YWNobWVudCBpbWFnZXMgbXVzdCBiZSByZW5kZXJhYmxlIGNvbG9yIHBpeGVsIGZvcm1hdABWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfREVQVEhfSU5WX1BJWEVMRk9STUFUOiBwYXNzIGRlcHRoLWF0dGFjaG1lbnQgaW1hZ2UgbXVzdCBiZSBkZXB0aCBvciBkZXB0aC1zdGVuY2lsIHBpeGVsIGZvcm1hdABXSU4zMl9XR0xfU0VUX1BJWEVMRk9STUFUX0ZBSUxFRDogZmFpbGVkIHRvIHNldCBzZWxlY3RlZCBwaXhlbCBmb3JtYXQAV0lOMzJfV0dMX0ZJTkRfUElYRUxGT1JNQVRfRkFJTEVEOiBmYWlsZWQgdG8gZmluZCBtYXRjaGluZyBXR0wgcGl4ZWwgZm9ybWF0AFZBTElEQVRFX0lNQUdFREVTQ19ERVBUSF8zRF9JTUFHRTogM0QgaW1hZ2VzIGNhbm5vdCBoYXZlIGEgZGVwdGgvc3RlbmNpbCBpbWFnZSBmb3JtYXQAX3NnX2F0dGFjaG1lbnRzX2F0AF9zZ19zYW1wbGVyX2F0AF9zZ19idWZmZXJfYXQAX3NnX3NoYWRlcl9hdABzZ3Bfcm90YXRlX2F0AF9zZ19waXBlbGluZV9hdABzZ3Bfc2NhbGVfYXQAX3NnX2ltYWdlX2F0AFZBTElEQVRFX1BJUEVMSU5FREVTQ19OT19DT05UX0FUVFJTOiBzZ19waXBlbGluZV9kZXNjLmxheW91dC5hdHRycyBpcyBub3QgY29udGludW91cwBNaW51cwBWQUxJREFURV9BQk5EX1ZCUzogc2dfYXBwbHlfYmluZGluZ3M6IG51bWJlciBvZiB2ZXJ0ZXggYnVmZmVycyBkb2Vzbid0IG1hdGNoIG51bWJlciBvZiBwaXBlbGluZSB2ZXJ0ZXggbGF5b3V0cwBhdHRzAEJFR0lOUEFTU19BVFRBQ0hNRU5UX0lOVkFMSUQ6IHNnX2JlZ2luX3Bhc3M6IGFuIGF0dGFjaG1lbnQgd2FzIHByb3ZpZGVkIHRoYXQgbm8gbG9uZ2VyIGV4aXN0cwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfTk9fQ09OVF9DT0xPUl9BVFRTOiBjb2xvciBhdHRhY2htZW50cyBtdXN0IG9jY3VweSBjb250aW51b3VzIHNsb3RzAFZBTElEQVRFX1NIQURFUkRFU0NfTk9fQ09OVF9VQl9NRU1CRVJTOiB1bmlmb3JtIGJsb2NrIG1lbWJlcnMgbXVzdCBvY2N1cHkgY29udGludW91cyBzbG90cwBWQUxJREFURV9TSEFERVJERVNDX05PX0NPTlRfVUJTOiBzaGFkZXIgdW5pZm9ybSBibG9ja3MgbXVzdCBvY2N1cHkgY29udGludW91cyBzbG90cwBMSU5VWF9HTFhfTE9BRF9FTlRSWV9QT0lOVFNfRkFJTEVEOiBmYWlsZWQgdG8gbG9hZCBHTFggZW50cnkgcG9pbnRzAF9zZ19sb29rdXBfYXR0YWNobWVudHMAX3NnX2dsX2Rpc2NhcmRfYXR0YWNobWVudHMAVkFMSURBVEVfQVBJUF9BVFRfQ09VTlQ6IHNnX2FwcGx5X3BpcGVsaW5lOiBudW1iZXIgb2YgcGlwZWxpbmUgY29sb3IgYXR0YWNobWVudHMgZG9lc24ndCBtYXRjaCBudW1iZXIgb2YgcGFzcyBjb2xvciBhdHRhY2htZW50cwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfTk9fQVRUQUNITUVOVFM6IHNnX2F0dGFjaG1lbnRzX2Rlc2Mgbm8gY29sb3Igb3IgZGVwdGgtc3RlbmNpbCBhdHRhY2htZW50cwBXR1BVX0FUVEFDSE1FTlRTX0NSRUFURV9URVhUVVJFX1ZJRVdfRkFJTEVEOiB3Z3B1VGV4dHVyZUNyZWF0ZVZpZXcoKSBmYWlsZWQgaW4gY3JlYXRlIGF0dGFjaG1lbnRzAF9zZ19wYXNzX2FjdGlvbl9kZWZhdWx0cwBfc2FwcF9kZXNjX2RlZmF1bHRzAF9zZ19waXBlbGluZV9kZXNjX2RlZmF1bHRzAF9zZ19nbF9pbml0X2xpbWl0cwBzZ3BfZHJhd190ZXh0dXJlZF9yZWN0cwBzZ3BfZHJhd19maWxsZWRfcmVjdHMAX3NnX2dsX2JlZ2luX3Bhc3MAc2dfYmVnaW5fcGFzcwAhX3NnLmN1cl9wYXNzLmluX3Bhc3MAX3NnX2dsX2VuZF9wYXNzAHNnX2VuZF9wYXNzAGF0dHJfbG9jIDwgKEdMaW50KV9zZy5saW1pdHMubWF4X3ZlcnRleF9hdHRycwBwb29sICYmIHBvb2wtPmdlbl9jdHJzAFZBTElEQVRFX0FCTkRfVlNfRVhQRUNURURfTk9ORklMVEVSSU5HX1NBTVBMRVI6IHNnX2FwcGx5X2JpbmRpbmdzOiBzaGFkZXIgZXhwZWN0ZWQgU0dfU0FNUExFUlRZUEVfTk9ORklMVEVSSU5HIG9uIHZlcnRleCBzdGFnZSwgYnV0IHNhbXBsZXIgaGFzIFNHX0ZJTFRFUl9MSU5FQVIgZmlsdGVycwBWQUxJREFURV9BQk5EX0ZTX0VYUEVDVEVEX05PTkZJTFRFUklOR19TQU1QTEVSOiBzZ19hcHBseV9iaW5kaW5nczogc2hhZGVyIGV4cGVjdGVkIFNHX1NBTVBMRVJUWVBFX05PTkZJTFRFUklORyBvbiBmcmFnbWVudCBzdGFnZSwgYnV0IHNhbXBsZXIgaGFzIFNHX0ZJTFRFUl9MSU5FQVIgZmlsdGVycwBfc2dfbm90aWZ5X2NvbW1pdF9saXN0ZW5lcnMAX3NnX3NldHVwX2NvbW1pdF9saXN0ZW5lcnMAX3NnX2Rpc2NhcmRfY29tbWl0X2xpc3RlbmVycwBudW1fc21wcyA9PSBzdGFnZS0+bnVtX3NhbXBsZXJzAFNHUCBmYWlsZWQgdG8gYWxsb2NhdGUgYnVmZmVycwBzbXBfaW5kZXggPCBudW1fc21wcwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfTUlQTEVWRUw6IHBhc3MgYXR0YWNobWVudCBtaXAgbGV2ZWwgaXMgYmlnZ2VyIHRoYW4gaW1hZ2UgaGFzIG1pcG1hcHMAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0RFUFRIX01JUExFVkVMOiBwYXNzIGRlcHRoIGF0dGFjaG1lbnQgbWlwIGxldmVsIGlzIGJpZ2dlciB0aGFuIGltYWdlIGhhcyBtaXBtYXBzAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19SRVNPTFZFX01JUExFVkVMOiBwYXNzIHJlc29sdmUgYXR0YWNobWVudCBtaXAgbGV2ZWwgaXMgYmlnZ2VyIHRoYW4gaW1hZ2UgaGFzIG1pcG1hcHMAVkFMSURBVEVfU0hBREVSREVTQ19OT19VQl9NRU1CRVJTOiBHTCBiYWNrZW5kIHJlcXVpcmVzIHVuaWZvcm0gYmxvY2sgbWVtYmVyIGRlY2xhcmF0aW9ucwBfc2dfZ2xfYXBwbHlfdW5pZm9ybXMAc2dfYXBwbHlfdW5pZm9ybXMAX3NnX3ZhbGlkYXRlX2FwcGx5X3VuaWZvcm1zADAgPT0gX3NnLmNvbW1pdF9saXN0ZW5lcnMuaXRlbXMAMCAhPSBfc2cuY29tbWl0X2xpc3RlbmVycy5pdGVtcwBfc2dfc2V0dXBfcG9vbHMAX3NnX2Rpc2NhcmRfcG9vbHMAMCA9PSBfc2FwcC5kZWZhdWx0X2ljb25fcGl4ZWxzADAgIT0gX3NhcHAuZGVmYXVsdF9pY29uX3BpeGVscwBfc2dfZ2xfYXBwbHlfYmluZGluZ3MAc2dfYXBwbHlfYmluZGluZ3MAX3NnX3ZhbGlkYXRlX2FwcGx5X2JpbmRpbmdzAF9zZ19nbF9jYWNoZV9jbGVhcl90ZXh0dXJlX3NhbXBsZXJfYmluZGluZ3MARFJBV19XSVRIT1VUX0JJTkRJTkdTOiBhdHRlbXB0aW5nIHRvIGRyYXcgd2l0aG91dCByZXNvdXJjZSBiaW5kaW5ncwBpbWdfaW5kZXggPCBudW1faW1ncwBMSU5VWF9HTFhfTk9fR0xYRkJDT05GSUdTOiBnbFhHZXRGQkNvbmZpZ3MoKSByZXR1cm5lZCBubyBjb25maWdzAExJTlVYX0VHTF9OT19DT05GSUdTOiBlZ2xDaG9vc2VDb25maWcoKSByZXR1cm5lZCBubyBjb25maWdzAF9zYXBwLmRyb3AubnVtX2ZpbGVzIDw9IF9zYXBwLmRyb3AubWF4X2ZpbGVzAG51bV9pbWdzID09IHN0YWdlLT5udW1faW1hZ2VzAGF0dHItPnZiX2luZGV4IDwgYm5kLT5udW1fdmJzAGNhbnZhcwBfc2FwcF9kcm9wcGVkX2ZpbGVfcGF0aF9wdHIAYnVmICYmIGRhdGEgJiYgZGF0YS0+cHRyAGRlc2MtPmRhdGEucHRyAFdJTjMyX1dHTF9ERVNDUklCRV9QSVhFTEZPUk1BVF9GQUlMRUQ6IGZhaWxlZCB0byBnZXQgcGl4ZWwgZm9ybWF0IGRlc2NyaXB0b3IAX3NnX2dsX2JsZW5kX2ZhY3RvcgBzZ3BfcmVzZXRfc2Npc3NvcgBzZ3Bfc2Npc3NvcgBfc2dwX3NldF9lcnJvcgBObyBlcnJvcgBzZ3BfcmVzZXRfY29sb3IAc2dwX3NldF9jb2xvcgBFbnRlcgBfc2dfZ2xfbWluX2ZpbHRlcgAwID09IF9zZy5jb21taXRfbGlzdGVuZXJzLnVwcGVyAElERU5USUNBTF9DT01NSVRfTElTVEVORVI6IGF0dGVtcHRpbmcgdG8gYWRkIGlkZW50aWNhbCBjb21taXQgbGlzdGVuZXIAc2dfZGVzdHJveV9zYW1wbGVyAF9zZ191bmluaXRfc2FtcGxlcgBfc2dfaW5pdF9zYW1wbGVyAF9zZ19nbF9jcmVhdGVfc2FtcGxlcgBfc2dfZ2xfY2FjaGVfaW52YWxpZGF0ZV90ZXh0dXJlX3NhbXBsZXIAX3NnX2dsX2NhY2hlX2JpbmRfdGV4dHVyZV9zYW1wbGVyAHNnX21ha2Vfc2FtcGxlcgBfc2dfZ2xfZGlzY2FyZF9zYW1wbGVyAF9zZ19kZWFsbG9jX3NhbXBsZXIAc2dwLW5lYXJlc3Qtc2FtcGxlcgBTR1AgZmFpbGVkIHRvIGNyZWF0ZSBuZWFyZXN0IHNhbXBsZXIAVkFMSURBVEVfU0hBREVSREVTQ19DT01QQVJJU09OX1NBTVBMRVJfUkVRVUlSRUQ6IHNoYWRlciBzdGFnZTogaW1hZ2Ugc2FtcGxlIHR5cGUgREVQVEggY2FuIG9ubHkgYmUgdXNlZCB3aXRoIENPTVBBUklTT04gc2FtcGxlcgBWQUxJREFURV9TSEFERVJERVNDX05PTkZJTFRFUklOR19TQU1QTEVSX1JFUVVJUkVEOiBzaGFkZXIgc3RhZ2U6IGltYWdlIHNhbXBsZSB0eXBlIFVORklMVEVSQUJMRV9GTE9BVCwgVUlOVCwgU0lOVCBjYW4gb25seSBiZSB1c2VkIHdpdGggTk9ORklMVEVSSU5HIHNhbXBsZXIAc2FwcF9nbF9nZXRfZnJhbWVidWZmZXIAc2dfZGVzdHJveV9idWZmZXIAX3NnX3VuaW5pdF9idWZmZXIAX3NnX2luaXRfYnVmZmVyAF9zYXBwX2NsZWFyX2Ryb3BfYnVmZmVyAF9zZ19nbF9jcmVhdGVfYnVmZmVyAHNnX21ha2VfYnVmZmVyAF9zZ19nbF9jYWNoZV9iaW5kX3N0b3JhZ2VfYnVmZmVyAF9zZ19nbF9kaXNjYXJkX2J1ZmZlcgBfc2dfZ2xfY2FjaGVfYmluZF9idWZmZXIAX3NnX2dsX2FwcGVuZF9idWZmZXIAc2dfYXBwZW5kX2J1ZmZlcgBfc2dfdmFsaWRhdGVfYXBwZW5kX2J1ZmZlcgBfc2dfZGVhbGxvY19idWZmZXIAX3NhcHAuZHJvcC5idWZmZXIAX3NhcHAuY2xpcGJvYXJkLmJ1ZmZlcgBTR1AgZmFpbGVkIHRvIGNyZWF0ZSB2ZXJ0ZXggYnVmZmVyAFZBTElEQVRFX0FQUEVOREJVRl9VU0FHRTogc2dfYXBwZW5kX2J1ZmZlcjogY2Fubm90IGFwcGVuZCB0byBpbW11dGFibGUgYnVmZmVyAFZBTElEQVRFX1VQREFURUJVRl9VU0FHRTogc2dfdXBkYXRlX2J1ZmZlcjogY2Fubm90IHVwZGF0ZSBpbW11dGFibGUgYnVmZmVyAFZBTElEQVRFX0FCTkRfVlNfU1RPUkFHRUJVRkZFUl9CSU5ESU5HX0JVRkZFUlRZUEU6IHNnX2FwcGx5X2JpbmRpbmdzOiBidWZmZXIgYm91bmQgdG8gdmVydGV4IHN0YWdlIHN0b3JhZ2UgYnVmZmVyIHNsb3QgaXMgbm90IG9mIHR5cGUgc3RvcmFnZSBidWZmZXIAVkFMSURBVEVfQUJORF9GU19TVE9SQUdFQlVGRkVSX0JJTkRJTkdfQlVGRkVSVFlQRTogc2dfYXBwbHlfYmluZGluZ3M6IGJ1ZmZlciBib3VuZCB0byBmcmFobWVudCBzdGFnZSBzdG9yYWdlIGJ1ZmZlciBzbG90IGlzIG5vdCBvZiB0eXBlIHN0b3JhZ2UgYnVmZmVyAENMSVBCT0FSRF9TVFJJTkdfVE9PX0JJRzogY2xpcGJvYXJkIHN0cmluZyBkaWRuJ3QgZml0IGludG8gY2xpcGJvYXJkIGJ1ZmZlcgBzZ19kZXN0cm95X3NoYWRlcgBfc2dfdW5pbml0X3NoYWRlcgBfc2dfaW5pdF9zaGFkZXIAX3NnX2xvb2t1cF9zaGFkZXIAX3NnX2dsX2NyZWF0ZV9zaGFkZXIAX3NnX2dsX2NvbXBpbGVfc2hhZGVyAHNnX21ha2Vfc2hhZGVyAF9zZ19nbF9kaXNjYXJkX3NoYWRlcgBfc2dfZGVhbGxvY19zaGFkZXIAcGlwLT5zaGFkZXIAU0dQIGZhaWxlZCB0byBjcmVhdGUgdGhlIGNvbW1vbiBzaGFkZXIAVkFMSURBVEVfUElQRUxJTkVERVNDX0FUVFJfU0VNQU5USUNTOiBEM0QxMSBtaXNzaW5nIHZlcnRleCBhdHRyaWJ1dGUgc2VtYW50aWNzIGluIHNoYWRlcgBfdGV4dHVyZV9mbG9hdF9saW5lYXIAX3NhcHBfY2xlYXIAc2dwX2NsZWFyAF9zZ19jbGVhcgBzZ3Bfc2V0dXAAc2dfc2V0dXAAc2FwcABzb2tvbF9hcHAAX3NhcHBfZW1zY19kcm9wAF9zZ19nbF9zdGVuY2lsX29wAF9zZ19nbF9ibGVuZF9vcABzbXAtPmdsLnNtcABfc2dwX2RyYXdfc29saWRfcGlwAGJuZC0+cGlwAF9zZ19nbF93cmFwAEFycm93VXAAUGFnZVVwAGluZm8AVkFMSURBVEVfQUJORF9WQl9PVkVSRkxPVzogc2dfYXBwbHlfYmluZGluZ3M6IGJ1ZmZlciBpbiB2ZXJ0ZXggYnVmZmVyIHNsb3QgaXMgb3ZlcmZsb3duAFZBTElEQVRFX0FCTkRfSUJfT1ZFUkZMT1c6IHNnX2FwcGx5X2JpbmRpbmdzOiBidWZmZXIgaW4gaW5kZXggYnVmZmVyIHNsb3QgaXMgb3ZlcmZsb3duAHNncF9zaHV0ZG93bgBBcnJvd0Rvd24AUGFnZURvd24AV0lOMzJfV0dMX0NSRUFURV9DT05URVhUX0FUVFJJQlNfRkFJTEVEX09USEVSOiBDcmVhdGVDb250ZXh0QXR0cmlic0FSQiBmYWlsZWQgZm9yIG90aGVyIHJlYXNvbgBTZW1pY29sb24ATElOVVhfWDExX0ZBSUxFRF9UT19CRUNPTUVfT1dORVJfT0ZfQ0xJUEJPQVJEOiBYMTE6IEZhaWxlZCB0byBiZWNvbWUgb3duZXIgb2YgY2xpcGJvYXJkIHNlbGVjdGlvbgBhY3Rpb24ATElOVVhfR0xYX1FVRVJZX1ZFUlNJT05fRkFJTEVEOiBmYWlsZWQgdG8gcXVlcnkgR0xYIHZlcnNpb24AX3NhcHBfc2V0dXBfZGVmYXVsdF9pY29uAHNhcHBfc2V0X2ljb24AX3NhcHBfZW1zY19zZXRfaWNvbgBzZ3BfYmVnaW4AbWFpbgBXR1BVX1NXQVBDSEFJTl9DUkVBVEVfREVQVEhfU1RFTkNJTF9URVhUVVJFX0ZBSUxFRDogd2dwdTogZmFpbGVkIHRvIGNyZWF0ZSBkZXB0aC1zdGVuY2lsIHRleHR1cmUgZm9yIHN3YXBjaGFpbgBXR1BVX1NXQVBDSEFJTl9DUkVBVEVfTVNBQV9URVhUVVJFX0ZBSUxFRDogd2dwdTogZmFpbGVkIHRvIGNyZWF0ZSBtc2FhIHRleHR1cmUgZm9yIHN3YXBjaGFpbgBXR1BVX1NXQVBDSEFJTl9DUkVBVEVfU1VSRkFDRV9GQUlMRUQ6IHdncHU6IGZhaWxlZCB0byBjcmVhdGUgc3VyZmFjZSBmb3Igc3dhcGNoYWluAFByaW50U2NyZWVuAG5hbgAwID09IF9zZy5jb21taXRfbGlzdGVuZXJzLm51bQBzZ3BfcmVzZXRfdHJhbnNmb3JtAHNncF9wb3BfdHJhbnNmb3JtAHNncF9wdXNoX3RyYW5zZm9ybQBzZ3BfcmVzZXRfdW5pZm9ybQBzZ3Bfc2V0X3VuaWZvcm0AX3NnX2luaXRfcG9vbABfc2dfZGlzY2FyZF9wb29sAENPTU1JVF9MSVNURU5FUl9BUlJBWV9GVUxMOiBjb21taXQgbGlzdGVuZXIgYXJyYXkgZnVsbABTR1AgdmVydGljZXMgYnVmZmVyIGlzIGZ1bGwAU0dQIHVuaWZvcm0gYnVmZmVyIGlzIGZ1bGwAU0dQIGNvbW1hbmQgYnVmZmVyIGlzIGZ1bGwAV0lOMzJfTE9BRF9PUEVOR0wzMl9ETExfRkFJTEVEOiBmYWlsZWQgbG9hZGluZyBvcGVuZ2wzMi5kbGwARXF1YWwATnVtcGFkRGVjaW1hbABDYXBzTG9jawBOdW1Mb2NrAFNjcm9sbExvY2sAT0s6IE9rAHNncF9mbHVzaABCYWNrc2xhc2gAU2xhc2gAL1VzZXJzL2tvbnN1bWVyL0Rlc2t0b3Avb3RoZXJkZXYvbnVsbDAtc29rb2wvd2J1aWxkL19kZXBzL3Nva29sLXNyYy9zb2tvbF9nZnguaAAvVXNlcnMva29uc3VtZXIvRGVza3RvcC9vdGhlcmRldi9udWxsMC1zb2tvbC93YnVpbGQvX2RlcHMvc29rb2wtc3JjL3Nva29sX2FwcC5oAC9Vc2Vycy9rb25zdW1lci9EZXNrdG9wL290aGVyZGV2L251bGwwLXNva29sL3didWlsZC9fZGVwcy9zb2tvbF9ncC1zcmMvc29rb2xfZ3AuaABBTkRST0lEX1dSSVRFX01TR19GQUlMRUQ6IGZhaWxlZCB0byB3cml0ZSBtZXNzYWdlIGluIF9zYXBwX2FuZHJvaWRfbXNnACFzaGQtPmdsLnByb2cAVkFMSURBVEVfU0hBREVSREVTQ19VQl9NRU1CRVJfTkFNRTogdW5pZm9ybSBibG9jayBtZW1iZXIgbmFtZSBtaXNzaW5nAExJTlVYX0dMWF9SRVFVSVJFRF9FWFRFTlNJT05TX01JU1NJTkc6IEdMWCBleHRlbnNpb25zIEFSQl9jcmVhdGVfY29udGV4dCBhbmQgQVJCX2NyZWF0ZV9jb250ZXh0X3Byb2ZpbGUgbWlzc2luZwB3YXJuaW5nAF9zZ19nbF9jYWNoZV9yZXN0b3JlX3RleHR1cmVfc2FtcGxlcl9iaW5kaW5nAF9zZ19nbF9jYWNoZV9zdG9yZV90ZXh0dXJlX3NhbXBsZXJfYmluZGluZwBfc2dfZ2xfY2FjaGVfcmVzdG9yZV9idWZmZXJfYmluZGluZwBfc2dfZ2xfY2FjaGVfc3RvcmVfYnVmZmVyX2JpbmRpbmcAaW1nAExJTlVYX0dMWF9OT19TVUlUQUJMRV9HTFhGQkNPTkZJRzogZmFpbGVkIHRvIGZpbmQgYSBzdWl0YWJsZSBHTFhGQkNvbmZpZwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfUkVTT0xWRV9MQVlFUjogcGFzcyByZXNvbHZlIGF0dGFjaG1lbnQgaXMgYXJyYXkgdGV4dHVyZSwgYnV0IGxheWVyIGluZGV4IGlzIHRvbyBiaWcAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0xBWUVSOiBwYXNzIGF0dGFjaG1lbnQgaW1hZ2UgaXMgYXJyYXkgdGV4dHVyZSwgYnV0IGxheWVyIGluZGV4IGlzIHRvbyBiaWcAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0RFUFRIX0xBWUVSOiBwYXNzIGRlcHRoIGF0dGFjaG1lbnQgaW1hZ2UgaXMgYXJyYXkgdGV4dHVyZSwgYnV0IGxheWVyIGluZGV4IGlzIHRvbyBiaWcAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfRkFDRTogcGFzcyByZXNvbHZlIGF0dGFjaG1lbnQgaXMgY3ViZW1hcCwgYnV0IGZhY2UgaW5kZXggaXMgdG9vIGJpZwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfRkFDRTogcGFzcyBhdHRhY2htZW50IGltYWdlIGlzIGN1YmVtYXAsIGJ1dCBmYWNlIGluZGV4IGlzIHRvbyBiaWcAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0RFUFRIX0ZBQ0U6IHBhc3MgZGVwdGggYXR0YWNobWVudCBpbWFnZSBpcyBjdWJlbWFwLCBidXQgZmFjZSBpbmRleCBpcyB0b28gYmlnAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19SRVNPTFZFX1NMSUNFOiBwYXNzIHJlc29sdmUgYXR0YWNobWVudCBpcyAzZCB0ZXh0dXJlLCBidXQgc2xpY2UgdmFsdWUgaXMgdG9vIGJpZwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfU0xJQ0U6IHBhc3MgYXR0YWNobWVudCBpbWFnZSBpcyAzZCB0ZXh0dXJlLCBidXQgc2xpY2UgdmFsdWUgaXMgdG9vIGJpZwBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfREVQVEhfU0xJQ0U6IHBhc3MgZGVwdGggYXR0YWNobWVudCBpbWFnZSBpcyAzZCB0ZXh0dXJlLCBidXQgc2xpY2UgdmFsdWUgaXMgdG9vIGJpZwBnbF9idWYAaW5mAF9zZ192ZXJ0ZXhmb3JtYXRfYnl0ZXNpemUAX3NnX3BpeGVsZm9ybWF0X2J5dGVzaXplAF9zZ19nbF92ZXJ0ZXhmb3JtYXRfc2l6ZQBfc2dfdW5pZm9ybV9zaXplAG9mZnNldCA8IF9zYXBwLmRyb3AuYnVmX3NpemUAX3NncF9xdWVyeV9pbWFnZV9zaXplAHBvb2wtPnF1ZXVlX3RvcCA8IHBvb2wtPnNpemUAX3NnLmdsLmNhY2hlLmN1cl9waXBlbGluZS0+c2hhZGVyLT5jbW4uc3RhZ2Vbc3RhZ2VfaW5kZXhdLnVuaWZvcm1fYmxvY2tzW3ViX2luZGV4XS5zaXplID09IGRhdGEtPnNpemUAVkFMSURBVEVfVVBEQVRFQlVGX1NJWkU6IHNnX3VwZGF0ZV9idWZmZXI6IHVwZGF0ZSBzaXplIGlzIGJpZ2dlciB0aGFuIGJ1ZmZlciBzaXplAFZBTElEQVRFX0FQUEVOREJVRl9TSVpFOiBzZ19hcHBlbmRfYnVmZmVyOiBvdmVyYWxsIGFwcGVuZGVkIHNpemUgaXMgYmlnZ2VyIHRoYW4gYnVmZmVyIHNpemUAVkFMSURBVEVfQlVGRkVSREVTQ19EQVRBX1NJWkU6IGltbXV0YWJsZSBidWZmZXIgZGF0YSBzaXplIGRpZmZlcnMgZnJvbSBidWZmZXIgc2l6ZQBWQUxJREFURV9TSEFERVJERVNDX1VCX1NJWkVfTUlTTUFUQ0g6IHNpemUgb2YgdW5pZm9ybSBibG9jayBtZW1iZXJzIGRvZXNuJ3QgbWF0Y2ggdW5pZm9ybSBibG9jayBzaXplAFZBTElEQVRFX0FVQl9TSVpFOiBzZ19hcHBseV91bmlmb3JtczogZGF0YSBzaXplIGRvZXNuJ3QgbWF0Y2ggZGVjbGFyZWQgdW5pZm9ybSBibG9jayBzaXplAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19JTUFHRV9TSVpFUzogYWxsIHBhc3MgYXR0YWNobWVudHMgbXVzdCBoYXZlIHRoZSBzYW1lIHNpemUAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfSU1BR0VfU0laRVM6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50IHNpemUgbXVzdCBtYXRjaCBjb2xvciBhdHRhY2htZW50IGltYWdlIHNpemUAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0RFUFRIX0lNQUdFX1NJWkVTOiBwYXNzIGRlcHRoIGF0dGFjaG1lbnQgaW1hZ2Ugc2l6ZSBtdXN0IG1hdGNoIGNvbG9yIGF0dGFjaG1lbnQgaW1hZ2Ugc2l6ZQBWQUxJREFURV9JTUFHRURBVEFfREFUQV9TSVpFOiBzZ19pbWFnZV9kYXRhOiBkYXRhIHNpemUgZG9lc24ndCBtYXRjaCBleHBlY3RlZCBzdXJmYWNlIHNpemUAVkFMSURBVEVfQkVHSU5QQVNTX0FUVEFDSE1FTlRTX0VYSVNUUzogc2dfYmVnaW5fcGFzczogYXR0YWNobWVudHMgb2JqZWN0IG5vIGxvbmdlciBhbGl2ZQBWQUxJREFURV9BUElQX1NIQURFUl9FWElTVFM6IHNnX2FwcGx5X3BpcGVsaW5lOiBzaGFkZXIgb2JqZWN0IG5vIGxvbmdlciBhbGl2ZQBWQUxJREFURV9BQk5EX1BJUEVMSU5FX0VYSVNUUzogc2dfYXBwbHlfYmluZGluZ3M6IGN1cnJlbnRseSBhcHBsaWVkIHBpcGVsaW5lIG9iamVjdCBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQVBJUF9QSVBFTElORV9FWElTVFM6IHNnX2FwcGx5X3BpcGVsaW5lOiBwaXBlbGluZSBvYmplY3Qgbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FQSVBfQ1VSUEFTU19BVFRBQ0hNRU5UU19FWElTVFM6IHNnX2FwcGx5X3BpcGVsaW5lOiBjdXJyZW50IHBhc3MgYXR0YWNobWVudHMgbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FCTkRfVkJfRVhJU1RTOiBzZ19hcHBseV9iaW5kaW5nczogdmVydGV4IGJ1ZmZlciBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQUJORF9JQl9FWElTVFM6IHNnX2FwcGx5X2JpbmRpbmdzOiBpbmRleCBidWZmZXIgbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FCTkRfVlNfU01QX0VYSVNUUzogc2dfYXBwbHlfYmluZGluZ3M6IHNhbXBsZXIgYm91bmQgdG8gdmVydGV4IHN0YWdlIG5vIGxvbmdlciBhbGl2ZQBWQUxJREFURV9BQk5EX1ZTX1NUT1JBR0VCVUZGRVJfRVhJU1RTOiBzZ19hcHBseV9iaW5kaW5nczogc3RvcmFnZSBidWZmZXIgYm91bmQgdG8gdmVydGV4IHN0YWdlIG5vIGxvbmdlciBhbGl2ZQBWQUxJREFURV9BQk5EX1ZTX0lNR19FWElTVFM6IHNnX2FwcGx5X2JpbmRpbmdzOiBpbWFnZSBib3VuZCB0byB2ZXJ0ZXggc3RhZ2Ugbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FCTkRfRlNfU01QX0VYSVNUUzogc2dfYXBwbHlfYmluZGluZ3M6IHNhbXBsZXIgYm91bmQgdG8gZnJhZ21lbnQgc3RhZ2Ugbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FCTkRfRlNfU1RPUkFHRUJVRkZFUl9FWElTVFM6IHNnX2FwcGx5X2JpbmRpbmdzOiBzdG9yYWdlIGJ1ZmZlciBib3VuZCB0byBmcmFnbWVudCBzdGFnZSBubyBsb25nZXIgYWxpdmUAVkFMSURBVEVfQUJORF9GU19JTUdfRVhJU1RTOiBzZ19hcHBseV9iaW5kaW5nczogaW1hZ2UgYm91bmQgdG8gZnJhZ21lbnQgc3RhZ2Ugbm8gbG9uZ2VyIGFsaXZlAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19SRVNPTFZFX0lNQUdFX05PX1JUOiBwYXNzIHJlc29sdmUgYXR0YWNobWVudCBpbWFnZSBtdXN0IGhhdmUgcmVuZGVyX3RhcmdldD10cnVlAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19JTUFHRV9OT19SVDogcGFzcyBhdHRhY2htZW50IGltYWdlIG11c3QgYmUgaGF2ZSByZW5kZXJfdGFyZ2V0PXRydWUAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0RFUFRIX0lNQUdFX05PX1JUOiBwYXNzIGRlcHRoIGF0dGFjaG1lbnQgaW1hZ2UgbXVzdCBiZSBoYXZlIHJlbmRlcl90YXJnZXQ9dHJ1ZQBWQUxJREFURV9TSEFERVJERVNDX0lNQUdFX1NBTVBMRVJfUEFJUl9IQVNfTkFNRV9CVVRfTk9UX1VTRUQ6IHNoYWRlciBzdGFnZTogaW1hZ2Utc2FtcGxlci1wYWlyIGhhcyBuYW1lIGJ1dCAudXNlZCBmaWVsZCBub3QgdHJ1ZQBWQUxJREFURV9TSEFERVJERVNDX0lNQUdFX1NBTVBMRVJfUEFJUl9IQVNfU0FNUExFUl9CVVRfTk9UX1VTRUQ6IHNoYWRlciBzdGFnZTogaW1hZ2Utc2FtcGxlci1wYWlyIC5zYW1wbGVyX3Nsb3QgIT0gMCBidXQgLnVzZWQgZmllbGQgbm90IHRydWUAVkFMSURBVEVfU0hBREVSREVTQ19JTUFHRV9TQU1QTEVSX1BBSVJfSEFTX0lNQUdFX0JVVF9OT1RfVVNFRDogc2hhZGVyIHN0YWdlOiBpbWFnZS1zYW1wbGVyLXBhaXIgaGFzIC5pbWFnZV9zbG90ICE9IDAgYnV0IC51c2VkIGZpZWxkIG5vdCB0cnVlAF9zYXBwX3JpbmdfZW5xdWV1ZQBfc2FwcF9yaW5nX2RlcXVldWUAcG9vbC0+ZnJlZV9xdWV1ZQBXSU4zMl9HRVRfUElYRUxGT1JNQVRfQVRUUklCX0ZBSUxFRDogZmFpbGVkIHRvIGdldCBXR0wgcGl4ZWwgZm9ybWF0IGF0dHJpYnV0ZQBCYWNrcXVvdGUAUXVvdGUARGVsZXRlAF9zYXBwX2luaXRfc3RhdGUAc2dwX3Jlc2V0X3N0YXRlAHNnX3F1ZXJ5X3NhbXBsZXJfc3RhdGUAc2dfcXVlcnlfYnVmZmVyX3N0YXRlAHNnX3F1ZXJ5X3NoYWRlcl9zdGF0ZQBzZ19xdWVyeV9waXBlbGluZV9zdGF0ZQBzZ19xdWVyeV9pbWFnZV9zdGF0ZQBfc2FwcF9kaXNjYXJkX3N0YXRlAF9zZ3BfYmxlbmRfc3RhdGUAX3NnX3Jlc2V0X3NhbXBsZXJfdG9fYWxsb2Nfc3RhdGUAX3NnX3Jlc2V0X2J1ZmZlcl90b19hbGxvY19zdGF0ZQBfc2dfcmVzZXRfc2hhZGVyX3RvX2FsbG9jX3N0YXRlAF9zZ19yZXNldF9waXBlbGluZV90b19hbGxvY19zdGF0ZQBfc2dfcmVzZXRfaW1hZ2VfdG9fYWxsb2Nfc3RhdGUAVkFMSURBVEVfQVBJUF9TSEFERVJfVkFMSUQ6IHNnX2FwcGx5X3BpcGVsaW5lOiBzaGFkZXIgb2JqZWN0IG5vdCBpbiB2YWxpZCBzdGF0ZQBWQUxJREFURV9BQk5EX1BJUEVMSU5FX1ZBTElEOiBzZ19hcHBseV9iaW5kaW5nczogY3VycmVudGx5IGFwcGxpZWQgcGlwZWxpbmUgb2JqZWN0IG5vdCBpbiB2YWxpZCBzdGF0ZQBWQUxJREFURV9BUElQX1BJUEVMSU5FX1ZBTElEOiBzZ19hcHBseV9waXBlbGluZTogcGlwZWxpbmUgb2JqZWN0IG5vdCBpbiB2YWxpZCBzdGF0ZQBWQUxJREFURV9BUElQX0NVUlBBU1NfQVRUQUNITUVOVFNfVkFMSUQ6IHNnX2FwcGx5X3BpcGVsaW5lOiBjdXJyZW50IHBhc3MgYXR0YWNobWVudHMgbm90IGluIHZhbGlkIHN0YXRlAERFQUxMT0NfU0FNUExFUl9JTlZBTElEX1NUQVRFOiBzZ19kZWFsbG9jX3NhbXBsZXIoKTogc2FtcGxlciBtdXN0IGJlIGluIGFsbG9jIHN0YXRlAERFQUxMT0NfSU1BR0VfSU5WQUxJRF9TVEFURTogc2dfZGVhbGxvY19pbWFnZSgpOiBpbWFnZSBtdXN0IGJlIGluIGFsbG9jIHN0YXRlAFVOSU5JVF9BVFRBQ0hNRU5UU19JTlZBTElEX1NUQVRFOiBzZ191bmluaXRfYXR0YWNobWVudHMoKTogYXR0YWNobWVudHMgbXVzdCBiZSBpbiBWQUxJRCBvciBGQUlMRUQgc3RhdGUAVU5JTklUX1NBTVBMRVJfSU5WQUxJRF9TVEFURTogc2dfdW5pbml0X3NhbXBsZXIoKTogc2FtcGxlciBtdXN0IGJlIGluIFZBTElEIG9yIEZBSUxFRCBzdGF0ZQBVTklOSVRfQlVGRkVSX0lOVkFMSURfU1RBVEU6IHNnX3VuaW5pdF9idWZmZXIoKTogYnVmZmVyIG11c3QgYmUgaW4gVkFMSUQgb3IgRkFJTEVEIHN0YXRlAFVOSU5JVF9TSEFERVJfSU5WQUxJRF9TVEFURTogc2dfdW5pbml0X3NoYWRlcigpOiBzaGFkZXIgbXVzdCBiZSBpbiBWQUxJRCBvciBGQUlMRUQgc3RhdGUAVU5JTklUX1BJUEVMSU5FX0lOVkFMSURfU1RBVEU6IHNnX3VuaW5pdF9waXBlbGluZSgpOiBwaXBlbGluZSBtdXN0IGJlIGluIFZBTElEIG9yIEZBSUxFRCBzdGF0ZQBVTklOSVRfSU1BR0VfSU5WQUxJRF9TVEFURTogc2dfdW5pbml0X2ltYWdlKCk6IGltYWdlIG11c3QgYmUgaW4gVkFMSUQgb3IgRkFJTEVEIHN0YXRlAEZBSUxfQVRUQUNITUVOVFNfSU5WQUxJRF9TVEFURTogc2dfZmFpbF9hdHRhY2htZW50cygpOiBhdHRhY2htZW50cyBtdXN0IGJlIGluIEFMTE9DIHN0YXRlAERFQUxMT0NfQVRUQUNITUVOVFNfSU5WQUxJRF9TVEFURTogc2dfZGVhbGxvY19hdHRhY2htZW50cygpOiBhdHRhY2htZW50cyBtdXN0IGJlIGluIEFMTE9DIHN0YXRlAElOSVRfQVRUQUNITUVOVFNfSU5WQUxJRF9TVEFURTogc2dfaW5pdF9hdHRhY2htZW50cygpOiBwYXNzIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUASU5JVF9TQU1QTEVSX0lOVkFMSURfU1RBVEU6IHNnX2luaXRfc2FtcGxlcigpOiBzYW1wbGVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUARkFJTF9TQU1QTEVSX0lOVkFMSURfU1RBVEU6IHNnX2ZhaWxfc2FtcGxlcigpOiBzYW1wbGVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUASU5JVF9CVUZGRVJfSU5WQUxJRF9TVEFURTogc2dfaW5pdF9idWZmZXIoKTogYnVmZmVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUARkFJTF9CVUZGRVJfSU5WQUxJRF9TVEFURTogc2dfZmFpbF9idWZmZXIoKTogYnVmZmVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUAREVBTExPQ19CVUZGRVJfSU5WQUxJRF9TVEFURTogc2dfZGVhbGxvY19idWZmZXIoKTogYnVmZmVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUASU5JVF9TSEFERVJfSU5WQUxJRF9TVEFURTogc2dfaW5pdF9zaGFkZXIoKTogc2hhZGVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUARkFJTF9TSEFERVJfSU5WQUxJRF9TVEFURTogc2dfZmFpbF9zaGFkZXIoKTogc2hhZGVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUAREVBTExPQ19TSEFERVJfSU5WQUxJRF9TVEFURTogc2dfZGVhbGxvY19zaGFkZXIoKTogc2hhZGVyIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUASU5JVF9QSVBFTElORV9JTlZBTElEX1NUQVRFOiBzZ19pbml0X3BpcGVsaW5lKCk6IHBpcGVsaW5lIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUARkFJTF9QSVBFTElORV9JTlZBTElEX1NUQVRFOiBzZ19mYWlsX3BpcGVsaW5lKCk6IHBpcGVsaW5lIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUAREVBTExPQ19QSVBFTElORV9JTlZBTElEX1NUQVRFOiBzZ19kZWFsbG9jX3BpcGVsaW5lKCk6IHBpcGVsaW5lIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUASU5JVF9JTUFHRV9JTlZBTElEX1NUQVRFOiBzZ19pbml0X2ltYWdlKCk6IGltYWdlIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUARkFJTF9JTUFHRV9JTlZBTElEX1NUQVRFOiBzZ19mYWlsX2ltYWdlKCk6IGltYWdlIG11c3QgYmUgaW4gQUxMT0Mgc3RhdGUAc2dwX3JvdGF0ZQBBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTlNBVkVJTlNUQU5DRVNUQVRFOiBOYXRpdmVBY3Rpdml0eSBvblNhdmVJbnN0YW5jZVN0YXRlAHNncF90cmFuc2xhdGUAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05DUkVBVEU6IE5hdGl2ZUFjdGl2aXR5IG9uQ3JlYXRlAF9zYXBwX2ltYWdlX3ZhbGlkYXRlAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OUEFVU0U6IE5hdGl2ZUFjdGl2aXR5IG9uUGF1c2UAc2FwcF9tZXRhbF9nZXRfbXNhYV9jb2xvcl90ZXh0dXJlAHNhcHBfbWV0YWxfZ2V0X2RlcHRoX3N0ZW5jaWxfdGV4dHVyZQBfc2dfZ2xfY2FjaGVfYWN0aXZlX3RleHR1cmUAc2dwLXdoaXRlLXRleHR1cmUAV0dQVV9TV0FQQ0hBSU5fQ1JFQVRFX0RFUFRIX1NURU5DSUxfVklFV19GQUlMRUQ6IHdncHU6IGZhaWxlZCB0byBjcmVhdGUgdmlldyBvYmplY3QgZm9yIHN3YXBjaGFpbiBkZXB0aC1zdGVuY2lsIHRleHR1cmUAV0dQVV9TV0FQQ0hBSU5fQ1JFQVRFX01TQUFfVklFV19GQUlMRUQ6IHdncHU6IGZhaWxlZCB0byBjcmVhdGUgdmlldyBvYmplY3QgZm9yIHN3YXBjaGFpbiBtc2FhIHRleHR1cmUAX3NnX2dsX2luZGV4X3R5cGUAX3NnX2dsX3ZlcnRleGZvcm1hdF90eXBlAF9zZ19nbF9wcmltaXRpdmVfdHlwZQBfc2dfZ2xfdGV4aW1hZ2VfdHlwZQBBTkRST0lEX0NSRUFURV9USFJFQURfUElQRV9GQUlMRUQ6IGZhaWxlZCB0byBjcmVhdGUgdGhyZWFkIHBpcGUARXNjYXBlAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX0RPTkU6IE5hdGl2ZUFjdGl2aXR5IGRvbmUAQU5EUk9JRF9MT09QX1RIUkVBRF9ET05FOiBsb29wIHRocmVhZCBkb25lAHNnX2Rlc3Ryb3lfcGlwZWxpbmUAX3NnX2dsX2FwcGx5X3BpcGVsaW5lAFZBTElEQVRFX0FCTkRfUElQRUxJTkU6IHNnX2FwcGx5X2JpbmRpbmdzOiBtdXN0IGJlIGNhbGxlZCBhZnRlciBzZ19hcHBseV9waXBlbGluZQBfc2dfdmFsaWRhdGVfYXBwbHlfcGlwZWxpbmUAX3NnX3VuaW5pdF9waXBlbGluZQBfc2dfaW5pdF9waXBlbGluZQBzZ3BfcmVzZXRfcGlwZWxpbmUAc2dwX3NldF9waXBlbGluZQBfc2cuZ2wuY2FjaGUuY3VyX3BpcGVsaW5lAF9zZ19sb29rdXBfcGlwZWxpbmUAX3NnX2dsX2NyZWF0ZV9waXBlbGluZQBzZ19tYWtlX3BpcGVsaW5lAF9zZ19nbF9kaXNjYXJkX3BpcGVsaW5lAF9zZ19kZWFsbG9jX3BpcGVsaW5lAFNHUCBmYWlsZWQgdG8gY3JlYXRlIHRoZSBjb21tb24gcGlwZWxpbmUAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05SRVNVTUU6IE5hdGl2ZUFjdGl2aXR5IG9uUmVzdW1lAEhvbWUAVkFMSURBVEVfQVBQRU5EQlVGX1VQREFURTogc2dfYXBwZW5kX2J1ZmZlcjogY2Fubm90IGNhbGwgc2dfYXBwZW5kX2J1ZmZlciBhbmQgc2dfdXBkYXRlX2J1ZmZlciBpbiBzYW1lIGZyYW1lAFZBTElEQVRFX1VQREFURUJVRl9BUFBFTkQ6IHNnX3VwZGF0ZV9idWZmZXI6IGNhbm5vdCBjYWxsIHNnX3VwZGF0ZV9idWZmZXIgYW5kIHNnX2FwcGVuZF9idWZmZXIgaW4gc2FtZSBmcmFtZQBWQUxJREFURV9VUERBVEVCVUZfT05DRTogc2dfdXBkYXRlX2J1ZmZlcjogb25seSBvbmUgdXBkYXRlIGFsbG93ZWQgcGVyIGJ1ZmZlciBhbmQgZnJhbWUAVkFMSURBVEVfVVBESU1HX09OQ0U6IHNnX3VwZGF0ZV9pbWFnZTogb25seSBvbmUgdXBkYXRlIGFsbG93ZWQgcGVyIGltYWdlIGFuZCBmcmFtZQBpbWdfc21wX2Rlc2MtPmdsc2xfbmFtZQBzYXBwX21ldGFsX2dldF9jdXJyZW50X2RyYXdhYmxlAFZBTElEQVRFX0lNQUdFREVTQ19DT01QUkVTU0VEX0lNTVVUQUJMRTogY29tcHJlc3NlZCBpbWFnZXMgbXVzdCBiZSBpbW11dGFibGUAc2dwX3NjYWxlAF9zZ19nbF9yZXNldF9zdGF0ZV9jYWNoZQBfc2dfZ2xfc2hhZGVyX3N0YWdlAFZBTElEQVRFX0FCTkRfVlNfSU1BR0VfTVNBQTogc2dfYXBwbHlfYmluZGluZ3M6IGNhbm5vdCBiaW5kIGltYWdlIHdpdGggc2FtcGxlX2NvdW50PjEgdG8gdmVydGV4IHN0YWdlAFZBTElEQVRFX0FCTkRfVlNfVU5FWFBFQ1RFRF9TQU1QTEVSX0JJTkRJTkc6IHNnX2FwcGx5X2JpbmRpbmdzOiB1bmV4cGVjdGVkIHNhbXBsZXIgYmluZGluZyBvbiB2ZXJ0ZXggc3RhZ2UAVkFMSURBVEVfQUJORF9WU19VTkVYUEVDVEVEX1NUT1JBR0VCVUZGRVJfQklORElORzogc2dfYXBwbHlfYmluZGluZ3M6IHVuZXhwZWN0ZWQgc3RvcmFnZSBidWZmZXIgYmluZGluZyBvbiB2ZXJ0ZXggc3RhZ2UAVkFMSURBVEVfQUJORF9WU19VTkVYUEVDVEVEX0lNQUdFX0JJTkRJTkc6IHNnX2FwcGx5X2JpbmRpbmdzOiB1bmV4cGVjdGVkIGltYWdlIGJpbmRpbmcgb24gdmVydGV4IHN0YWdlAFZBTElEQVRFX0FCTkRfVlNfRVhQRUNURURfREVQVEhfSU1BR0U6IHNnX2FwcGx5X2JpbmRpbmdzOiBkZXB0aCBpbWFnZSBleHBlY3RlZCBvbiB2ZXJ0ZXggc3RhZ2UAVkFMSURBVEVfQUJORF9WU19FWFBFQ1RFRF9GSUxURVJBQkxFX0lNQUdFOiBzZ19hcHBseV9iaW5kaW5nczogZmlsdGVyYWJsZSBpbWFnZSBleHBlY3RlZCBvbiB2ZXJ0ZXggc3RhZ2UAVkFMSURBVEVfQUJORF9GU19JTUFHRV9NU0FBOiBzZ19hcHBseV9iaW5kaW5nczogY2Fubm90IGJpbmQgaW1hZ2Ugd2l0aCBzYW1wbGVfY291bnQ+MSB0byBmcmFnbWVudCBzdGFnZQBWQUxJREFURV9BQk5EX0ZTX1VORVhQRUNURURfU0FNUExFUl9CSU5ESU5HOiBzZ19hcHBseV9iaW5kaW5nczogdW5leHBlY3RlZCBzYW1wbGVyIGJpbmRpbmcgb24gZnJhZ21lbnQgc3RhZ2UAVkFMSURBVEVfQUJORF9GU19VTkVYUEVDVEVEX1NUT1JBR0VCVUZGRVJfQklORElORzogc2dfYXBwbHlfYmluZGluZ3M6IHVuZXhwZWN0ZWQgc3RvcmFnZSBidWZmZXIgYmluZGluZyBvbiBmcmFnbWVudCBzdGFnZQBWQUxJREFURV9BQk5EX0ZTX1VORVhQRUNURURfSU1BR0VfQklORElORzogc2dfYXBwbHlfYmluZGluZ3M6IHVuZXhwZWN0ZWQgaW1hZ2UgYmluZGluZyBvbiBmcmFnbWVudCBzdGFnZQBWQUxJREFURV9BQk5EX0ZTX0VYUEVDVEVEX0RFUFRIX0lNQUdFOiBzZ19hcHBseV9iaW5kaW5nczogZGVwdGggaW1hZ2UgZXhwZWN0ZWQgb24gZnJhZ21lbnQgc3RhZ2UAVkFMSURBVEVfQUJORF9GU19FWFBFQ1RFRF9GSUxURVJBQkxFX0lNQUdFOiBzZ19hcHBseV9iaW5kaW5nczogZmlsdGVyYWJsZSBpbWFnZSBleHBlY3RlZCBvbiBmcmFnbWVudCBzdGFnZQBfc2dfZ2xfdXNhZ2UAc2dfZGVzdHJveV9pbWFnZQBfc2dfdW5pbml0X2ltYWdlAF9zZ19pbml0X2ltYWdlAHNncF91bnNldF9pbWFnZQBzZ3BfcmVzZXRfaW1hZ2UAc2dwX3NldF9pbWFnZQBfc2dfZ2xfYXR0YWNobWVudHNfZHNfaW1hZ2UAX3NnX2dsX2F0dGFjaG1lbnRzX2NvbG9yX2ltYWdlAF9zZ19nbF9hdHRhY2htZW50c19yZXNvbHZlX2ltYWdlAF9zZ19nbF9jcmVhdGVfaW1hZ2UAc2dfbWFrZV9pbWFnZQBfc2dfZ2xfZGlzY2FyZF9pbWFnZQBfc2dfZGVhbGxvY19pbWFnZQBWQUxJREFURV9JTUFHRURFU0NfTk9OUlRfUElYRUxGT1JNQVQ6IGludmFsaWQgcGl4ZWwgZm9ybWF0IGZvciBub24tcmVuZGVyLXRhcmdldCBpbWFnZQBWQUxJREFURV9JTUFHRURFU0NfUlRfUElYRUxGT1JNQVQ6IGludmFsaWQgcGl4ZWwgZm9ybWF0IGZvciByZW5kZXItdGFyZ2V0IGltYWdlAFNHUCBmYWlsZWQgdG8gY3JlYXRlIHdoaXRlIGltYWdlAFZBTElEQVRFX1VQRElNR19VU0FHRTogc2dfdXBkYXRlX2ltYWdlOiBjYW5ub3QgdXBkYXRlIGltbXV0YWJsZSBpbWFnZQBzZ3BfcmVzZXRfYmxlbmRfbW9kZQBzZ3Bfc2V0X2JsZW5kX21vZGUASW52YWxpZCBlcnJvciBjb2RlAE51bXBhZERpdmlkZQBXR1BVX0NSRUFURV9JTlNUQU5DRV9GQUlMRUQ6IHdncHU6IGZhaWxlZCB0byBjcmVhdGUgaW5zdGFuY2UAc2FwcF93Z3B1X2dldF9kZXZpY2UAc2FwcF9tZXRhbF9nZXRfZGV2aWNlAHNhcHBfZDNkMTFfZ2V0X2RldmljZQBCYWNrc3BhY2UAU3BhY2UAV0lOMzJfRDNEMTFfUVVFUllfSU5URVJGQUNFX0lEWEdJREVWSUNFMV9GQUlMRUQ6IGNvdWxkIG5vdCBvYnRhaW4gSURYR0lEZXZpY2UxIGludGVyZmFjZQBjb29yZABQZXJpb2QATElOVVhfR0xYX0VYVEVOU0lPTl9OT1RfRk9VTkQ6IEdMWCBleHRlbnNpb24gbm90IGZvdW5kAF9mbG9hdF9ibGVuZABzZ19xdWVyeV9iYWNrZW5kAF9zZ19nbF9zZXR1cF9iYWNrZW5kAF9zZ19nbF9kaXNjYXJkX2JhY2tlbmQAZHN0ID09IGRzdF9lbmQAZHN0IDwgZHN0X2VuZABzZ3BfZW5kAGJuZABfc2dwX21lcmdlX2JhdGNoX2NvbW1hbmQARW5kAFZBTElEQVRFX0FCTkRfVlNfRVhQRUNURURfU0FNUExFUl9CSU5ESU5HOiBzZ19hcHBseV9iaW5kaW5nczogc2FtcGxlciBiaW5kaW5nIG9uIHZlcnRleCBzdGFnZSBpcyBtaXNzaW5nIG9yIHRoZSBzYW1wbGVyIGhhbmRsZSBpcyBpbnZhbGlkAFZBTElEQVRFX0FCTkRfRlNfRVhQRUNURURfU0FNUExFUl9CSU5ESU5HOiBzZ19hcHBseV9iaW5kaW5nczogc2FtcGxlciBiaW5kaW5nIG9uIGZyYWdtZW50IHN0YWdlIGlzIG1pc3Npbmcgb3IgdGhlIHNhbXBsZXIgaGFuZGxlIGlzIGludmFsaWQAVkFMSURBVEVfQUJORF9WU19FWFBFQ1RFRF9TVE9SQUdFQlVGRkVSX0JJTkRJTkc6IHNnX2FwcGx5X2JpbmRpbmdzOiBzdG9yYWdlIGJ1ZmZlciBiaW5kaW5nIG9uIHZlcnRleCBzdGFnZSBpcyBtaXNzaW5nIG9yIHRoZSBidWZmZXIgaGFuZGxlIGlzIGludmFsaWQAVkFMSURBVEVfQUJORF9GU19FWFBFQ1RFRF9TVE9SQUdFQlVGRkVSX0JJTkRJTkc6IHNnX2FwcGx5X2JpbmRpbmdzOiBzdG9yYWdlIGJ1ZmZlciBiaW5kaW5nIG9uIGZyYWdtZW50IHN0YWdlIGlzIG1pc3Npbmcgb3IgdGhlIGJ1ZmZlciBoYW5kbGUgaXMgaW52YWxpZABWQUxJREFURV9BQk5EX1ZTX0VYUEVDVEVEX0lNQUdFX0JJTkRJTkc6IHNnX2FwcGx5X2JpbmRpbmdzOiBpbWFnZSBiaW5kaW5nIG9uIHZlcnRleCBzdGFnZSBpcyBtaXNzaW5nIG9yIHRoZSBpbWFnZSBoYW5kbGUgaXMgaW52YWxpZABWQUxJREFURV9BQk5EX0ZTX0VYUEVDVEVEX0lNQUdFX0JJTkRJTkc6IHNnX2FwcGx5X2JpbmRpbmdzOiBpbWFnZSBiaW5kaW5nIG9uIGZyYWdtZW50IHN0YWdlIGlzIG1pc3Npbmcgb3IgdGhlIGltYWdlIGhhbmRsZSBpcyBpbnZhbGlkAFZBTElEQVRFX1BJUEVMSU5FREVTQ19TSEFERVI6IHNnX3BpcGVsaW5lX2Rlc2Muc2hhZGVyIG1pc3Npbmcgb3IgaW52YWxpZAAhX3NnLmN1cl9wYXNzLnZhbGlkAF9zYXBwLnZhbGlkAF9zZy5nbC52YWxpZABfc2cudmFsaWQAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0lNQUdFOiBwYXNzIGF0dGFjaG1lbnQgaW1hZ2UgaXMgbm90IHZhbGlkAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19ERVBUSF9JTUFHRTogcGFzcyBkZXB0aCBhdHRhY2htZW50IGltYWdlIGlzIG5vdCB2YWxpZABWQUxJREFURV9CRUdJTlBBU1NfQ09MT1JfQVRUQUNITUVOVF9JTUFHRTogc2dfYmVnaW5fcGFzczogb25lIG9yIG1vcmUgY29sb3IgYXR0YWNobWVudCBpbWFnZXMgYXJlIG5vdCB2YWxpZABWQUxJREFURV9CRUdJTlBBU1NfREVQVEhTVEVOQ0lMX0FUVEFDSE1FTlRfSU1BR0U6IHNnX2JlZ2luX3Bhc3M6IG9uZSBvciBtb3JlIGRlcHRoLXN0ZW5jaWwgYXR0YWNobWVudCBpbWFnZXMgYXJlIG5vdCB2YWxpZABWQUxJREFURV9CRUdJTlBBU1NfUkVTT0xWRV9BVFRBQ0hNRU5UX0lNQUdFOiBzZ19iZWdpbl9wYXNzOiBvbmUgb3IgbW9yZSByZXNvbHZlIGF0dGFjaG1lbnQgaW1hZ2VzIGFyZSBub3QgdmFsaWQAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX1JFU09MVkVfSU1BR0U6IHBhc3MgcmVzb2x2ZSBhdHRhY2htZW50IGltYWdlIG5vdCB2YWxpZABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0VYUEVDVF9DT0xPUkZPUk1BVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uY29sb3JfZm9ybWF0IHRvIGJlIHZhbGlkAGRlc2MtPnNoYWRlci5pZCA9PSBzaGQtPnNsb3QuaWQAYXR0cy0+c2xvdC5pZCA9PSBfc2cuY3VyX3Bhc3MuYXR0c19pZC5pZABfc2cuZ2wuY2FjaGUuY3VyX3BpcGVsaW5lLT5zaGFkZXItPnNsb3QuaWQgPT0gX3NnLmdsLmNhY2hlLmN1cl9waXBlbGluZS0+Y21uLnNoYWRlcl9pZC5pZABfc2cuZ2wuY2FjaGUuY3VyX3BpcGVsaW5lLT5zbG90LmlkID09IF9zZy5nbC5jYWNoZS5jdXJfcGlwZWxpbmVfaWQuaWQAc2hkAFZBTElEQVRFX0JFR0lOUEFTU19DQU5BUlk6IHNnX2JlZ2luX3Bhc3M6IHBhc3Mgc3RydWN0IG5vdCBpbml0aWFsaXplZABTb2tvbCBpcyBub3QgaW5pdGlhbGl6ZWQAVkFMSURBVEVfQVRUQUNITUVOVFNERVNDX0NBTkFSWTogc2dfYXR0YWNobWVudHNfZGVzYyBub3QgaW5pdGlhbGl6ZWQAVkFMSURBVEVfU0FNUExFUkRFU0NfQ0FOQVJZOiBzZ19zYW1wbGVyX2Rlc2Mgbm90IGluaXRpYWxpemVkAFZBTElEQVRFX0JVRkZFUkRFU0NfQ0FOQVJZOiBzZ19idWZmZXJfZGVzYyBub3QgaW5pdGlhbGl6ZWQAVkFMSURBVEVfU0hBREVSREVTQ19DQU5BUlk6IHNnX3NoYWRlcl9kZXNjIG5vdCBpbml0aWFsaXplZABWQUxJREFURV9QSVBFTElORURFU0NfQ0FOQVJZOiBzZ19waXBlbGluZV9kZXNjIG5vdCBpbml0aWFsaXplZABWQUxJREFURV9JTUFHRURFU0NfQ0FOQVJZOiBzZ19pbWFnZV9kZXNjIG5vdCBpbml0aWFsaXplZABBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTk5BVElWRVdJTkRPV0RFU1RST1lFRDogTmF0aXZlQWN0aXZpdHkgb25OYXRpdmVXaW5kb3dEZXN0cm95ZWQAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05JTlBVVFFVRVVFREVTVFJPWUVEOiBOYXRpdmVBY3Rpdml0eSBvbklucHV0UXVldWVEZXN0cm95ZWQAQU5EUk9JRF9VTktOT1dOX01TRzogdW5rbm93biBtc2cgdHlwZSByZWNlaXZlZABQQVNTX1BPT0xfRVhIQVVTVEVEOiBwYXNzIHBvb2wgZXhoYXVzdGVkAFNBTVBMRVJfUE9PTF9FWEhBVVNURUQ6IHNhbXBsZXIgcG9vbCBleGhhdXN0ZWQAQlVGRkVSX1BPT0xfRVhIQVVTVEVEOiBidWZmZXIgcG9vbCBleGhhdXN0ZWQAU0hBREVSX1BPT0xfRVhIQVVTVEVEOiBzaGFkZXIgcG9vbCBleGhhdXN0ZWQAUElQRUxJTkVfUE9PTF9FWEhBVVNURUQ6IHBpcGVsaW5lIHBvb2wgZXhoYXVzdGVkAElNQUdFX1BPT0xfRVhIQVVTVEVEOiBpbWFnZSBwb29sIGV4aGF1c3RlZABBTkRST0lEX0xPT1BfVEhSRUFEX1NUQVJURUQ6IGxvb3AgdGhyZWFkIHN0YXJ0ZWQAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfQ1JFQVRFX1NVQ0NFU1M6IE5hdGl2ZUFjdGl2aXR5IHN1Y2Nlc3NmdWxseSBjcmVhdGVkAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OTkFUSVZFV0lORE9XQ1JFQVRFRDogTmF0aXZlQWN0aXZpdHkgb25OYXRpdmVXaW5kb3dDcmVhdGVkAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OSU5QVVRRVUVVRUNSRUFURUQ6IE5hdGl2ZUFjdGl2aXR5IG9uSW5wdXRRdWV1ZUNyZWF0ZWQAV0lOMzJfV0dMX0FSQl9DUkVBVEVfQ09OVEVYVF9SRVFVSVJFRDogQVJCX2NyZWF0ZV9jb250ZXh0IHJlcXVpcmVkAFdJTjMyX1dHTF9BUkJfQ1JFQVRFX0NPTlRFWFRfUFJPRklMRV9SRVFVSVJFRDogQVJCX2NyZWF0ZV9jb250ZXh0X3Byb2ZpbGUgcmVxdWlyZWQAVkFMSURBVEVfU0hBREVSREVTQ19TT1VSQ0VfT1JfQllURUNPREU6IHNoYWRlciBzb3VyY2Ugb3IgYnl0ZSBjb2RlIHJlcXVpcmVkAFZBTElEQVRFX1NIQURFUkRFU0NfQllURUNPREU6IHNoYWRlciBieXRlIGNvZGUgcmVxdWlyZWQAVkFMSURBVEVfU0hBREVSREVTQ19TT1VSQ0U6IHNoYWRlciBzb3VyY2UgY29kZSByZXF1aXJlZABWQUxJREFURV9TSEFERVJERVNDX05PX0JZVEVDT0RFX1NJWkU6IHNoYWRlciBieXRlIGNvZGUgbGVuZ3RoIChpbiBieXRlcykgcmVxdWlyZWQAVFJBQ0VfSE9PS1NfTk9UX0VOQUJMRUQ6IHNnX2luc3RhbGxfdHJhY2VfaG9va3MoKSBjYWxsZWQsIGJ1dCBTT0tPTF9UUkFDRV9IT09LUyBpcyBub3QgZGVmaW5lZABWQUxJREFURV9JTUFHRURFU0NfTVNBQV9CVVRfTk9fUlQ6IG5vbi1yZW5kZXItdGFyZ2V0IGltYWdlcyBjYW5ub3QgYmUgbXVsdGlzYW1wbGVkAFZBTElEQVRJT05fRkFJTEVEOiB2YWxpZGF0aW9uIGxheWVyIGNoZWNrcyBmYWlsZWQAV0dQVV9DUkVBVEVCSU5ER1JPVVBfRkFJTEVEOiB3Z3B1RGV2aWNlQ3JlYXRlQmluZEdyb3VwIGZhaWxlZABNQUxMT0NfRkFJTEVEOiBtZW1vcnkgYWxsb2NhdGlvbiBmYWlsZWQATElOVVhfR0xYX0dFVF9WSVNVQUxfRlJPTV9GQkNPTkZJR19GQUlMRUQ6IGdsWEdldFZpc3VhbEZyb21GQkNvbmZpZyBmYWlsZWQAV0dQVV9TSEFERVJfQ1JFQVRFX0JJTkRHUk9VUF9MQVlPVVRfRkFJTEVEOiB3Z3B1RGV2aWNlQ3JlYXRlQmluZEdyb3VwTGF5b3V0KCkgZm9yIHNoYWRlciBzdGFnZSBmYWlsZWQATElOVVhfRUdMX05PX05BVElWRV9WSVNVQUw6IGVnbEdldENvbmZpZ0F0dHJpYigpIGZvciBFR0xfTkFUSVZFX1ZJU1VBTF9JRCBmYWlsZWQATElOVVhfRUdMX0JJTkRfT1BFTkdMX0VTX0FQSV9GQUlMRUQ6IGVnbEJpbmRBUEkoRUdMX09QRU5HTF9FU19BUEkpIGZhaWxlZABMSU5VWF9FR0xfQklORF9PUEVOR0xfQVBJX0ZBSUxFRDogZWdsQmluZEFQSShFR0xfT1BFTkdMX0FQSSkgZmFpbGVkAExJTlVYX0VHTF9HRVRfRElTUExBWV9GQUlMRUQ6IGVnbEdldERpc3BsYXkoKSBmYWlsZWQATElOVVhfWDExX09QRU5fRElTUExBWV9GQUlMRUQ6IFhPcGVuRGlzcGxheSgpIGZhaWxlZABMSU5VWF9HTFhfQ1JFQVRFX1dJTkRPV19GQUlMRUQ6IGdsWENyZWF0ZVdpbmRvdygpIGZhaWxlZABMSU5VWF9YMTFfQ1JFQVRFX1dJTkRPV19GQUlMRUQ6IFhDcmVhdGVXaW5kb3coKSBmYWlsZWQAV0dQVV9DUkVBVEVfVEVYVFVSRV9WSUVXX0ZBSUxFRDogd2dwdVRleHR1cmVDcmVhdGVWaWV3KCkgZmFpbGVkAExJTlVYX0VHTF9DUkVBVEVfQ09OVEVYVF9GQUlMRUQ6IGVnbENyZWF0ZUNvbnRleHQoKSBmYWlsZWQAV0dQVV9DUkVBVEVfUElQRUxJTkVfTEFZT1VUX0ZBSUxFRDogd2dwdURldmljZUNyZWF0ZVBpcGVsaW5lTGF5b3V0KCkgZmFpbGVkAExJTlVYX0VHTF9NQUtFX0NVUlJFTlRfRkFJTEVEOiBlZ2xNYWtlQ3VycmVudCgpIGZhaWxlZABXR1BVX0NSRUFURV9TQU1QTEVSX0ZBSUxFRDogd2dwdURldmljZUNyZWF0ZVNhbXBsZXIoKSBmYWlsZWQAV0dQVV9DUkVBVEVfQlVGRkVSX0ZBSUxFRDogd2dwdURldmljZUNyZWF0ZUJ1ZmZlcigpIGZhaWxlZABMSU5VWF9FR0xfR0VUX1ZJU1VBTF9JTkZPX0ZBSUxFRDogWEdldFZpc3VhbEluZm8oKSBmYWlsZWQATElOVVhfRUdMX0lOSVRJQUxJWkVfRkFJTEVEOiBlZ2xJbml0aWFsaXplKCkgZmFpbGVkAFdHUFVfQ1JFQVRFX1RFWFRVUkVfRkFJTEVEOiB3Z3B1RGV2aWNlQ3JlYXRlVGV4dHVyZSgpIGZhaWxlZABXR1BVX0NSRUFURV9SRU5ERVJfUElQRUxJTkVfRkFJTEVEOiB3Z3B1RGV2aWNlQ3JlYXRlUmVuZGVyUGlwZWxpbmUoKSBmYWlsZWQAV0dQVV9DUkVBVEVfU0hBREVSX01PRFVMRV9GQUlMRUQ6IHdncHVEZXZpY2VDcmVhdGVTaGFkZXJNb2R1bGUoKSBmYWlsZWQATElOVVhfRUdMX0NSRUFURV9XSU5ET1dfU1VSRkFDRV9GQUlMRUQ6IGVnbENyZWF0ZVdpbmRvd1N1cmZhY2UoKSBmYWlsZWQAV0lOMzJfR0VUX1JBV19JTlBVVF9EQVRBX0ZBSUxFRDogR2V0UmF3SW5wdXREYXRhKCkgZmFpbGVkAF9zYXBwX2Vtc2Nfc2l6ZV9jaGFuZ2VkAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OV0lORE9XRk9DVVNDSEFOR0VEOiBOYXRpdmVBY3Rpdml0eSBvbldpbmRvd0ZvY3VzQ2hhbmdlZABBTkRST0lEX05BVElWRV9BQ1RJVklUWV9PTkNPTkZJR1VSQVRJT05DSEFOR0VEOiBOYXRpdmVBY3Rpdml0eSBvbkNvbmZpZ3VyYXRpb25DaGFuZ2VkAFZBTElEQVRFX0FCTkRfSUI6IHNnX2FwcGx5X2JpbmRpbmdzOiBwaXBlbGluZSBvYmplY3QgZGVmaW5lcyBub24taW5kZXhlZCByZW5kZXJpbmcsIGJ1dCBpbmRleCBidWZmZXIgcHJvdmlkZWQAVkFMSURBVEVfQUJORF9OT19JQjogc2dfYXBwbHlfYmluZGluZ3M6IHBpcGVsaW5lIG9iamVjdCBkZWZpbmVzIGluZGV4ZWQgcmVuZGVyaW5nLCBidXQgbm8gaW5kZXggYnVmZmVyIHByb3ZpZGVkAFZBTElEQVRFX0FQSVBfUElQRUxJTkVfVkFMSURfSUQ6IHNnX2FwcGx5X3BpcGVsaW5lOiBpbnZhbGlkIHBpcGVsaW5lIGlkIHByb3ZpZGVkAE51bXBhZEFkZABfY29tcHJlc3NlZF90ZXh0dXJlX2FzdGMAX3RleHR1cmVfY29tcHJlc3Npb25fcHZydGMAV0VCS0lUX1dFQkdMX2NvbXByZXNzZWRfdGV4dHVyZV9wdnJ0YwBfdGV4dHVyZV9jb21wcmVzc2lvbl9icHRjAF90ZXh0dXJlX2NvbXByZXNzaW9uX3JndGMAX2NvbXByZXNzZWRfdGV4dHVyZV9ldGMAX3RleHR1cmVfY29tcHJlc3Npb25fczN0YwBfY29tcHJlc3NlZF90ZXh0dXJlX3MzdGMAX3NnX3ZhbGlkYXRlX3NhbXBsZXJfZGVzYwBfc2dfdmFsaWRhdGVfYnVmZmVyX2Rlc2MAX3NnX3ZhbGlkYXRlX3NoYWRlcl9kZXNjAF9zYXBwX3ZhbGlkYXRlX2ljb25fZGVzYwBfc2dfdmFsaWRhdGVfcGlwZWxpbmVfZGVzYwBfc2dfdmFsaWRhdGVfaW1hZ2VfZGVzYwBWQUxJREFURV9BQk5EX1ZTX0lNQUdFX1RZUEVfTUlTTUFUQ0g6IHNnX2FwcGx5X2JpbmRpbmdzOiB0eXBlIG9mIGltYWdlIGJvdW5kIHRvIHZlcnRleCBzdGFnZSBkb2Vzbid0IG1hdGNoIHNoYWRlciBkZXNjAFZBTElEQVRFX0FCTkRfRlNfSU1BR0VfVFlQRV9NSVNNQVRDSDogc2dfYXBwbHlfYmluZGluZ3M6IHR5cGUgb2YgaW1hZ2UgYm91bmQgdG8gZnJhZ21lbnQgc3RhZ2UgZG9lc24ndCBtYXRjaCBzaGFkZXIgZGVzYwBzbXAgJiYgZGVzYwBpbWcgJiYgZGVzYwBidWYgJiYgZGVzYwBwaXAgJiYgc2hkICYmIGRlc2MAc3JjAF9zYXBwX21hbGxvYwBfc2dfbWFsbG9jAF9zZ19zbG90X2FsbG9jAF9zZ19nbF9jb21wYXJlX2Z1bmMAX3RleHR1cmVfZmlsdGVyX2FuaXNvdHJvcGljAHBhbmljAHZiAGF0dHMtPmdsLmZiAFRhYgBWQUxJREFURV9CVUZGRVJERVNDX05PX0RBVEE6IGR5bmFtaWMvc3RyZWFtIHVzYWdlIGJ1ZmZlcnMgY2Fubm90IGJlIGluaXRpYWxpemVkIHdpdGggZGF0YQBWQUxJREFURV9JTUFHRURFU0NfSU5KRUNURURfTk9fREFUQTogaW1hZ2VzIHdpdGggaW5qZWN0ZWQgdGV4dHVyZXMgY2Fubm90IGJlIGluaXRpYWxpemVkIHdpdGggZGF0YQBWQUxJREFURV9JTUFHRURFU0NfUlRfTk9fREFUQTogcmVuZGVyIHRhcmdldCBpbWFnZXMgY2Fubm90IGJlIGluaXRpYWxpemVkIHdpdGggZGF0YQBWQUxJREFURV9JTUFHRURFU0NfRFlOQU1JQ19OT19EQVRBOiBkeW5hbWljL3N0cmVhbSBpbWFnZXMgY2Fubm90IGJlIGluaXRpYWxpemVkIHdpdGggZGF0YQBDb21tYQBpbWctPmdsLnRleFtzbG90XQBkZXNjLT5nbF9idWZmZXJzW3Nsb3RdAGRlc2MtPmdsX3RleHR1cmVzW3Nsb3RdAFsAS2V5WgBLZXlZAEFORFJPSURfTVNHX0RFU1RST1k6IE1TR19ERVNUUk9ZAEtleVgAS2V5VwBBTkRST0lEX01TR19TRVRfTkFUSVZFX1dJTkRPVzogTVNHX1NFVF9OQVRJVkVfV0lORE9XAEtleVYAS2V5VQBLZXlUAEtleVMAQU5EUk9JRF9NU0dfTk9fRk9DVVM6IE1TR19OT19GT0NVUwBBTkRST0lEX01TR19GT0NVUzogTVNHX0ZPQ1VTAGFfc3RhdGUtPmJ1ZmZlcl9pbmRleCA8IFNHX01BWF9WRVJURVhfQlVGRkVSUwBidWYtPmNtbi5hY3RpdmVfc2xvdCA8IFNHX05VTV9JTkZMSUdIVF9GUkFNRVMAbnVtX2ltYWdlcyA8PSBTQVBQX01BWF9JQ09OSU1BR0VTAEtleVIAVkFMSURBVEVfQUJORF9WU19VTkVYUEVDVEVEX1NBTVBMRVJfQ09NUEFSRV9ORVZFUjogc2dfYXBwbHlfYmluZGluZ3M6IHNoYWRlciBleHBlY3RzIFNHX1NBTVBMRVJUWVBFX0NPTVBBUklTT04gb24gdmVydGV4IHN0YWdlIGJ1dCBzYW1wbGVyIGhhcyBTR19DT01QQVJFRlVOQ19ORVZFUgBWQUxJREFURV9BQk5EX0ZTX1VORVhQRUNURURfU0FNUExFUl9DT01QQVJFX05FVkVSOiBzZ19hcHBseV9iaW5kaW5nczogc2hhZGVyIGV4cGVjdHMgU0dfU0FNUExFUlRZUEVfQ09NUEFSSVNPTiBvbiBmcmFnbWVudCBzdGFnZSBidXQgc2FtcGxlciBoYXMgU0dfQ09NUEFSRUZVTkNfTkVWRVIAVkFMSURBVEVfQUJORF9WU19FWFBFQ1RFRF9TQU1QTEVSX0NPTVBBUkVfTkVWRVI6IHNnX2FwcGx5X2JpbmRpbmdzOiBzaGFkZXIgZXhwZWN0cyBTR19TQU1QTEVSVFlQRV9GSUxURVJJTkcgb3IgU0dfU0FNUExFUlRZUEVfTk9ORklMVEVSSU5HIG9uIHZlcnRleCBzdGFnZSBidXQgc2FtcGxlciBkb2Vzbid0IGhhdmUgU0dfQ09NUEFSRUZVTkNfTkVWRVIAVkFMSURBVEVfQUJORF9GU19FWFBFQ1RFRF9TQU1QTEVSX0NPTVBBUkVfTkVWRVI6IHNnX2FwcGx5X2JpbmRpbmdzOiBzaGFkZXIgZXhwZWN0cyBTR19TQU1QTEVSVFlQRV9GSUxURVJJTkcgb24gZnJhZ21lbnQgc3RhZ2UgYnV0IHNhbXBsZXIgZG9lc24ndCBoYXZlIFNHX0NPTVBBUkVGVU5DX05FVkVSAFZBTElEQVRFX0FCTkRfVkJfVFlQRTogc2dfYXBwbHlfYmluZGluZ3M6IGJ1ZmZlciBpbiB2ZXJ0ZXggYnVmZmVyIHNsb3QgaXMgbm90IGEgU0dfQlVGRkVSVFlQRV9WRVJURVhCVUZGRVIAVkFMSURBVEVfQUJORF9JQl9UWVBFOiBzZ19hcHBseV9iaW5kaW5nczogYnVmZmVyIGluIGluZGV4IGJ1ZmZlciBzbG90IGlzIG5vdCBhIFNHX0JVRkZFUlRZUEVfSU5ERVhCVUZGRVIAVkFMSURBVEVfU0FNUExFUkRFU0NfQU5JU1RST1BJQ19SRVFVSVJFU19MSU5FQVJfRklMVEVSSU5HOiBzZ19zYW1wbGVyX2Rlc2MubWF4X2FuaXNvdHJvcHkgPiAxIHJlcXVpcmVzIG1pbi9tYWcvbWlwbWFwX2ZpbHRlciB0byBiZSBTR19GSUxURVJfTElORUFSAEtleVEAS2V5UABLZXlPAEtleU4ATkFOAEtleU0AS2V5TABMSU5VWF9HTFhfTE9BRF9MSUJHTF9GQUlMRUQ6IGZhaWxlZCB0byBsb2FkIGxpYkdMAHNsb3QtPnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfSU5JVElBTABzbXAtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9JTklUSUFMAHBpcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0lOSVRJQUwAaW1nLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfSU5JVElBTABidWYtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9JTklUSUFMAHNoZC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0lOSVRJQUwAS2V5SwBLZXlKAEtleUkAS2V5SABLZXlHAEtleUYASU5GAEtleUUAQU5EUk9JRF9NU0dfU0VUX0lOUFVUX1FVRVVFOiBNU0dfU0VUX0lOUFVUX1FVRVVFAEFORFJPSURfTVNHX0NSRUFURTogTVNHX0NSRUFURQBBTkRST0lEX01TR19QQVVTRTogTVNHX1BBVVNFAHBhc3NfZGVmLnN3YXBjaGFpbi5jb2xvcl9mb3JtYXQgPiBTR19QSVhFTEZPUk1BVF9OT05FAEFORFJPSURfTVNHX1JFU1VNRTogTVNHX1JFU1VNRQBWQUxJREFURV9JTUFHRURFU0NfUlRfSU1NVVRBQkxFOiByZW5kZXIgdGFyZ2V0IGltYWdlcyBtdXN0IGJlIFNHX1VTQUdFX0lNTVVUQUJMRQBfc2dwLmluaXRfY29va2llID09IF9TR1BfSU5JVF9DT09LSUUAS2V5RABURVhDT09SRABzbG90LT5pZCA9PSBTR19JTlZBTElEX0lEAF9zZ3Auc3RhdGUucGlwZWxpbmUuaWQgIT0gU0dfSU5WQUxJRF9JRAB1LT50eXBlICE9IFNHX1VOSUZPUk1UWVBFX0lOVkFMSUQAVkFMSURBVEVfQkVHSU5QQVNTX0FUVEFDSE1FTlRTX1ZBTElEOiBzZ19iZWdpbl9wYXNzOiBhdHRhY2htZW50cyBvYmplY3Qgbm90IGluIHJlc291cmNlIHN0YXRlIFZBTElEAEtleUMAc21wLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfQUxMT0MAcGlwLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfQUxMT0MAaW1nLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfQUxMT0MAYnVmLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfQUxMT0MAc2hkLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfQUxMT0MAV0lOMzJfSEVMUEVSX1dJTkRPV19HRVREQ19GQUlMRUQ6IGZhaWxlZCB0byBnZXQgaGVscGVyIHdpbmRvdyBEQwBLZXlCAExJTlVYX0dMWF9DUkVBVEVfQ09OVEVYVF9GQUlMRUQ6IEZhaWxlZCB0byBjcmVhdGUgR0wgY29udGV4dCB2aWEgZ2xYQ3JlYXRlQ29udGV4dEF0dHJpYnNBUkIAV0lOMzJfV0dMX0lOQ09NUEFUSUJMRV9ERVZJQ0VfQ09OVEVYVDogQ3JlYXRlQ29udGV4dEF0dHJpYnNBUkIgZmFpbGVkIHdpdGggRVJST1JfSU5DT01QQVRJQkxFX0RFVklDRV9DT05URVhUU19BUkIAS2V5QQA8ZmA8BmY8AFtsaW5lOgBbaWQ6AERpZ2l0OQBOdW1wYWQ5AEY5AERpZ2l0OABOdW1wYWQ4AEY4AERpZ2l0NwBOdW1wYWQ3AEY3AERpZ2l0NgBOdW1wYWQ2AEY2AERpZ2l0NQBOdW1wYWQ1AEY1AERpZ2l0NABOdW1wYWQ0AEY0AFZBTElEQVRFX1BJUEVMSU5FREVTQ19MQVlPVVRfU1RSSURFNDogc2dfcGlwZWxpbmVfZGVzYy5sYXlvdXQuYnVmZmVyc1tdLnN0cmlkZSBtdXN0IGJlIG11bHRpcGxlIG9mIDQAVkFMSURBVEVfQlVGRkVSREVTQ19TVE9SQUdFQlVGRkVSX1NJWkVfTVVMVElQTEVfNDogc2l6ZSBvZiBzdG9yYWdlIGJ1ZmZlcnMgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQAY2hhbm5lbCA+PSAwICYmIGNoYW5uZWwgPCA0AHNpemUgPD0gc2l6ZW9mKGZsb2F0KSAqIDQARGlnaXQzAE51bXBhZDMARjMARGlnaXQyAE51bXBhZDIARjIAX3NnX2FsaWduX3UzMgBGMTIARGlnaXQxAE51bXBhZDEARjEARjExAGdsX2F0dHItPnZiX2luZGV4ID09IC0xAFZBTElEQVRFX0FUVEFDSE1FTlRTREVTQ19SRVNPTFZFX1NBTVBMRV9DT1VOVDogcGFzcyByZXNvbHZlIGF0dGFjaG1lbnQgaW1hZ2Ugc2FtcGxlIGNvdW50IG11c3QgYmUgMQBWQUxJREFURV9JTUFHRURFU0NfTVNBQV8zRF9JTUFHRTogM0QgaW1hZ2VzIGNhbm5vdCBoYXZlIGEgc2FtcGxlX2NvdW50ID4gMQBWQUxJREFURV9BVFRBQ0hNRU5UU0RFU0NfUkVTT0xWRV9DT0xPUl9JTUFHRV9NU0FBOiBwYXNzIHJlc29sdmUgYXR0YWNobWVudHMgbXVzdCBoYXZlIGEgY29sb3IgYXR0YWNobWVudCBpbWFnZSB3aXRoIHNhbXBsZSBjb3VudCA+IDEAVkFMSURBVEVfU0hBREVSREVTQ19VQl9BUlJBWV9DT1VOVDogdW5pZm9ybSBhcnJheSBjb3VudCBtdXN0IGJlID49IDEAVkFMSURBVEVfSU1BR0VERVNDX01TQUFfTlVNX01JUE1BUFM6IE1TQUEgaW1hZ2VzIG11c3QgaGF2ZSBudW1fbWlwbWFwcyA9PSAxAERpZ2l0MABtYWluMABudWxsMABpVGV4Q2hhbm5lbDBfaVNtcENoYW5uZWwwAE51bXBhZDAAdnNfNF8wAHBzXzRfMABGMTAATElOVVhfWDExX1FVRVJZX1NZU1RFTV9EUElfRkFJTEVEOiBmYWlsZWQgdG8gcXVlcnkgc3lzdGVtIGRwaSB2YWx1ZSwgYXNzdW1pbmcgZGVmYXVsdCA5Ni4wAFZBTElEQVRFX0JVRkZFUkRFU0NfU0laRTogc2dfYnVmZmVyX2Rlc2Muc2l6ZSBhbmQgLmRhdGEuc2l6ZSBjYW5ub3QgYm90aCBiZSAwAGFycmF5X2NvdW50ID4gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0VYUEVDVF9TQU1QTEVDT1VOVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uc2FtcGxlX2NvdW50ID4gMABwYXNzX2RlZi5zd2FwY2hhaW4uc2FtcGxlX2NvdW50ID4gMABpbnRlcl9jbWRfY291bnQgPiAwAGRlc2MtPmhlaWdodCA+IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9FWFBFQ1RfSEVJR0hUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5oZWlnaHQgPiAwAHBhc3NfZGVmLnN3YXBjaGFpbi5oZWlnaHQgPiAwAGRlc2MtPm1heF9jb21taXRfbGlzdGVuZXJzID4gMAB0LT5udW0gPiAwAGRlc2MtPndpZHRoID4gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0VYUEVDVF9XSURUSDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ud2lkdGggPiAwAHBhc3NfZGVmLnN3YXBjaGFpbi53aWR0aCA+IDAAdWJfZGVzYy0+c2l6ZSA+IDAAZGVzYy0+cGl4ZWxzLnNpemUgPiAwAF9zZ3AuY3VyX3N0YXRlID4gMABsX3N0YXRlLT5zdHJpZGUgPiAwAFZBTElEQVRFX0lNQUdFREVTQ19IRUlHSFQ6IHNnX2ltYWdlX2Rlc2MuaGVpZ2h0IG11c3QgYmUgPiAwAFZBTElEQVRFX0lNQUdFREVTQ19XSURUSDogc2dfaW1hZ2VfZGVzYy53aWR0aCBtdXN0IGJlID4gMABkZXNjLT5zYW1wbGVfY291bnQgPj0gMABiYXNlX2VsZW1lbnQgPj0gMABkZXNjLT5oZWlnaHQgPj0gMABudW1fZWxlbWVudHMgPj0gMABkZXNjLT5tYXhfZHJvcHBlZF9maWxlcyA+PSAwAG51bV9pbnN0YW5jZXMgPj0gMABkZXNjLT5zd2FwX2ludGVydmFsID49IDAAZGVzYy0+bWF4X2Ryb3BwZWRfZmlsZV9wYXRoX2xlbmd0aCA+PSAwAGRlc2MtPndpZHRoID49IDAAZGVzYy0+Y2xpcGJvYXJkX3NpemUgPj0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX1dHUFVfRVhQRUNUX1JFTkRFUlZJRVdfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi53Z3B1LnJlbmRlcl92aWV3ID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9EM0QxMV9FWFBFQ1RfUkVOREVSVklFV19OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLmQzZDExLnJlbmRlcl92aWV3ID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9XR1BVX0VYUEVDVF9ERVBUSFNURU5DSUxWSUVXX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ud2dwdS5kZXB0aF9zdGVuY2lsX3ZpZXcgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0QzRDExX0VYUEVDVF9ERVBUSFNURU5DSUxWSUVXX05PVFNFVDogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4uZDNkMTEuZGVwdGhfc3RlbmNpbF92aWV3ID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9XR1BVX0VYUEVDVF9SRVNPTFZFVklFV19OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLndncHUucmVzb2x2ZV92aWV3ID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9EM0QxMV9FWFBFQ1RfUkVTT0xWRVZJRVdfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5kM2QxMS5yZXNvbHZlX3ZpZXcgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0VYUEVDVF9TQU1QTEVDT1VOVF9OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLnNhbXBsZV9jb3VudCA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRVhQRUNUX0hFSUdIVF9OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLmhlaWdodCA9PSAwAF9zZy5jdXJfcGFzcy5hdHRzID09IDAAc3RhZ2UtPm51bV9zYW1wbGVycyA9PSAwAHN0YWdlLT5udW1faW1hZ2Vfc2FtcGxlcnMgPT0gMABzdGFnZS0+bnVtX3N0b3JhZ2VfYnVmZmVycyA9PSAwAHViLT5udW1fdW5pZm9ybXMgPT0gMABzdGFnZS0+bnVtX3VuaWZvcm1fYmxvY2tzID09IDAAc3RhZ2UtPm51bV9pbWFnZXMgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX0dMX0VYUEVDVF9GUkFNRUJVRkZFUl9OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLmdsLmZyYW1lYnVmZmVyID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9FWFBFQ1RfV0lEVEhfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi53aWR0aCA9PSAwAF9zZ3AuY3VyX3N0YXRlID09IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9NRVRBTF9FWFBFQ1RfTVNBQUNPTE9SVEVYVFVSRV9OT1RTRVQ6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLm1ldGFsLm1zYWFfY29sb3JfdGV4dHVyZSA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fTUVUQUxfRVhQRUNUX0RFUFRIU1RFTkNJTFRFWFRVUkVfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5tZXRhbC5kZXB0aF9zdGVuY2lsX3RleHR1cmUgPT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX01FVEFMX0VYUEVDVF9DVVJSRU5URFJBV0FCTEVfTk9UU0VUOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5tZXRhbC5jdXJyZW50X2RyYXdhYmxlID09IDAAX3NncC5pbml0X2Nvb2tpZSA9PSAwAChkaW0gJSA4KSA9PSAwAGdsR2V0RXJyb3IoKSA9PSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fV0dQVV9FWFBFQ1RfUkVOREVSVklFVzogc2dfYmVnaW5fcGFzczogZXhwZWN0ZWQgcGFzcy5zd2FwY2hhaW4ud2dwdS5yZW5kZXJfdmlldyAhPSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRDNEMTFfRVhQRUNUX1JFTkRFUlZJRVc6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLmQzZDExLnJlbmRlcl92aWV3ICE9IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9XR1BVX0VYUEVDVF9ERVBUSFNURU5DSUxWSUVXOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi53Z3B1LmRlcHRoX3N0ZW5jaWxfdmlldyAhPSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fRDNEMTFfRVhQRUNUX0RFUFRIU1RFTkNJTFZJRVc6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLmQzZDExLmRlcHRoX3N0ZW5jaWxfdmlldyAhPSAwAFZBTElEQVRFX0JFR0lOUEFTU19TV0FQQ0hBSU5fV0dQVV9FWFBFQ1RfUkVTT0xWRVZJRVc6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLndncHUucmVzb2x2ZV92aWV3ICE9IDAAVkFMSURBVEVfQkVHSU5QQVNTX1NXQVBDSEFJTl9EM0QxMV9FWFBFQ1RfUkVTT0xWRVZJRVc6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLmQzZDExLnJlc29sdmVfdmlldyAhPSAwAHNsb3QtPnRhcmdldCAhPSAwAGRlc2MtPnBpeGVscy5wdHIgIT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX01FVEFMX0VYUEVDVF9NU0FBQ09MT1JURVhUVVJFOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5tZXRhbC5tc2FhX2NvbG9yX3RleHR1cmUgIT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX01FVEFMX0VYUEVDVF9ERVBUSFNURU5DSUxURVhUVVJFOiBzZ19iZWdpbl9wYXNzOiBleHBlY3RlZCBwYXNzLnN3YXBjaGFpbi5tZXRhbC5kZXB0aF9zdGVuY2lsX3RleHR1cmUgIT0gMABWQUxJREFURV9CRUdJTlBBU1NfU1dBUENIQUlOX01FVEFMX0VYUEVDVF9DVVJSRU5URFJBV0FCTEU6IHNnX2JlZ2luX3Bhc3M6IGV4cGVjdGVkIHBhc3Muc3dhcGNoYWluLm1ldGFsLmN1cnJlbnRfZHJhd2FibGUgIT0gMABXSU4zMl9EM0QxMV9DUkVBVEVfREVWSUNFX0FORF9TV0FQQ0hBSU5fV0lUSF9ERUJVR19GQUlMRUQ6IEQzRDExQ3JlYXRlRGV2aWNlQW5kU3dhcENoYWluKCkgd2l0aCBEM0QxMV9DUkVBVEVfREVWSUNFX0RFQlVHIGZhaWxlZCwgcmV0cnlpbmcgd2l0aG91dCBkZWJ1ZyBmbGFnLgBWQUxJREFURV9TSEFERVJERVNDX1NUT1JBR0VCVUZGRVJfUkVBRE9OTFk6IHNoYWRlciBzdGFnZSBzdG9yYWdlIGJ1ZmZlcnMgbXVzdCBiZSByZWFkb25seSAoc2dfc2hhZGVyX2Rlc2MudnN8ZnMuc3RvcmFnZV9idWZmZXJzW10ucmVhZG9ubHkpAFdHUFVfU0hBREVSX1RPT19NQU5ZX1NBTVBMRVJTOiBzaGFkZXIgdXNlcyB0b28gbWFueSBzYW1wbGVycyBvbiBzaGFkZXIgc3RhZ2UgKHdncHUpAFdHUFVfU0hBREVSX1RPT19NQU5ZX1NUT1JBR0VCVUZGRVJTOiBzaGFkZXIgdXNlcyB0b28gbWFueSBzdG9yYWdlIGJ1ZmZlciBiaW5kaW5ncyBvbiBzaGFkZXIgc3RhZ2UgKHdncHUpAFdHUFVfU0hBREVSX1RPT19NQU5ZX0lNQUdFUzogc2hhZGVyIHVzZXMgdG9vIG1hbnkgc2FtcGxlZCBpbWFnZXMgb24gc2hhZGVyIHN0YWdlICh3Z3B1KQBXR1BVX0JJTkRHUk9VUFNDQUNIRV9TSVpFX1BPVzI6IHNnX2Rlc2Mud2dwdV9iaW5kZ3JvdXBzX2NhY2hlX3NpemUgbXVzdCBiZSBhIHBvd2VyIG9mIDIgKHdncHUpAFdHUFVfQklOREdST1VQU0NBQ0hFX1NJWkVfR1JFQVRFUl9PTkU6IHNnX2Rlc2Mud2dwdV9iaW5kZ3JvdXBzX2NhY2hlX3NpemUgbXVzdCBiZSA+IDEgKHdncHUpAFdHUFVfQklOREdST1VQU19QT09MX0VYSEFVU1RFRDogYmluZGdyb3VwcyBwb29sIGV4aGF1c3RlZCAoaW5jcmVhc2Ugc2dfZGVzYy5iaW5kZ3JvdXBzX2NhY2hlX3NpemUpICh3Z3B1KQBWQUxJREFURV9TSEFERVJERVNDX1NBTVBMRVJfTk9UX1JFRkVSRU5DRURfQllfSU1BR0VfU0FNUExFUl9QQUlSUzogc2hhZGVyIHN0YWdlOiBvbmUgb3IgbW9yZSBzYW1wbGVycyBhcmUgbm90IHJlZmVyZW5jZWQgYnkgaW1hZ2Utc2FtcGxlci1wYWlycyAoc2dfc2hhZGVyX2Rlc2MudnN8ZnMuaW1hZ2Vfc2FtcGxlcl9wYWlyc1tdLnNhbXBsZXJfc2xvdCkAVkFMSURBVEVfU0hBREVSREVTQ19JTUFHRV9TQU1QTEVSX1BBSVJfU0FNUExFUl9TTE9UX09VVF9PRl9SQU5HRTogc2hhZGVyIHN0YWdlOiBpbWFnZS1zYW1wbGVyLXBhaXIgaW1hZ2Ugc2xvdCBpbmRleCBpcyBvdXQgb2YgcmFuZ2UgKHNnX3NoYWRlcl9kZXNjLnZzfGZzLmltYWdlX3NhbXBsZXJfcGFpcnNbXS5zYW1wbGVyX3Nsb3QpAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfU0FNUExFUl9QQUlSX0lNQUdFX1NMT1RfT1VUX09GX1JBTkdFOiBzaGFkZXIgc3RhZ2U6IGltYWdlLXNhbXBsZXItcGFpciBpbWFnZSBzbG90IGluZGV4IGlzIG91dCBvZiByYW5nZSAoc2dfc2hhZGVyX2Rlc2MudnN8ZnMuaW1hZ2Vfc2FtcGxlcl9wYWlyc1tdLmltYWdlX3Nsb3QpAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfTk9UX1JFRkVSRU5DRURfQllfSU1BR0VfU0FNUExFUl9QQUlSUzogc2hhZGVyIHN0YWdlOiBvbmUgb3IgbW9yZSBpbWFnZXMgYXJlIG5vdGUgcmVmZXJlbmNlZCBieSAgKHNnX3NoYWRlcl9kZXNjLnZzfGZzLmltYWdlX3NhbXBsZXJfcGFpcnNbXS5pbWFnZV9zbG90KQAoMHg4ODkyID09IHRhcmdldCkgfHwgKDB4ODg5MyA9PSB0YXJnZXQpIHx8ICgweDkwRDIgPT0gdGFyZ2V0KQAoaW1nX3NtcF9kZXNjLT5zYW1wbGVyX3Nsb3QgPj0gMCkgJiYgKGltZ19zbXBfZGVzYy0+c2FtcGxlcl9zbG90IDwgc3RhZ2UtPm51bV9zYW1wbGVycykASU1BR0VfREFUQV9TSVpFX01JU01BVENIOiBpbWFnZSBkYXRhIHNpemUgbWlzbWF0Y2ggKG11c3QgYmUgd2lkdGgqaGVpZ2h0KjQgYnl0ZXMpAChpbmRleCA+PSAwKSAmJiAoaW5kZXggPD0gX3NhcHAuZHJvcC5tYXhfZmlsZXMpAChpbWdfc21wX2Rlc2MtPmltYWdlX3Nsb3QgPj0gMCkgJiYgKGltZ19zbXBfZGVzYy0+aW1hZ2Vfc2xvdCA8IHN0YWdlLT5udW1faW1hZ2VzKQBzZ3BfZ2V0X2Vycm9yX21lc3NhZ2UoZXJyb3IpAFZBTElEQVRFX0lNQUdFREFUQV9OT0RBVEE6IHNnX2ltYWdlX2RhdGE6IG5vIGRhdGEgKC5wdHIgYW5kL29yIC5zaXplIGlzIHplcm8pAChkZXNjLT5hbGxvY2F0b3IuYWxsb2NfZm4gJiYgZGVzYy0+YWxsb2NhdG9yLmZyZWVfZm4pIHx8ICghZGVzYy0+YWxsb2NhdG9yLmFsbG9jX2ZuICYmICFkZXNjLT5hbGxvY2F0b3IuZnJlZV9mbikAKG51bGwpAEdMX1ZFUlRFWF9BVFRSSUJVVEVfTk9UX0ZPVU5EX0lOX1NIQURFUjogdmVydGV4IGF0dHJpYnV0ZSBub3QgZm91bmQgaW4gc2hhZGVyIChnbCkAR0xfVEVYVFVSRV9OQU1FX05PVF9GT1VORF9JTl9TSEFERVI6IHRleHR1cmUgbmFtZSBub3QgZm91bmQgaW4gc2hhZGVyIChnbCkAR0xfVEVYVFVSRV9GT1JNQVRfTk9UX1NVUFBPUlRFRDogcGl4ZWwgZm9ybWF0IG5vdCBzdXBwb3J0ZWQgZm9yIHRleHR1cmUgKGdsKQBHTF9BUlJBWV9URVhUVVJFU19OT1RfU1VQUE9SVEVEOiBhcnJheSB0ZXh0dXJlcyBub3Qgc3VwcG9ydGVkIChnbCkAR0xfM0RfVEVYVFVSRVNfTk9UX1NVUFBPUlRFRDogM2QgdGV4dHVyZXMgbm90IHN1cHBvcnRlZCAoZ2wpAEdMX1NIQURFUl9DT01QSUxBVElPTl9GQUlMRUQ6IHNoYWRlciBjb21waWxhdGlvbiBmYWlsZWQgKGdsKQBHTF9TSEFERVJfTElOS0lOR19GQUlMRUQ6IHNoYWRlciBsaW5raW5nIGZhaWxlZCAoZ2wpAEdMX0ZSQU1FQlVGRkVSX1NUQVRVU19JTkNPTVBMRVRFX01JU1NJTkdfQVRUQUNITUVOVDogZnJhbWVidWZmZXIgY29tcGxldGVuZXNzIGNoZWNrIGZhaWxlZCB3aXRoIEdMX0ZSQU1FQlVGRkVSX0lOQ09NUExFVEVfTUlTU0lOR19BVFRBQ0hNRU5UIChnbCkAR0xfRlJBTUVCVUZGRVJfU1RBVFVTX0lOQ09NUExFVEVfQVRUQUNITUVOVDogZnJhbWVidWZmZXIgY29tcGxldGVuZXNzIGNoZWNrIGZhaWxlZCB3aXRoIEdMX0ZSQU1FQlVGRkVSX0lOQ09NUExFVEVfQVRUQUNITUVOVCAoZ2wpAEdMX0ZSQU1FQlVGRkVSX1NUQVRVU19JTkNPTVBMRVRFX01VTFRJU0FNUExFOiBmcmFtZWJ1ZmZlciBjb21wbGV0ZW5lc3MgY2hlY2sgZmFpbGVkIHdpdGggR0xfRlJBTUVCVUZGRVJfSU5DT01QTEVURV9NVUxUSVNBTVBMRSAoZ2wpAEdMX0ZSQU1FQlVGRkVSX1NUQVRVU19VTlNVUFBPUlRFRDogZnJhbWVidWZmZXIgY29tcGxldGVuZXNzIGNoZWNrIGZhaWxlZCB3aXRoIEdMX0ZSQU1FQlVGRkVSX1VOU1VQUE9SVEVEIChnbCkAR0xfRlJBTUVCVUZGRVJfU1RBVFVTX1VOREVGSU5FRDogZnJhbWVidWZmZXIgY29tcGxldGVuZXNzIGNoZWNrIGZhaWxlZCB3aXRoIEdMX0ZSQU1FQlVGRkVSX1VOREVGSU5FRCAoZ2wpAEdMX0ZSQU1FQlVGRkVSX1NUQVRVU19VTktOT1dOOiBmcmFtZWJ1ZmZlciBjb21wbGV0ZW5lc3MgY2hlY2sgZmFpbGVkICh1bmtub3duIHJlYXNvbikgKGdsKQBNRVRBTF9DUkVBVEVfU0FNUExFUl9GQUlMRUQ6IGZhaWxlZCB0byBjcmVhdGUgc2FtcGxlciBvYmplY3QgKG1ldGFsKQBNRVRBTF9DUkVBVEVfQlVGRkVSX0ZBSUxFRDogZmFpbGVkIHRvIGNyZWF0ZSBidWZmZXIgb2JqZWN0IChtZXRhbCkATUVUQUxfQ1JFQVRFX1RFWFRVUkVfRkFJTEVEOiBmYWlsZWQgdG8gY3JlYXRlIHRleHR1cmUgb2JqZWN0IChtZXRhbCkATUVUQUxfQ1JFQVRFX0RTU19GQUlMRUQ6IGZhaWxlZCB0byBjcmVhdGUgZGVwdGggc3RlbmNpbCBzdGF0ZSAobWV0YWwpAE1FVEFMX0NSRUFURV9SUFNfRkFJTEVEOiBmYWlsZWQgdG8gY3JlYXRlIHJlbmRlciBwaXBlbGluZSBzdGF0ZSAobWV0YWwpAE1FVEFMX1RFWFRVUkVfRk9STUFUX05PVF9TVVBQT1JURUQ6IHBpeGVsIGZvcm1hdCBub3Qgc3VwcG9ydGVkIGZvciB0ZXh0dXJlIChtZXRhbCkATUVUQUxfRlJBR01FTlRfU0hBREVSX0VOVFJZX05PVF9GT1VORDogZnJhZ21lbnQgc2hhZGVyIGVudHJ5IG5vdCBmb3VuZCAobWV0YWwpAE1FVEFMX1ZFUlRFWF9TSEFERVJfRU5UUllfTk9UX0ZPVU5EOiB2ZXJ0ZXggc2hhZGVyIGVudHJ5IGZ1bmN0aW9uIG5vdCBmb3VuZCAobWV0YWwpAE1FVEFMX1NIQURFUl9DT01QSUxBVElPTl9GQUlMRUQ6IHNoYWRlciBjb21waWxhdGlvbiBmYWlsZWQgKG1ldGFsKQBNRVRBTF9TSEFERVJfQ1JFQVRJT05fRkFJTEVEOiBzaGFkZXIgY3JlYXRpb24gZmFpbGVkIChtZXRhbCkAV0lOMzJfUkVHSVNURVJfUkFXX0lOUFVUX0RFVklDRVNfRkFJTEVEX01PVVNFX1VOTE9DSzogUmVnaXN0ZXJSYXdJbnB1dERldmljZXMoKSBmYWlsZWQgKG9uIG1vdXNlIHVubG9jaykAV0lOMzJfUkVHSVNURVJfUkFXX0lOUFVUX0RFVklDRVNfRkFJTEVEX01PVVNFX0xPQ0s6IFJlZ2lzdGVyUmF3SW5wdXREZXZpY2VzKCkgZmFpbGVkIChvbiBtb3VzZSBsb2NrKQBEUk9QUEVEX0ZJTEVfUEFUSF9UT09fTE9ORzogZHJvcHBlZCBmaWxlIHBhdGggdG9vIGxvbmcgKHNhcHBfZGVzYy5tYXhfZHJvcHBlZF9maWxlZF9wYXRoX2xlbmd0aCkAIV9zYXBwX3JpbmdfZW1wdHkocmluZykAIV9zYXBwX3JpbmdfZnVsbChyaW5nKQAoc2xvdF9pbmRleCA+IDApICYmIChzbG90X2luZGV4IDwgcG9vbC0+c2l6ZSkAKHNsb3RfaW5kZXggPiAoMCkpICYmIChzbG90X2luZGV4IDwgcG9vbC0+c2l6ZSkAKHNsb3RfaW5kZXggPiAoMCkpICYmIChzbG90X2luZGV4IDwgcC0+YXR0YWNobWVudHNfcG9vbC5zaXplKQAoc2xvdF9pbmRleCA+ICgwKSkgJiYgKHNsb3RfaW5kZXggPCBwLT5zYW1wbGVyX3Bvb2wuc2l6ZSkAKHNsb3RfaW5kZXggPiAoMCkpICYmIChzbG90X2luZGV4IDwgcC0+YnVmZmVyX3Bvb2wuc2l6ZSkAKHNsb3RfaW5kZXggPiAoMCkpICYmIChzbG90X2luZGV4IDwgcC0+c2hhZGVyX3Bvb2wuc2l6ZSkAKHNsb3RfaW5kZXggPiAoMCkpICYmIChzbG90X2luZGV4IDwgcC0+cGlwZWxpbmVfcG9vbC5zaXplKQAoc2xvdF9pbmRleCA+ICgwKSkgJiYgKHNsb3RfaW5kZXggPCBwLT5pbWFnZV9wb29sLnNpemUpAFZBTElEQVRFX0JVRkZFUkRFU0NfREFUQTogaW1tdXRhYmxlIGJ1ZmZlcnMgbXVzdCBiZSBpbml0aWFsaXplZCB3aXRoIGRhdGEgKHNnX2J1ZmZlcl9kZXNjLmRhdGEucHRyIGFuZCBzZ19idWZmZXJfZGVzYy5kYXRhLnNpemUpAFZBTElEQVRFX1NIQURFUkRFU0NfSU1BR0VfU0FNUExFUl9QQUlSX05BTUVfUkVRVUlSRURfRk9SX0dMOiBzaGFkZXIgc3RhZ2U6IGltYWdlLXNhbXBsZXItcGFpcnMgbXVzdCBiZSBuYW1lZCBpbiBHTCAoc2dfc2hhZGVyX2Rlc2MudnN8ZnMuaW1hZ2Vfc2FtcGxlcl9wYWlyc1tdLm5hbWUpAHAgJiYgKFNHX0lOVkFMSURfSUQgIT0gYXR0c19pZCkAcCAmJiAoU0dfSU5WQUxJRF9JRCAhPSBzbXBfaWQpAHAgJiYgKFNHX0lOVkFMSURfSUQgIT0gcGlwX2lkKQBwICYmIChTR19JTlZBTElEX0lEICE9IGltZ19pZCkAcCAmJiAoU0dfSU5WQUxJRF9JRCAhPSBidWZfaWQpAHAgJiYgKFNHX0lOVkFMSURfSUQgIT0gc2hkX2lkKQBwaXAtPnNoYWRlciAmJiAocGlwLT5jbW4uc2hhZGVyX2lkLmlkID09IHBpcC0+c2hhZGVyLT5zbG90LmlkKQBwaXAgJiYgKHBpcC0+c2xvdC5pZCA9PSBfc2cuY3VyX3BpcGVsaW5lLmlkKQBwaXAtPnNoYWRlciAmJiAocGlwLT5zaGFkZXItPnNsb3QuaWQgPT0gcGlwLT5jbW4uc2hhZGVyX2lkLmlkKQBWQUxJREFURV9TSEFERVJERVNDX05PX0NPTlRfSU1BR0VfU0FNUExFUl9QQUlSUzogc2hhZGVyIHN0YWdlIGltYWdlLXNhbXBsZXItcGFpcnMgbXVzdCBvY2N1cHkgY29udGludW91cyBzbG90cyAoc2dfc2hhZGVyX2Rlc2MudnN8ZnMuaW1hZ2Vfc2FtcGxlcnNbXSkAVkFMSURBVEVfU0hBREVSREVTQ19OT19DT05UX1NBTVBMRVJTOiBzaGFkZXIgc3RhZ2Ugc2FtcGxlcnMgbXVzdCBvY2N1cHkgY29udGludW91cyBzbG90cyAoc2dfc2hhZGVyX2Rlc2MudnN8ZnMuc2FtcGxlcnNbXSkAVkFMSURBVEVfU0hBREVSREVTQ19OT19DT05UX1NUT1JBR0VCVUZGRVJTOiBzaGFkZXIgc3RhZ2Ugc3RvcmFnZSBidWZmZXJzIG11c3Qgb2NjdXB5IGNvbnRpbnVvdXMgc2xvdHMgKHNnX3NoYWRlcl9kZXNjLnZzfGZzLnN0b3JhZ2VfYnVmZmVyc1tdKQBWQUxJREFURV9TSEFERVJERVNDX05PX0NPTlRfSU1BR0VTOiBzaGFkZXIgc3RhZ2UgaW1hZ2VzIG11c3Qgb2NjdXB5IGNvbnRpbnVvdXMgc2xvdHMgKHNnX3NoYWRlcl9kZXNjLnZzfGZzLmltYWdlc1tdKQAoZGVzYy0+Y29sb3JfY291bnQgPj0gMCkgJiYgKGRlc2MtPmNvbG9yX2NvdW50IDw9IFNHX01BWF9DT0xPUl9BVFRBQ0hNRU5UUykAYXR0cyAmJiAoaW5kZXggPj0gMCkgJiYgKGluZGV4IDwgU0dfTUFYX0NPTE9SX0FUVEFDSE1FTlRTKQAoc2xvdCA+PSAwKSAmJiAoc2xvdCA8IFNHX01BWF9TSEFERVJTVEFHRV9TVE9SQUdFQlVGRkVSUykAKHN0YWdlX2luZGV4ID09IFNHX1NIQURFUlNUQUdFX1ZTKSB8fCAoc3RhZ2VfaW5kZXggPT0gU0dfU0hBREVSU1RBR0VfRlMpAChzdGFnZSA9PSBTR19TSEFERVJTVEFHRV9WUykgfHwgKHN0YWdlID09IFNHX1NIQURFUlNUQUdFX0ZTKQAoc3RhZ2UgPj0gMCkgJiYgKHN0YWdlIDwgU0dfTlVNX1NIQURFUl9TVEFHRVMpAChudW1faW1hZ2VzID4gMCkgJiYgKG51bV9pbWFnZXMgPD0gU0FQUF9NQVhfSUNPTklNQUdFUykAKHViX2luZGV4ID49IDApICYmICh1Yl9pbmRleCA8IFNHX01BWF9TSEFERVJTVEFHRV9VQlMpAChmbXRfaW5kZXggPiBTR19QSVhFTEZPUk1BVF9OT05FKSAmJiAoZm10X2luZGV4IDwgX1NHX1BJWEVMRk9STUFUX05VTSkAKGZtdF9pbmRleCA+PSAwKSAmJiAoZm10X2luZGV4IDwgX1NHX1BJWEVMRk9STUFUX05VTSkAKChpbnQpZm10ID49IDApICYmICgoaW50KWZtdCA8IF9TR19QSVhFTEZPUk1BVF9OVU0pAChkZXNjLT5hdHRhY2htZW50c19wb29sX3NpemUgPiAwKSAmJiAoZGVzYy0+YXR0YWNobWVudHNfcG9vbF9zaXplIDwgX1NHX01BWF9QT09MX1NJWkUpAChkZXNjLT5zYW1wbGVyX3Bvb2xfc2l6ZSA+IDApICYmIChkZXNjLT5zYW1wbGVyX3Bvb2xfc2l6ZSA8IF9TR19NQVhfUE9PTF9TSVpFKQAoZGVzYy0+YnVmZmVyX3Bvb2xfc2l6ZSA+IDApICYmIChkZXNjLT5idWZmZXJfcG9vbF9zaXplIDwgX1NHX01BWF9QT09MX1NJWkUpAChkZXNjLT5zaGFkZXJfcG9vbF9zaXplID4gMCkgJiYgKGRlc2MtPnNoYWRlcl9wb29sX3NpemUgPCBfU0dfTUFYX1BPT0xfU0laRSkAKGRlc2MtPnBpcGVsaW5lX3Bvb2xfc2l6ZSA+IDApICYmIChkZXNjLT5waXBlbGluZV9wb29sX3NpemUgPCBfU0dfTUFYX1BPT0xfU0laRSkAKGRlc2MtPmltYWdlX3Bvb2xfc2l6ZSA+IDApICYmIChkZXNjLT5pbWFnZV9wb29sX3NpemUgPCBfU0dfTUFYX1BPT0xfU0laRSkAc21wICYmIChzbXAtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9BTExPQykgJiYgKHNtcC0+c2xvdC5pZCAhPSBTR19JTlZBTElEX0lEKQBwaXAgJiYgKHBpcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0FMTE9DKSAmJiAocGlwLT5zbG90LmlkICE9IFNHX0lOVkFMSURfSUQpAGltZyAmJiAoaW1nLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfQUxMT0MpICYmIChpbWctPnNsb3QuaWQgIT0gU0dfSU5WQUxJRF9JRCkAYnVmICYmIChidWYtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9BTExPQykgJiYgKGJ1Zi0+c2xvdC5pZCAhPSBTR19JTlZBTElEX0lEKQBzaGQgJiYgKHNoZC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0FMTE9DKSAmJiAoc2hkLT5zbG90LmlkICE9IFNHX0lOVkFMSURfSUQpAChwaXAtPnNoYWRlciA9PSAwKSAmJiAocGlwLT5jbW4uc2hhZGVyX2lkLmlkICE9IFNHX0lOVkFMSURfSUQpAChzbXAtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9WQUxJRCl8fChzbXAtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9GQUlMRUQpAChzbXAtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9WQUxJRCkgfHwgKHNtcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0ZBSUxFRCkAKHBpcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX1ZBTElEKXx8KHBpcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0ZBSUxFRCkAKHBpcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX1ZBTElEKSB8fCAocGlwLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfRkFJTEVEKQAoaW1nLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfVkFMSUQpfHwoaW1nLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfRkFJTEVEKQAoaW1nLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfVkFMSUQpIHx8IChpbWctPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9GQUlMRUQpAChidWYtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9WQUxJRCl8fChidWYtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9GQUlMRUQpAChidWYtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9WQUxJRCkgfHwgKGJ1Zi0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0ZBSUxFRCkAKHNoZC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX1ZBTElEKXx8KHNoZC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0ZBSUxFRCkAKHNoZC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX1ZBTElEKSB8fCAoc2hkLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfRkFJTEVEKQBzbXAgJiYgKHNtcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0FMTE9DKQBwaXAgJiYgKHBpcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0FMTE9DKQBpbWcgJiYgKGltZy0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0FMTE9DKQBidWYgJiYgKGJ1Zi0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0FMTE9DKQBzaGQgJiYgKHNoZC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0FMTE9DKQBXSU4zMl9XR0xfT1BFTkdMX1ZFUlNJT05fTk9UX1NVUFBPUlRFRDogcmVxdWVzdGVkIE9wZW5HTCB2ZXJzaW9uIG5vdCBzdXBwb3J0ZWQgYnkgR0wgZHJpdmVyIChFUlJPUl9JTlZBTElEX1ZFUlNJT05fQVJCKQBXSU4zMl9XR0xfT1BFTkdMX1BST0ZJTEVfTk9UX1NVUFBPUlRFRDogcmVxdWVzdGVkIE9wZW5HTCBwcm9maWxlIG5vdCBzdXBwb3J0IGJ5IEdMIGRyaXZlciAoRVJST1JfSU5WQUxJRF9QUk9GSUxFX0FSQikAVkFMSURBVEVfU0hBREVSREVTQ19BVFRSX1NUUklOR19UT09fTE9ORzogdmVydGV4IGF0dHJpYnV0ZSBuYW1lL3NlbWFudGljIHN0cmluZyB0b28gbG9uZyAobWF4IGxlbiAxNikAX3NnX211bHRpcGxlX3U2NCgodWludDY0X3Qpc3RhcnRfcG9zLCA0KQBWQUxJREFURV9CVUZGRVJERVNDX1NUT1JBR0VCVUZGRVJfU1VQUE9SVEVEOiBzdG9yYWdlIGJ1ZmZlcnMgbm90IHN1cHBvcnRlZCBieSB0aGUgYmFja2VuZCAzRCBBUEkgKHJlcXVpcmVzIE9wZW5HTCA+PSA0LjMpAExJTlVYX0dMWF9WRVJTSU9OX1RPT19MT1c6IEdMWCB2ZXJzaW9uIHRvbyBsb3cgKG5lZWQgYXQgbGVhc3QgMS4zKQBEM0QxMV9DUkVBVEVfQ09OU1RBTlRfQlVGRkVSX0ZBSUxFRDogQ3JlYXRlQnVmZmVyKCkgZmFpbGVkIGZvciB1bmlmb3JtIGNvbnN0YW50IGJ1ZmZlciAoZDNkMTEpAEQzRDExX01BUF9GT1JfQVBQRU5EX0JVRkZFUl9GQUlMRUQ6IE1hcCgpIGZhaWxlZCB3aGVuIGFwcGVuZGluZyB0byBidWZmZXIgKGQzZDExKQBEM0QxMV9NQVBfRk9SX1VQREFURV9CVUZGRVJfRkFJTEVEOiBNYXAoKSBmYWlsZWQgd2hlbiB1cGRhdGluZyBidWZmZXIgKGQzZDExKQBEM0QxMV9DUkVBVEVfQlVGRkVSX1NSVl9GQUlMRUQ6IENyZWF0ZVNoYWRlclJlc291cmNlVmlldygpIGZhaWxlZCBmb3Igc3RvcmFnZSBidWZmZXIgKGQzZDExKQBEM0QxMV9DUkVBVEVfMkRfVEVYVFVSRV9VTlNVUFBPUlRFRF9QSVhFTF9GT1JNQVQ6IHBpeGVsIGZvcm1hdCBub3Qgc3VwcG9ydGVkIGZvciAyZC0sIGN1YmUtIG9yIGFycmF5LXRleHR1cmUgKGQzZDExKQBEM0QxMV9DUkVBVEVfMkRfU1JWX0ZBSUxFRDogQ3JlYXRlU2hhZGVyUmVzb3VyY2VWaWV3KCkgZmFpbGVkIGZvciAyZC0sIGN1YmUtIG9yIGFycmF5LXRleHR1cmUgKGQzZDExKQBEM0QxMV9DUkVBVEVfMkRfVEVYVFVSRV9GQUlMRUQ6IENyZWF0ZVRleHR1cmUyRCgpIGZhaWxlZCBmb3IgMmQtLCBjdWJlLSBvciBhcnJheS10ZXh0dXJlIChkM2QxMSkARDNEMTFfQ1JFQVRFX01TQUFfVEVYVFVSRV9GQUlMRUQ6IENyZWF0ZVRleHR1cmUyRCgpIGZhaWxlZCBmb3IgTVNBQSByZW5kZXIgdGFyZ2V0IHRleHR1cmUgKGQzZDExKQBEM0QxMV9DUkVBVEVfREVQVEhfVEVYVFVSRV9VTlNVUFBPUlRFRF9QSVhFTF9GT1JNQVQ6IHBpeGVsIGZvcm1hdCBub3Qgc3VwcG9ydGVkIGZvciBkZXB0aC1zdGVuY2lsIHRleHR1cmUgKGQzZDExKQBEM0QxMV9DUkVBVEVfREVQVEhfVEVYVFVSRV9GQUlMRUQ6IENyZWF0ZVRleHR1cmUyRCgpIGZhaWxlZCBmb3IgZGVwdGgtc3RlbmNpbCB0ZXh0dXJlIChkM2QxMSkARDNEMTFfQ1JFQVRFXzNEX1NSVl9GQUlMRUQ6IENyZWF0ZVNoYWRlclJlc291cmNlVmlldygpIGZhaWxlZCBmb3IgM2QgdGV4dHVyZSAoZDNkMTEpAEQzRDExX0NSRUFURV8zRF9URVhUVVJFX1VOU1VQUE9SVEVEX1BJWEVMX0ZPUk1BVDogcGl4ZWwgZm9ybWF0IG5vdCBzdXBwb3J0ZWQgZm9yIDNEIHRleHR1cmUgKGQzZDExKQBEM0QxMV9NQVBfRk9SX1VQREFURV9JTUFHRV9GQUlMRUQ6IE1hcCgpIGZhaWxlZCB3aGVuIHVwZGF0aW5nIGltYWdlIChkM2QxMSkARDNEMTFfU0hBREVSX0NPTVBJTEFUSU9OX0ZBSUxFRDogc2hhZGVyIGNvbXBpbGF0aW9uIGZhaWxlZCAoZDNkMTEpAEQzRDExX0xPQURfRDNEQ09NUElMRVJfNDdfRExMX0ZBSUxFRDogbG9hZGluZyBkM2Rjb21waWxlcl80Ny5kbGwgZmFpbGVkIChkM2QxMSkARDNEMTFfQ1JFQVRFX1JUVl9GQUlMRUQ6IENyZWF0ZVJlbmRlclRhcmdldFZpZXcoKSBmYWlsZWQgKGQzZDExKQBEM0QxMV9DUkVBVEVfRFNWX0ZBSUxFRDogQ3JlYXRlRGVwdGhTdGVuY2lsVmlldygpIGZhaWxlZCAoZDNkMTEpAEQzRDExX0NSRUFURV9JTlBVVF9MQVlPVVRfRkFJTEVEOiBDcmVhdGVJbnB1dExheW91dCgpIGZhaWxlZCAoZDNkMTEpAEQzRDExX0NSRUFURV9CVUZGRVJfRkFJTEVEOiBDcmVhdGVCdWZmZXIoKSBmYWlsZWQgKGQzZDExKQBEM0QxMV9DUkVBVEVfUkFTVEVSSVpFUl9TVEFURV9GQUlMRUQ6IENyZWF0ZVJhc3Rlcml6ZXJTdGF0ZSgpIGZhaWxlZCAoZDNkMTEpAEQzRDExX0NSRUFURV9TQU1QTEVSX1NUQVRFX0ZBSUxFRDogQ3JlYXRlU2FtcGxlclN0YXRlKCkgZmFpbGVkIChkM2QxMSkARDNEMTFfQ1JFQVRFX0RFUFRIX1NURU5DSUxfU1RBVEVfRkFJTEVEOiBDcmVhdGVEZXB0aFN0ZW5jaWxTdGF0ZSgpIGZhaWxlZCAoZDNkMTEpAEQzRDExX0NSRUFURV9CTEVORF9TVEFURV9GQUlMRUQ6IENyZWF0ZUJsZW5kU3RhdGUoKSBmYWlsZWQgKGQzZDExKQBEM0QxMV9DUkVBVEVfM0RfVEVYVFVSRV9GQUlMRUQ6IENyZWF0ZVRleHR1cmUzRCgpIGZhaWxlZCAoZDNkMTEpAE1BQ09TX0lOVkFMSURfTlNPUEVOR0xfUFJPRklMRTogbWFjb3M6IGludmFsaWQgTlNPcGVuR0xQcm9maWxlICh2YWxpZCBjaG9pY2VzIGFyZSAxLjAgYW5kIDQuMSkAcG9vbC0+cXVldWVfdG9wIDw9IChwb29sLT5zaXplLTEpAHBvb2wgJiYgKG51bSA+PSAxKQAoYmluZGluZ3MtPl9zdGFydF9jYW5hcnkgPT0gMCkgJiYgKGJpbmRpbmdzLT5fZW5kX2NhbmFyeT09MCkAKF9zYXBwLmZyYW1lYnVmZmVyX3dpZHRoID4gMCkgJiYgKF9zYXBwLmZyYW1lYnVmZmVyX2hlaWdodCA+IDApAHNyYyAmJiBkc3QgJiYgKG1heF9sZW4gPiAwKQBidWYgJiYgZGF0YSAmJiBkYXRhLT5wdHIgJiYgKGRhdGEtPnNpemUgPiAwKQBwdHIgJiYgKHNpemUgPiAwKQAocGFzcy0+X3N0YXJ0X2NhbmFyeSA9PSAwKSAmJiAocGFzcy0+X2VuZF9jYW5hcnkgPT0gMCkAKGRlc2MtPl9zdGFydF9jYW5hcnkgPT0gMCkgJiYgKGRlc2MtPl9lbmRfY2FuYXJ5ID09IDApAChhbGlnbiA+IDApICYmICgoYWxpZ24gJiAoYWxpZ24gLSAxKSkgPT0gMCkAKHNsb3RfaW5kZXggPj0gMCkgJiYgKHNsb3RfaW5kZXggPCAoU0dfTUFYX1NIQURFUlNUQUdFX0lNQUdFU0FNUExFUlBBSVJTICogU0dfTlVNX1NIQURFUl9TVEFHRVMpKQBzbXAgJiYgKChzbXAtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9WQUxJRCkgfHwgKHNtcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0ZBSUxFRCkpAHBpcCAmJiAoKHBpcC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX1ZBTElEKSB8fCAocGlwLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfRkFJTEVEKSkAaW1nICYmICgoaW1nLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfVkFMSUQpIHx8IChpbWctPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9GQUlMRUQpKQBidWYgJiYgKChidWYtPnNsb3Quc3RhdGUgPT0gU0dfUkVTT1VSQ0VTVEFURV9WQUxJRCkgfHwgKGJ1Zi0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX0ZBSUxFRCkpAHNoZCAmJiAoKHNoZC0+c2xvdC5zdGF0ZSA9PSBTR19SRVNPVVJDRVNUQVRFX1ZBTElEKSB8fCAoc2hkLT5zbG90LnN0YXRlID09IFNHX1JFU09VUkNFU1RBVEVfRkFJTEVEKSkAQU5EUk9JRF9OQVRJVkVfQUNUSVZJVFlfT05TVEFSVDogTmF0aXZlQWN0aXZpdHkgb25TdGFydCgpAEFORFJPSURfTkFUSVZFX0FDVElWSVRZX09OU1RPUDogTmF0aXZlQWN0aXZpdHkgb25TdG9wKCkAVkFMSURBVEVfQVVCX05PX1BJUEVMSU5FOiBzZ19hcHBseV91bmlmb3JtczogbXVzdCBiZSBjYWxsZWQgYWZ0ZXIgc2dfYXBwbHlfcGlwZWxpbmUoKQBBTkRST0lEX1VOU1VQUE9SVEVEX0lOUFVUX0VWRU5UX0lOUFVUX0NCOiB1bnN1cHBvcnRlZCBpbnB1dCBldmVudCBlbmNvdW50ZXJlZCBpbiBfc2FwcF9hbmRyb2lkX2lucHV0X2NiKCkAQU5EUk9JRF9SRUFEX01TR19GQUlMRUQ6IGZhaWxlZCB0byByZWFkIG1lc3NhZ2UgaW4gX3NhcHBfYW5kcm9pZF9tYWluX2NiKCkAQU5EUk9JRF9VTlNVUFBPUlRFRF9JTlBVVF9FVkVOVF9NQUlOX0NCOiB1bnN1cHBvcnRlZCBpbnB1dCBldmVudCBlbmNvdW50ZXJlZCBpbiBfc2FwcF9hbmRyb2lkX21haW5fY2IoKQBXR1BVX1JFUVVFU1RfQURBUFRFUl9TVEFUVVNfRVJST1I6IHdncHU6IHJlcXVlc3RpbmcgYWRhcHRlciBmYWlsZWQgd2l0aCBzdGF0dXMgJ2Vycm9yJwBXR1BVX1JFUVVFU1RfREVWSUNFX1NUQVRVU19FUlJPUjogd2dwdTogcmVxdWVzdGluZyBkZXZpY2UgZmFpbGVkIHdpdGggc3RhdHVzICdlcnJvcicAV0dQVV9SRVFVRVNUX0FEQVBURVJfU1RBVFVTX1VOS05PV046IHdncHU6IHJlcXVlc3RpbmcgYWRhcHRlciBmYWlsZWQgd2l0aCBzdGF0dXMgJ3Vua25vd24nAFdHUFVfUkVRVUVTVF9ERVZJQ0VfU1RBVFVTX1VOS05PV046IHdncHU6IHJlcXVlc3RpbmcgZGV2aWNlIGZhaWxlZCB3aXRoIHN0YXR1cyAndW5rbm93bicAV0dQVV9SRVFVRVNUX0FEQVBURVJfU1RBVFVTX1VOQVZBSUxBQkxFOiB3Z3B1OiByZXF1ZXN0aW5nIGFkYXB0ZXIgZmFpbGVkIHdpdGggJ3VuYXZhaWxhYmxlJwBMSU5VWF9YMTFfRFJPUFBFRF9GSUxFX1VSSV9XUk9OR19TQ0hFTUU6IGRyb3BwZWQgZmlsZSBVUkwgZG9lc24ndCBzdGFydCB3aXRoICdmaWxlOi8vJwBoZWxsbyEAXSAATUVUQUxfQ1JFQVRFX1JQU19PVVRQVVQ6IABNRVRBTF9TSEFERVJfQ09NUElMQVRJT05fT1VUUFVUOiAARDNEMTFfU0hBREVSX0NPTVBJTEFUSU9OX09VVFBVVDogADowOiAAaG9zdDogdGVzdF9zdHJ1Y3RfaW4gLSAldXgldQoAaG9zdDogdGVzdF9ieXRlc19pbiAoJXUpIC0gJXUgJXUgJXUgJXUKAEZhaWxlZCB0byBjcmVhdGUgZ3JhcGhpY3MgY29udGV4dDogJXMKAGhvc3Q6IHRlc3Rfc3RyaW5nX2luIC0gJXMKAEFCT1JUSU5HIGJlY2F1c2Ugb2YgW3BhbmljXQoARmFpbGVkIHRvIGNyZWF0ZSBncmFwaGljcyBjb250ZXh0IQoACgoACgkAAAECAwAAyAAAAGQAAAAAAIA/AAAAAAAAAAAAAAAAAACAPwAAAAD/////AACAvwAAgL8AAIA/AACAvwAAgD8AAIA/AACAvwAAgD8AAIC/AACAvwAAgD8AAIA///9/f///f3///3////9//wAAAAAAAIA/AACAPwAAgD8AAIA/AAAAAAAAAAAAAAAA//9/f///f3///3////9//yN2ZXJzaW9uIDQxMAoKbGF5b3V0KGxvY2F0aW9uID0gMCkgaW4gdmVjNCBjb29yZDsKbGF5b3V0KGxvY2F0aW9uID0gMCkgb3V0IHZlYzIgdGV4VVY7CmxheW91dChsb2NhdGlvbiA9IDEpIG91dCB2ZWM0IGlDb2xvcjsKbGF5b3V0KGxvY2F0aW9uID0gMSkgaW4gdmVjNCBjb2xvcjsKCnZvaWQgbWFpbigpCnsKICAgIGdsX1Bvc2l0aW9uID0gdmVjNChjb29yZC54eSwgMC4wLCAxLjApOwogICAgdGV4VVYgPSBjb29yZC56dzsKICAgIGlDb2xvciA9IGNvbG9yOwp9CgoAAAAAAAAAI3ZlcnNpb24gNDEwCgp1bmlmb3JtIHNhbXBsZXIyRCBpVGV4Q2hhbm5lbDBfaVNtcENoYW5uZWwwOwoKbGF5b3V0KGxvY2F0aW9uID0gMCkgb3V0IHZlYzQgZnJhZ0NvbG9yOwpsYXlvdXQobG9jYXRpb24gPSAwKSBpbiB2ZWMyIHRleFVWOwpsYXlvdXQobG9jYXRpb24gPSAxKSBpbiB2ZWM0IGlDb2xvcjsKCnZvaWQgbWFpbigpCnsKICAgIGZyYWdDb2xvciA9IHRleHR1cmUoaVRleENoYW5uZWwwX2lTbXBDaGFubmVsMCwgdGV4VVYpICogaUNvbG9yOwp9CgoAAAAAAAAAAAAAAAAjdmVyc2lvbiAzMDAgZXMKCmxheW91dChsb2NhdGlvbiA9IDApIGluIHZlYzQgY29vcmQ7Cm91dCB2ZWMyIHRleFVWOwpvdXQgdmVjNCBpQ29sb3I7CmxheW91dChsb2NhdGlvbiA9IDEpIGluIHZlYzQgY29sb3I7Cgp2b2lkIG1haW4oKQp7CiAgICBnbF9Qb3NpdGlvbiA9IHZlYzQoY29vcmQueHksIDAuMCwgMS4wKTsKICAgIHRleFVWID0gY29vcmQuenc7CiAgICBpQ29sb3IgPSBjb2xvcjsKfQoKAAAAAAAAAAAAAAAAAAAjdmVyc2lvbiAzMDAgZXMKcHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7CnByZWNpc2lvbiBoaWdocCBpbnQ7Cgp1bmlmb3JtIGhpZ2hwIHNhbXBsZXIyRCBpVGV4Q2hhbm5lbDBfaVNtcENoYW5uZWwwOwoKbGF5b3V0KGxvY2F0aW9uID0gMCkgb3V0IGhpZ2hwIHZlYzQgZnJhZ0NvbG9yOwppbiBoaWdocCB2ZWMyIHRleFVWOwppbiBoaWdocCB2ZWM0IGlDb2xvcjsKCnZvaWQgbWFpbigpCnsKICAgIGZyYWdDb2xvciA9IHRleHR1cmUoaVRleENoYW5uZWwwX2lTbXBDaGFubmVsMCwgdGV4VVYpICogaUNvbG9yOwp9CgoAAAAAAAAAAAAAAAAAc3RhdGljIGZsb2F0NCBnbF9Qb3NpdGlvbjsKc3RhdGljIGZsb2F0NCBjb29yZDsKc3RhdGljIGZsb2F0MiB0ZXhVVjsKc3RhdGljIGZsb2F0NCBpQ29sb3I7CnN0YXRpYyBmbG9hdDQgY29sb3I7CgpzdHJ1Y3QgU1BJUlZfQ3Jvc3NfSW5wdXQKewogICAgZmxvYXQ0IGNvb3JkIDogVEVYQ09PUkQwOwogICAgZmxvYXQ0IGNvbG9yIDogVEVYQ09PUkQxOwp9OwoKc3RydWN0IFNQSVJWX0Nyb3NzX091dHB1dAp7CiAgICBmbG9hdDIgdGV4VVYgOiBURVhDT09SRDA7CiAgICBmbG9hdDQgaUNvbG9yIDogVEVYQ09PUkQxOwogICAgZmxvYXQ0IGdsX1Bvc2l0aW9uIDogU1ZfUG9zaXRpb247Cn07Cgp2b2lkIHZlcnRfbWFpbigpCnsKICAgIGdsX1Bvc2l0aW9uID0gZmxvYXQ0KGNvb3JkLnh5LCAwLjBmLCAxLjBmKTsKICAgIHRleFVWID0gY29vcmQuenc7CiAgICBpQ29sb3IgPSBjb2xvcjsKfQoKU1BJUlZfQ3Jvc3NfT3V0cHV0IG1haW4oU1BJUlZfQ3Jvc3NfSW5wdXQgc3RhZ2VfaW5wdXQpCnsKICAgIGNvb3JkID0gc3RhZ2VfaW5wdXQuY29vcmQ7CiAgICBjb2xvciA9IHN0YWdlX2lucHV0LmNvbG9yOwogICAgdmVydF9tYWluKCk7CiAgICBTUElSVl9Dcm9zc19PdXRwdXQgc3RhZ2Vfb3V0cHV0OwogICAgc3RhZ2Vfb3V0cHV0LmdsX1Bvc2l0aW9uID0gZ2xfUG9zaXRpb247CiAgICBzdGFnZV9vdXRwdXQudGV4VVYgPSB0ZXhVVjsKICAgIHN0YWdlX291dHB1dC5pQ29sb3IgPSBpQ29sb3I7CiAgICByZXR1cm4gc3RhZ2Vfb3V0cHV0Owp9CgAAAAAAAAAAAAAAVGV4dHVyZTJEPGZsb2F0ND4gaVRleENoYW5uZWwwIDogcmVnaXN0ZXIodDApOwpTYW1wbGVyU3RhdGUgaVNtcENoYW5uZWwwIDogcmVnaXN0ZXIoczApOwoKc3RhdGljIGZsb2F0NCBmcmFnQ29sb3I7CnN0YXRpYyBmbG9hdDIgdGV4VVY7CnN0YXRpYyBmbG9hdDQgaUNvbG9yOwoKc3RydWN0IFNQSVJWX0Nyb3NzX0lucHV0CnsKICAgIGZsb2F0MiB0ZXhVViA6IFRFWENPT1JEMDsKICAgIGZsb2F0NCBpQ29sb3IgOiBURVhDT09SRDE7Cn07CgpzdHJ1Y3QgU1BJUlZfQ3Jvc3NfT3V0cHV0CnsKICAgIGZsb2F0NCBmcmFnQ29sb3IgOiBTVl9UYXJnZXQwOwp9OwoKdm9pZCBmcmFnX21haW4oKQp7CiAgICBmcmFnQ29sb3IgPSBpVGV4Q2hhbm5lbDAuU2FtcGxlKGlTbXBDaGFubmVsMCwgdGV4VVYpICogaUNvbG9yOwp9CgpTUElSVl9Dcm9zc19PdXRwdXQgbWFpbihTUElSVl9Dcm9zc19JbnB1dCBzdGFnZV9pbnB1dCkKewogICAgdGV4VVYgPSBzdGFnZV9pbnB1dC50ZXhVVjsKICAgIGlDb2xvciA9IHN0YWdlX2lucHV0LmlDb2xvcjsKICAgIGZyYWdfbWFpbigpOwogICAgU1BJUlZfQ3Jvc3NfT3V0cHV0IHN0YWdlX291dHB1dDsKICAgIHN0YWdlX291dHB1dC5mcmFnQ29sb3IgPSBmcmFnQ29sb3I7CiAgICByZXR1cm4gc3RhZ2Vfb3V0cHV0Owp9CgAAAAAAAAAjaW5jbHVkZSA8bWV0YWxfc3RkbGliPgojaW5jbHVkZSA8c2ltZC9zaW1kLmg+Cgp1c2luZyBuYW1lc3BhY2UgbWV0YWw7CgpzdHJ1Y3QgbWFpbjBfb3V0CnsKICAgIGZsb2F0MiB0ZXhVViBbW3VzZXIobG9jbjApXV07CiAgICBmbG9hdDQgaUNvbG9yIFtbdXNlcihsb2NuMSldXTsKICAgIGZsb2F0NCBnbF9Qb3NpdGlvbiBbW3Bvc2l0aW9uXV07Cn07CgpzdHJ1Y3QgbWFpbjBfaW4KewogICAgZmxvYXQ0IGNvb3JkIFtbYXR0cmlidXRlKDApXV07CiAgICBmbG9hdDQgY29sb3IgW1thdHRyaWJ1dGUoMSldXTsKfTsKCnZlcnRleCBtYWluMF9vdXQgbWFpbjAobWFpbjBfaW4gaW4gW1tzdGFnZV9pbl1dKQp7CiAgICBtYWluMF9vdXQgb3V0ID0ge307CiAgICBvdXQuZ2xfUG9zaXRpb24gPSBmbG9hdDQoaW4uY29vcmQueHksIDAuMCwgMS4wKTsKICAgIG91dC50ZXhVViA9IGluLmNvb3JkLnp3OwogICAgb3V0LmlDb2xvciA9IGluLmNvbG9yOwogICAgcmV0dXJuIG91dDsKfQoKAAAAAAAAAAAAAAAAAAAAACNpbmNsdWRlIDxtZXRhbF9zdGRsaWI+CiNpbmNsdWRlIDxzaW1kL3NpbWQuaD4KCnVzaW5nIG5hbWVzcGFjZSBtZXRhbDsKCnN0cnVjdCBtYWluMF9vdXQKewogICAgZmxvYXQ0IGZyYWdDb2xvciBbW2NvbG9yKDApXV07Cn07CgpzdHJ1Y3QgbWFpbjBfaW4KewogICAgZmxvYXQyIHRleFVWIFtbdXNlcihsb2NuMCldXTsKICAgIGZsb2F0NCBpQ29sb3IgW1t1c2VyKGxvY24xKV1dOwp9OwoKZnJhZ21lbnQgbWFpbjBfb3V0IG1haW4wKG1haW4wX2luIGluIFtbc3RhZ2VfaW5dXSwgdGV4dHVyZTJkPGZsb2F0PiBpVGV4Q2hhbm5lbDAgW1t0ZXh0dXJlKDApXV0sIHNhbXBsZXIgaVNtcENoYW5uZWwwIFtbc2FtcGxlcigwKV1dKQp7CiAgICBtYWluMF9vdXQgb3V0ID0ge307CiAgICBvdXQuZnJhZ0NvbG9yID0gaVRleENoYW5uZWwwLnNhbXBsZShpU21wQ2hhbm5lbDAsIGluLnRleFVWKSAqIGluLmlDb2xvcjsKICAgIHJldHVybiBvdXQ7Cn0KCgAAACNpbmNsdWRlIDxtZXRhbF9zdGRsaWI+CiNpbmNsdWRlIDxzaW1kL3NpbWQuaD4KCnVzaW5nIG5hbWVzcGFjZSBtZXRhbDsKCnN0cnVjdCBtYWluMF9vdXQKewogICAgZmxvYXQyIHRleFVWIFtbdXNlcihsb2NuMCldXTsKICAgIGZsb2F0NCBpQ29sb3IgW1t1c2VyKGxvY24xKV1dOwogICAgZmxvYXQ0IGdsX1Bvc2l0aW9uIFtbcG9zaXRpb25dXTsKfTsKCnN0cnVjdCBtYWluMF9pbgp7CiAgICBmbG9hdDQgY29vcmQgW1thdHRyaWJ1dGUoMCldXTsKICAgIGZsb2F0NCBjb2xvciBbW2F0dHJpYnV0ZSgxKV1dOwp9OwoKdmVydGV4IG1haW4wX291dCBtYWluMChtYWluMF9pbiBpbiBbW3N0YWdlX2luXV0pCnsKICAgIG1haW4wX291dCBvdXQgPSB7fTsKICAgIG91dC5nbF9Qb3NpdGlvbiA9IGZsb2F0NChpbi5jb29yZC54eSwgMC4wLCAxLjApOwogICAgb3V0LnRleFVWID0gaW4uY29vcmQuenc7CiAgICBvdXQuaUNvbG9yID0gaW4uY29sb3I7CiAgICByZXR1cm4gb3V0Owp9CgoAAAAAAAAAAAAAAAAAAAAAI2luY2x1ZGUgPG1ldGFsX3N0ZGxpYj4KI2luY2x1ZGUgPHNpbWQvc2ltZC5oPgoKdXNpbmcgbmFtZXNwYWNlIG1ldGFsOwoKc3RydWN0IG1haW4wX291dAp7CiAgICBmbG9hdDQgZnJhZ0NvbG9yIFtbY29sb3IoMCldXTsKfTsKCnN0cnVjdCBtYWluMF9pbgp7CiAgICBmbG9hdDIgdGV4VVYgW1t1c2VyKGxvY24wKV1dOwogICAgZmxvYXQ0IGlDb2xvciBbW3VzZXIobG9jbjEpXV07Cn07CgpmcmFnbWVudCBtYWluMF9vdXQgbWFpbjAobWFpbjBfaW4gaW4gW1tzdGFnZV9pbl1dLCB0ZXh0dXJlMmQ8ZmxvYXQ+IGlUZXhDaGFubmVsMCBbW3RleHR1cmUoMCldXSwgc2FtcGxlciBpU21wQ2hhbm5lbDAgW1tzYW1wbGVyKDApXV0pCnsKICAgIG1haW4wX291dCBvdXQgPSB7fTsKICAgIG91dC5mcmFnQ29sb3IgPSBpVGV4Q2hhbm5lbDAuc2FtcGxlKGlTbXBDaGFubmVsMCwgaW4udGV4VVYpICogaW4uaUNvbG9yOwogICAgcmV0dXJuIG91dDsKfQoKAAAAZGlhZ25vc3RpYyhvZmYsIGRlcml2YXRpdmVfdW5pZm9ybWl0eSk7Cgp2YXI8cHJpdmF0ZT4gY29vcmQgOiB2ZWM0ZjsKCnZhcjxwcml2YXRlPiB0ZXhVViA6IHZlYzJmOwoKdmFyPHByaXZhdGU+IGlDb2xvciA6IHZlYzRmOwoKdmFyPHByaXZhdGU+IGNvbG9yIDogdmVjNGY7Cgp2YXI8cHJpdmF0ZT4gZ2xfUG9zaXRpb24gOiB2ZWM0ZjsKCmZuIG1haW5fMSgpIHsKICBsZXQgeF8xOSA6IHZlYzRmID0gY29vcmQ7CiAgbGV0IHhfMjAgOiB2ZWMyZiA9IHZlYzJmKHhfMTkueCwgeF8xOS55KTsKICBnbF9Qb3NpdGlvbiA9IHZlYzRmKHhfMjAueCwgeF8yMC55LCAwLjBmLCAxLjBmKTsKICBsZXQgeF8zMCA6IHZlYzRmID0gY29vcmQ7CiAgdGV4VVYgPSB2ZWMyZih4XzMwLnosIHhfMzAudyk7CiAgbGV0IHhfMzQgOiB2ZWM0ZiA9IGNvbG9yOwogIGlDb2xvciA9IHhfMzQ7CiAgcmV0dXJuOwp9CgpzdHJ1Y3QgbWFpbl9vdXQgewogIEBidWlsdGluKHBvc2l0aW9uKQogIGdsX1Bvc2l0aW9uIDogdmVjNGYsCiAgQGxvY2F0aW9uKDApCiAgdGV4VVZfMSA6IHZlYzJmLAogIEBsb2NhdGlvbigxKQogIGlDb2xvcl8xIDogdmVjNGYsCn0KCkB2ZXJ0ZXgKZm4gbWFpbihAbG9jYXRpb24oMCkgY29vcmRfcGFyYW0gOiB2ZWM0ZiwgQGxvY2F0aW9uKDEpIGNvbG9yX3BhcmFtIDogdmVjNGYpIC0+IG1haW5fb3V0IHsKICBjb29yZCA9IGNvb3JkX3BhcmFtOwogIGNvbG9yID0gY29sb3JfcGFyYW07CiAgbWFpbl8xKCk7CiAgcmV0dXJuIG1haW5fb3V0KGdsX1Bvc2l0aW9uLCB0ZXhVViwgaUNvbG9yKTsKfQoKAAAAAAAAAAAAAABkaWFnbm9zdGljKG9mZiwgZGVyaXZhdGl2ZV91bmlmb3JtaXR5KTsKCnZhcjxwcml2YXRlPiBmcmFnQ29sb3IgOiB2ZWM0ZjsKCkBncm91cCgxKSBAYmluZGluZyg0OCkgdmFyIGlUZXhDaGFubmVsMCA6IHRleHR1cmVfMmQ8ZjMyPjsKCkBncm91cCgxKSBAYmluZGluZyg2NCkgdmFyIGlTbXBDaGFubmVsMCA6IHNhbXBsZXI7Cgp2YXI8cHJpdmF0ZT4gdGV4VVYgOiB2ZWMyZjsKCnZhcjxwcml2YXRlPiBpQ29sb3IgOiB2ZWM0ZjsKCmZuIG1haW5fMSgpIHsKICBsZXQgeF8yMyA6IHZlYzJmID0gdGV4VVY7CiAgbGV0IHhfMjQgOiB2ZWM0ZiA9IHRleHR1cmVTYW1wbGUoaVRleENoYW5uZWwwLCBpU21wQ2hhbm5lbDAsIHhfMjMpOwogIGxldCB4XzI3IDogdmVjNGYgPSBpQ29sb3I7CiAgZnJhZ0NvbG9yID0gKHhfMjQgKiB4XzI3KTsKICByZXR1cm47Cn0KCnN0cnVjdCBtYWluX291dCB7CiAgQGxvY2F0aW9uKDApCiAgZnJhZ0NvbG9yXzEgOiB2ZWM0ZiwKfQoKQGZyYWdtZW50CmZuIG1haW4oQGxvY2F0aW9uKDApIHRleFVWX3BhcmFtIDogdmVjMmYsIEBsb2NhdGlvbigxKSBpQ29sb3JfcGFyYW0gOiB2ZWM0ZikgLT4gbWFpbl9vdXQgewogIHRleFVWID0gdGV4VVZfcGFyYW07CiAgaUNvbG9yID0gaUNvbG9yX3BhcmFtOwogIG1haW5fMSgpOwogIHJldHVybiBtYWluX291dChmcmFnQ29sb3IpOwp9CgoAAAD//39///9/f///f////3//EAAAACAAAABAAAAAAAAAAAAAAAD/cEP//6cm///uWP/U4Vf/nMxl/2a7av9CpfX/flfC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ZW1vcnkuYnVmZmVyLnNsaWNlKGNhcnRQdHIsIGNhcnRQdHIgKyBzaXplKSApOyBmb3IgKGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7IE1vZHVsZS5IRUFQVThbaG9zdFB0ciArIGldID0gbWVtW2ldOyB9IH0AKHVuc2lnbmVkIGludCBjYXJ0UHRyKTw6Oj57IGNvbnN0IE1BWF9TVFJfTEVOID0gMTAyNDsgbGV0IGxlbiA9IDA7IGNvbnN0IG1lbSA9IG5ldyBVaW50OEFycmF5KCBNb2R1bGUuY2FydC5leHBvcnRzLm1lbW9yeS5idWZmZXIuc2xpY2UoY2FydFB0ciwgY2FydFB0ciArIE1BWF9TVFJfTEVOKSApOyBmb3IgKGxlbiA9IDA7IGxlbiA8IE1BWF9TVFJfTEVOOyBsZW4rKykgeyBpZiAobWVtW2xlbl0gPT09IDApIHsgYnJlYWs7IH0gfSBpZiAobGVuID09PSBNQVhfU1RSX0xFTikgeyByZXR1cm4gLTE7IH0gcmV0dXJuIGxlbjsgfQAodm9pZCogaG9zdFB0ciwgdW5zaWduZWQgaW50IHNpemUpPDo6PnsgY29uc3QgY2FydFB0ciA9IE1vZHVsZS5jYXJ0LmV4cG9ydHMubWFsbG9jKHNpemUpOyBjb25zdCBjYXJ0Qnl0ZXMgPSBNb2R1bGUuSEVBUFU4LnNsaWNlKGhvc3RQdHIsIGhvc3RQdHIgKyBzaXplKTsgY29uc3QgbWVtID0gbmV3IFVpbnQ4QXJyYXkoTW9kdWxlLmNhcnQuZXhwb3J0cy5tZW1vcnkuYnVmZmVyKTsgbWVtLnNldChjYXJ0Qnl0ZXMsIGNhcnRQdHIpOyByZXR1cm4gY2FydFB0cjsgfQAodm9pZCk8Ojo+eyBNb2R1bGUuc29rb2xfYmVmb3JldW5sb2FkID0gKGV2ZW50KSA9PiB7IGlmIChfX3NhcHBfaHRtbDVfZ2V0X2Fza19sZWF2ZV9zaXRlKCkgIT0gMCkgeyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyBldmVudC5yZXR1cm5WYWx1ZSA9ICcgJzsgfSB9OyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgTW9kdWxlLnNva29sX2JlZm9yZXVubG9hZCk7IH0AKHZvaWQpPDo6Pnsgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsIE1vZHVsZS5zb2tvbF9iZWZvcmV1bmxvYWQpOyB9ACh2b2lkKTw6Oj57IE1vZHVsZS5zb2tvbF9wYXN0ZSA9IChldmVudCkgPT4geyBjb25zdCBwYXN0ZWRfc3RyID0gZXZlbnQuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0Jyk7IHdpdGhTdGFja1NhdmUoKCkgPT4geyBjb25zdCBjc3RyID0gc3RyaW5nVG9VVEY4T25TdGFjayhwYXN0ZWRfc3RyKTsgX19zYXBwX2Vtc2Nfb25wYXN0ZShjc3RyKTsgfSk7IH07IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwYXN0ZScsIE1vZHVsZS5zb2tvbF9wYXN0ZSk7IH0AKHZvaWQpPDo6Pnsgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Bhc3RlJywgTW9kdWxlLnNva29sX3Bhc3RlKTsgfQAoY29uc3QgY2hhciogY19zdHIpPDo6PnsgY29uc3Qgc3RyID0gVVRGOFRvU3RyaW5nKGNfc3RyKTsgY29uc3QgdGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpOyB0YS5zZXRBdHRyaWJ1dGUoJ2F1dG9jb21wbGV0ZScsICdvZmYnKTsgdGEuc2V0QXR0cmlidXRlKCdhdXRvY29ycmVjdCcsICdvZmYnKTsgdGEuc2V0QXR0cmlidXRlKCdhdXRvY2FwaXRhbGl6ZScsICdvZmYnKTsgdGEuc2V0QXR0cmlidXRlKCdzcGVsbGNoZWNrJywgJ2ZhbHNlJyk7IHRhLnN0eWxlLmxlZnQgPSAtMTAwICsgJ3B4JzsgdGEuc3R5bGUudG9wID0gLTEwMCArICdweCc7IHRhLnN0eWxlLmhlaWdodCA9IDE7IHRhLnN0eWxlLndpZHRoID0gMTsgdGEudmFsdWUgPSBzdHI7IGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGEpOyB0YS5zZWxlY3QoKTsgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTsgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0YSk7IH0AKGNvbnN0IGNoYXIqIGNhbnZhc19uYW1lX2NzdHIpPDo6PnsgTW9kdWxlLnNva29sX2Ryb3BfZmlsZXMgPSBbXTsgY29uc3QgY2FudmFzX25hbWUgPSBVVEY4VG9TdHJpbmcoY2FudmFzX25hbWVfY3N0cik7IGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNhbnZhc19uYW1lKTsgTW9kdWxlLnNva29sX2RyYWdlbnRlciA9IChldmVudCkgPT4geyBldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgZXZlbnQucHJldmVudERlZmF1bHQoKTsgfTsgTW9kdWxlLnNva29sX2RyYWdsZWF2ZSA9IChldmVudCkgPT4geyBldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgZXZlbnQucHJldmVudERlZmF1bHQoKTsgfTsgTW9kdWxlLnNva29sX2RyYWdvdmVyID0gKGV2ZW50KSA9PiB7IGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyB9OyBNb2R1bGUuc29rb2xfZHJvcCA9IChldmVudCkgPT4geyBldmVudC5zdG9wUHJvcGFnYXRpb24oKTsgZXZlbnQucHJldmVudERlZmF1bHQoKTsgY29uc3QgZmlsZXMgPSBldmVudC5kYXRhVHJhbnNmZXIuZmlsZXM7IE1vZHVsZS5zb2tvbF9kcm9wcGVkX2ZpbGVzID0gZmlsZXM7IF9fc2FwcF9lbXNjX2JlZ2luX2Ryb3AoZmlsZXMubGVuZ3RoKTsgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWxlcy5sZW5ndGg7IGkrKykgeyB3aXRoU3RhY2tTYXZlKCgpID0+IHsgY29uc3QgY3N0ciA9IHN0cmluZ1RvVVRGOE9uU3RhY2soZmlsZXNbaV0ubmFtZSk7IF9fc2FwcF9lbXNjX2Ryb3AoaSwgY3N0cik7IH0pOyB9IGxldCBtb2RzID0gMDsgaWYgKGV2ZW50LnNoaWZ0S2V5KSB7IG1vZHMgfD0gMTsgfSBpZiAoZXZlbnQuY3RybEtleSkgeyBtb2RzIHw9IDI7IH0gaWYgKGV2ZW50LmFsdEtleSkgeyBtb2RzIHw9IDQ7IH0gaWYgKGV2ZW50Lm1ldGFLZXkpIHsgbW9kcyB8PSA4OyB9IF9fc2FwcF9lbXNjX2VuZF9kcm9wKGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFksIG1vZHMpOyB9OyBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VudGVyJywgTW9kdWxlLnNva29sX2RyYWdlbnRlciwgZmFsc2UpOyBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2xlYXZlJywgTW9kdWxlLnNva29sX2RyYWdsZWF2ZSwgZmFsc2UpOyBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBNb2R1bGUuc29rb2xfZHJhZ292ZXIsIGZhbHNlKTsgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBNb2R1bGUuc29rb2xfZHJvcCwgZmFsc2UpOyB9AChpbnQgaW5kZXgpPDo6PnsgLyoqIEBzdXBwcmVzcyB7bWlzc2luZ1Byb3BlcnRpZXN9ICovIGNvbnN0IGZpbGVzID0gTW9kdWxlLnNva29sX2Ryb3BwZWRfZmlsZXM7IGlmICgoaW5kZXggPCAwKSB8fCAoaW5kZXggPj0gZmlsZXMubGVuZ3RoKSkgeyByZXR1cm4gMDsgfSBlbHNlIHsgcmV0dXJuIGZpbGVzW2luZGV4XS5zaXplOyB9IH0AKGludCBpbmRleCwgX3NhcHBfaHRtbDVfZmV0Y2hfY2FsbGJhY2sgY2FsbGJhY2ssIHZvaWQqIGJ1Zl9wdHIsIHVpbnQzMl90IGJ1Zl9zaXplLCB2b2lkKiB1c2VyX2RhdGEpPDo6PnsgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTsgcmVhZGVyLm9ubG9hZCA9IChsb2FkRXZlbnQpID0+IHsgY29uc3QgY29udGVudCA9IGxvYWRFdmVudC50YXJnZXQucmVzdWx0OyBpZiAoY29udGVudC5ieXRlTGVuZ3RoID4gYnVmX3NpemUpIHsgX19zYXBwX2Vtc2NfaW52b2tlX2ZldGNoX2NiKGluZGV4LCAwLCAxLCBjYWxsYmFjaywgMCwgYnVmX3B0ciwgYnVmX3NpemUsIHVzZXJfZGF0YSk7IH0gZWxzZSB7IEhFQVBVOC5zZXQobmV3IFVpbnQ4QXJyYXkoY29udGVudCksIGJ1Zl9wdHIpOyBfX3NhcHBfZW1zY19pbnZva2VfZmV0Y2hfY2IoaW5kZXgsIDEsIDAsIGNhbGxiYWNrLCBjb250ZW50LmJ5dGVMZW5ndGgsIGJ1Zl9wdHIsIGJ1Zl9zaXplLCB1c2VyX2RhdGEpOyB9IH07IHJlYWRlci5vbmVycm9yID0gKCkgPT4geyBfX3NhcHBfZW1zY19pbnZva2VfZmV0Y2hfY2IoaW5kZXgsIDAsIDIsIGNhbGxiYWNrLCAwLCBidWZfcHRyLCBidWZfc2l6ZSwgdXNlcl9kYXRhKTsgfTsgLyoqIEBzdXBwcmVzcyB7bWlzc2luZ1Byb3BlcnRpZXN9ICovIGNvbnN0IGZpbGVzID0gTW9kdWxlLnNva29sX2Ryb3BwZWRfZmlsZXM7IHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihmaWxlc1tpbmRleF0pOyB9AChjb25zdCBjaGFyKiBjYW52YXNfbmFtZV9jc3RyKTw6Oj57IGNvbnN0IGNhbnZhc19uYW1lID0gVVRGOFRvU3RyaW5nKGNhbnZhc19uYW1lX2NzdHIpOyBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjYW52YXNfbmFtZSk7IGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdkcmFnZW50ZXInLCBNb2R1bGUuc29rb2xfZHJhZ2VudGVyKTsgY2FudmFzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIE1vZHVsZS5zb2tvbF9kcmFnbGVhdmUpOyBjYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCBNb2R1bGUuc29rb2xfZHJhZ292ZXIpOyBjYW52YXMucmVtb3ZlRXZlbnRMaXN0ZW5lcignZHJvcCcsIE1vZHVsZS5zb2tvbF9kcm9wKTsgfQAoY29uc3QgY2hhciogY19zdHJfdGFyZ2V0KTw6Oj57IGNvbnN0IHRhcmdldF9zdHIgPSBVVEY4VG9TdHJpbmcoY19zdHJfdGFyZ2V0KTsgTW9kdWxlLnNhcHBfZW1zY190YXJnZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRfc3RyKTsgaWYgKCFNb2R1bGUuc2FwcF9lbXNjX3RhcmdldCkgeyBjb25zb2xlLmxvZygic29rb2xfYXBwLmg6IGludmFsaWQgdGFyZ2V0OiIgKyB0YXJnZXRfc3RyKTsgfSBpZiAoIU1vZHVsZS5zYXBwX2Vtc2NfdGFyZ2V0LnJlcXVlc3RQb2ludGVyTG9jaykgeyBjb25zb2xlLmxvZygic29rb2xfYXBwLmg6IHRhcmdldCBkb2Vzbid0IHN1cHBvcnQgcmVxdWVzdFBvaW50ZXJMb2NrOiIgKyB0YXJnZXRfc3RyKTsgfSB9ACh2b2lkKTw6Oj57IGlmIChNb2R1bGUuc2FwcF9lbXNjX3RhcmdldCkgeyBpZiAoTW9kdWxlLnNhcHBfZW1zY190YXJnZXQucmVxdWVzdFBvaW50ZXJMb2NrKSB7IE1vZHVsZS5zYXBwX2Vtc2NfdGFyZ2V0LnJlcXVlc3RQb2ludGVyTG9jaygpOyB9IH0gfQAodm9pZCk8Ojo+eyBpZiAoZG9jdW1lbnQuZXhpdFBvaW50ZXJMb2NrKSB7IGRvY3VtZW50LmV4aXRQb2ludGVyTG9jaygpOyB9IH0AKGludCBjdXJzb3JfdHlwZSwgaW50IHNob3duKTw6Oj57IGlmIChNb2R1bGUuc2FwcF9lbXNjX3RhcmdldCkgeyBsZXQgY3Vyc29yOyBpZiAoc2hvd24gPT09IDApIHsgY3Vyc29yID0gIm5vbmUiOyB9IGVsc2Ugc3dpdGNoIChjdXJzb3JfdHlwZSkgeyBjYXNlIDA6IGN1cnNvciA9ICJhdXRvIjsgYnJlYWs7IGNhc2UgMTogY3Vyc29yID0gImRlZmF1bHQiOyBicmVhazsgY2FzZSAyOiBjdXJzb3IgPSAidGV4dCI7IGJyZWFrOyBjYXNlIDM6IGN1cnNvciA9ICJjcm9zc2hhaXIiOyBicmVhazsgY2FzZSA0OiBjdXJzb3IgPSAicG9pbnRlciI7IGJyZWFrOyBjYXNlIDU6IGN1cnNvciA9ICJldy1yZXNpemUiOyBicmVhazsgY2FzZSA2OiBjdXJzb3IgPSAibnMtcmVzaXplIjsgYnJlYWs7IGNhc2UgNzogY3Vyc29yID0gIm53c2UtcmVzaXplIjsgYnJlYWs7IGNhc2UgODogY3Vyc29yID0gIm5lc3ctcmVzaXplIjsgYnJlYWs7IGNhc2UgOTogY3Vyc29yID0gImFsbC1zY3JvbGwiOyBicmVhazsgY2FzZSAxMDogY3Vyc29yID0gIm5vdC1hbGxvd2VkIjsgYnJlYWs7IGRlZmF1bHQ6IGN1cnNvciA9ICJhdXRvIjsgYnJlYWs7IH0gTW9kdWxlLnNhcHBfZW1zY190YXJnZXQuc3R5bGUuY3Vyc29yID0gY3Vyc29yOyB9IH0AKHZvaWQpPDo6PnsgY29uc3QgbGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb2tvbC1hcHAtZmF2aWNvbicpOyBpZiAobGluaykgeyBkb2N1bWVudC5oZWFkLnJlbW92ZUNoaWxkKGxpbmspOyB9IH0AKGludCB3LCBpbnQgaCwgY29uc3QgdWludDhfdCogcGl4ZWxzKTw6Oj57IGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpOyBjYW52YXMud2lkdGggPSB3OyBjYW52YXMuaGVpZ2h0ID0gaDsgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7IGNvbnN0IGltZ19kYXRhID0gY3R4LmNyZWF0ZUltYWdlRGF0YSh3LCBoKTsgaW1nX2RhdGEuZGF0YS5zZXQoSEVBUFU4LnN1YmFycmF5KHBpeGVscywgcGl4ZWxzICsgdypoKjQpKTsgY3R4LnB1dEltYWdlRGF0YShpbWdfZGF0YSwgMCwgMCk7IGNvbnN0IG5ld19saW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpOyBuZXdfbGluay5pZCA9ICdzb2tvbC1hcHAtZmF2aWNvbic7IG5ld19saW5rLnJlbCA9ICdzaG9ydGN1dCBpY29uJzsgbmV3X2xpbmsuaHJlZiA9IGNhbnZhcy50b0RhdGFVUkwoKTsgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChuZXdfbGluayk7IH0AKHVpbnQzMl90IGxldmVsLCBjb25zdCBjaGFyKiBjX3N0cik8Ojo+eyBjb25zdCBzdHIgPSBVVEY4VG9TdHJpbmcoY19zdHIpOyBzd2l0Y2ggKGxldmVsKSB7IGNhc2UgMDogY29uc29sZS5lcnJvcihzdHIpOyBicmVhazsgY2FzZSAxOiBjb25zb2xlLmVycm9yKHN0cik7IGJyZWFrOyBjYXNlIDI6IGNvbnNvbGUud2FybihzdHIpOyBicmVhazsgZGVmYXVsdDogY29uc29sZS5pbmZvKHN0cik7IGJyZWFrOyB9IH0AAEG9owgLJCR3aXRoU3RhY2tTYXZlLCRzdHJpbmdUb1VURjhPblN0YWNrAA==';
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
