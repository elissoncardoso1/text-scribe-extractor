const { contextBridge } = require('electron');

// Exponha funcionalidades específicas e seguras para o renderer
contextBridge.exposeInMainWorld('electronAPI', {
  // Adicione aqui as funções que você quer disponibilizar para o frontend
  // Por exemplo:
  getAppVersion: () => process.versions.app,
});