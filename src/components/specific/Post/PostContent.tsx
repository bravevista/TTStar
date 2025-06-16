import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import { useState } from 'react';
import { moderateScale } from 'react-native-size-matters';
import { useTheme } from '../../../hooks/useTheme';

const MAX_PREVIEW_LINES = 4;

function FormattedText({
  text,
  isExpanded,
}: {
  text: string;
  isExpanded: boolean;
}) {
  const { colors, typography } = useTheme();
  // Dividimos el texto en líneas, manteniendo saltos de línea
  const lines = text.split('\n');

  // Aplica formato de negrita con **texto**
  const formatText = (line: string, index: number) => {
    const parts = line.split(/(\*\*.*?\*\*)/); // separa negrita
    return (
      <Text key={index} style={{ color: colors.text }}>
        {parts.map((part, idx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <Text
                key={idx}
                style={{
                  color: colors.text,
                  fontWeight: typography.fontWeights.bold,
                }}
              >
                {part.replace(/\*\*/g, '')}
              </Text>
            );
          }
          return part;
        })}
        {'\n'}
      </Text>
    );
  };

  const displayedLines = isExpanded ? lines : lines.slice(0, MAX_PREVIEW_LINES);
  const shouldShowMore = lines.length > MAX_PREVIEW_LINES;

  return (
    <>
      {displayedLines.map(formatText)}
      {shouldShowMore && (
        <Text style={{ color: colors.primary }}>
          {isExpanded ? 'Ver menos' : 'Ver más'}
        </Text>
      )}
    </>
  );
}

export default function PostContent({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(prev => !prev);
  };

  return (
    <View style={styles.textContainer}>
      <Pressable onPress={toggleExpand}>
        <FormattedText text={text} isExpanded={expanded} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(10),
  },
});
