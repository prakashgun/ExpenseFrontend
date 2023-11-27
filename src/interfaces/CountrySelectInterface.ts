import { ViewStyle } from "react-native"
import CountryInterface from "./CountryInterface"


export default interface CountrySelectInterface {
    countries: CountryInterface[],
    selectedCountry: CountryInterface,
    setSelectedCountry: (country: CountryInterface) => void,
    inputButtonStyle: ViewStyle
}