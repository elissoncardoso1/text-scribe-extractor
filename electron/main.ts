import { app, BrowserWindow } from 'electron';
import path from 'path';

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false, // Oculta a janela até que o conteúdo esteja carregado
    webPreferences: {
      nodeIntegration: false, // Desativa acesso direto ao Node.js
      contextIsolation: true, // Isola o contexto de execução
      preload: path.join(__dirname, 'preload.js'), // Arquivo intermediário seguro
      backgroundThrottling: false // Evita queda de FPS quando em segundo plano
    }
  });

  win.once('ready-to-show', () => {
    win.show(); // Mostra a janela somente quando tudo estiver pronto
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.allowRendererProcessReuse = true;

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});