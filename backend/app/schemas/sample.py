
from pydantic import BaseModel, Field

class Sample1(BaseModel):
    name: str
    description: str | None = Field(
        default=None, title="The description of the item", max_length=300
    )
    price: float = Field(gt=0, description="The price must be greater than zero")
    tax: float | None = None


class Sample2(Sample1):
    gitu: str | None 
    description2: str | None 