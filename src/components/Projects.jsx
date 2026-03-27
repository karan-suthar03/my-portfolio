import BackendApiPlatform from "./projects/backend-api-platform/BackendApiPlatform.jsx";
import CppVideoEditor from "./projects/cpp-video-editor/CppVideoEditor.jsx";
import MotionAmplification from "./projects/motion-amplification/MotionAmplification.jsx";
import PasswordlessRiskEngine from "./projects/passwordless-risk-engine/PasswordlessRiskEngine.jsx";
import RealTimeChatSystem from "./projects/real-time-chat-system/RealTimeChatSystem.jsx";
import WindowsTextEditor from "./projects/windows-text-editor/WindowsTextEditor.jsx";

export default function Projects() {
  return (
    <section className="flex flex-col gap-10">
      <MotionAmplification />
      <PasswordlessRiskEngine />
      <WindowsTextEditor />
      <RealTimeChatSystem />
      <CppVideoEditor />
      <BackendApiPlatform />
    </section>
  );
}
