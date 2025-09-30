import React from "react";
import { Image } from "expo-image";
import { Platform, StyleSheet } from "react-native";

import { Collapsible } from "@/components/ui/collapsible";
import { ExternalLink } from "@/components/external-link";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";
import * as Elements1 from "@/constants/elements1-lab1";
import * as Elements2 from "@/constants/elements2-lab1";
import * as Elements3 from "@/constants/elements3-lab1";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={{ fontFamily: Fonts.rounded }}>
          Lab works
        </ThemedText>
      </ThemedView>

      <Collapsible title="Lab 1">
        <ThemedView>
          <ThemedText style={{ fontWeight: "700" }}>Task 1</ThemedText>

          {Object.entries(Elements1).map(([key, value]) => (
            <React.Fragment key={`e1-${key}`}>
              <ThemedText>
                {key}: {String(value)}
              </ThemedText>
            </React.Fragment>
          ))}

          <ThemedText style={{ fontWeight: "700", marginTop: 8 }}>
            Task 2
          </ThemedText>

          {Object.entries(Elements2).map(([key, value]) => (
            <React.Fragment key={`e2-${key}`}>
              <ThemedText>
                {key}: {String(value)}
              </ThemedText>
            </React.Fragment>
          ))}

          <ThemedText style={{ fontWeight: "700", marginTop: 8 }}>
            Task 3
          </ThemedText>

          {Object.entries(Elements3).map(([key, value]) => (
            <React.Fragment key={`e3-${key}`}>
              <ThemedText>
                {key}: {String(value)}
              </ThemedText>
            </React.Fragment>
          ))}
<ThemedText>
  {Elements3.decimalNumber1?.toString() ?? "Значення не задане"}
</ThemedText>
<ThemedText>
  {Elements3.decimalNumber2?.toString() ?? "Значення не задане"}
</ThemedText>
        </ThemedView>
      </Collapsible>

      <Collapsible title="Lab 2">
        <ThemedText>Tasks</ThemedText>
      </Collapsible>

      <Collapsible title="Lab 3">
        <ThemedText>Tasks</ThemedText>
      </Collapsible>

      <Collapsible title="Lab 4">
        <ThemedText>Tasks</ThemedText>
      </Collapsible>

      <Collapsible title="Lab 5">
        <ThemedText>Tasks</ThemedText>
      </Collapsible>

      <Collapsible title="Lab 6">
        <ThemedText>Tasks</ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});