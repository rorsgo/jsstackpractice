import styled from "styled-components/native";

export const Container = styled.View`
  padding: 30px;
  flex: 1;
  background: #333;
`;

export const Header = styled.View`
  align-items: center;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #333;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: #EEE;
`;

export const Name = styled.Text`
  font-size: 20px;
  color: #FFE;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;

export const Bio = styled.Text`
  font-size: 14px;
  line-height: 18px;
  color: #9AC;
  margin-top: 5px;
  text-align: center;
`;

export const Stars = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false
})`
  margin-top: 20px;
`;

export const Starred = styled.View`
  background: #707070;
  border-radius: 4px;
  padding: 10px 15px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`;

export const OwnerAvatar = styled.Image`
  height: 42px;
  width: 42px;
  border-radius: 21px;
  background: #EEE;
`;

export const Info = styled.View`
  margin-left: 10px;
  flex: 1;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 1
})`
  font-size: 15px;
  font-weight: bold;
  color:  #FDFFDD;
`;

export const Author = styled.Text`
  font-size: 13px;
  color: #F0F0F0;
  margin-top: 2px;
`;
