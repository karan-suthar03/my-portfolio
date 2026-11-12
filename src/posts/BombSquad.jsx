import tutorial from "../assets/posts/bombsquad/tutorial.jpg";
import coopMenu from "../assets/posts/bombsquad/coop-menu.jpg";

function H({ children }) {
  return <h2 className="text-xl font-medium tracking-tight mt-10">{children}</h2>;
}

function P({ children }) {
  return <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{children}</p>;
}

function List({ ordered = false, children }) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      className={`${ordered ? "list-decimal" : "list-disc"} pl-5 flex flex-col gap-1.5 text-neutral-700 dark:text-neutral-300 leading-relaxed marker:text-neutral-400 dark:marker:text-neutral-500`}
    >
      {children}
    </Tag>
  );
}

function Caption({ children }) {
  return <figcaption className="text-xs text-neutral-400 dark:text-neutral-500 leading-relaxed">{children}</figcaption>;
}

function Figure({ src, alt, children }) {
  return (
    <figure className="flex flex-col gap-2 my-2">
      <img src={src} alt={alt} loading="lazy" decoding="async" className="w-full rounded-sm bg-neutral-900" />
      <Caption>{children}</Caption>
    </figure>
  );
}

function A({ href, children }) {
  return (
    <a
      href={href}
      className="underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-600 hover:decoration-current"
    >
      {children}
    </a>
  );
}

function Code({ children }) {
  return <code className="font-mono text-[0.9em] text-neutral-800 dark:text-neutral-200">{children}</code>;
}

// Browser → gateway → game server. Drawn with currentColor so it follows the theme.
function NetworkDiagram() {
  const box = "fill-none stroke-current";
  const small = { fontSize: 11, fill: "currentColor", opacity: 0.6 };
  const label = { fontSize: 13, fill: "currentColor" };
  return (
    <figure className="flex flex-col gap-2 my-2 text-neutral-800 dark:text-neutral-200">
      <svg viewBox="0 0 640 210" className="w-full h-auto" role="img" aria-label="Network path from the browser to the game server">
        <defs>
          <marker id="bs-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="currentColor" />
          </marker>
        </defs>

        <rect x="10" y="20" width="160" height="110" rx="4" className={box} strokeWidth="1.2" />
        <text x="90" y="44" textAnchor="middle" style={label}>Browser tab</text>
        <text x="90" y="68" textAnchor="middle" style={small}>engine (WASM)</text>
        <text x="90" y="86" textAnchor="middle" style={small}>web_udp.cc</text>
        <text x="90" y="104" textAnchor="middle" style={small}>baudp.js</text>

        <rect x="240" y="20" width="160" height="110" rx="4" className={box} strokeWidth="1.2" />
        <text x="320" y="44" textAnchor="middle" style={label}>Gateway (Go)</text>
        <text x="320" y="68" textAnchor="middle" style={small}>pion WebRTC</text>
        <text x="320" y="86" textAnchor="middle" style={small}>+ WebSocket fallback</text>
        <text x="320" y="104" textAnchor="middle" style={small}>unwraps to UDP</text>

        <rect x="470" y="20" width="160" height="110" rx="4" className={box} strokeWidth="1.2" />
        <text x="550" y="44" textAnchor="middle" style={label}>Game server</text>
        <text x="550" y="68" textAnchor="middle" style={small}>headless engine</text>
        <text x="550" y="86" textAnchor="middle" style={small}>no plus, Docker</text>
        <text x="550" y="104" textAnchor="middle" style={small}>UDP :43210</text>

        <line x1="173" y1="75" x2="237" y2="75" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#bs-arrow)" markerStart="url(#bs-arrow)" />
        <text x="205" y="66" textAnchor="middle" style={small}>WebRTC</text>
        <line x1="403" y1="75" x2="467" y2="75" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#bs-arrow)" markerStart="url(#bs-arrow)" />
        <text x="435" y="66" textAnchor="middle" style={small}>UDP</text>

        <rect x="470" y="160" width="160" height="40" rx="4" className={box} strokeWidth="1.2" strokeDasharray="4 3" />
        <text x="550" y="185" textAnchor="middle" style={small}>official app (plain UDP)</text>
        <line x1="550" y1="158" x2="550" y2="134" stroke="currentColor" strokeWidth="1.2" markerEnd="url(#bs-arrow)" />

        <text x="320" y="165" textAnchor="middle" style={small}>gateway + server: one Oracle Cloud machine</text>
      </svg>
      <Caption>
        The engine still thinks it is sending UDP packets. In the browser they go out over a WebRTC data channel to a
        small gateway, which forwards them to a normal BombSquad server. Players on the official app connect to that
        server directly, so both kinds of player end up in the same match.
      </Caption>
    </figure>
  );
}

const latency = [
  { path: "Plain UDP, laptop → server", p50: "9–10 ms", p95: "12–21 ms" },
  { path: "Browser, WebRTC → gateway → UDP", p50: "9.8 ms", p95: "39.5 ms" },
  { path: "Browser, WebSocket → gateway → UDP", p50: "9.0 ms", p95: "14.4 ms" },
  { path: "WebSocket through Cloudflare's proxy", p50: "212 ms", p95: "215 ms" },
];

const meta = {
  title: "Porting BombSquad to the browser in a day",
  date: "November 2026",
};

export default function BombSquad() {
  return (
    <article className="flex flex-col gap-5">
      <header className="flex flex-col gap-2">
        <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500">{meta.date}</p>
        <h1 className="text-3xl font-medium tracking-tight leading-tight">{meta.title}</h1>
      </header>

      <Figure src={tutorial} alt="BombSquad's tutorial level running in a Chrome tab">
        BombSquad&apos;s tutorial running in a Chrome tab: the original C++ engine and its Python game logic, compiled
        to WebAssembly.
      </Figure>

      <P>
        Two friends and I wanted to play BombSquad together. One of them has an iPhone, and BombSquad has no iOS
        version. The game runs on Ballistica, Eric Froemling&apos;s open-source engine, so instead of waiting for one I
        decided to make the game run in a browser, which every phone has.
      </P>
      <P>
        My first estimate was one and a half to three months. It took about a day: one evening and night to get it
        playable in desktop Chrome, and the next morning to get online play working, with browser players and players on
        the official app in the same match at about 10 ms ping. I did it together with Claude Code, and this post is
        about what the work actually involved and why it went so fast. The code is on{" "}
        <A href="https://github.com/karan-suthar03/ballistica">GitHub</A>.
      </P>

      <H>What is in the way</H>
      <P>
        Ballistica is a C++ engine with a full CPython interpreter inside it. All the game logic, menus and UI are
        Python. Getting that into a browser runs into four problems at once:
      </P>
      <List>
        <li>
          <strong className="font-medium">Python itself</strong> has to be compiled to WebAssembly and linked into the
          engine, with threads, using the same compiler as the engine.
        </li>
        <li>
          <strong className="font-medium">The browser owns the main thread.</strong> Desktop games run their own loop
          forever; a web page has to give control back to the browser every frame.
        </li>
        <li>
          <strong className="font-medium">A closed-source piece.</strong> Accounts, the server list and leaderboards
          live in a prebuilt library called <Code>plus</Code>, which is not open source and has no WebAssembly build.
        </li>
        <li>
          <strong className="font-medium">No UDP in browsers.</strong> BombSquad multiplayer is raw UDP, and a web page
          can only talk HTTP, WebSocket or WebRTC.
        </li>
      </List>

      <H>Python in WebAssembly</H>
      <P>
        I built CPython 3.14 for Emscripten myself, pinned to the exact Emscripten version CPython expects (4.0.12),
        because the interpreter and the engine have to be linked by the same compiler. The stock build assumes no
        threads, and the engine uses plenty, so I patched CPython&apos;s Emscripten syscall layer to skip hooks that only
        work in single-threaded builds and rebuilt it with <Code>-pthread</Code>. The engine also needed a handful of
        small fixes for musl and Emscripten: a different <Code>strerror_r</Code>, no thread names, the GLES3 headers
        instead of desktop OpenGL.
      </P>
      <P>
        Inside the game, a small shim module loads before anything else and papers over what the browser lacks:{" "}
        <Code>socketpair</Code> built from a pipe, CPU-time clocks that fall back to wall time, and stand-ins for{" "}
        <Code>ssl</Code> and network warm-up code that would otherwise block the main thread.
      </P>

      <H>Who owns the main thread</H>
      <P>
        The engine draws through SDL3 and plays sound through OpenAL, and in a browser both need the real page, which
        only the main thread can touch. So the engine&apos;s main thread is the browser&apos;s main thread, and its loop runs
        one step per animation frame through <Code>emscripten_set_main_loop</Code>. Everything else (the logic thread,
        audio, asset loading, the Python log thread) runs on a pool of 48 web workers created up front, because a
        browser can only start new threads while the main thread is idle.
      </P>
      <P>
        This produced the nastiest bug of the port: a black screen with no error. Handing the loop to the browser
        unwinds the C++ stack, and the unwind ran a destructor that took Python&apos;s global lock back. The main thread
        now held the lock forever, and every other thread waited on it. I found it by pausing every thread through the
        Chrome DevTools Protocol and printing all the stacks side by side. The fix was to release the lock permanently on
        the web instead of with a scoped guard. The engine also throws C++ exceptions as normal control flow, so it is
        built with native WebAssembly exceptions, which every current browser supports.
      </P>

      <Figure src={coopMenu} alt="BombSquad's co-op menu in the browser, showing not signed in">
        Co-op in the browser. &quot;Not signed in&quot; is expected: accounts come from the closed-source part, which the
        web build replaces.
      </Figure>

      <H>Replacing the closed-source part</H>
      <P>
        Without <Code>plus</Code>, the game does not get past the loading screen. I wrote a replacement in pure Python
        that answers the same calls offline: it creates a local account when the game first asks for one, reports that
        there is no signed-in account so the start-up fade finishes, and makes sure the config the lobby expects exists.
        A small C++ counterpart covers the engine side. Normally <Code>plus</Code> also downloads the game&apos;s assets;
        the web build ships them instead, together with the manifest, and resolves them locally.
      </P>
      <P>
        This keeps gameplay, local multiplayer and joining servers by IP. Sign-in, the public server list,
        leaderboards and tournaments need Eric&apos;s servers, so they stay off.
      </P>

      <H>Multiplayer without UDP</H>
      <P>
        Before writing any networking code I measured. From my laptop in Pune to my server in Mumbai, 300 packets at 20
        per second:
      </P>
      <div className="overflow-x-auto my-2">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
            <tr>
              <th className="font-normal py-2 pr-4">Path</th>
              <th className="font-normal py-2 pr-4">Median</th>
              <th className="font-normal py-2">95th pct</th>
            </tr>
          </thead>
          <tbody className="text-neutral-700 dark:text-neutral-300">
            {latency.map((row) => (
              <tr key={row.path} className="border-t border-neutral-100 dark:border-neutral-800">
                <td className="py-2 pr-4">{row.path}</td>
                <td className="py-2 pr-4 font-mono">{row.p50}</td>
                <td className="py-2 font-mono">{row.p95}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <P>
        Two things came out of that. Converting between browser transports and UDP costs almost nothing. And
        Cloudflare&apos;s proxy, which I had been using for the page, added 200 ms, because my ISP was being routed to
        their Marseille edge. So static files can sit behind a CDN, but game traffic has to go straight to the server.
      </P>
      <P>
        In the engine, the game socket gets a web implementation that hands each packet to JavaScript, prefixed with the
        destination address. JavaScript sends it over a WebRTC data channel set to unordered with no retransmits, which
        behaves like UDP. A gateway I wrote in Go with pion receives those, forwards them to the game server on the same
        machine and sends replies back. If WebRTC is blocked, it falls back to a WebSocket on port 443.
      </P>
      <NetworkDiagram />
      <P>
        The server is the same engine built headless, without <Code>plus</Code>, running in Docker on an Oracle
        Cloud ARM box. Players on the official app (version 1.8 and later) join it by IP like any other server, and
        their ping is about 10 ms.
      </P>

      <H>Shipping it</H>
      <P>
        The page needs cross-origin isolation headers for threads to work, so they are set on every response. The
        engine, the Python standard library (trimmed) and the assets add up to a 182 MB first download, served with
        Brotli compression from Cloudflare R2 with versioned URLs so returning players load from cache. On phones, the
        page goes fullscreen, adds touch controls and defaults to low graphics.
      </P>

      <H>Why it took a day, not months</H>
      <P>
        The estimate was wrong because it was made before reading the code. The engine was already portable: it builds
        with CMake, talks to the platform through SDL and OpenAL, and keeps its game logic in Python. The work was a
        long chain of small, specific problems, each one hard to find and quick to fix once found.
      </P>
      <P>
        That kind of work is where Claude Code changed the pace. It read through a large engine I had never seen, ran
        the builds, wrote the shims, built the tooling that dumped every thread&apos;s stack, and drove the game in my
        browser to test each fix. My part was choosing the approach at each fork (no <Code>plus</Code>, WebRTC first,
        measure before building) and deciding when something was good enough. Things like rebuilding CPython with
        threads, which used to mean a lost weekend, took minutes.
      </P>

      <H>What is next</H>
      <P>
        The engine runs well in the browser. What is missing is official: a web build of <Code>plus</Code>, so the
        browser version could sign in, find public servers and play tournaments like every other platform. With that,
        BombSquad could be a web game anyone can open on any device, iPhone included, with nothing to install. That
        part is Eric&apos;s call, and I&apos;d be happy to help.
      </P>
      <P>
        Credit to Eric Froemling for BombSquad and the{" "}
        <A href="https://github.com/efroemling/ballistica">Ballistica engine</A>. This is an unofficial personal port.
        The repository contains code only. The game&apos;s art, sound and models belong to him and are not in it.
      </P>
    </article>
  );
}
