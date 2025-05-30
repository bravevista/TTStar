import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,    //Los datos no se vuelven a cargar solos, solo con Websocket
      gcTime: 5 * 60 * 1000,    //Tiempo en ms para que los datos no usados sean eliminados
      refetchOnMount: false,  //No refetch al montar
      refetchOnWindowFocus: false,    //No recarga al cambiar de pestaña (Websocket se encarga)
      retry: 2,   //Reintentar dos veces si la petición falla
      retryDelay: 1000,   //Espera 1 segundo entre intentos
      enabled: true,
    },
    mutations: {
      retry: 2,   //Reintenta 2 veces en mutaciones
      retryDelay: 1000,   //Espera 1 segundo entre reintentos
    },
  },
});
