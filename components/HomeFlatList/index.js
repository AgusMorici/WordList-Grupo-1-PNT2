import { FlatList } from 'react-native';
import Word from '../Word';

const HomeFlatList = ({ words }) => {
    return (
        <FlatList
            data={words}
            renderItem={({ item }) => <Word word={item} />}
            keyExtractor={(item) => String(item.id ?? item._id)}
        />
    );
};

export default HomeFlatList;
