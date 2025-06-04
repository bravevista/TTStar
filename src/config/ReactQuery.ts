import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,    //Los datos se vuelven a cargar solos
      gcTime: 5 * 60 * 1000,    //Tiempo en ms para que los datos no usados sean eliminados
      refetchOnMount: true,  //No refetch al montar
      refetchOnWindowFocus: true,    //Se recarga al cambiar de pestaña
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
