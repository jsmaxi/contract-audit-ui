use array::ArrayTrait;

fn main() {
    let mut a = ArrayTrait::new();

    a.append(1);
    a.append(2);

    assert!(a.len() == 2, "wrong array length");

    let _first_element = *a.get(0).unwrap().unbox();

    let _second_element = *a.at(1);
}
