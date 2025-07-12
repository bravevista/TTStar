import { View, Text, StyleSheet, Pressable, Linking } from 'react-native';
import { useState, useCallback } from 'react';
import { moderateScale } from 'react-native-size-matters';
import { useTheme } from '../../../hooks/useTheme';

const MAX_VISIBLE_LINES = 4;

function FormattedText({
  text,
  isExpanded,
  onPressMore,
  showMoreButton,
}: {
  text: string;
  isExpanded: boolean;
  onPressMore: () => void;
  showMoreButton: boolean;
}) {
  const { colors, typography } = useTheme();
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);

  // Aplica formato de negrita con **texto** y maneja emojis
  const formatText = useCallback(
    (line: string) => {
      if (!line.trim()) return null;

      const regex = /(\*\*.*?\*\*|_.*?_|\[.*?\]\(.*?\))/g;
      const parts = line.split(regex);

      return parts.map((part, idx) => {
        // Negrita (**texto**)
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <Text
              key={idx}
              style={{
                color: colors.text,
                fontWeight: typography.fontWeights.bold,
              }}
            >
              {part.slice(2, -2)}
            </Text>
          );
        }

        // Cursiva (_texto_)
        if (part.startsWith('_') && part.endsWith('_')) {
          return (
            <Text
              key={idx}
              style={{
                color: colors.text,
                fontStyle: 'italic',
              }}
            >
              {part.slice(1, -1)}
            </Text>
          );
        }

        // Enlaces ([texto](url))
        if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
          const linkText = part.match(/\[(.*?)\]/)?.[1] || '';
          const url = part.match(/\((.*?)\)/)?.[1] || '';

          return (
            <Text
              key={idx}
              style={{
                color: colors.primary,
                textDecorationLine: 'underline',
              }}
              onPress={() =>
                Linking.openURL(url).catch(err =>
                  console.error('Error al abrir enlace:', err)
                )
              }
            >
              {linkText}
            </Text>
          );
        }

        return part;
      });
    },
    [colors.text, colors.primary, typography.fontWeights.bold]
  );

  // Divide el texto en párrafos (separados por saltos de línea)
  const paragraphs = text.split('\n').filter(para => para.trim() !== '');

  // Si está expandido, muestra todo
  if (isExpanded) {
    return (
      <>
        {paragraphs.map((para, index) => (
          <Text key={index} style={{ color: colors.text }}>
            {formatText(para)}
            {index !== paragraphs.length - 1 && '\n'}
          </Text>
        ))}
        {showMoreButton && (
          <Pressable onPress={toggleExpand}>
            <Text style={{ color: colors.primary }} onPress={onPressMore}>
              Ver menos
            </Text>
          </Pressable>
        )}
      </>
    );
  }

  // Si no está expandido, muestra solo las primeras líneas
  let lineCount = 0;
  const visibleParagraphs = [];

  for (const para of paragraphs) {
    const paraLines = Math.ceil(para.length / 60);
    if (lineCount + paraLines <= MAX_VISIBLE_LINES) {
      visibleParagraphs.push(para);
      lineCount += paraLines;
    } else {
      const remainingLines = MAX_VISIBLE_LINES - lineCount;
      if (remainingLines > 0) {
        const charsPerLine = 60;
        const maxChars = remainingLines * charsPerLine;
        visibleParagraphs.push(para.substring(0, maxChars) + '...');
      }
      break;
    }
  }

  return (
    <>
      {visibleParagraphs.map((para, index) => (
        <Text key={index} style={{ color: colors.text }}>
          {formatText(para)}
          {index !== visibleParagraphs.length - 1 && '\n'}
        </Text>
      ))}
      {showMoreButton && (
        <Pressable onPress={toggleExpand}>
          <Text style={{ color: colors.primary }} onPress={onPressMore}>
            Ver más
          </Text>
        </Pressable>
      )}
    </>
  );
}

export default function PostContent({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);

  // Determina si necesitamos el botón "Ver más"
  const hasMoreContent = useCallback(() => {
    // Estimación rápida: si tiene más de MAX_VISIBLE_LINES * 60 caracteres
    // o más de MAX_VISIBLE_LINES párrafos
    const paragraphs = text.split('\n').filter(para => para.trim() !== '');
    if (paragraphs.length > MAX_VISIBLE_LINES) return true;

    const totalChars = paragraphs.join('').length;
    return totalChars > MAX_VISIBLE_LINES * 60;
  }, [text]);

  return (
    <View style={styles.textContainer}>
      <FormattedText
        text={text}
        isExpanded={expanded}
        onPressMore={toggleExpand}
        showMoreButton={hasMoreContent()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: moderateScale(15),
    paddingVertical: moderateScale(10),
  },
});
