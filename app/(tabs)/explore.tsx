import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import * as Elements from '@/constants/elements-lab1';


export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Lab works
        </ThemedText>
      </ThemedView>
      <Collapsible title="Lab 1">
        <ThemedText>
          Task 1 <br></br>
        </ThemedText>
          {Object.entries(Elements).map(([key, value]) => (
    <ThemedText key={key}>
      {key}: {String(value)}
    </ThemedText>
  ))}
    </Collapsible>
      <Collapsible title="Lab 2">
        <ThemedText>
          Tasks
        </ThemedText>
      </Collapsible>
      <Collapsible title="Lab 3">
        <ThemedText>
          Tasks
        </ThemedText>
    </Collapsible>
      <Collapsible title="Lab 4">
        <ThemedText>
        Tasks
        </ThemedText> 
      </Collapsible>
      <Collapsible title="Lab 5">
        <ThemedText>
          Tasks
        </ThemedText>
    </Collapsible>
      <Collapsible title="Lab 6">
      <ThemedText>
        Tasks
      </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
