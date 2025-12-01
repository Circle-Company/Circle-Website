import { useLanguage } from "@/contexts/language-context";
import fonts from "@/constants/fonts";
import { colors } from "@/constants/colors";
import { Text } from "./themed";

interface LoadingProps {
  style?: React.CSSProperties;
}

export function Loading({ style }: LoadingProps) {
  const { t } = useLanguage();

  const wrapperStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    pointerEvents: "none",
  };

  const containerStyle: React.CSSProperties = {
    display: "flex",
    top: -100,
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "auto",
    ...style,
  };

  const textStyle: React.CSSProperties = {
    fontSize: fonts.size.body * 1.2,
    fontFamily: fonts.family.Bold,
    fontStyle: "italic",
    fontWeight: "bold",
    color: colors.gray[3],
    textAlign: "center",
  };

  const dot1Style: React.CSSProperties = {
    display: "inline-block",
    animation: "loadingDot1 1.5s infinite",
  };

  const dot2Style: React.CSSProperties = {
    display: "inline-block",
    animation: "loadingDot2 1.5s infinite",
  };

  const dot3Style: React.CSSProperties = {
    display: "inline-block",
    animation: "loadingDot3 1.5s infinite",
  };

  return (
    <>
      <style>{`
        @keyframes loadingDot1 {
          0%, 33% {
            opacity: 1;
          }
          33.01%, 75% {
            opacity: 1;
          }
          75.01%, 100% {
            opacity: 0;
          }
        }

        @keyframes loadingDot2 {
          0%, 33% {
            opacity: 0;
          }
          33.01%, 66% {
            opacity: 1;
          }
          66.01%, 83% {
            opacity: 1;
          }
          83.01%, 100% {
            opacity: 0;
          }
        }

        @keyframes loadingDot3 {
          0%, 66% {
            opacity: 0;
          }
          66.01%, 91% {
            opacity: 1;
          }
          91.01%, 100% {
            opacity: 0;
          }
        }
      `}</style>
      <div style={wrapperStyle}>
        <div style={containerStyle}>
          <Text style={textStyle}>
            {t("Loading")}
            <span style={dot1Style}>.</span>
            <span style={dot2Style}>.</span>
            <span style={dot3Style}>.</span>
          </Text>
        </div>
      </div>
    </>
  );
}
