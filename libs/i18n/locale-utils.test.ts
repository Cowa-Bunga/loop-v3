import {authLocalePathBuilder, localePathBuilder} from "./locale-utils";

describe('locale-utils', () => {
    it('should return the correct object path', () => {
        expect(localePathBuilder(['a', 'b', 'c'])).toEqual('a.b.c');
    });

    it("authLocalePathBuilder", () => {
        expect(authLocalePathBuilder("email")).toEqual("auth.email");
    });
})
