import { createSelector } from "reselect";

const mountainsSelector = state => state.mountains;
const selectedMountainsSelector = state => state.selectedMountainIds;

const getMountains = (mountains, selectedMountainIds) => {
  const selectedMountains = _.filter(mountains, mountain =>
    _.contains(selectedMountainIds, mountain.id)
  );

  return selectedMountains;
};

export default createSelector({
  mountainsSelector,
  selectedMountainsSelector,
  getMountains
});
