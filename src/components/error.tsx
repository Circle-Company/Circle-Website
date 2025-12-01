import { colors } from "@/constants/colors";
import { Text } from "./themed";
import fonts from "@/constants/fonts";
import { useSizes } from "@/constants/sizes";

export function Error({ message }: { message: string }) {
  const sizes = useSizes();
  const wrapperStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    pointerEvents: "none",
  };

  const containerStyle: React.CSSProperties = {
    paddingLeft: sizes.paddings[15],
    paddingRight: sizes.paddings[15],
    paddingTop: sizes.paddings[10],
    paddingBottom: sizes.paddings[10],
    borderRadius: sizes.borderRadius[20],
    minHeight: sizes.spaces[40],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    pointerEvents: "auto",
    backgroundColor: colors.red[9] + 30,
  };

  const textStyle: React.CSSProperties = {
    color: colors.red[3],
    fontSize: fonts.size.subheadline * 1.1,
    fontFamily: fonts.family.Medium,
  };

  return (
    <div style={wrapperStyle}>
      <div style={containerStyle}>
        <Text style={textStyle}>{message}</Text>
      </div>
    </div>
  );
}
