import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Fonts } from '../constants/Fonts';

const DropDown = ({ 
  items = [], 
  value, 
  onSelect, 
  placeholder = 'Select option', 
  headingtxt,
  zIndex = 1000,
  zIndexInverse = 1000,
  containerStyle,
  dropdownStyle,
  renderListItem, // Custom item list rendering
  renderLeftIcon, // Optional icon/avatar on the left of input
}) => {
  const [open, setOpen] = useState(false);
  const [dropdownItems, setDropdownItems] = useState(items);

 useEffect(() => {
    const formattedItems = items.map(item => {
      if (item.initials || item.icon) {
        return {
          ...item,
          icon: item.icon || (() => (
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.initials}</Text>
            </View>
          )),
        };
      }
      return item; // Standard dropdown item (no avatar)
    });
    setDropdownItems(formattedItems);
  }, [items]);

  return (
    <View style={[styles.container, containerStyle, { zIndex: open ? zIndex : 1 }]}>
      {headingtxt && <Text style={styles.label}>{headingtxt}</Text>}
      
      <DropDownPicker
        open={open}
        value={value}
        items={dropdownItems}
        setOpen={setOpen}
        setValue={(callback) => {
          const selectedVal = callback(value);
          if (onSelect) onSelect(selectedVal);
        }}
        setItems={setDropdownItems}
        placeholder={placeholder}
        listMode="SCROLLVIEW"
        scrollViewProps={{ nestedScrollEnabled: true }}
        maxHeight={180}
        style={[styles.dropdown, dropdownStyle]}
        textStyle={styles.textStyle}
        placeholderStyle={styles.placeholderStyle}
        dropDownContainerStyle={styles.dropDownContainer}
        listItemLabelStyle={styles.itemText}
        selectedItemLabelStyle={styles.selectedItemText}
        showArrowIcon={true}
        arrowIconStyle={styles.arrowIcon}
        
        // Allow custom left icon (e.g., Avatar)
        renderLeftIcon={renderLeftIcon}
        
        // Optional custom list item renderer
        renderListItem={renderListItem}

        zIndex={zIndex}
        zIndexInverse={zIndexInverse}
      />
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: '#8E99A6',
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  dropdown: {
    height: 52,
    borderColor: '#E2E8F0',
    borderWidth: 1,
    borderRadius: 26,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  placeholderStyle: {
    color: '#8E99A6',
    fontSize: 15,
  },
  textStyle: {
    fontSize: 15,
    color: '#0F172A',
    fontWeight: '500',
  },
  dropDownContainer: {
    borderColor: '#E2E8F0',
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    marginTop: 4,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  itemText: {
    fontSize: 14,
    fontFamily: Fonts.Regular,
    color: '#6B7280',
  },
  selectedItemText: {
    color: '#2563EB',
    fontWeight: '600',
  },
  arrowIcon: {
    tintColor: '#8E99A6',
  },avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});