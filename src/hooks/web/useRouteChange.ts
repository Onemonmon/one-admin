import { watch } from "vue";
import { useRoute, RouteLocationNormalizedLoaded } from "vue-router";

export const useRouteChange = (
  onRouteChange: (route: RouteLocationNormalizedLoaded) => void
) => {
  const route = useRoute();
  watch(
    () => route.name,
    () => {
      onRouteChange(route);
    },
    {
      immediate: true,
    }
  );
};
