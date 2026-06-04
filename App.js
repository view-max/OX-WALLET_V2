import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import 'react-native-get-random-values';
import { Buffer } from 'buffer';
global.Buffer = Buffer;
const ethers = require('ethers');

export default function App() {
  const [wallet, setWallet] = useState(null);

  // Generate a brand new wallet on startup
  useEffect(() => {
    createNewWallet();
  }, []);

  const createNewWallet = () => {
    const randomWallet = ethers.Wallet.createRandom();
    setWallet({
      address: randomWallet.address,
      mnemonic: randomWallet.mnemonic.phrase,
      privateKey: randomWallet.privateKey
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.header}>0x Wallet v2</Text>
      
      <ScrollView style={styles.cardContainer}>
        {wallet ? (
          <View>
            <View style={styles.card}>
              <Text style={styles.label}>YOUR ETHEREUM ADDRESS</Text>
              <Text style={styles.value}>{wallet.address}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.label}>12-WORD SEED PHRASE (SECRET)</Text>
              <Text style={styles.mnemonic}>{wallet.mnemonic}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.label}>PRIVATE KEY</Text>
              <Text style={styles.value}>{wallet.privateKey}</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.loading}>Generating secure wallet...</Text>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={createNewWallet}>
        <Text style={styles.buttonText}>Generate New Wallet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f172a', padding: 20, paddingTop: 60 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#f8fafc', marginBottom: 20, textAlign: 'center' },
  cardContainer: { flex: 1 },
  card: { backgroundColor: '#1e293b', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#334155' },
  label: { color: '#38bdf8', fontSize: 11, fontWeight: 'bold', marginBottom: 5, letterSpacing: 1 },
  value: { color: '#e2e8f0', fontSize: 14, fontFamily: 'monospace' },
  mnemonic: { color: '#f43f5e', fontSize: 15, fontFamily: 'monospace', lineHeight: 22 },
  loading: { color: '#94a3b8', textAlign: 'center', marginTop: 40 },
  button: { backgroundColor: '#3b82f6', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 20 },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' }
});
