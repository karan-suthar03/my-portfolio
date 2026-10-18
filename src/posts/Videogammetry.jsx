import { useEffect, useRef } from "react";
import { MEDIA } from "../media.js";
import familyPoster from "../assets/posts/videogammetry/family.jpg";
import streetPoster from "../assets/posts/videogammetry/street.jpg";
import m60Poster from "../assets/posts/videogammetry/m60.jpg";
import tracking from "../assets/posts/videogammetry/tracking.jpg";
import streetMap from "../assets/posts/videogammetry/street-map.jpg";
import familyMap from "../assets/posts/videogammetry/family-map.jpg";

function H({ children }) {
  return <h2 className="text-xl font-medium tracking-tight mt-10">{children}</h2>;
}

function H3({ children }) {
  return <h3 className="font-medium mt-2">{children}</h3>;
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

// Plays only while on screen, so a long page with several clips stays light.
function Video({ src, poster, label, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return (
    <figure className="flex flex-col gap-2 my-2">
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        controls
        preload="none"
        aria-label={label}
        className="w-full rounded-sm bg-neutral-900"
      />
      <Caption>{children}</Caption>
    </figure>
  );
}

const familyVideo = `${MEDIA}/posts/videogammetry/family.mp4`;
const streetVideo = `${MEDIA}/posts/videogammetry/street.mp4`;
const m60Video = `${MEDIA}/posts/videogammetry/m60.mp4`;

const benchmarks = [
  { name: "Street walk", frames: "708", before: "62.8", after: "129.0", ate: "0.05%", fov: "71.7° / 72.3°" },
  { name: "Family", frames: "4,393", before: "52.5", after: "142.7", ate: "0.19%", fov: "79.2° / 79.2°" },
  { name: "M60", frames: "2,878", before: "57.4", after: "120.8", ate: "0.50%", fov: "63.1° / 63.3°" },
];

const meta = {
  title: "Videogammetry: the 3D scanner I always wanted to build",
  date: "October 2026",
};

export default function Videogammetry() {
  return (
    <article className="flex flex-col gap-5">
      <header className="flex flex-col gap-2">
        <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500">{meta.date}</p>
        <h1 className="text-3xl font-medium tracking-tight leading-tight">{meta.title}</h1>
      </header>

      <Video src={familyVideo} poster={familyPoster} label="A statue being reconstructed as a point cloud, seen through the camera">
        The Family statue taking shape out of 138,000 points, seen through the moving camera, in real time, with the
        original video in the corner.
      </Video>

      <P>
        When I was young I tried every photogrammetry tool I could find. I loved walking around something with a camera,
        feeding the photos in, and watching it come back as a 3D model. And I always wanted my own: one that runs on a
        phone, in real time, while you are still filming.
      </P>
      <P>
        Videogammetry is that. It takes a video or a live camera and gives back two things: where the camera was in
        every frame, and a 3D point cloud of what it saw. It runs in real time on my phone. It&apos;s my own pipeline in
        C++20, not a wrapper around an existing tool, and it deliberately stops at the point cloud. No meshes, no NeRF,
        no splats. This post explains how every part of it works. The code is on{" "}
        <a
          href="https://github.com/karan-suthar03/videogammetry"
          className="underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-600 hover:decoration-current"
        >
          GitHub
        </a>
        .
      </P>

      <H>The idea in one paragraph</H>
      <P>
        Close one eye and you lose depth. Open both and your brain combines two slightly different views into 3D. A
        moving camera does the same thing over time: the same corner of a building is seen from many positions, and if
        you know where the camera was each time, you can trace a ray from each position through that corner and find
        where the rays meet. That meeting point is the corner in 3D. The catch is that nobody tells you where the camera
        was. You have to work out the camera positions from the 3D points, and the 3D points from the camera positions,
        at the same time. Solving that chicken-and-egg problem is called structure from motion. Doing it frame by frame
        as the video plays is visual SLAM, and that is what Videogammetry does.
      </P>

      <H>The pipeline at a glance</H>
      <P>Every frame goes through the same stages:</P>
      <List ordered>
        <li>
          <strong className="font-medium">Decode</strong> the frame and convert it to grayscale.
        </li>
        <li>
          <strong className="font-medium">Find features</strong>: small, distinctive spots that can be recognised again
          in other frames.
        </li>
        <li>
          <strong className="font-medium">Track</strong>: match those features to 3D points already in the map, and
          work out where the camera must be for them to line up.
        </li>
        <li>
          <strong className="font-medium">Decide</strong> whether this frame adds enough new information to become a
          keyframe.
        </li>
        <li>
          <strong className="font-medium">Map</strong>: for keyframes, create new 3D points by triangulating matches
          with other keyframes, and clean up bad ones.
        </li>
        <li>
          <strong className="font-medium">Refine</strong>: bundle adjustment nudges cameras, points and even the lens
          model until everything agrees, continuously in the background.
        </li>
      </List>
      <P>The first two frames are special, because there is no map yet. The sections below go through each stage.</P>

      <Video src={streetVideo} poster={streetPoster} label="The live viewer building a street point cloud as the video plays">
        The street video in the live viewer, real time. The map grows as the camera walks: white points are the map,
        green ones are being tracked in the current frame, blue frustums are keyframes and the orange line is the camera
        path. The video with its features is in the corner.
      </Video>

      <H>Design constraints</H>
      <List>
        <li>
          Written from scratch. FFmpeg decodes the video; everything after that, from features to bundle adjustment, is
          my own code, including the linear algebra. COLMAP and ORB-SLAM3 are used only as references and benchmarks.
        </li>
        <li>Sparse first, dense later. Offline for testing and benchmarking, then the same core runs in real time.</li>
        <li>
          Truly cross-platform: Windows, Linux and Android from one C++ core with thin per-platform apps. No CUDA. The
          CPU path is complete and is the reference; the GPU is optional.
        </li>
        <li>
          Any camera motion. Forward, sideways, backwards, spinning, portrait or landscape. Every change is tested on the
          main video played backwards, rotated 90°, mirrored and sped up 4×.
        </li>
      </List>

      <H>1. Features: what to follow</H>
      <P>
        A camera image is millions of pixels, and almost all of them are useless for working out geometry. A patch of
        blank wall looks the same as the patch next to it, so you can&apos;t tell which one you are looking at in the
        next frame. Corners are different: a window corner or a crack in the pavement is distinctive, so it can be found
        again. Each frame is reduced to a few thousand of these corners, called features.
      </P>
      <H3>Detecting them</H3>
      <P>
        Corners are found with FAST, which looks at a ring of 16 pixels around each candidate and accepts it if enough
        consecutive pixels on the ring are all brighter or all darker than the centre. FAST is quick but noisy, so the
        candidates are ranked by their Harris corner response and only the strongest are kept. A grid spreads them
        evenly over the image, because a thousand features on one textured wall are worth much less than a hundred on
        each side of the street. The same is done on an image pyramid, the frame shrunk step by step, so a corner can
        still be matched when the camera moves closer and it appears larger. Finally, each corner&apos;s position is
        refined below one pixel by fitting a parabola to the Harris response around it.
      </P>
      <H3>Describing them</H3>
      <P>
        To recognise a feature again it needs a fingerprint. Each feature gets an orientation from the intensity
        centroid of its patch, the direction in which the patch is &ldquo;heavier&rdquo;, so the fingerprint can be
        taken in a rotated frame and survives camera roll. The fingerprint itself is a 256-bit binary descriptor: 256
        pairs of pixels in the patch, and for each pair, one bit saying which one is brighter. Which pixel pairs to use
        matters a lot. Instead of the standard ORB pattern, I trained my own on my footage, choosing pairs whose bits are
        as uncorrelated and as balanced as possible, so every bit carries real information.
      </P>
      <Figure src={tracking} alt="A street frame with detected features drawn on it">
        Features on a street frame. Every circle is a feature; green ones are matched to a 3D point already in the
        map.
      </Figure>
      <H3>Matching them</H3>
      <P>
        Two descriptors are compared by their Hamming distance, the number of bits that differ, which a CPU computes in
        a couple of instructions. A match is only accepted if it passes several filters: it has to be clearly better than
        the second-best candidate (the ratio test), the two features have to choose each other (cross-check), and the
        change in orientation has to agree with most other matches (a rotation histogram), since the whole image rotates
        together.
      </P>
      <H3>On the GPU</H3>
      <P>
        At high feature counts, feature extraction is the most expensive stage, so it can also run on the GPU through
        Vulkan compute, which works on NVIDIA, AMD, Intel and Android alike. The GPU version picks exactly the same
        keypoints as the CPU one; about one descriptor bit in three million differs, from the GPU rounding sine and
        cosine slightly differently. Without a usable GPU it falls back to the CPU.
      </P>

      <H>2. Starting from nothing</H>
      <P>
        Tracking needs a map, and the map needs camera positions, so the very first step has to get both from two frames
        alone. The system waits for a frame that has moved far enough from a reference frame, because with too little
        movement the depth of every point is a guess.
      </P>
      <P>
        Between two views of a static scene, every match must satisfy one equation: the epipolar constraint. Geometrically
        it says the two viewing rays of a matched point have to lie in the same plane as the line between the two
        cameras. The 3×3 matrix in that equation, the essential matrix, encodes the rotation between the cameras and the
        direction they moved. It can be estimated from eight matches with the normalized 8-point algorithm, and RANSAC
        repeats that on random samples to find the one that most matches agree with, ignoring the wrong matches.
      </P>
      <P>
        One detail made a big difference. The usual approach forces each 8-point solution to be a valid essential matrix
        immediately. On sideways motion that destroyed almost every sample. Instead, the hypotheses are general rank-2
        fundamental matrices, refined with LO-RANSAC on Sampson error, and the essential matrix is fitted only once, at
        the end, on all the inliers. Decomposing it gives the rotation and the direction of travel, and the matches are
        triangulated into the first 3D points.
      </P>
      <P>
        A single camera can never know absolute scale. A small model filmed close up and a real building filmed from far
        away produce the same video. So the map has an arbitrary unit, fixed by the first two frames, and everything
        after that is consistent with it.
      </P>

      <H>3. Tracking: where is the camera now?</H>
      <P>
        Once there is a map, every new frame is placed against it. First a constant-velocity model predicts the new
        pose, assuming the camera keeps moving the way it just did. Map points are projected into the frame at that
        predicted pose, and each one is matched only against features within a small radius of where it should appear.
        That is much faster and much more reliable than matching against the whole image. If too few are found, the
        search radius widens, and as a last resort the frame is matched against the most recent keyframe.
      </P>
      <P>
        Now there is a set of known 3D points and the pixels where they appear. Finding the camera pose from that is the
        Perspective-n-Point problem. Three points are enough to solve it, with the P3P method, which gives up to four
        possible poses. P3P runs inside LO-RANSAC to survive wrong matches, and the winning pose is refined with
        Levenberg–Marquardt to minimize reprojection error, the pixel distance between where each point should appear
        and where it was actually seen, under a Huber loss so the occasional outlier can&apos;t drag it away.
      </P>
      <P>
        Not every frame is kept. A frame becomes a keyframe when it tracks noticeably fewer points than the last
        keyframe, meaning the view has changed, or when too many frames have passed. Keyframes are what the map is built
        from; everything else is only tracked.
      </P>

      <H>4. Mapping: growing the cloud</H>
      <P>
        When a new keyframe arrives, its unmatched features are matched against other keyframes, and each match is
        triangulated: two rays from the two camera positions, and the 3D point is where they come closest. The
        accuracy depends on the angle between the rays. Two cameras right next to each other give nearly parallel rays
        and a terrible depth estimate. So partner keyframes are chosen by baseline, how far apart they are compared to
        the scene depth, instead of simply the most recent ones. Pairing only with the latest keyframes starved the map
        on long videos until tracking was lost; pairing by baseline keeps it healthy.
      </P>
      <P>Most of the work in mapping is keeping bad points out of the cloud:</P>
      <List>
        <li>
          Matching between keyframes is guided along the epipolar line. A wrong match on a repeating pattern, like
          windows or bricks, can sit close enough to that line to pass a check afterwards and triangulate at a
          believable but wrong depth, which shows up as streaks along the viewing rays. Searching only along the line
          from the start prevents most of them.
        </li>
        <li>
          A new point is on probation until a third keyframe confirms it. Points that are never seen again are removed.
        </li>
        <li>
          Points have a parallax and reprojection check: at least 1° between the rays and at most 2 pixels of error.
        </li>
        <li>
          The same physical corner is sometimes triangulated twice by different keyframe pairs. New points are projected
          into nearby keyframes and fused with existing points they duplicate.
        </li>
        <li>
          &ldquo;Nearby keyframes&rdquo; means covisible ones, keyframes that share the most points with the new one,
          not just the most recent. A camera that walks away and comes back is connected to what it saw before.
        </li>
      </List>
      <Figure src={streetMap} alt="Top and side views of the street point cloud with the camera path in red">
        The street, rebuilt from the full video. Top view on the left, side view on the right. The red line is the
        camera path; the points are the buildings on both sides.
      </Figure>

      <H>5. Bundle adjustment: making everything agree</H>
      <P>
        Every pose and every point so far was estimated from a few others, and small errors add up. That is drift: the
        path slowly bends, and the same building ends up in two places. Bundle adjustment fixes it by solving for all
        cameras and points together. The goal is simple to state: move them so that, summed over every observation in
        every keyframe, the reprojection error is as small as possible. The &ldquo;bundles&rdquo; are the bundles of
        rays from each camera, adjusted until they all meet their points.
      </P>
      <P>
        It is a nonlinear least-squares problem with tens of thousands of unknowns, solved with Levenberg–Marquardt,
        which steps between gradient descent and Gauss–Newton depending on how well the last step went. The trick that
        makes it fast is that points don&apos;t depend on each other, only on cameras. Using the Schur complement, every
        point is eliminated analytically, leaving a much smaller system with only the cameras in it. Because keyframes
        mostly see points shared with their neighbours, that camera system is close to a band matrix, so it is solved
        with a skyline Cholesky factorization that only stores and computes the band. Then the points are recovered one
        by one.
      </P>
      <P>
        Residuals use a Huber loss, quadratic for small errors and linear for large ones, so a wrong match can&apos;t
        dominate. After a first pass, observations that are still far off are removed and the problem is solved again.
        Observations from coarse pyramid levels are weighted less, because their pixel positions are less precise. The
        solve also gives each point a depth uncertainty, which the viewer can color and filter by.
      </P>
      <P>
        It runs at two scales. Local bundle adjustment refines the neighbourhood of each new keyframe, its covisible
        keyframes and their points, with the next ring of keyframes held fixed. Global bundle adjustment runs
        continuously on a background thread over the whole map, so older parts keep getting corrected while new frames
        arrive.
      </P>

      <H>6. Self-calibration: learning the lens</H>
      <P>
        Every one of those steps needs the camera&apos;s focal length, the number that converts pixel positions into
        angles. A photo has it in its metadata; a video usually doesn&apos;t. So the system starts from a guess of 65°
        field of view and estimates the real focal length inside bundle adjustment, as one more unknown shared by all
        cameras, along with radial lens distortion, the barrel or pincushion bending of straight lines near the edges.
        Every few keyframes, a dedicated bundle adjustment refines them over a window of recent keyframes.
      </P>
      <P>
        On the Family video from the Tanks and Temples dataset, it converges on a 79.2° field of view. COLMAP, running
        offline on the same video, finds 79.2° too.
      </P>
      <Figure src={familyMap} alt="Top and side views of the Family reconstruction with the camera circling the statue">
        The Family video from above and from the side. The camera circles the statue, which is the dense cluster in the
        middle.
      </Figure>
      <P>
        The street video shows the limit of this. There, every field of view from 40° to 100° explains the motion
        equally well. When a camera only moves forward with almost no rotation, a wider lens and a different depth
        produce exactly the same image motion, so the focal length is simply not observable. No algorithm can recover
        it from that footage. It needs rotation, metadata, or a calibration.
      </P>

      <H>7. Real time: never wait</H>
      <P>
        The rule for performance is that throughput never drops, because a live camera doesn&apos;t wait. The work is
        split so the critical path is as short as possible:
      </P>
      <List>
        <li>Decoding runs ahead on its own thread, and feature extraction for upcoming frames runs in parallel on all cores.</li>
        <li>Tracking runs on its own thread and only spends a few milliseconds per frame.</li>
        <li>
          New keyframes are handed through a queue to a mapping thread that does triangulation, fusion and local bundle
          adjustment, and merges its result before the next keyframe.
        </li>
        <li>Global bundle adjustment runs on a third thread, at its own pace.</li>
      </List>
      <P>
        Two details mattered more than expected. On Windows, the OS power-throttles processes it considers background
        work, which made feature extraction almost six times slower until the process opted out of it. And with a live
        camera, frames are never queued: the camera streams continuously and the reconstruction takes the newest frame
        whenever it is ready. A queue would mean falling further and further behind; dropping frames means it always
        works on the present. That is what keeps it real-time on a phone.
      </P>

      <H>8. Is it right? Benchmarks against COLMAP</H>
      <P>
        Looking right in a viewer proves nothing, so a benchmark script runs every test video and compares my camera
        path with a COLMAP reconstruction of the same video. Because a single camera has no absolute scale, the two paths
        are first aligned with a similarity transform, rotation, translation and scale, and then the remaining distance
        between them is measured. The numbers, before and after the performance work, on an RTX 3060 laptop:
      </P>
      <div className="overflow-x-auto -mx-1">
        <table className="w-full text-sm min-w-[32rem]">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              <th className="font-normal py-2 px-1">Video</th>
              <th className="font-normal py-2 px-1">Frames</th>
              <th className="font-normal py-2 px-1">fps before</th>
              <th className="font-normal py-2 px-1">fps after</th>
              <th className="font-normal py-2 px-1">Path error vs COLMAP</th>
              <th className="font-normal py-2 px-1">FOV, mine / COLMAP</th>
            </tr>
          </thead>
          <tbody className="text-neutral-700 dark:text-neutral-300">
            {benchmarks.map((b) => (
              <tr key={b.name} className="border-t border-neutral-100 dark:border-neutral-800">
                <td className="py-2 px-1">{b.name}</td>
                <td className="py-2 px-1 font-mono">{b.frames}</td>
                <td className="py-2 px-1 font-mono">{b.before}</td>
                <td className="py-2 px-1 font-mono">{b.after}</td>
                <td className="py-2 px-1 font-mono">{b.ate}</td>
                <td className="py-2 px-1 font-mono">{b.fov}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <P>
        Path error is the RMS distance between the aligned paths, as a share of the path&apos;s overall size. No frame is lost on any
        of them, including the backward, rotated, mirrored and 4× variants of the street video.
      </P>
      <Video src={m60Video} poster={m60Poster} label="The live viewer reconstructing an M60 tank">
        The M60 tank from Tanks and Temples, 3× speed. The camera walks around the tank and the map closes around it.
      </Video>

      <H>9. Densifying the cloud</H>
      <P>
        Features sit only on corners and texture, so the cloud is sparse by nature. A separate solver runs in the
        background and fills in the surfaces between them, completely independent of tracking, at low priority. Space
        is divided into an octree of cells. A cell is solved once enough map points fall inside it, coarse cells first
        for a quick rough cloud, then their children, down to cells small enough to match at full image resolution.
      </P>
      <P>
        Each cell is solved by plane sweep. From a reference keyframe, every pixel in the cell is tried at a range of
        depths. At each depth, the pixel&apos;s 5×5 patch is projected into the other keyframes that see the cell and
        compared by normalized cross-correlation, which ignores brightness differences between views. The depth where
        the views agree best is kept, but only if the two best views match strongly and the other views confirm the
        same depth. Sky, detected as smooth bright regions
        connected to the top of the image, and texture-less patches are skipped, because they would match at any depth.
      </P>
      <P>
        Where the dense cloud has done its work, it replaces the sparse points inside the cell and removes points
        floating in front of a measured surface. Dense points are stored relative to the keyframe they were measured in,
        so they move with it when bundle adjustment corrects that keyframe. Quality rises over time: every cell is first
        solved by a fast pass with few pixels, depths and views, and whenever nothing new is waiting, the weakest cells
        are solved again one tier better, up to every pixel, 96 depths and 12 views.
      </P>

      <H>10. Viewer and platforms</H>
      <P>
        The live viewer plays a video or webcam through the reconstruction and draws the point cloud, keyframes, the
        current camera and its path as they are built, with the tracked features on the video. It has its own software
        renderer, so only the window code is Windows-specific, and a start menu that exposes every parameter with an
        explanation. One key snaps the view to the moving camera, which is how the first video in this post was
        recorded.
      </P>
      <P>
        The Android app links the same C++ core through JNI and reconstructs straight from the phone camera, showing only
        the 3D world from the camera&apos;s point of view. There is also a command-line tool for benchmarking and a
        self-contained Windows build with no external DLLs.
      </P>

      <H>Next</H>
      <P>
        20 to 30 frames per second on a laptop CPU alone, local bundle adjustment and the triangulation searches on the
        GPU, and a lot more footage.
      </P>
      <P>
        I grew up turning things into 3D with other people&apos;s tools. Now I have my own, and it runs on my phone, in
        real time.
      </P>
    </article>
  );
}
