from huggingface_hub import InferenceClient

client = InferenceClient(
    "meta-llama/Llama-3.1-8B-Instruct",
    token="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",
)

response = client.text_generation("The huggingface_hub library is ", max_new_tokens=12)