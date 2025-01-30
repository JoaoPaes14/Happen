import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Dimensions } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { obterEvento } from "../services/eventService";
import { Calendar, MapPin, Clock, Users, ArrowLeft } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get('window');

type EventDetailRouteParams = {
  EventDetail: {
    eventId: number;
  };
};

const EventDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<EventDetailRouteParams, "EventDetail">>();
  const { eventId } = route.params;
  const [evento, setEvento] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 
  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          throw new Error("Token não encontrado");
        }

        const eventoData = await obterEvento(eventId, token); 
        setEvento(eventoData);
      } catch (error) {
        console.error("Erro ao buscar evento:", error);
        setError("Erro ao carregar evento. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvento();
  }, [eventId]);


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#006229" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!evento) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Evento não encontrado</Text>
      </View>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("pt-BR", { month: "long" });
    return { day, month };
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const { day, month } = formatDate(evento.data_hora);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <ArrowLeft size={24} color="#006229" />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={["#006229", "#004D20"]}
          style={styles.headerGradient}
        >
          {evento.imagemUrl ? (
            <Image source={{ uri: evento.imagemUrl }} style={styles.headerImage} />
          ) : (
            <View style={[styles.headerImage, styles.imagePlaceholder]}>
              <Calendar size={48} color="#FFFFFF" />
            </View>
          )}
        </LinearGradient>

        <View style={styles.contentContainer}>
          <View style={styles.dateCard}>
            <Text style={styles.dateDay}>{day}</Text>
            <Text style={styles.dateMonth}>{month.toUpperCase()}</Text>
          </View>

          <Text style={styles.title}>{evento.nome}</Text>
          
          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <Clock size={20} color="#006229" />
              <Text style={styles.infoText}>{formatTime(evento.data_hora)}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <MapPin size={20} color="#006229" />
              <Text style={styles.infoText}>{evento.local}</Text>
            </View>

            {evento.participantes && (
              <View style={styles.infoItem}>
                <Users size={20} color="#006229" />
                <Text style={styles.infoText}>{evento.participantes} participantes</Text>
              </View>
            )}
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Descrição</Text>
            <Text style={styles.description}>{evento.descricao}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerGradient: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    padding: 20,
    borderWidth: 5,           
    borderColor: '#BFFFC5',     
    borderRadius: 10, 
  },
  dateCard: {
    backgroundColor: '#006229',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    width: 120,
    marginBottom: 20,
    alignSelf: 'center',
    marginTop: -40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  dateDay: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  dateMonth: {
    fontSize: 16,
    color: "#A7D7A3",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 20,
    textAlign: 'center',
  },
  infoSection: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 15,
    gap: 12,
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#000000',
  },
  descriptionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#006229",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#333333",
    lineHeight: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#FF0000",
    textAlign: 'center',
  },
});

export default EventDetailScreen;