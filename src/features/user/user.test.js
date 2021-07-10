import { store } from "utils/store";

describe("Redux User Tests", () => {

  it("should dispatch updateUser action", () => {
    expect(store.getState().user).toEqual({
      displayName: "",
      isAnonymous: undefined,
      uid: undefined
    });
    const payload = {
      displayName: "test user",
      isAnonymous: true,
      uid: 1
    }
    store.dispatch({ type: "user/updateUser", payload });
    expect(store.getState().user).toEqual(payload);
  })

  it("should dispatch resetUser action", () => {
    const payload = {
      displayName: "",
      isAnonymous: undefined,
      uid: undefined
    }
    store.dispatch({ type: "user/resetUser", payload });
    expect(store.getState().user).toEqual(payload);
  })
})