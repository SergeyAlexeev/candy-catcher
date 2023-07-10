import { times } from "lodash";
import { useHealthStore, MAX_HEALTH } from "../../stores/health";
import { Heart } from "./Heart";

export const HealthScale = () => {
  const { health } = useHealthStore();

  return (
    <>
      {times(MAX_HEALTH).map((index) => (
        <Heart key={`heart_${index}`} x={10 + index * 50} active={health - 1 >= index} />
      ))}
    </>
  );
};
