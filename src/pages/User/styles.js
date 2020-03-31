import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;
export const Header = styled.View`
  align-items: center;
  padding-bottom: 15px;
  border-bottom-width: 1px;
  border-color: rgba(0, 0, 0, 0.2);
`;
export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: #eee;
  margin-bottom: 10px;
`;
export const Name = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;
export const Bio = styled.Text`
  font-size: 14px;
  margin-bottom: 10px;
  color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  text-align: center;
  line-height: 18px;
`;

export const Stars = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const Starred = styled.View`
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 10px 15px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`;

export const OwnerAvatar = styled.Image`
  width: 42px;
  height: 42px;
  border-radius: 21px;
  background: #eee;
`;

export const Info = styled.View`
  flex: 1;
  margin-left: 10px;
`;

export const Title = styled.Text.attrs({
  LineOfNumbers: 1,
})`
  font-size: 15px;
  font-weight: bold;
  color: #333;
`;

export const Author = styled.Text`
  font-size: 13px;
  color: #666;
  margin-top: 2px;
`;

export const Loading = styled.View`
  margin-top: 10px;
  justify-content: center;
  flex: 1;
`;

export const LoadingText = styled.Text`
  font-size: 12px;
  text-align: center;
  justify-content: center;
  margin-top: 10px;
  color: #999;
`;

export const DefaultText = styled.View`
  margin-top: 30px;
  padding: 30px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;

export const DefaultTextIcon = styled.Text`
  color: #555;
  margin-right: 5px;
`;

export const DefaultTextMessage = styled.Text`
  font-size: 16px;
  color: #555;
`;
