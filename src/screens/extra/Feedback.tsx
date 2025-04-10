import React, { useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, StatusBar, Keyboard } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from '../../hooks/useTheme';
import StackHeader from '../../components/common/StackHeader';

const categories = ['Idea 💡', 'Bug 🐛', 'Sugerencia ✍️', 'Otro 👀'];

export default function FeedbackScreen() {
    const { colors, typography, theme } = useTheme();
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const messageRef = useRef<TextInput>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        };
    };

    const sendFeedback = () => {
        if (!message.trim()) {
            return Alert.alert('Ups', 'Por favor escriba algún mensaje.');
        } else if (!selectedCategory?.trim()) {
            return Alert.alert('Ops', 'Por favor selecciona una categoría.');
        } else if (!subject.trim()) {
            return Alert.alert('¿Un asunto?', 'Dale un encabezado a tu mensaje.');
        };
        const payload = {
            subject,
            message,
            image,
            category: selectedCategory,
        };
        // Aquí va la lógica para enviar a un backend o almacenamiento S3
        console.log('Feedback:', payload);
        Alert.alert('Gracias!', 'Tu feedback ha sido enviado');
        setSubject('');
        setMessage('');
        setImage(null);
        setSelectedCategory(null);
    };

    return(
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
                    backgroundColor={colors.background}
                />

            <StackHeader 
                title='Feedback' 
                iconFamiliy='MaterialCommunityIcons' 
                iconName='message-bookmark-outline' 
                showBackButton={true} 
            />

            <ScrollView contentContainerStyle={[styles.subContainer, { backgroundColor: colors.background }]}>
                <View style={styles.headerContainer}>
                    <View style={styles.header}>
                        <Text style={[{ color: colors.text, fontSize: typography.fontSizes.xxl, fontWeight: typography.fontWeights.bold }]}>¡Ayudanos a ser mejor para ti!</Text>
                        <Text style={[{ color: colors.textSecondary }]}>
                            Tu opinión cuenta.
                            ¿Notaste un error? ¿Tienes una idea o sugerencia?
                        </Text>
                        <Text style={[{ color: colors.textSecondary }]}>
                            Este espacio es para ti: cuéntanos qué funciona, qué no, y qué te gustaría ver.
                            Cada mensaje nos ayuda a hacer una app mejor para todos. ¡Gracias!
                        </Text>
                    </View>
                </View>

                <TextInput
                    placeholder='Asunto o título'
                    value={subject}
                    onChangeText={setSubject}
                    returnKeyType='next'
                    onSubmitEditing={() => messageRef.current?.focus()}
                    submitBehavior='newline'
                    style={[styles.input, { borderColor: colors.textSecondary, fontSize: typography.fontSizes.sm }]}
                />

                <TextInput 
                    ref={messageRef}
                    placeholder='Describe tu idea, bug o comentario...'
                    value={message}
                    onChangeText={setMessage}
                    multiline
                    numberOfLines={6}
                    returnKeyType='done'
                    submitBehavior='blurAndSubmit'
                    onSubmitEditing={Keyboard.dismiss}
                    style={[styles.input, styles.textArea, { borderColor: colors.textSecondary, fontSize: typography.fontSizes.sm }]}
                />

                <View style={styles.categoryContainer}>
                    {categories.map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            style={[styles.category, selectedCategory === cat && { backgroundColor: colors.primary }, { borderColor: colors.primary }]}
                            onPress={() => setSelectedCategory(cat)}
                        >
                            <Text style={[{ color: colors.primary, fontWeight: typography.fontWeights.semibold }, selectedCategory === cat && { color: colors.background }]}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity onPress={pickImage} style={[styles.imageButton, { borderColor: colors.textSecondary }]}>
                    <MaterialIcons
                        name={image ? 'photo-camera' : 'attach-file'}
                        size={20}
                        color={colors.secondary}
                        style={{ marginRight: scale(8) }}
                    />
                    <Text style={{ color: colors.secondary, fontSize: typography.fontSizes.sm }}>
                        {image ? 'Cambiar imagen' : 'Agregar imagen'}
                    </Text>
                </TouchableOpacity>

                {image && (
                    <View style={styles.previewContainer}>
                        <Image source={{ uri: image }} style={styles.previewImage} contentFit='cover' />
                        <TouchableOpacity onPress={() => setImage(null)} style={styles.removeImageButton}>
                            <MaterialIcons name="close" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                )}

                <Button
                    mode='contained'
                    style={styles.submit}
                    onPress={sendFeedback}
                    buttonColor={colors.primary}
                >
                    Enviar Feedback
                </Button>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: verticalScale(5),
        paddingBottom: verticalScale(20),
        paddingHorizontal: scale(21),
    },
    headerContainer: {
        paddingBottom: verticalScale(10),
    },
    header: {
        gap: moderateScale(8),
    },
    input: {
        width: scale(300),
        borderWidth: 1,
        borderRadius: moderateScale(8),
        padding: moderateScale(10),
        marginBottom: verticalScale(10),
    },
    textArea: {
        textAlignVertical: 'top',
        height: verticalScale(120),
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: scale(8),
        marginBottom: verticalScale(3),
    },
    category: {
        paddingVertical: verticalScale(6),
        paddingHorizontal: scale(8),
        borderWidth: 1,
        borderRadius: moderateScale(20),
    },
    imageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: moderateScale(8),
        paddingVertical: verticalScale(8),
        paddingHorizontal: scale(10),
        marginTop: verticalScale(10),
        marginLeft: moderateScale(3),
    },
    previewContainer: {
        position: 'relative',
        alignSelf: 'flex-start',
        marginTop: verticalScale(10),
        width: scale(100),
        height: verticalScale(100),
        borderRadius: moderateScale(10),
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: verticalScale(2) },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    previewImage: {
        width: '100%',
        height: '100%',
        borderRadius: moderateScale(10),
        marginLeft: moderateScale(3),
    },
    removeImageButton: {
        position: 'absolute',
        top: moderateScale(5),
        right: moderateScale(5),
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: moderateScale(15),
        padding: moderateScale(3),
    },
    submit: {
        marginTop: verticalScale(15),
        padding: verticalScale(5),
    },
});