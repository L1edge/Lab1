import React from "react";
import { Image } from "expo-image";
// ВИПРАВЛЕННЯ 1: Додано View та TouchableOpacity
import { Platform, StyleSheet, View, TouchableOpacity } from "react-native";

import { Collapsible } from "@/components/ui/collapsible";
import { ExternalLink } from "@/components/external-link";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

// Лабораторні імпорти
import * as Elements1 from "@/constants/lab1/elements1-lab1";
import * as Elements2 from "@/constants/lab1/elements2-lab1";
import * as Elements3 from "@/constants/lab1/elements3-lab1";
import * as Lab2Task1 from "@/constants/lab2/elements1-lab2";
import * as Lab2Task2 from "@/constants/lab2/elements2-lab2";
import * as Lab2Task3 from "@/constants/lab2/elements3-lab2";

import Lab3 from '@/components/components-lab3';
import Lab2n1 from '@/components/lab2n1/components-lab2n1';

import { Link } from 'expo-router';
import Task1 from '@/components/lab5/Task1';

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
          Labs
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
        <ThemedView>
            <ThemedText style={{ fontWeight: "700" }}>Task 1 (Arrays)</ThemedText>
            
            {Object.entries(Lab2Task1).map(([key, value]) => (
                <ThemedView key={key} style={{ marginBottom: 4 }}>
                    <ThemedText style={{ color: '#888', fontSize: 12 }}>{key}:</ThemedText>
                    <ThemedText>
                        {Array.isArray(value) ? `[${value.join(', ')}]` : String(value)}
                    </ThemedText>
                </ThemedView>
            ))}

              <ThemedText style={{ fontWeight: "700", marginTop: 10 }}>Task 2 (Sets)</ThemedText>

              {Object.entries(Lab2Task2).map(([key, value]) => (
                <ThemedView key={key} style={{ marginBottom: 4 }}>
                  <ThemedText style={{ color: '#888', fontSize: 12 }}>{key}:</ThemedText>
                  <ThemedText>
                    {value instanceof Set 
                      ? `{ ${Array.from(value).join(', ')} }` 
                      : Array.isArray(value) 
                        ? `[${value.join(', ')}]` 
                        : String(value)}
                  </ThemedText>
                </ThemedView>
              ))}

              <ThemedText style={{ fontWeight: "700", marginTop: 10 }}>Task 3 (Dictionaries)</ThemedText>
              
              {Object.entries(Lab2Task3).map(([key, value]) => (
                <ThemedView key={key} style={{ marginBottom: 4 }}>
                  <ThemedText style={{ color: '#888', fontSize: 12 }}>{key}:</ThemedText>
                  <ThemedText>
                      {typeof value === 'object' && value !== null && !Array.isArray(value)
                          ? JSON.stringify(value).replace(/,/g, ', ')
                          : Array.isArray(value)
                              ? `[${value.join(', ')}]`
                              : String(value)
                      }
                  </ThemedText>
                </ThemedView>
              ))}
        </ThemedView>
      </Collapsible>

      <Collapsible title="Lab 3">
        <ThemedText>Tasks</ThemedText>
        <Lab3 />
      </Collapsible>

      <Collapsible title="Lab 2.1-2.2">
        <Lab2n1 />
      </Collapsible>

      <Collapsible title="Lab 5 (AutoLayout)">
        <ThemedView>
          <ThemedText style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>
            Task 1 (Rotate device to test)
          </ThemedText>
          <Task1 />

          <View style={{ height: 20 }} />

          <ThemedText style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>
            Task 2 (Navigation)
          </ThemedText>
          {/* ВИПРАВЛЕННЯ 2: Додано as any до href */}
          <Link href={"/lab5" as any} asChild>
            <TouchableOpacity style={{ backgroundColor: 'rgba(90, 70, 147, 1)', padding: 15, borderRadius: 8, alignItems: 'center' }}>
              <ThemedText style={{ color: 'white', fontWeight: 'bold' }}>
                Open Task 2 Navigation Screens
              </ThemedText>
            </TouchableOpacity>
          </Link>

       <Link href={"/clock" as any} style={{ color: '#007AFF', marginTop: 15, fontSize: 16, fontWeight: 'bold' }}>
          Open Lab 15 (Clock App)
        </Link>

        </ThemedView>
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