import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { listarEventos } from '../services/eventService';

const EventListScreen = ({ navigation }: { navigation: any }) => {
  const [eventos, setEventos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const data = await listarEventos();
        setEventos(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  const renderEventItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('EventDetailScreen', { id: item.id })}
    >
      <Image
        source={{
          uri: item.image || 'https://via.placeholder.com/150',
        }}
        style={styles.image}
      />
      <View style={styles.cardContent}>
        <Text style={styles.eventName}>{item.nome}</Text>
        <Text style={styles.eventDate}>
          {new Date(item.data_hora).toLocaleString('pt-BR', {
            dateStyle: 'short',
            timeStyle: 'short',
          })}
        </Text>
        <Text style={styles.eventLocation}>{item.local}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Carregando eventos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erro ao carregar eventos: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.headerText}>Eventos Disponíveis</Text>
      </View>
      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEventItem}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BFFFC5',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  listContainer: {
    padding: 12,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    width: '95%', // Largura ajustada para ocupar melhor o espaço
    alignSelf: 'center',
    maxWidth: 320, // Largura máxima reduzida
  },
  image: {
    width: '100%',
    height: 100, // Altura reduzida para diminuir o tamanho do cartão
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 12,
  },
  eventName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  eventDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  eventLocation: {
    fontSize: 12,
    color: '#006229',
    marginTop: 4,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#ff4d4d',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default EventListScreen;
