import z from "zod";

const SResolution = z.object({
  id: z.string().uuid(),
  name: z.string().toLowerCase(),
});

const SResolutionRequest = SResolution.omit({
  id: true,
});

const SResolutionResponse = SResolution;

const SResolutionUpdate = SResolutionRequest.partial();

type TResolution = z.infer<typeof SResolution>;
type TResolutionRequest = z.infer<typeof SResolutionRequest>;
type TResolutionResponse = z.infer<typeof SResolutionResponse>;
type TResolutionUpdate = Partial<TResolutionRequest>;

export {
  SResolution,
  SResolutionRequest,
  SResolutionResponse,
  SResolutionUpdate,
  TResolution,
  TResolutionRequest,
  TResolutionResponse,
  TResolutionUpdate,
};
