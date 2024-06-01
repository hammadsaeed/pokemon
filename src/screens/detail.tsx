import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import {useGetPokemonByIdQuery} from '../redux/apiSlice';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/appNavigator';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface Props {
  route: DetailScreenRouteProp;
}

const DetailScreen = ({route}: Props) => {
  const {id} = route.params;
  const {data, error, isLoading} = useGetPokemonByIdQuery(id);
  const navigation = useNavigation();

  useEffect(() => {
    if (data) {
      const capitalizedTitle =
        data?.name?.charAt(0).toUpperCase() + data?.name?.slice(1);
      navigation.setOptions({title: capitalizedTitle});
    }
  }, [data]);

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading data</Text>;

  const imageUrl = data?.sprites?.front_default;

  const infoData = [
    {label: 'Name', value: `${data?.name}`},
    {
      label: 'Height',
      value: `${data?.height ? `${data?.height * 10} cm` : 'N/A'}`,
    },
    {
      label: 'Weight',
      value: `${data?.weight ? `${data?.weight / 10} kg` : 'N/A'}`,
    },
    {
      label: 'Types',
      value: data?.types?.map(typeInfo => typeInfo.type.name).join(', '),
    },
  ];

  return (
    <View style={styles.container}>
      <Image source={{uri: imageUrl}} style={styles.image} />
      <FlatList
        data={infoData}
        keyExtractor={item => item.label}
        renderItem={({item, index}) => (
          <View
            style={[
              styles.infoRow,
              index === 0 && {borderTopWidth: 1, borderTopColor: '#ccc'},
            ]}>
            <Text style={styles.label}>{item.label}:</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
  },
});

export default DetailScreen;
