import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {Keyboard, ActivityIndicator} from 'react-native';
import AlertPro from 'react-native-alert-pro';
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

import api from '../../services/api';

// eslint-disable-next-line react/prefer-stateless-function
class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newUser: '',
      users: [],
      loading: false,
      popTitle: '',
      popMessage: '',
      popButton: '',
    };
  }

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');
    if (users) {
      this.setState({users: JSON.parse(users)});
    }
  }

  async componentDidUpdate(_, prevState) {
    const {users} = this.state;
    if (prevState.users !== users) {
      try {
        await AsyncStorage.setItem('users', JSON.stringify(users));
      } catch (err) {
        // return err;
      }
    }
  }

  handleSubmit = async () => {
    this.setState({loading: true});

    const {newUser, users} = this.state;

    if (users.filter((user) => user.login === newUser).length >= 1) {
      this.setState({
        popButton: 'Ok',
        popMessage: 'Este usuário já existe',
        popTitle: 'Usuário repetido',
      });
      this.AlertPro.open();
    } else if (newUser) {
      try {
        const response = await api.get(`/users/${newUser}`);
        const data = {
          name: response.data.name,
          login: response.data.login,
          bio: response.data.bio,
          avatar: response.data.avatar_url,
        };
        this.setState({
          users: [...users, data],
        });
      } catch (err) {
        this.setState({
          popButton: 'Ok',
          popMessage: 'Desculpe, não encontramos esta pessoa',
          popTitle: 'Ops...',
        });
        this.AlertPro.open();
      }
    } else {
      this.setState({
        popButton: 'Ok',
        popMessage: 'Por favor, preencha o nome do usuário',
        popTitle: 'Campo Vazio',
      });
      this.AlertPro.open();
    }

    this.setState({newUser: '', loading: false});
    Keyboard.dismiss();
  };

  handleNavigate = (data) => {
    const {navigation} = this.props;
    navigation.navigate('User', {data});
  };

  render() {
    const {
      newUser,
      users,
      loading,
      popTitle,
      popMessage,
      popButton,
    } = this.state;
    return (
      <Container>
        <Form>
          <Input
            autoComplete={false}
            autoCapitalize="none"
            placeholder="Adicionar usuário"
            onChangeText={(text) => this.setState({newUser: text})}
            returnKeyType="send"
            onSubmitEditing={this.handleSubmit}
            value={newUser}
          />
          <SubmitButton loading={loading} onPress={this.handleSubmit}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={20} color="#fff" />
            )}
          </SubmitButton>
        </Form>
        <List
          data={users}
          keyExtractor={(user) => user.login}
          renderItem={({item}) => (
            <User>
              <Avatar source={{uri: item.avatar}} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>
              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>Ver perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />

        <AlertPro
          ref={(ref) => {
            this.AlertPro = ref;
          }}
          closeOnPressMask
          showCancel={false}
          onConfirm={() => this.AlertPro.close()}
          title={popTitle}
          message={popMessage}
          textConfirm={popButton}
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

export default Main;
