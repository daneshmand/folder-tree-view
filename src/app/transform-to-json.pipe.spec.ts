import { TransformToJsonPipe } from './transform-to-json.pipe';

describe('TransformToJsonPipe', () => {
  it('create an instance', () => {
    const pipe = new TransformToJsonPipe();
    expect(pipe).toBeTruthy();
  });
});
