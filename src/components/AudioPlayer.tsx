import * as React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { Audio } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

import type { AVPlaybackSource, AVPlaybackStatus } from "expo-av/build/AV";

import {
  GROUPS,
  COMPONENT_TYPES,
  FORM_TYPES,
  PROP_TYPES,
} from "../core/component-types";

function formatDuration(duration: number) {
  if (duration === 0 || duration === 1) return "00:00";

  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  const renderedHours = hours < 10 ? "0" + hours : hours;
  const renderedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const renderedSeconds = seconds < 10 ? "0" + seconds : seconds;

  if (hours > 0) {
    return renderedHours + ":" + renderedMinutes + ":" + renderedSeconds;
  }

  return renderedMinutes + ":" + renderedSeconds;
}

export default function AudioPlayer({ source }: { source: AVPlaybackSource }) {
  const [sound, setSound] = React.useState();
  const [playing, setPlay] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [durationMillis, setDurationMillis] = React.useState(1);
  const [isDraggingSlider, setIsDraggingSlider] = React.useState(false);
  const [sliderPositionMillis, setSliderPositionMillis] = React.useState(0);

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if (status.isPlaying && !isDraggingSlider) {
      setSliderPositionMillis(status.positionMillis);
    }
  };

  const setOnPlaybackStatusUpdate = () => {
    if (sound) {
      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    }
  };

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function loadAudio() {
    setLoading(true);

    const { sound: s, status } = await Audio.Sound.createAsync(source);
    setSound(s);
    setLoading(false);
    setOnPlaybackStatusUpdate();

    if (status.durationMillis) {
      setDurationMillis(status.durationMillis);
    }

    s.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

    await s.playAsync();
    setPlay(true);
  }

  async function playSound() {
    if (playing) {
      await sound.pauseAsync();
      setPlay(false);
      return;
    }

    if (sound) {
      await sound.playAsync();
      setPlay(true);
      return;
    }

    await loadAudio();
  }

  const setTrackPosition = async (positionMillis: number) => {
    if (sound) {
      await sound.setPositionAsync(positionMillis);
    }
  };

  const onSlidingComplete = (sliderValue: number) => {
    if (isDraggingSlider) {
      setIsDraggingSlider(false);
    }
    setTrackPosition(sliderValue);
  };

  const onSliderChange = () => {
    if (!isDraggingSlider) {
      setIsDraggingSlider(true);
    }
  };

  const iconName = loading ? "loading1" : !sound || !playing ? "play" : "pause";

  return (
    <View style={styles.container}>
      <Pressable
        onPress={playSound}
        style={{ cursor: "pointer", marginRight: 8 }}
      >
        <AntDesign name={iconName} size={24} />
      </Pressable>
      <Text style={{ marginRight: 8 }}>
        {formatDuration(sliderPositionMillis || 0)} /{" "}
        {formatDuration(durationMillis || 0)}
      </Text>
      <Slider
        style={{ flex: 1 }}
        minimumTrackTintColor="#333"
        maximumTrackTintColor="#000000"
        thumbTintColor="black"
        minimumValue={0}
        value={sliderPositionMillis}
        maximumValue={durationMillis}
        onValueChange={onSliderChange}
        onSlidingComplete={onSlidingComplete}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
  },
});

export const SEED_DATA = {
  name: "Audio Player",
  tag: "AudioPlayer",
  description: "Given a URL, plays sounds!",
  category: COMPONENT_TYPES.media,
  layout: {},
  props: {
    source: {
      group: GROUPS.data,
      label: "URL",
      description: "The url of the sound",
      editable: true,
      required: true,
      defaultValue:
        "https://hwcdn.libsyn.com/p/9/e/2/9e224ffb4f3625c8/Nerdist_644_-_Ted_Melfi.mp3?c_id=8473543&cs_id=8473543&destination_id=18174&expiration=1607628092&hwt=f8327d4f551ec81f902e666647dc76f5",
      formType: FORM_TYPES.sourceUrl,
      propType: PROP_TYPES.OBJECT,
    },
  },
};