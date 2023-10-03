import React from 'react';
import { View } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';

type Country = {
  name: string;
  code: string;
  dialCode: string;
};

type Props = {
  countries: Country[];
  selectedCountry: Country,
  setSelectedCountry: any
};

const SearchableCountryPicker: React.FC<Props> = ({ countries, selectedCountry, setSelectedCountry }) => {


  const placeholderText = selectedCountry ? `${selectedCountry.dialCode} (${selectedCountry.name})` : 'Select a country';

  const handleSelectCountry = (selectedItem: any) => {
    setSelectedCountry(selectedItem);
  };

  return (
    <View>
      <SearchableDropdown
        onTextChange={(text) => { }}
        onItemSelect={handleSelectCountry}
        containerStyle={{ padding: 5 }}
        textInputStyle={{
          padding: 12,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5
        }}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: '#ddd',
          borderColor: '#bbb',
          borderWidth: 1,
          borderRadius: 5,
        }}
        itemTextStyle={{ color: '#222' }}
        items={countries}
        defaultIndex={0}
        placeholder={placeholderText}
        resetValue={false}
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

export default SearchableCountryPicker;
