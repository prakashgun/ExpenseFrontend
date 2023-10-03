import { Icon, ListItem } from "@rneui/base"
import React from "react"
import { TouchableOpacity } from "react-native"
import CategoryItemInterface from "../interfaces/CategoryItemInterface"


const CategoryItem = ({ category, onPress }: CategoryItemInterface) => (
    <TouchableOpacity onPress={onPress}>
        <ListItem
            key={category.id}
            bottomDivider
        >
            <Icon name={category.icon_name} type={category.icon_type} />
            <ListItem.Content>
                <ListItem.Title>{category.name}</ListItem.Title>
            </ListItem.Content>
        </ListItem>
    </TouchableOpacity>
)

export default CategoryItem