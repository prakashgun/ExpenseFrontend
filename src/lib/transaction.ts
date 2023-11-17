import { Alert } from "react-native";
import config from "../../config";
import { getLoginDetails } from "./storage";
import { frameDbDate } from "./utils";

export const getTransactionsApi = async (date: Date) => {

    try {
        const loginDetails = await getLoginDetails()

        if ('login_token' in loginDetails) {
            if (loginDetails['login_token'] != null) {

                const response = await fetch(
                    `${config.API_URL}/detail/transactions/?created_date=${frameDbDate(date)}`,
                    {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${loginDetails['login_token']}`
                        }
                    }
                )

                const json = await response.json();

                if (json.hasOwnProperty('non_field_errors')) {
                    Alert.alert('Error', json.non_field_errors[0])
                }

                return json
            }
        } else {
            Alert.alert('Error', 'Please login again')
        }
    } catch (error) {
        console.error(error);
    }
}

export const addTransactionApi = async (transactionDetail: object) => {
    try {
        const loginDetails: any = await getLoginDetails()


        if ('login_token' in loginDetails) {
            if (loginDetails['login_token'] != null) {

                const response = await fetch(
                    `${config.API_URL}/detail/transactions/`,
                    {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Token ${loginDetails['login_token']}`
                        },
                        body: JSON.stringify(transactionDetail)
                    }
                )

                const responseData = await response.json()
                const httpResponseCode = response.status

                return [responseData, httpResponseCode]
            } else {
                Alert.alert('Error', 'Please login again')
            }
        }
    } catch (error) {
        console.error(error);
    }
}
