py_binary(
    name = "analysis",
    main = "src/__main__.py",
    srcs = ["src/__main__.py"],
    deps = [":deps"],
)

py_library(
    name = "deps",
    deps = [
        "//dragnn/core:dragnn_bulk_ops",
        "//dragnn/core:dragnn_ops",
        "//dragnn/protos:spec_py_pb2",
        "//dragnn/python:graph_builder",
        "//dragnn/python:lexicon",
        "//dragnn/python:load_dragnn_cc_impl_py",
        "//dragnn/python:spec_builder",
        "//dragnn/python:visualization",
        "//syntaxnet:load_parser_ops_py",
        "//syntaxnet:parser_ops",
        "//syntaxnet:sentence_py_pb2",
        "@org_tensorflow//tensorflow:tensorflow_py",
        "@org_tensorflow//tensorflow/core:protos_all_py",
    ],
)
