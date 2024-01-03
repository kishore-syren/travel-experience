import { render, screen } from "@testing-library/react";
import Feed from './feed.tsx';

//jest is able to read only inline styling.(but possible with vitest).
//jest is nodeJS based runner.Suitable for both fronend and backend testing.
//use browser based runners like Cypress for pure frontend testing.Which provides better features fro testing.(like CSS styling)

test('component rendering', () => {
    render(<Feed/>);
    const element = screen.getByTestId('main');
    const styles = window.getComputedStyle(element);
    expect(styles.backgroundColor).toBe('red');

});