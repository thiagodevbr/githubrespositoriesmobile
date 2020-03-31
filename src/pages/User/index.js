/* eslint-disable react/prop-types */
import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AlertPro from 'react-native-alert-pro';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loading,
  LoadingText,
  DefaultText,
  DefaultTextMessage,
  DefaultTextIcon,
} from './styles';

class User extends Component {
  constructor(props) {
    super(props);

    const {route} = this.props;

    this.state = {
      user: route.params.data,
      stars: '',
      perPage: 10,
      page: 1,
      loading: false,
      emptyField: false,
      loadingRepository: false,
    };
  }

  async componentDidMount() {
    const {page, perPage} = this.state;
    this.setState({loading: true});
    const {route} = this.props;
    const user = route.params.data;

    try {
      const response = await api.get(
        `/users/${user.login}/starred?page=${page}&per_page=${perPage}`
      );

      if (response.data.length > 0) {
        this.setState({stars: response.data, loading: false});
      } else {
        this.setState({loading: false, emptyField: true});
      }
    } catch (err) {
      this.setState({loading: false, emptyField: true});
    }
  }

  loadRepositories = async () => {
    this.setState({loadingRepository: true});
    const {user, page, perPage, stars} = this.state;
    const pagina = page + 1;

    try {
      const response = await api.get(
        `/users/${user.login}/starred?page=${pagina}&per_page=${perPage}`
      );
      const newData = [...stars].concat(response.data);
      this.setState({stars: newData, page: page + 1});
    } catch (err) {
      // eslint-disable-next-line no-console
      console.tron.log(err);
    }

    this.setState({loadingRepository: false});
  };

  render() {
    const {user, stars, loading, emptyField, loadingRepository} = this.state;

    return (
      <Container>
        <Header>
          <Avatar source={{uri: user.avatar}} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {emptyField && (
          <DefaultText>
            <DefaultTextIcon>
              <Icon name="highlight-off" loading={emptyField} size={30} />
            </DefaultTextIcon>

            <DefaultTextMessage>
              Não encontramos repositórios!
            </DefaultTextMessage>
          </DefaultText>
        )}

        {loading && (
          <Loading>
            <ActivityIndicator color="#333" size="large" />
            <LoadingText>Buscando dados...</LoadingText>
          </Loading>
        )}
        <Stars
          data={stars}
          keyExtractor={(star) => String(star.id)}
          renderItem={({item}) => (
            <Starred>
              <OwnerAvatar source={{uri: item.owner.avatar_url}} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
          onEndReached={this.loadRepositories}
          onEndReachedThreshold={0.2}
        />
        {loadingRepository && (
          <Loading>
            <ActivityIndicator color="#333" size="large" />
          </Loading>
        )}
        <AlertPro
          ref={(ref) => {
            this.AlertPro = ref;
          }}
          closeOnPressMask
          showCancel={false}
          onConfirm={() => this.AlertPro.close()}
          title="Ops"
          message="Não conseguimos buscar os repositórios. Tente novamente"
          textConfirm="Ok"
          customStyles={{
            mask: {
              background: 'transparent',
            },
            container: {
              borderWidth: 1,
              borderColor: '#7159c1',
              shadowColor: '#7159c1',
              shadowOpacity: 0.7,
              shadowRadius: 10,
            },
            buttonConfirm: {
              backgroundColor: '#7159c1',
            },
            message: {
              color: '#999',
            },
          }}
        />
      </Container>
    );
  }
}

export default User;
