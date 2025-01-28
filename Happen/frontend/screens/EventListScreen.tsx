import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, Dimensions, TouchableOpacity, RefreshControl, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { listarEventos } from "../services/eventService";
import { Calendar, MapPin, Clock, Users, Plus } from "lucide-react-native";
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get("window");

const EventListScreen = ({ navigation }: any) => {
  const [eventos, setEventos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEventos = async () => {
    try {
      const eventosData = await listarEventos();
      setEventos(eventosData);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEventos();
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchEventos();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate(); // Pega o dia do mês
    const month = date.toLocaleString('pt-BR', { month: 'long' }); // Pega o mês em formato longo
    return { day, month };
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderItem = ({ item }: { item: any }) => {
    const { day, month } = formatDate(item.data_hora); // Usando a função formatDate
    return (
      <TouchableOpacity style={styles.card} onPress={() => {}}>
        <LinearGradient colors={['#006229', '#004D20']} style={styles.dateContainer}>
          <Text style={styles.dateDay}>{day}</Text>
          <Text style={styles.dateMonth}>{month.toUpperCase()}</Text> {/* Garantindo que o mês esteja em maiúsculas */}
        </LinearGradient>
        <View style={styles.contentContainer}>
          {item.imagemUrl ? (
            <Image source={{ uri: item.imagemUrl }} style={styles.image} />
          ) : (
            <View style={[styles.image, styles.imagePlaceholder]}>
              <Calendar size={24} color="#006229" />
            </View>
          )}
          <View style={styles.infoContainer}>
            <Text style={styles.title} numberOfLines={1}>{item.nome}</Text>
            <Text style={styles.description} numberOfLines={2}>{item.descricao}</Text>
            <View style={styles.detailRow}>
              <View style={styles.detailItem}>
                <Clock size={14} color="#006229" />
                <Text style={styles.detailText}>{formatTime(item.data_hora)}</Text>
              </View>
              <View style={styles.detailItem}>
                <MapPin size={14} color="#006229" />
                <Text style={styles.detailText} numberOfLines={1}>{item.local}</Text>
              </View>
              {item.participantes && (
                <View style={styles.detailItem}>
                  <Users size={14} color="#006229" />
                  <Text style={styles.detailText}>{item.participantes} participantes</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const ListEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Calendar size={48} color="#006229" />
      <Text style={styles.emptyText}>Nenhum evento encontrado</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#006229" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Eventos Disponíveis</Text>
      <FlatList
        data={eventos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#006229"]}
          />
        }
        ListEmptyComponent={ListEmptyComponent}
      />
      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => navigation.navigate('CreateEventScreen')}
      >
        <LinearGradient
          colors={['#006229', '#004D20']}
          style={styles.fabGradient}
        >
          <Plus size={24} color="#FFFFFF" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BFFFC5", // Mantendo o verde original
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#006229", // Mantendo o verde original
    textAlign: "center",
    marginBottom: 20,
    textTransform: "uppercase", // Maiúsculas para dar mais destaque
    letterSpacing: 2, // Para dar mais espaço entre as letras
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 20,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  dateContainer: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#006229', // Mantendo o verde original
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    marginRight: 12,
    padding: 10,
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
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 16,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginRight: 16,
  },
  imagePlaceholder: {
    backgroundColor: "#E0F2E3",
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#006229", // Mantendo o verde original
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    color: "#4A8360",
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: "#006229", // Mantendo o verde original
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: "#4A8360",
    marginTop: 10,
  },
  fabButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    transform: [{ scale: 1.1 }], // Efeito de "zoom" sutil
    justifyContent: 'center', // Centralizando o ícone
    alignItems: 'center',
  },
  fabGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});

export default EventListScreen;
